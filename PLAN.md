# Birthday Card — Project Plan

**Goal:** Combine Option 1 (Interactive HTML Card) + Option 2 (AI Video with Sora) into a single shareable web experience hosted on GitHub Pages.

The final product is a **link Dad opens on his phone or laptop** — it's a scroll-through HTML birthday card where, instead of just static photos, several key moments have been transformed into short AI-generated video clips (via Sora) that play inline as he scrolls.

---

## The Experience (What Dad Sees)

1. **Opening screen** — his name animates in, a short full-screen video clip plays (generated from the river selfie or the nature/mala-beads portrait)
2. **Scroll through a timeline of memories** — each "chapter" is a photo or short Sora video with a caption
3. **Clickable photo flip cards** — click any photo to flip it and read a personal message on the back
4. **The goat section** — a dedicated comedic moment around the goat-horns selfie, with a funny AI-generated video clip
5. **Final screen** — a heartfelt birthday message, confetti explosion, and an optional embedded birthday song

---

## Phase 1: Sora Video Generation

Generate 3–5 short video clips (5–10 seconds each) from the most evocative photos.

**Target clips:**
| Source Photo | Prompt Direction |
|---|---|
| `Dad-1.jpg` (river selfie) | Camera slowly pulls back, river ripples, leaves flutter |
| `Dad-2.jpg` (mala beads on rock) | Slight breeze, soft golden-hour light wash |
| `Goat-Dad.jpg` (goat horns mirror selfie) | Playful — subtle zoom in, glitter falls |
| `Family.jpg` (group selfie) | Subtle warmth/bokeh, smiles deepen |
| `Carlos-Jess-Mom-Dad.jpg` (wedding arch) | Soft flower petals falling, slight camera drift |

**Output format:** MP4, landscape or portrait depending on source, ~5–10 sec each.

### Sora API Notes
- Model: `sora-2` (faster, cheaper) for iteration; `sora-2-pro` for finals
- Image-to-video endpoint: `POST /videos` with image attachment + text prompt
- ~$1–5 per 10-second clip (standard pricing)
- **Requires OpenAI API key with Sora access** (see API Keys section below)
- We'll use the **sora-2-mcp** MCP server to call Sora from within Claude Code

---

## Phase 2: HTML Card Build

Build a single `index.html` (+ CSS/JS files) deployable to GitHub Pages.

### Tech Stack
- **Vanilla HTML/CSS/JS** — no framework needed, keeps it fast and simple
- **GitHub Pages** — free hosting, already set up via this repo
- Inline `<video>` tags for the Sora clips (autoplay, muted, loop or single-play)
- CSS scroll-snap + Intersection Observer for the scroll reveal effects
- No build step — just static files

### File Structure
```
birthday-card/
├── index.html
├── style.css
├── script.js
├── Photos/              ← source photos (already here)
├── videos/              ← generated Sora clips (Phase 1 output)
│   ├── river.mp4
│   ├── nature.mp4
│   ├── goat.mp4
│   ├── family.mp4
│   └── wedding.mp4
└── assets/
    └── (fonts, icons if needed)
```

### Key Sections / Scroll Chapters
1. **Hero** — full-screen opening video (river or nature clip), "Happy Birthday, Dad" text overlay
2. **The Man, The Myth** — solo portraits (Dad-1, Dad-2) with captions
3. **The Legend of the Goat** — goat-horns selfie / video, funny caption
4. **With the Ones He Loves** — Jess, Carlos, Mom, grandkids, Grandpa photos
5. **The Wedding** — wedding arch photos and video clip
6. **The Crew** — Men-1 group shot
7. **Final Message** — birthday message, confetti burst

---

## Phase 3: Polish + Deploy

- Tune video timing and transitions
- Test on mobile (Dad likely opens on phone)
- Push to GitHub, enable GitHub Pages on `main` branch
- Send Dad the link: `https://carlosnoyes.github.io/birthday-card`

---

## API Keys & Setup Required

### 1. OpenAI API Key (for Sora)

You need an OpenAI API key with **Sora access**. As of early 2026, this requires:
- An OpenAI account at platform.openai.com
- **ChatGPT Plus or Pro subscription** ($20–$200/month) — Sora is currently gated to subscribers
- Generate an API key at: https://platform.openai.com/api-keys
- Set it as an environment variable: `OPENAI_API_KEY=sk-...`

> **Fallback:** If Sora API access is waitlisted, Runway ML and Luma Dream Machine both have mature image-to-video APIs with instant access. Let me know and we can swap.

### 2. MCP Servers to Install

We'll use two MCP servers:

#### A. `sora-2-mcp` — Sora video generation
Lets Claude Code call Sora directly to generate, check status, and save video clips.

```json
{
  "mcpServers": {
    "sora": {
      "command": "npx",
      "args": ["-y", "sora-2-mcp-server"],
      "env": {
        "OPENAI_API_KEY": "YOUR_OPENAI_API_KEY_HERE"
      }
    }
  }
}
```

#### B. `@modelcontextprotocol/server-filesystem` — File access
Lets Claude Code read/write local files (save generated videos to `videos/` folder, etc.).

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "C:/Users/carlo/GithubProjects/birthday-card"
      ]
    }
  }
}
```

Both are configured in `.mcp.json` in this repo (see that file).

---

## MCP Setup Instructions

1. **Get your OpenAI API key** (see above)
2. **Edit `.mcp.json`** in this repo — replace `YOUR_OPENAI_API_KEY_HERE` with your key
3. **Reload Claude Code** — MCPs are picked up automatically on restart
4. That's it — no manual `npm install` needed (npx handles it)

---

## Effort Estimate

| Phase | What | Effort |
|---|---|---|
| Phase 1 | Generate 5 Sora video clips | 1–2 hours (mostly waiting on API) |
| Phase 2 | Build HTML card | 2–3 hours |
| Phase 3 | Polish + deploy | 30 min |

**Total: ~4–5 hours of active work**, producing something genuinely special.

---

## Open Questions / Decisions

- [ ] Do you want to add **background music**? (Could use a meaningful song or generate one with Suno/Udio)
- [ ] Do you want **family members to contribute messages**? (Could add a "From Jess" / "From Carlos" section)
- [ ] Portrait (phone) or landscape (widescreen) layout preference?
- [ ] Any inside jokes or specific memories that should have their own section?
