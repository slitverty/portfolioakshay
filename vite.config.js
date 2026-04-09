import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function localCmsApi() {
  return {
    name: 'local-cms-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/get-portfolio' && req.method === 'GET') {
          try {
            const filePath = path.resolve(__dirname, 'src/data/portfolio.json');
            if (fs.existsSync(filePath)) {
              const data = fs.readFileSync(filePath, 'utf8');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(data);
            } else {
              res.statusCode = 200;
              res.end(JSON.stringify(null));
            }
          } catch (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error.message }));
          }
        } else if (req.url === '/api/save-portfolio' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const filePath = path.resolve(__dirname, 'src/data/portfolio.json');
              fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true }));
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: error.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localCmsApi()],
  server: {
    watch: {
      // Prevent full reload when admin writes portfolio.json
      ignored: ['**/src/data/portfolio.json']
    }
  }
})
