const frameA = document.getElementById("frameA");
const frameB = document.getElementById("frameB");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const audioEl = document.getElementById("song");
const startOverlay = document.getElementById("startOverlay");

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
let hasStarted = false;
const preloadedFrames = new Set();

function durationForIndex(index) {
  return index % 2 === 0 ? ORIGINAL_MS : FANTASY_MS;
}

function clearAdvanceTimer() {
  clearTimeout(advanceTimer);
}

function scheduleAdvance() {
  if (!hasStarted) {
    return;
  }

  clearAdvanceTimer();
  advanceTimer = setTimeout(() => {
    goNext();
  }, durationForIndex(current));

  preloadNearbyFrames(current);
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
  if (!hasStarted) {
    return;
  }

  clearAdvanceTimer();
  showIndex(current + 1);
}

function goPrev() {
  if (!hasStarted) {
    return;
  }

  clearAdvanceTimer();
  showIndex(current - 1);
}

async function startAudio() {
  try {
    audioEl.muted = false;
    await audioEl.play();
  } catch {
    // If this fails, user can tap once more and audio can be retried.
  }
}

function preloadFrameByIndex(index) {
  const normalized = (index + FRAME_COUNT) % FRAME_COUNT;
  const src = frames[normalized];

  if (preloadedFrames.has(src)) {
    return;
  }

  preloadedFrames.add(src);
  const img = new Image();
  img.src = src;
}

function preloadNearbyFrames(index) {
  preloadFrameByIndex(index + 1);
  preloadFrameByIndex(index + 2);
}

function warmFirstFrames() {
  for (let i = 0; i < Math.min(3, FRAME_COUNT); i += 1) {
    preloadFrameByIndex(i);
  }
}

function startExperience() {
  if (hasStarted) {
    return;
  }

  hasStarted = true;
  startOverlay.classList.add("hidden");
  prevBtn.disabled = false;
  nextBtn.disabled = false;

  startAudio();
  scheduleAdvance();
}

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

window.addEventListener("keydown", (event) => {
  if (!hasStarted) {
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goNext();
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goPrev();
  }
});

startOverlay.addEventListener("click", startExperience);
startOverlay.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    startExperience();
  }
});

prevBtn.disabled = true;
nextBtn.disabled = true;
activeEl.src = frames[current];
activeEl.classList.add("active");
warmFirstFrames();
