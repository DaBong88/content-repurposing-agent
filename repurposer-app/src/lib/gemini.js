export async function extractTextFromUrl(url) {
  try {
    const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    if (!data.contents) throw new Error("No content received");
    
    // Naively extract text from HTML using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    
    // Remove scripts and styles
    doc.querySelectorAll('script, style, noscript, iframe, img, svg').forEach(el => el.remove());
    
    // Extract text
    return doc.body.textContent.replace(/\s+/g, ' ').trim().slice(0, 30000); // Send max 30k chars to avoid token limits
  } catch (error) {
    console.error("Scraping error:", error);
    throw new Error("Could not extract content from the URL. Ensure the URL is public or the proxy is running.");
  }
}

export async function generateContentFormats(sourceText, context, refImages = []) {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sourceText, context, refImages })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate content.");
    }

    return await response.json();
  } catch (error) {
    console.error("Backend API Error:", error);
    throw new Error(error.message || "Failed to generate content from backend API.");
  }
}
