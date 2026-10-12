import { handleApi } from '../server/api.js';

export default async function handler(req, res) {
  const handled = await handleApi(req, res);
  if (!handled && !res.writableEnded) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, error: 'Endpoint introuvable.' }));
  }
}
