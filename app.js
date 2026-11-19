/**
 * EC/10 – Epic Captures 10 | Portfolio Application Logic
 * Google Design Inspired Architecture
 * Gallery, Lightbox, Dynamic Filters, Dark/Light Mode, Mobile Nav, Form
 */

/* ══════════════════════════════════
   PHOTO ARCHIVE DATA (Placeholders for user frames)
══════════════════════════════════ */
const PHOTOS = [
  {
    id: 1, cat: 'portraits', span: 2,
    title: 'Golden Hour Reverie', loc: 'Pushkar, Rajasthan',
    src: '',
    cam: 'Sony A7R V', lens: '50mm f/1.2 GM', set: '1/800s · f/1.4', iso: 'ISO 100',
    description: 'Natural ambient lighting highlighting warmth, contemplation, and fleeting stillness in Rajasthan.'
  },
  {
    id: 2, cat: 'street', span: 1,
    title: 'Midnight Alley in Shinjuku', loc: 'Tokyo, Japan',
    src: '',
    cam: 'Leica Q3', lens: 'Summilux 28mm f/1.7', set: '1/125s · f/1.7', iso: 'ISO 1600',
    description: 'Rain-soaked asphalt, lanterns, and Tokyo commuter rhythms captured in candid street solitude.'
  },
  {
    id: 3, cat: 'landscape', span: 2,
    title: 'Spiti Valley Solitude', loc: 'Himachal Pradesh, India',
    src: '',
    cam: 'Sony A7R V', lens: '16-35mm f/2.8 GM', set: '1/500s · f/8', iso: 'ISO 200',
    description: 'High-altitude riverbed geometry carved through ancient Himalayan barren rock formations.'
  },
  {
    id: 4, cat: 'architecture', span: 1,
    title: 'Geometric Symmetry', loc: 'Valencia, Spain',
    src: '',
    cam: 'Sony A7R V', lens: '24-70mm f/2.8 GM II', set: '1/400s · f/5.6', iso: 'ISO 100',
    description: 'Futuristic curves, rhythmic shadows, and minimalist whitewashed Mediterranean modernism.'
  },
  {
    id: 5, cat: 'monochrome', span: 2,
    title: "The Elder's Gaze", loc: 'Varanasi, Uttar Pradesh',
    src: '',
    cam: 'Leica M11-P', lens: 'Noctilux 50mm f/0.95', set: '1/1000s · f/1.2', iso: 'ISO 400',
    description: 'High dynamic range black-and-white portrait capturing decades of memory and quiet dignity.'
  },
  {
    id: 6, cat: 'street', span: 1,
    title: 'Neon Shadows', loc: 'Hong Kong',
    src: '',
    cam: 'Sony A7R V', lens: '35mm f/1.4 GM', set: '1/160s · f/1.8', iso: 'ISO 1250',
    description: 'Cinematic color contrast between warm sodium vapor street lamps and cool cyan neon signage.'
  },
  {
    id: 7, cat: 'monochrome', span: 1,
    title: 'Silhouette on the Dunes', loc: 'Jaisalmer, Rajasthan',
    src: '',
    cam: 'Leica M11-P', lens: '35mm f/1.4 Summilux', set: '1/2000s · f/4', iso: 'ISO 100',
    description: 'Graphic interplay between harsh desert sun, wind-sculpted sand ridges, and lone human scale.'
  },
  {
    id: 8, cat: 'landscape', span: 2,
    title: 'Ethereal Morning Mist', loc: 'Munnar, Kerala',
    src: '',
    cam: 'DJI Aerial', lens: 'Hasselblad 24mm eq.', set: '1/640s · f/2.8', iso: 'ISO 100',
    description: 'Rolling tea estate gradients wrapped in cascading monsoon dawn mist in Western Ghats.'
  },
  {
    id: 9, cat: 'architecture', span: 1,
    title: 'Shadows on Raw Concrete', loc: 'Berlin, Germany',
    src: '',
    cam: 'Sony A7R V', lens: '24-70mm f/2.8 GM II', set: '1/320s · f/7.1', iso: 'ISO 100',
    description: 'Brutalist textures, razor-sharp architectural lines, and pure daylight perspective.'
  },
  {
    id: 10, cat: 'portraits', span: 2,
    title: 'Editorial Gaze in Silk', loc: 'Studio 10, Mumbai',
    src: '',
    cam: 'Sony A7R V', lens: '85mm f/1.4 GM', set: '1/200s · f/2', iso: 'ISO 100',
    description: 'Sculptural lighting, textural textiles, and evocative cinematic expression.'
  },
  {
    id: 11, cat: 'street', span: 1,
    title: 'Rainy City Crossing', loc: 'Seoul, South Korea',
    src: '',
    cam: 'Leica Q3', lens: 'Summilux 28mm f/1.7', set: '1/200s · f/2', iso: 'ISO 800',
    description: 'Umbrellas, neon reflections on pedestrian crosswalks, and electric metropolitan pulse.'
  },
  {
    id: 12, cat: 'landscape', span: 1,
    title: 'Alpenglow on Mount Rainier', loc: 'Washington, USA',
    src: '',
    cam: 'Sony A7R V', lens: '70-200mm f/2.8 GM II', set: '1/80s · f/11', iso: 'ISO 100',
    description: 'Soft pastel sunset light touching snowbound glacial peaks above alpine fir forest.'
  }
];

