# PLAN_2: "The Legend of Dad" — A Celtic Birthday Chronicle

---

## The Vision

Dad doesn't just live a normal life. He meditates on rocks holding feathers. He wears demon horns in bathroom mirrors. He stands under wedding arches like a king at his coronation. He assembles with his brothers like a fellowship before a great quest.

He is, whether he knows it or not, living a fantasy adventure.

This birthday card helps him see it.

---

## The Experience

Dad opens a link. A folk song begins to play — written about *him*, about *his life* — warm, a cappella, slightly epic.

Then the card begins.

Each page shows a real family photo. He recognizes it. He's there. Then — slowly, magically — the image *morphs* into its Celtic fantasy twin. The same moment, the same faces, but the world transforms around them. The bathroom becomes a castle. The river becomes an ancient sacred ford. The wedding arch becomes a coronation ceremony. His brothers become a legendary fellowship in a forest clearing.

Then the next page. And the next. The song plays underneath the whole time.

By the end, he understands: this is how we see him. This is how his life actually looks, from the outside.

---

## The Mechanic: Photo → Celtic Morph

Each page has **one transition**:

1. The real photo fades/dissolves in first — he sees himself, recognizes the moment
2. A slow cross-dissolve (3–5 seconds) morphs it into the Celtic fantasy version
3. The Celtic version holds for a moment, then the page advances (or he taps to continue)

This is pure CSS/JS — no video needed. Just two images, a crossfade transition, triggered either on a timer or on scroll/tap.

---

## The Song

A short a cappella folk ballad (~90 seconds), written specifically about Dad's life. Warm, slightly Celtic in feel — layered voices, no instruments.

**Title:** *"The Man Who Walks Between Worlds"* (or similar)

**Themes to weave in:**
- The river / his love of nature and stillness
- The spiritual side (beads, feather, meditation)
- The family he built — Carlos, Jess, the babies, Grandpa
- The goat horns / demon horns moment (played for comedy, then turned into something real: *"even in the ordinary he finds the mythic"*)
- His brothers — the fellowship
- The wedding — his role, his presence
- The core message: he has always been living the adventure, he just doesn't see it yet

**Carlos to provide:** 2–3 specific inside jokes, memories, or phrases that only the family would know. These get woven into the lyrics to make it undeniably, specifically about *him*.

**Generation plan:** Write lyrics here → generate audio with Suno (best quality a cappella) or Gemini → embed as `audio/song.mp3` in the card, autoplays muted, unmutes with one tap.

### Draft Lyrics: "Michael, the Maker of Grace"

**Verse 1**  
By morning light he walks where the tall trees breathe,  
Hands that fixed the broken now shape what others dream.  
Mechanic's heart, an artist's eye, steady as the rain,  
Michael Noyes, you turn worn metal into song again.

**Chorus**  
Oh Michael, maker of grace,  
Style in your stride, wild light in your face.  
From workshop sparks to tango skies,  
You teach us how a good life flies.  
Four children grown, eight grandkids near,  
Your love made room for all of us here.

**Verse 2**  
On wooden flutes and clay ocarinas, evening learns your tune,  
Soft as open fields at dusk, bright as winter moon.  
Argentine tango, contact improv, you move like river wind,  
A wise and patient soul who lets each moment in.

**Chorus**  
Oh Michael, maker of grace,  
Style in your stride, wild light in your face.  
From workshop sparks to tango skies,  
You teach us how a good life flies.  
Four children grown, eight grandkids near,  
Your love made room for all of us here.

**Bridge**  
Creative hands, a generous heart,  
Helpful when the hard days start.  
Open-minded, thoughtful, true,  
The world gets kinder around you.

**Final Chorus**  
Oh Michael, maker of grace,  
Rooted in earth, still dancing through space.  
Grandfather, father, friend, and guide,  
Nature and music at your side.  
Four children strong, eight voices bright,  
You are the hearth and the dancing light.
---

## The Pages

