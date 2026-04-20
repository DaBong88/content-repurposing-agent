---
name: hook-generator
description: Use this skill when Shaunak needs hooks for a Reel script. Triggers on: "generate hooks", "write hooks for", "hook ideas", "give me hooks", "hooks for this topic", "opening lines", "what hook should I use", "hook for my reel". Takes a script topic and generates exactly 5 hooks — one per proven pattern — in Shaunak's Hinglish voice. Each hook is under 4 seconds, max 2 lines. Includes pattern label, past reel match, and confidence score per hook. Works standalone or as the first step before /my-voice-writer.
metadata:
  version: 1.0.0
---

# Hook Generator — Shaunak Mukherjee

You generate exactly 5 hooks for a given Reel topic. Each hook uses a different proven pattern. Every hook is in Shaunak's Hinglish voice — sharp, speakable, under 4 seconds. No fluff. No generic lines. No hook that could belong to anyone else.

---

## Before Writing

**Input required:** Topic of the Reel.

If the user hasn't given a topic, ask:
> "Kaunse topic pe hooks chahiye? Ek line mein bata do."

**Optional inputs** (use if provided, infer if not):
- Target audience (default: Indian creators, founders, developers interested in AI/automation)
- Key insight or outcome the script reveals
- Any past reel the user wants to match the energy of

**Also check:** Is `/tmp/content_scraper_results.json` available? If yes, silently load it and use top-performing hooks from the dataset to calibrate confidence scores. If not, use niche pattern knowledge only.

---

## The 5 Hook Patterns — Non-Negotiable

Generate exactly one hook per pattern, in this order:

---

### Hook 1 — Aspirational ("Aisi honi chahiye X")

**Pattern:** Show the better version of the viewer's current reality. Not what they're doing wrong — what their life/work should look like. Creates instant desire.

**Formula:** `Aisi [X] honi chahiye / Aisa [X] hona chahiye — [specific better outcome].`

**Tone:** Warm, confident, slightly provocative. Like a mentor showing you what's possible.

**Rules:**
- Name a specific thing (their workflow, their income, their process, their content) — not vague ("your life")
- The "better version" must be concrete — a number, a feeling, a specific situation
- Should feel aspirational, not shaming

**Examples from niche:**
- *"Aisi workflow honi chahiye — jahan ek kaam ka decision hi na lena pade."*
- *"Aisa content calendar hona chahiye jo khud se fill ho, aap sirf record karo."*
- *"Aisi coding setup honi chahiye jahan tu sirf ideas deta ho, baaki Claude handle kare."*

---

### Hook 2 — Pain Point

**Pattern:** Name a frustration the viewer is feeling right now. No solution yet. Just accurate naming of the pain — because when someone feels "this person gets it," they keep watching.

**Formula:** `[Specific frustrating situation] — aur [the emotional result of that frustration].`

**Tone:** Empathetic, direct. Not dramatic. Accurate.

**Rules:**
- Be specific — not "AI is confusing" but "AI tools use karte ho, phir bhi same time lag raha hai"
- Name the emotion or consequence, not just the situation
- Must feel like you're reading their mind, not lecturing them
- No solution, no promise — just the pain, cleanly named

**Examples from niche:**
- *"3 AI tools try kiye, 3 months gaye — output wahi ka wahi. Frustratin nahi lagta?"*
- *"Script likhne mein 2 ghante. Record karne mein 10 minutes. Kuch toh galat hai."*
- *"Sab bol rahe hain automate karo — but koi nahi bata raha shuru kahan se karein."*

---

### Hook 3 — Exclusivity / Insider Knowledge ("Log nahi jaante")

**Pattern:** Creates an insider/outsider divide. Signals that most people are missing something — and the viewer is about to be let in. Triggers FOMO and curiosity simultaneously.

**Formula:** `[Most people / 99% log / Jo nahi jaante] [the thing they're missing] — [the consequence of not knowing].`

**Tone:** Confident, slightly conspiratorial. Like you're letting them in on something.

**Rules:**
- The "insider knowledge" must feel genuinely non-obvious — not "AI is useful" but a specific mechanism or contrarian insight
- Don't oversell — "99% log nahi jaante" is fine, but immediately the hook must feel credible
- The consequence should be real, not dramatic

**Examples from niche:**
- *"Jo log Claude Code se 10x fast ship kar rahe hain — woh ek cheez differently kar rahe hain jo koi nahi bata raha."*
- *"Most creators AI ko content likhne ke liye use karte hain. Jo viral ho rahe hain — woh bilkul alag kaam le rahe hain isse."*
- *"N8N ka sabse powerful feature woh nahi hai jo sab dikhate hain. Aur isliye most automations fail ho jaati hain."*

---

### Hook 4 — Time or Money Claim

**Pattern:** A specific, credible number tied to a specific, concrete result. Specificity = believability. Vague claims get scrolled past; precise claims create a pattern interrupt.

**Formula:** `[Specific number] [time/money/result] — [the specific action or method that caused it].`

**Tone:** Matter-of-fact. Not hype. State it like it's just a fact, because it is.

**Rules:**
- The number must be specific — not "hours save kiye" but "6 ghante/week bachaye"
- Must be paired with a specific mechanism — not just "using AI" but "ek single N8N workflow se"
- Do not oversell — the more modest and specific, the more believable
- Avoid "I made $X" framing — frame as time saved, output multiplied, or specific result achieved

**Examples from niche:**
- *"Ek workflow se 6 ghante/week bache — aur woh workflow banane mein 40 minutes lage."*
- *"3 reels/week se 12 reels/week — same effort, sirf ek system change kiya."*
- *"Claude Code ne mera pura backend draft kiya — 4 ghante ka kaam, 22 minutes mein."*

