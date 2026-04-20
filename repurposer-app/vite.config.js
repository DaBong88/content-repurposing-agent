import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin to act as a simple CORS proxy and bypass restrictions
const scraperPlugin = () => ({
  name: 'scraper-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url && req.url.startsWith('/api/scrape?url=')) {
        const urlToScrape = new URL(req.url, 'http://localhost').searchParams.get('url');
        if (!urlToScrape) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'URL is required' }));
        }

        try {
          const fetchRes = await fetch(decodeURIComponent(urlToScrape), {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
          });
          
          if (!fetchRes.ok) {
            res.statusCode = fetchRes.status;
            return res.end(JSON.stringify({ error: `Fetch failed completely: ${fetchRes.statusText}` }));
          }

          const html = await fetchRes.text();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ contents: html }));
        } catch (error) {
          console.error("Scraping backend error:", error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: error.message }));
        }
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), scraperPlugin()],
})
