const frameA = document.getElementById("frameA");
const frameB = document.getElementById("frameB");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const audioEl = document.getElementById("song");

const FRAME_COUNT = 20;
const CROSSFADE_MS = 1800;
const ORIGINAL_MS = 3000;
const FANTASY_MS = 7000;
const ASSET_BASE = "https://carlosnoyes.github.io/birthday-card";

const frames = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const n = i + 1;
  const ext = n % 2 === 1 ? "jpg" : "png";
  return `${ASSET_BASE}/slideshow/${n}.${ext}`;
});

let current = 0;
let activeEl = frameA;
let inactiveEl = frameB;
let advanceTimer = null;
let transitionToken = 0;

function durationForIndex(index) {
  return (index % 2 === 0) ? ORIGINAL_MS : FANTASY_MS;
}

function clearAdvanceTimer() {
  clearTimeout(advanceTimer);
}

function scheduleAdvance() {
  clearAdvanceTimer();
  advanceTimer = setTimeout(() => {
    goNext();
  }, durationForIndex(current));
}

function swapLayers() {
  const temp = activeEl;
  activeEl = inactiveEl;
  inactiveEl = temp;
}

function showIndex(nextIndex) {
  transitionToken += 1;
  const token = transitionToken;
  const normalized = (nextIndex + FRAME_COUNT) % FRAME_COUNT;
  const nextSrc = frames[normalized];

  const nextImage = new Image();
  nextImage.onload = () => {
    if (token !== transitionToken) {
      return;
    }
    inactiveEl.src = nextSrc;
    inactiveEl.classList.add("active");
    activeEl.classList.remove("active");

    setTimeout(() => {
      if (token !== transitionToken) {
        return;
      }
      swapLayers();
      current = normalized;
      scheduleAdvance();
    }, CROSSFADE_MS);
  };
  nextImage.src = nextSrc;
}

function goNext() {
  clearAdvanceTimer();
  showIndex(current + 1);
}

function goPrev() {
  clearAdvanceTimer();
  showIndex(current - 1);
}

async function tryAutoPlay() {
  try {
    audioEl.muted = false;
    await audioEl.play();
  } catch {
    // Browser policy may block autoplay until user interaction.
  }
}

function preloadFrames() {
  frames.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrev();
  }
});

// Retry autoplay after first user interaction if autoplay is blocked initially.
document.addEventListener("pointerdown", () => {
  if (audioEl.paused) {
    tryAutoPlay();
  }
}, { once: true });

activeEl.src = frames[current];
activeEl.classList.add("active");
preloadFrames();
scheduleAdvance();
tryAutoPlay();