| # | Real Photo | Celtic Version | Caption / Story Beat |
|---|---|---|---|
| **Cover** | — | `illustrations/cover.png` (oil painting of Dad at river) | *"The Legend of Dad. A Birthday Chronicle. Illuminated by his children, in the year of our Lord 2026."* |
| **1** | `Photos/Dad-1.jpg` | `illustrations/dad1-celtic.png` | *"He always found the river. Long before anyone was watching, he was already out there — standing at the edge of something vast, perfectly at peace."* |
| **2** | `Photos/Dad-2.jpg` | `illustrations/dad2-celtic.png` | *"He needed no armor. Only his beads, a rock, and an inexplicable feather. The druids would have recognized him immediately."* |
| **3** | `Photos/Dad-3.jpg` | `illustrations/goat-celtic.png` | *"And then there was this. The horns. The mirror. The grin of a man who has absolutely nothing to prove — and knows it. G.O.A.T. status: ancient and confirmed."* |
| **4** | `Photos/Men-1.jpg` | `illustrations/men-celtic.png` | *"The Fellowship assembled. Six men, one bloodline, zero bad vibes. Grandpa in the center had already seen more than all of them combined — and was still the most dangerous one in the room."* |
| **5** | `Photos/Carlos-Dad.jpg` | `illustrations/carlos-dad-celtic.png` | *"The son had grown. On that day, standing under the arch, the father allowed himself a moment of quiet, devastating pride. He didn't say much. He didn't need to."* |
| **6** | `Photos/Jess-Dad.jpg` | `illustrations/jess-dad-celtic.png` | *"She came into the family and fit like she'd always been there. He saw it immediately — the fire in her. Good. His son was going to need it."* |
| **7** | `Photos/Carlos-Jess-Mom-Dad.jpg` | `illustrations/wedding-celtic.png` | *"The coronation. Everyone cried. Dad probably didn't cry. (He cried.)"* |
| **8** | `Photos/Jess-Carlos-Dad-Babies.jpg` | `illustrations/babies-celtic.png` | *"The next generation arrived. Small. Loud. Demanding. He put on a hard hat. He had never been more ready for anything in his life."* |
| **9** | `Photos/Carlos-Jess-Gramp-Dad.jpg` | `illustrations/gramp-celtic.png` | *"Three generations. Same jaw. Same laugh. Same inability to ask for directions. The lineage is strong."* |
| **10** | `Photos/Family.jpg` | `illustrations/family-celtic.png` | *"And here — the full court. Every person in this photo loves you. That is not ordinary. That is the adventure."* |
| **Finale** | — | — | Full-screen message. Confetti. Song swells. *"Happy Birthday, Dad. You've been living the legend all along."* |

---

## Technical Build

### Stack
- Vanilla HTML / CSS / JS — no framework
- GitHub Pages — free hosting
- No build step

### Page Transition Mechanic
Each "page" is a full-viewport section. On enter:
1. Real photo fades in (0.5s)
2. Pause 1.5s — let him see it
3. Celtic version cross-dissolves over the top (3s ease)
4. Celtic holds — caption animates in underneath
5. Scroll or tap advances to next page

```css
/* Two absolutely-positioned images stacked, celtic fades in on top */
.celtic { opacity: 0; transition: opacity 3s ease; }
.celtic.reveal { opacity: 1; }
```

### Audio
- Autoplay muted on load (required by browsers)
- Floating 🎵 button bottom-right: one tap unmutes
- Song loops softly until finale, then volume nudges up

### File Structure
```
birthday-card/
├── index.html
├── style.css
├── script.js
├── Photos/               ← 10 original photos
├── illustrations/        ← 10 Celtic twins + cover oil painting
└── audio/
    └── song.mp3
```

---

## Build Order

1. **Song lyrics** — write them (needs Carlos's inside jokes)
2. **Song audio** — generate with Suno or Gemini
3. **HTML/CSS/JS** — build the storybook with crossfade mechanic
4. **Test on mobile** — Dad will open this on his phone
5. **Push to GitHub Pages** — send him the link

---

## Open Questions

- [ ] Carlos: what are 2–3 inside jokes / specific memories to put in the song?
- [ ] Song tool: Suno (best quality) vs Gemini audio?
- [ ] Transition trigger: auto-timer per page, or tap/scroll to advance?
- [ ] Finale: just text + confetti, or add a "message from Carlos" section?

