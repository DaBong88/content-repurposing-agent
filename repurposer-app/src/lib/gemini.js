export async function extractTextFromUrl(url) {
  try {
    const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to extract content.");
      } else {
        const errorText = await response.text();
        throw new Error(`Scraping server returned status ${response.status}. Details: ${errorText.substring(0, 150)}`);
      }
    }

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
    throw new Error(error.message || "Could not extract content from the URL. Ensure the URL is public.");
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
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content.");
      } else {
        const errorText = await response.text();
        throw new Error(`Generation server returned status ${response.status}. Vercel Error Details: ${errorText.substring(0, 300)}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Backend API Error:", error);
    throw new Error(error.message || "Failed to generate content from backend API.");
  }
}


