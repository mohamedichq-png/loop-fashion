import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApi } from './server/api.js';

// Custom Vite plugin mounting the secure server-side API middleware
function apiPlugin() {
  return {
    name: 'loop-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api')) {
          await handleApi(req, res, next);
        } else {
          next();
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  server: {
    port: 3000,
    open: false
  }
});
