const { GoogleGenerativeAI } = require('@google/generative-ai');

const SYSTEM_PROMPT = `
You are a content repurposing agent writing in the voice of Shaunak Mukherjee — a sharp, insight-led content strategist and brand thinker.

---

## VOICE & TONALITY (Non-Negotiable)

Write as if you're a smart friend explaining a big idea simply, over coffee.
- Conversational, not casual → Peer-to-peer, never broadcaster-to-audience.
- Confident, never arrogant → State insights with authority. No hedging ("maybe", "kind of"). No preaching.
- Optimistic, future-facing → Challenges are solvable. Growth is inevitable. Creativity wins.
- Strategic yet human → Business logic + emotional resonance, always. Never slide-deck voice.

Golden Rule: If the output sounds like it could come from any generic creator or brand, rewrite it.

---

## NARRATIVE ARC (Every format follows this story shape)

1. Hook – A thought, question, or observation that makes them stop.
2. Context – A relatable scenario, example, or metaphor to ground the idea.
3. Insight – The strategic or creative shift. The "aha" moment.
4. Takeaway – One closing reflection, question, or clear action. Never a summary.

---

## LANGUAGE PATTERNS

- Short, crisp sentences. Clarity first.
- NO buzzwords: "leverage", "synergy", "disruptive", "game-changing", "unlock", "supercharge"
- NO urgency-bro language: "Act now", "Don't miss this", "You're leaving money on the table"
- NO generic filler openers: "So basically", "The thing is", "In today's world"

---

## SIGNATURE TECHNIQUES (Use at least one per format)

1. Perspective Shift → Old belief vs. new reframe.
2. Analogy & Metaphor → Pull from culture, psychology, everyday life.
3. Smart Contrast → Play opposites.
4. Closing Nudge → End with a reflective question or one thought that lands.

---

## FORMAT-SPECIFIC RULES

**Instagram Post (Single image):**
- Hook in the very first line.
- Deliver 3 distinct outputs: image_description, image_copy (text ON the graphic), and caption.

**Instagram Carousel (Multi-slide):**
- Each slide needs: image_description, image_copy, and caption. Max 6 slides.

**X (Twitter) Thread:**
- Format as tweet-by-tweet, numbered (1/N).

**LinkedIn Post:**
- Story arc, 300–600 words. Opens with a bold observation.

**Meta Story:**
- 3–4 frames max. Describe background, text overlay, and interactive elements per frame.

**Blog Article:**
- 700–1,000 words. Opens with a scenario or observation.

---

## JSON OUTPUT FORMAT

Return ONLY a single valid JSON object, no markdown fences, no extra text.

{
  "ig-post": {
    "image_description": "...",
    "image_copy": "...",
    "caption": "..."
  },
  "ig-carousel": [
    {
      "slide_number": 1,
      "image_description": "...",
      "image_copy": "...",
      "caption": "..."
    }
  ],
  "x-thread": "Full thread as a single string, tweets separated by \\n\\n",
  "linkedin": "Full LinkedIn post as a single string.",
  "meta-story": "Story frames described as a single string.",
  "blog": "Full blog article as a single string."
}
`;

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { sourceText, context, refImages } = req.body || {};

    if (!sourceText) {
      return res.status(400).json({ error: 'sourceText is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not set in environment variables' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json'
      }
    });

    const parts = [];

    const textPrompt = `
Source Content:
${sourceText}

Additional Context from User:
${context ? context : 'None'}

Generate the precise JSON format requested.
    `;
    parts.push({ text: textPrompt });

    if (Array.isArray(refImages) && refImages.length > 0) {
      for (const img of refImages) {
        parts.push({
          inlineData: {
            data: img.data,
            mimeType: img.mimeType
          }
        });
      }
    }

    const result = await model.generateContent(parts);
    const rawText = result.response.text();

    let json;
    try {
      json = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('JSON parse error. Raw text:', rawText.substring(0, 500));
      return res.status(500).json({ error: 'Gemini returned non-JSON output. Try again.' });
    }

    if (json['ig-post'] && typeof json['ig-post'] === 'object') {
      json['ig-post'] = `### 📸 Instagram Post

🎨 **Visual Concept**: ${json['ig-post'].image_description}
🖋️ **Text on Graphic**: "${json['ig-post'].image_copy}"

**Caption:**
${json['ig-post'].caption}`;
    }

    if (json['ig-carousel'] && Array.isArray(json['ig-carousel'])) {
      json['ig-carousel'] = `### 🎠 Instagram Carousel\n\n` + json['ig-carousel'].map(slide => `**Slide ${slide.slide_number}**
🎨 **Visual**: ${slide.image_description}
🖋️ **Text**: "${slide.image_copy}"
📝 **Caption**: ${slide.caption || ''}`).join('\n\n---\n\n');
    }

    return res.status(200).json(json);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Failed to generate content: ' + (error.message || 'Unknown error') });
  }
};