/* ══════════════════════════════════
   STATE
══════════════════════════════════ */
let filtered = [...PHOTOS];
let lbIndex = 0;
let exifOpen = true;

/* ══════════════════════════════════
   GALLERY RENDER (Google Design Card Style)
══════════════════════════════════ */
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  filtered.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = `m3-card group relative overflow-hidden rounded-3xl bg-white dark:bg-[#1b1c20] border border-neutral-200/90 dark:border-neutral-800 cursor-pointer flex flex-col justify-between transition-all duration-300`;

    // Dynamic aspect ratio based on photo span for Google editorial rhythm
    const aspectClass = photo.span === 2 ? 'aspect-[4/5] sm:aspect-[3/4]' : 'aspect-square sm:aspect-[4/3]';

    const mediaHtml = photo.src ? `
      <img src="${photo.src}" alt="${photo.title}" loading="lazy"
           class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105">
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    ` : `
      <div class="w-full h-full flex flex-col items-center justify-center text-neutral-300 dark:text-neutral-600 gap-2.5 p-6 bg-neutral-100/90 dark:bg-neutral-800/60 border-b border-neutral-100 dark:border-neutral-800/80">
        <div class="w-12 h-12 rounded-2xl bg-neutral-200/80 dark:bg-neutral-700/60 flex items-center justify-center text-neutral-400 dark:text-neutral-500">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
          </svg>
        </div>
        <span class="text-[10px] font-mono tracking-widest uppercase text-neutral-400 dark:text-neutral-500 font-semibold">Frame · 0${photo.id}</span>
      </div>
    `;

    card.innerHTML = `
      <div class="relative w-full ${aspectClass} overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        ${mediaHtml}
        <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-white/20 dark:border-neutral-700/50 flex items-center justify-center text-neutral-800 dark:text-neutral-200 shadow-md transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 3 21 3 21 9"></polyline>
            <polyline points="9 21 3 21 3 15"></polyline>
            <line x1="21" y1="3" x2="14" y2="10"></line>
            <line x1="3" y1="21" x2="10" y2="14"></line>
          </svg>
        </div>
      </div>
      <div class="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="inline-block w-2 h-2 rounded-full google-dot-blue"></span>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">${photo.cat}</span>
            <span class="text-neutral-300 dark:text-neutral-700">·</span>
            <span class="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">${photo.cam}</span>
          </div>
          <h3 class="text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            ${photo.title}
          </h3>
          <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 flex items-center gap-1.5 font-medium">
            <svg class="w-3.5 h-3.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
            ${photo.loc}
          </p>
        </div>
        <div class="pt-4 mt-3 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>${photo.lens}</span>
          <span class="text-blue-600 dark:text-blue-400 font-sans font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Frame <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════
   FILTER INTERACTION
══════════════════════════════════ */
document.getElementById('filter-bar')?.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-pill');
  if (!btn) return;

  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cat = btn.dataset.cat;
  filtered = cat === 'all' ? [...PHOTOS] : PHOTOS.filter(p => p.cat === cat);
  renderGallery();
});

/* ══════════════════════════════════
   LIGHTBOX (Google Design Modal)
══════════════════════════════════ */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbSpin = document.getElementById('lb-spinner');
const lbTitle = document.getElementById('lb-title');
const lbLoc = document.getElementById('lb-loc');
const lbCat = document.getElementById('lb-cat');
const lbCount = document.getElementById('lb-count');
const lbDesc = document.getElementById('lb-desc');
const lbExif = document.getElementById('lb-exif');
const exCam = document.getElementById('ex-cam');
const exLens = document.getElementById('ex-lens');
const exSet = document.getElementById('ex-set');
const exIso = document.getElementById('ex-iso');

function openLightbox(idx) {
  lbIndex = idx;
  updateLightbox();
  lb.classList.remove('hidden');
  document.body.classList.add('lb-open');
  requestAnimationFrame(() => lb.classList.remove('opacity-0'));
}

function closeLightbox() {
  lb.classList.add('opacity-0');
  document.body.classList.remove('lb-open');
  setTimeout(() => lb.classList.add('hidden'), 250);
}

function updateLightbox() {
  const p = filtered[lbIndex];
  if (!p) return;

    if (!p.src) {
      lbSpin.classList.add('hidden');
      lbImg.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600' fill='%231b1c20'%3E%3Crect width='800' height='600' fill='%231b1c20'/%3E%3Crect x='50' y='50' width='700' height='500' rx='20' fill='%23282a30' stroke='%233b3e45' stroke-width='2' stroke-dasharray='8 8'/%3E%3Ctext x='400' y='290' font-family='sans-serif' font-size='22' font-weight='600' fill='%239aa0a6' text-anchor='middle'%3EPHOTO PLACEHOLDER%3C/text%3E%3Ctext x='400' y='325' font-family='monospace' font-size='14' fill='%235f6368' text-anchor='middle'%3EUpload your frame here%3C/text%3E%3C/svg%3E";
      lbImg.alt = p.title;
      lbImg.classList.remove('opacity-0');
  } else {
    lbSpin.classList.remove('hidden');
    lbImg.classList.add('opacity-0');

    const tmp = new Image();
    tmp.src = p.src;
    tmp.onload = () => {
      lbImg.src = p.src;
      lbImg.alt = p.title;
      lbSpin.classList.add('hidden');
      lbImg.classList.remove('opacity-0');
    };
  }

  lbTitle.textContent = p.title;
  lbLoc.textContent = p.loc;
  lbCat.textContent = p.cat.toUpperCase();
  lbCount.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;
  if (lbDesc) lbDesc.textContent = p.description || '';
  exCam.textContent = p.cam;
  exLens.textContent = p.lens;
  exSet.textContent = p.set;
  exIso.textContent = p.iso;
}

document.getElementById('lb-close')?.addEventListener('click', closeLightbox);
document.getElementById('lb-prev')?.addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + filtered.length) % filtered.length;
  updateLightbox();
});
document.getElementById('lb-next')?.addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % filtered.length;
  updateLightbox();
});
document.getElementById('lb-exif-toggle')?.addEventListener('click', () => {
  exifOpen = !exifOpen;
  lbExif.style.display = exifOpen ? '' : 'none';
});

lb?.addEventListener('click', (e) => {
  if (e.target === lb || e.target.classList.contains('lightbox-backdrop-target')) closeLightbox();
});

window.addEventListener('keydown', (e) => {
  if (!lb || lb.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % filtered.length; updateLightbox(); }
  if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + filtered.length) % filtered.length; updateLightbox(); }
});

/* ══════════════════════════════════
   THEME TOGGLE (Light / Dark Mode)
══════════════════════════════════ */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme');

  // Default to Google Design clean light mode unless dark mode explicitly saved
  if (storedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtn?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
  });

  updateThemeIcon();
}

function updateThemeIcon() {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const isDark = document.documentElement.classList.contains('dark');
  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

/* ══════════════════════════════════
   MOBILE NAVIGATION
══════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const drawer = document.getElementById('mobile-drawer');

hamburger?.addEventListener('click', () => {
  const open = !drawer.classList.contains('hidden');
  drawer.classList.toggle('hidden', open);
  hamburger.setAttribute('aria-expanded', String(!open));

  // swap icon
  hamburger.innerHTML = open
    ? '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>'
    : '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
});

// Close drawer on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    drawer.classList.add('hidden');
    hamburger?.setAttribute('aria-expanded', 'false');
    if (hamburger) {
      hamburger.innerHTML = '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>';
    }
  });
});

/* ══════════════════════════════════
   BOOKING FORM
══════════════════════════════════ */
document.getElementById('booking-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const success = document.getElementById('form-success');
  if (success) {
    success.classList.remove('hidden');
    e.target.reset();
    setTimeout(() => success.classList.add('hidden'), 7000);
  }
});

/* ══════════════════════════════════
   INITIALIZATION
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderGallery();
});
