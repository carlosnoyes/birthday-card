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
let audioUnlocked = false;
const preloadedFrames = new Set();

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
  unlockAudio();
  clearAdvanceTimer();
  showIndex(current + 1);
}

function goPrev() {
  unlockAudio();
  clearAdvanceTimer();
  showIndex(current - 1);
}

async function primeAudioMuted() {
  try {
    audioEl.muted = true;
    await audioEl.play();
  } catch {
    // Some browsers still block autoplay even when muted.
  }
}

async function unlockAudio() {
  if (audioUnlocked) {
    return;
  }
  try {
    audioEl.muted = false;
    await audioEl.play();
    audioUnlocked = true;
    removeUnlockListeners();
  } catch {
    // Keep listeners active until a gesture succeeds.
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

function onFirstGesture() {
  unlockAudio();
}

function removeUnlockListeners() {
  document.removeEventListener("pointerdown", onFirstGesture);
  document.removeEventListener("touchstart", onFirstGesture);
  document.removeEventListener("click", onFirstGesture);
  document.removeEventListener("keydown", onFirstGesture);
}

function addUnlockListeners() {
  document.addEventListener("pointerdown", onFirstGesture);
  document.addEventListener("touchstart", onFirstGesture, { passive: true });
  document.addEventListener("click", onFirstGesture);
  document.addEventListener("keydown", onFirstGesture);
}

function warmFirstFrames() {
  for (let i = 0; i < Math.min(3, FRAME_COUNT); i += 1) {
    preloadFrameByIndex(i);
  }
}

function preloadFrames() {
  preloadNearbyFrames(current);
}

function preloadCurrent() {
  const src = frames[current];
  if (!preloadedFrames.has(src)) {
    preloadedFrames.add(src);
    const img = new Image();
    img.src = src;
  }
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

addUnlockListeners();

activeEl.src = frames[current];
activeEl.classList.add("active");
preloadCurrent();
warmFirstFrames();
preloadFrames();
scheduleAdvance();
primeAudioMuted();
unlockAudio();
