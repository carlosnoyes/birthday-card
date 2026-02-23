/* ============================================================
   Birthday Card — script.js
   ============================================================ */

// ── Intersection Observer: reveal chapters ──────────────────
const chapters = document.querySelectorAll('.chapter');
const navDots  = document.querySelectorAll('.nav-dot');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Sync nav dot
      const idx = [...chapters].indexOf(entry.target);
      navDots.forEach(d => d.classList.remove('active'));
      if (navDots[idx]) navDots[idx].classList.add('active');
    }
  });
}, { threshold: 0.35 });

chapters.forEach(ch => observer.observe(ch));

// ── Progress bar ────────────────────────────────────────────
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
});

// ── Nav dots click ───────────────────────────────────────────
navDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    chapters[i]?.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── Flip cards ───────────────────────────────────────────────
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// ── Scroll hint click ────────────────────────────────────────
document.querySelector('.hero-scroll-hint')?.addEventListener('click', () => {
  chapters[0]?.scrollIntoView({ behavior: 'smooth' });
});

// ── Video fallback: if src missing, hide video, show img ─────
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('error', () => {
    video.style.display = 'none';
    const fallback = video.parentElement.querySelector('.video-fallback, #hero-fallback');
    if (fallback) fallback.style.display = 'block';
  });

  // Also check if video loads successfully
  video.addEventListener('canplay', () => {
    const fallback = video.parentElement.querySelector('.video-fallback, #hero-fallback');
    if (fallback) fallback.style.display = 'none';
  });
});

// ── Confetti ─────────────────────────────────────────────────
const canvas = document.getElementById('confetti-canvas');
const ctx    = canvas.getContext('2d');
let confettiPieces = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function randomBetween(a, b) { return a + Math.random() * (b - a); }

const CONFETTI_COLORS = [
  '#c9a84c', '#f0d080', '#ffffff', '#ffb347',
  '#ff6b6b', '#a8edea', '#fed6e3', '#ffeaa7'
];

function launchConfetti() {
  const count = 180;
  confettiPieces = [];
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x:     randomBetween(0, canvas.width),
      y:     randomBetween(-100, -10),
      w:     randomBetween(8, 16),
      h:     randomBetween(4, 8),
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      vx:    randomBetween(-3, 3),
      vy:    randomBetween(3, 8),
      angle: randomBetween(0, Math.PI * 2),
      spin:  randomBetween(-0.15, 0.15),
      opacity: 1,
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    animateConfetti();
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    p.x     += p.vx;
    p.y     += p.vy;
    p.angle += p.spin;
    if (p.y > canvas.height + 20) {
      p.opacity = Math.max(0, p.opacity - 0.05);
    }
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });

  // Keep going while any piece is visible
  if (confettiPieces.some(p => p.opacity > 0)) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

document.getElementById('confetti-btn')?.addEventListener('click', launchConfetti);

// ── Auto-launch confetti when finale section becomes visible ─
const finaleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(launchConfetti, 1500);
      finaleObserver.disconnect();
    }
  });
}, { threshold: 0.6 });

const finale = document.getElementById('finale');
if (finale) finaleObserver.observe(finale);
