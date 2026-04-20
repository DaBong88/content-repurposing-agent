module.exports = async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const fetchRes = await fetch(decodeURIComponent(url), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      }
    });

    if (!fetchRes.ok) {
      return res.status(fetchRes.status).json({ error: `Fetch failed: ${fetchRes.statusText}` });
    }

    const html = await fetchRes.text();
    return res.status(200).json({ contents: html });
  } catch (error) {
    console.error('Scraping backend error:', error);
    return res.status(500).json({ error: error.message });
  }
};
