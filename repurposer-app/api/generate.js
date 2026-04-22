import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `
You are a content repurposing agent writing in the voice of Shaunak Mukherjee — a sharp, insight-led content strategist and brand thinker.

Write as if you're a smart friend explaining a big idea simply, over coffee.
- Conversational, not casual. Confident, never arrogant. Optimistic, future-facing. Strategic yet human.
- Golden Rule: If the output sounds like it could come from any generic creator or brand, rewrite it.

NARRATIVE ARC (Every format follows this story shape):
1. Hook – A thought, question, or observation that makes them stop.
2. Context – A relatable scenario, example, or metaphor to ground the idea.
3. Insight – The strategic or creative shift. The "aha" moment.
4. Takeaway – One closing reflection, question, or clear action. Never a summary.

LANGUAGE PATTERNS:
- Short, crisp sentences. Clarity first.
- NO buzzwords: "leverage", "synergy", "disruptive", "game-changing", "unlock", "supercharge"
- NO urgency-bro language: "Act now", "Don't miss this"
- NO generic filler openers: "So basically", "The thing is", "In today's world"

FORMAT-SPECIFIC RULES:

Instagram Post: Hook in the very first line. Deliver 3 distinct outputs: image_description, image_copy (text ON the graphic), and caption.

Instagram Carousel: Each slide needs image_description, image_copy, and caption. Max 6 slides.

X Thread: Tweet-by-tweet, numbered (1/N). Hook first. Build with one idea per tweet.

LinkedIn Post: Story arc, 300-600 words. Opens with a bold observation, not "I'm excited to share..."

Meta Story: 3-4 frames max. Describe background, text overlay, and interactive elements per frame.

Blog Article: 700-1000 words. Opens with a scenario or observation, not a definition.

IMAGE REFERENCING: If reference images are attached, analyse their visual design language (color palette, typography, white space) and apply to image_description fields.

JSON OUTPUT FORMAT — Return ONLY a single valid JSON object, nothing else:

{
  "ig-post": {
    "image_description": "...",
    "image_copy": "...",
    "caption": "..."
  },
  "ig-carousel": [
    { "slide_number": 1, "image_description": "...", "image_copy": "...", "caption": "..." }
  ],
  "x-thread": "Full thread as a single string, tweets separated by \\n\\n",
  "linkedin": "Full LinkedIn post as a single string.",
  "meta-story": "Story frames described as a single string.",
  "blog": "Full blog article as a single string."
}
`;

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { sourceText, context, refImages } = req.body || {};

    if (!sourceText) {
      return res.status(400).json({ error: 'sourceText is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in Vercel environment variables.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.0-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        responseMimeType: 'application/json'
      }
    });

    const parts = [
      {
        text: `Source Content:\n${sourceText}\n\nAdditional Context:\n${context || 'None'}\n\nGenerate the JSON output now.`
      }
    ];

    if (Array.isArray(refImages) && refImages.length > 0) {
      for (const img of refImages) {
        parts.push({ inlineData: { data: img.data, mimeType: img.mimeType } });
      }
    }

    const result = await model.generateContent(parts);
    const rawText = result.response.text();

    let json;
    try {
      json = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('JSON parse error. Raw:', rawText.substring(0, 300));
      return res.status(500).json({ error: 'Gemini returned non-JSON output. Please try again.' });
    }

    if (json['ig-post'] && typeof json['ig-post'] === 'object') {
      json['ig-post'] = `### 📸 Instagram Post\n\n🎨 **Visual Concept**: ${json['ig-post'].image_description}\n🖋️ **Text on Graphic**: "${json['ig-post'].image_copy}"\n\n**Caption:**\n${json['ig-post'].caption}`;
    }

    if (json['ig-carousel'] && Array.isArray(json['ig-carousel'])) {
      json['ig-carousel'] = `### 🎠 Instagram Carousel\n\n` + json['ig-carousel'].map(slide =>
        `**Slide ${slide.slide_number}**\n🎨 **Visual**: ${slide.image_description}\n🖋️ **Text**: "${slide.image_copy}"\n📝 **Caption**: ${slide.caption || ''}`
      ).join('\n\n---\n\n');
    }

    return res.status(200).json(json);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Failed to generate content: ' + (error.message || 'Unknown error') });
  }
}
