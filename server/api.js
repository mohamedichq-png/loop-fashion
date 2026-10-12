import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { 
  getAllProducts, 
  getProductById, 
  getProductBySlug, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  toggleProductPublish,
  getAllOrders, 
  createOrder, 
  updateOrderStatus 
} from './db.js';
import { 
  authenticateAdmin, 
  verifySessionToken, 
  revokeSessionToken, 
  extractBearerToken 
} from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.resolve(__dirname, '../public/uploads');

// Parse JSON request body helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Protect against very large payloads (max 12MB)
      if (body.length > 12 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', err => reject(err));
  });
}

// Send JSON response helper
function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.end(JSON.stringify(data));
}

// Client IP extractor
function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
}

/**
 * Main API request handler
 * Returns true if request was handled, false if next middleware should continue
 */
export async function handleApi(req, res, next) {
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost:3000'}`);
  let pathname = urlObj.pathname;

  // In Vite middleware, pass non-api requests to static handlers
  if (next && !pathname.startsWith('/api')) {
    return next();
  }

  if (!pathname.startsWith('/api')) {
    pathname = '/api' + (pathname.startsWith('/') ? pathname : '/' + pathname);
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return true;
  }

  try {
    // -------------------------------------------------------------
    // 1. PUBLIC ENDPOINTS
    // -------------------------------------------------------------

    // GET /api/products -> Public catalog (published only)
    if (req.method === 'GET' && pathname === '/api/products') {
      const products = getAllProducts(false);
      sendJson(res, 200, { success: true, count: products.length, products });
      return true;
    }

    // GET /api/products/:slug -> Public single product
    if (req.method === 'GET' && pathname.startsWith('/api/products/')) {
      const slug = pathname.replace('/api/products/', '');
      const product = getProductBySlug(slug) || getProductById(slug);
      if (!product || product.isPublished === false) {
        sendJson(res, 404, { success: false, error: 'Pièce introuvable ou non disponible.' });
        return true;
      }
      sendJson(res, 200, { success: true, product });
      return true;
    }

    // POST /api/orders -> Public customer checkout order placement
    if (req.method === 'POST' && pathname === '/api/orders') {
      const body = await parseBody(req);
      if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
        sendJson(res, 400, { success: false, error: 'Panier vide ou invalide.' });
        return true;
      }
      const newOrder = createOrder(body);
      sendJson(res, 201, { success: true, order: newOrder });
      return true;
    }

    // -------------------------------------------------------------
    // 2. ADMIN AUTHENTICATION ENDPOINTS
    // -------------------------------------------------------------

    // POST /api/admin/login
    if (req.method === 'POST' && pathname === '/api/admin/login') {
      const body = await parseBody(req);
      const ip = getClientIp(req);
      const result = authenticateAdmin(body.email, body.password, ip);

      if (!result.success) {
        sendJson(res, 401, { success: false, error: result.error });
        return true;
      }

      sendJson(res, 200, {
        success: true,
        token: result.token,
        user: result.user
      });
      return true;
    }

    // POST /api/admin/logout
    if (req.method === 'POST' && pathname === '/api/admin/logout') {
      const token = extractBearerToken(req);
      if (token) {
        revokeSessionToken(token);
      }
      sendJson(res, 200, { success: true, message: 'Déconnexion réussie.' });
      return true;
    }

    // GET /api/admin/verify -> checks session validity
    if (req.method === 'GET' && pathname === '/api/admin/verify') {
      const token = extractBearerToken(req);
      const session = verifySessionToken(token);
      if (!session) {
        sendJson(res, 401, { success: false, error: 'Session invalide ou expirée.' });
        return true;
      }
      sendJson(res, 200, {
        success: true,
        user: {
          email: session.email,
          role: session.role,
          name: 'Direction LOOP FASHION Paris'
        }
      });
      return true;
    }

    // -------------------------------------------------------------
    // 3. PROTECTED ADMIN ENDPOINTS (Require valid Bearer token)
    // -------------------------------------------------------------
    if (pathname.startsWith('/api/admin/')) {
      const token = extractBearerToken(req);
      const session = verifySessionToken(token);

      if (!session) {
        sendJson(res, 401, { 
          success: false, 
          error: 'Accès administrateur refusé. Veuillez vous authentifier sur /admin.' 
        });
        return true;
      }

      // GET /api/admin/products -> Full catalog including drafts
      if (req.method === 'GET' && pathname === '/api/admin/products') {
        const products = getAllProducts(true);
        sendJson(res, 200, { success: true, count: products.length, products });
        return true;
      }

      // POST /api/admin/products -> Create new product
      if (req.method === 'POST' && pathname === '/api/admin/products') {
        const body = await parseBody(req);
        if (!body.name || !body.price) {
          sendJson(res, 400, { success: false, error: 'Le nom et le prix du vêtement sont obligatoires.' });
          return true;
        }
        const created = createProduct(body);
        sendJson(res, 201, { success: true, product: created });
        return true;
      }

      // PUT /api/admin/products/:id -> Update product
      if (req.method === 'PUT' && pathname.startsWith('/api/admin/products/')) {
        const id = pathname.replace('/api/admin/products/', '');
        const body = await parseBody(req);
        const updated = updateProduct(id, body);
        if (!updated) {
          sendJson(res, 404, { success: false, error: 'Pièce introuvable.' });
          return true;
        }
        sendJson(res, 200, { success: true, product: updated });
        return true;
      }

      // DELETE /api/admin/products/:id -> Delete product
      if (req.method === 'DELETE' && pathname.startsWith('/api/admin/products/')) {
        const id = pathname.replace('/api/admin/products/', '');
        const deleted = deleteProduct(id);
        if (!deleted) {
          sendJson(res, 404, { success: false, error: 'Pièce introuvable.' });
          return true;
        }
        sendJson(res, 200, { success: true, message: 'Pièce supprimée avec succès.' });
        return true;
      }

      // PATCH /api/admin/products/:id/publish -> Toggle publish status
      if (req.method === 'PATCH' && pathname.includes('/publish')) {
        const parts = pathname.split('/');
        const id = parts[parts.indexOf('products') + 1];
        const updated = toggleProductPublish(id);
        if (!updated) {
          sendJson(res, 404, { success: false, error: 'Pièce introuvable.' });
          return true;
        }
        sendJson(res, 200, { success: true, product: updated });
        return true;
      }

      // GET /api/admin/orders -> View all orders
      if (req.method === 'GET' && pathname === '/api/admin/orders') {
        const orders = getAllOrders();
        sendJson(res, 200, { success: true, count: orders.length, orders });
        return true;
      }

      // PATCH /api/admin/orders/:id/status -> Update order status
      if (req.method === 'PATCH' && pathname.startsWith('/api/admin/orders/')) {
        const id = pathname.replace('/api/admin/orders/', '').replace('/status', '');
        const body = await parseBody(req);
        if (!body.status) {
          sendJson(res, 400, { success: false, error: 'Statut requis.' });
          return true;
        }
        const updated = updateOrderStatus(id, body.status);
        if (!updated) {
          sendJson(res, 404, { success: false, error: 'Commande introuvable.' });
          return true;
        }
        sendJson(res, 200, { success: true, order: updated });
        return true;
      }

      // POST /api/admin/upload -> Secure image upload handler
      if (req.method === 'POST' && pathname === '/api/admin/upload') {
        const body = await parseBody(req);
        if (!body.base64) {
          sendJson(res, 400, { success: false, error: 'Données image base64 requises.' });
          return true;
        }

        // Clean base64 header
        const base64Data = body.base64.replace(/^data:image\/\w+;base64,/, '');
        const ext = (body.mimeType || 'image/jpeg').split('/')[1] || 'jpg';
        const safeExt = ['png', 'jpg', 'jpeg', 'webp'].includes(ext.toLowerCase()) ? ext.toLowerCase() : 'jpg';
        const filename = `item-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${safeExt}`;
        const filePath = path.join(UPLOADS_DIR, filename);

        fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));

        sendJson(res, 201, {
          success: true,
          url: `/uploads/${filename}`,
          filename
        });
        return true;
      }
    }

    // Unmatched API endpoint
    sendJson(res, 404, { success: false, error: 'Endpoint API introuvable.' });
    return true;

  } catch (error) {
    console.error('[API ERROR]', error);
    sendJson(res, 500, { success: false, error: error.message || 'Erreur interne du serveur.' });
    return true;
  }
}