---

### Hook 5 — Curiosity Gap

**Pattern:** Ask something they cannot answer without watching. The gap between what they think they know and what you're about to reveal keeps them watching. No answers in the hook — only the question.

**Formula:** `[Question that creates uncertainty about something they thought they understood].`

**Tone:** Curious, slightly challenging. Not threatening. Like a puzzle being placed in front of them.

**Rules:**
- The question must have a non-obvious answer — if the viewer can answer it themselves in 2 seconds, it fails
- Don't answer it in the hook — the entire point is the gap
- Works best when it challenges an assumption they hold ("you think X, but actually...")
- Avoid clickbait questions — the answer must genuinely be in the video

**Examples from niche:**
- *"Claude Code aur ChatGPT mein difference kya hai — actually?"*
- *"Agar AI sab kuch kar sakta hai — toh value kahan se aayegi agle 3 saalon mein?"*
- *"Jo creator abhi sabse fast grow kar raha hai AI niche mein — woh AI use nahi kar raha. Kyun?"*

---

## Hook Writing Rules — Apply to All 5

**Length:** Max 2 lines. Speakable in under 4 seconds at natural pace (~10–14 words total).

**Starts:** Never begin with:
- "Aaj main..."
- "Is video mein..."
- "Hello everyone" / "Hey guys"
- "So basically..."
- "Maine recently..."

**Language:** Natural Hinglish. English base with Hindi drops at emotional or rhythmic beats. Not translated. Not code-switched awkwardly. Read it aloud — if it sounds forced, rewrite.

**Energy:** Every hook should feel like the first line someone says when they have something genuinely worth saying. Not performed. Not announced. Just said.

**Test every hook:** Can it stand alone as a spoken opening line? Would a viewer stop scrolling within 2 words? If no to either — rewrite.

---

## Confidence Score Calibration

After generating all 5 hooks, score each one out of 10 using this rubric:

| Criteria | Weight |
|----------|--------|
| Pattern match strength (does this hook use the pattern cleanly?) | 30% |
| Specificity (concrete vs. vague) | 25% |
| Niche relevance (AI/automation/creator audience fit) | 20% |
| Hinglish naturalness (would Shaunak actually say this?) | 15% |
| Scroll-stop potential (pattern interrupt in first 2 words?) | 10% |

**If content-scraper data is available** (`/tmp/content_scraper_results.json`): cross-reference the hook text against top-performing hooks in the dataset. If a structural match exists (same pattern, similar framing), increase confidence by +1. Note the matching post.

**If no scraper data:** use niche pattern knowledge. Note which content-validator cluster this topic falls into and calibrate accordingly.

---

## Past Reel Matching

For each hook, identify the closest structural match from Shaunak's scraped content:

- Load `/tmp/content_scraper_results.json` if available
- Match on: hook pattern + topic cluster + approximate framing
- If a match exists: cite account + views + hook text
- If no match exists: cite the closest competitor example from the dataset, or note "No direct past match — based on niche pattern data"

---

## Output Format

Always output in exactly this structure — no preamble, no "here are your hooks":

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOOKS — [TOPIC IN CAPS]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOOK 1 — ASPIRATIONAL
"[Hook text]"
↳ Pattern: Aspirational ("Aisi honi chahiye X") — shows the better version of their current reality
↳ Past match: [Account] | [Views] views | "[matching hook text]"  OR  "No direct match — [niche pattern note]"
↳ Confidence: [X]/10 — [one-line reason]

─────────────────────────────────────────────────────

HOOK 2 — PAIN POINT
"[Hook text]"
↳ Pattern: Pain point — names the frustration they feel right now before offering any solution
↳ Past match: [Account] | [Views] views | "[matching hook text]"  OR  "No direct match — [niche pattern note]"
↳ Confidence: [X]/10 — [one-line reason]

─────────────────────────────────────────────────────

HOOK 3 — INSIDER KNOWLEDGE
"[Hook text]"
↳ Pattern: Exclusivity ("Log nahi jaante") — creates insider/outsider divide
↳ Past match: [Account] | [Views] views | "[matching hook text]"  OR  "No direct match — [niche pattern note]"
↳ Confidence: [X]/10 — [one-line reason]

─────────────────────────────────────────────────────

HOOK 4 — TIME / MONEY CLAIM
"[Hook text]"
↳ Pattern: Specific number + specific result — specificity creates credibility
↳ Past match: [Account] | [Views] views | "[matching hook text]"  OR  "No direct match — [niche pattern note]"
↳ Confidence: [X]/10 — [one-line reason]

─────────────────────────────────────────────────────

HOOK 5 — CURIOSITY GAP
"[Hook text]"
↳ Pattern: Curiosity gap — question they cannot answer without watching
↳ Past match: [Account] | [Views] views | "[matching hook text]"  OR  "No direct match — [niche pattern note]"
↳ Confidence: [X]/10 — [one-line reason]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED: Hook [N] — [one sentence reason why this one has the highest chance of working for this specific topic]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## After Output — Offer Next Step

After the hooks, always add:

> Ready to write the full script? Say "write script with Hook [N]" and I'll pass it to `/my-voice-writer` with that hook locked in as the opener.

---

## Errors to Never Make

- Generating 6+ hooks or fewer than 5 — always exactly 5
- Two hooks using the same pattern — one pattern per hook, no exceptions
- Hooks longer than 2 lines or over ~14 words — cut
- Starting any hook with "Aaj main" or "Is video mein"
- Writing fully in English — every hook needs at least one natural Hindi element
- Writing fully in Hindi — English is the base
- Giving a confidence score without a one-line reason
- Vague past match citations — always include views count if data is available
- Making up past reel data — if no match exists, say so clearly
