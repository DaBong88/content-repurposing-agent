# Content Repurposing Agent (VoiceWriter) 🎙️✍️

An AI-powered content transformation engine designed to ingest any public article or URL and automatically repurpose it into engaging, platform-specific social media content. Built tightly around a custom "insight-led" strategic voice, it ensures the final outputs don't sound like generic AI, but rather like a smart friend or thought-leader explaining big ideas over coffee.

![App Demo](repurposer-app/public/vite.svg) *(Imagine a dynamic UI screenshot here)*

## 🚀 Features

- **Automated URL Scraping**: Simply drop in a link. The built-in proxy bypasses CORS restrictions to scrape the main article content (up to 30,000 characters).
- **Multi-Format Generation**: Instantly transforms one article into:
  - 📸 **Instagram Post** (with visual descriptions for designers and text-on-graphic)
  - 🎠 **Instagram Carousel** (broken down slide-by-slide)
  - 🐦 **X (Twitter) Thread** (hook-driven, punchy, sequential)
  - 💼 **LinkedIn Post** (professional, human, narrative-driven)
  - 📱 **Meta Story** (short 15s frames with CTA)
  - 📝 **Blog Article** (expanded thought-leadership format)
- **Multimodal Visual Referencing**: Upload up to 5 brand reference images. The AI analyzes your visual design language (color palette, typography weight, mood) and applies these aesthetics to the generated image descriptions for your designer.
- **Strict Brand Voice**: Enforces a non-negotiable narrative arc (Hook → Context → Insight → Takeaway) and actively avoids generic marketing tropes, buzzwords, and urgency-bro language.
- **Secure Architecture**: Powered by Gemini 2.5 Flash via a secure, serverless backend that protects your API keys.

---

## 🛠️ Use Cases

1. **Agencies & Social Media Managers**: 
   Take a client's latest blog post or press release and instantly generate a week's worth of social content across X, LinkedIn, and Instagram, complete with design briefs for the creative team.
2. **Founders & Thought Leaders**: 
   Repurpose your long-form newsletter or a recent industry article into a viral X thread or a punchy LinkedIn post without spending hours reformatting.
3. **Content Creators**:
   Maintain a consistent, high-quality voice across all your output channels without manually rewriting content for different platform algorithms.

---

## 💻 Tech Stack

- **Frontend**: React 19 + Vite (Linear-inspired minimalist UI)
- **Styling**: Vanilla CSS, Lucide React Icons, Markdown Rendering
- **Backend (Serverless)**: Vercel Functions (`/api/scrape`, `/api/generate`)
- **AI Engine**: Google Gemini 2.5 Flash (via `@google/generative-ai`)

---

## ⚙️ How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DaBong88/content-repurposing-agent.git
   cd content-repurposing-agent/repurposer-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `repurposer-app` directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=AIzA...
   ```

4. **Start the Development Server** *(Requires Vercel CLI to run serverless functions)*:
   ```bash
   npm install -g vercel
   vercel dev
   ```

5. **Open in Browser**:
   Navigate to `http://localhost:3000` (or the port Vercel provides).

---

## 🌐 Deploying to Vercel

This app is production-ready for Vercel. 

1. Push your code to GitHub.
2. Go to Vercel and **Import** the repository.
3. Set the **Root Directory** to `repurposer-app` during setup.
4. Set the Framework Preset to **Vite**.
5. Add `GEMINI_API_KEY` to your Vercel Environment Variables.
6. Click **Deploy**.

## 📁 Repository Structure

- `repurposer-app/`: The main React web application and Vercel serverless backend.
- `hook-generator/`: (Additional modular scripts for specific hook creation).
- `my-voice-writer/`: (Core prompt engineering and tone-guidelines).
