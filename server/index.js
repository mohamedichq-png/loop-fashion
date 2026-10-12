import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApi } from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  // 1. API routes
  if (req.url && req.url.startsWith('/api')) {
    const handled = await handleApi(req, res);
    if (handled) return;
  }

  // 2. Uploaded assets
  if (req.url && req.url.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '../public', req.url);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
      return;
    }
  }

  // 3. Static files from dist
  let safePath = req.url.split('?')[0];
  if (safePath === '/') safePath = '/index.html';
  let targetPath = path.join(DIST_DIR, safePath);

  if (!fs.existsSync(targetPath)) {
    // SPA fallback
    targetPath = path.join(DIST_DIR, 'index.html');
  }

  if (fs.existsSync(targetPath)) {
    const ext = path.extname(targetPath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(targetPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found. Run npm run build first.');
  }
});

server.listen(PORT, () => {
  console.log(`[LOOP FASHION] Server running on http://localhost:${PORT}`);
});
