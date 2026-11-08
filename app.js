/**
 * EC/10 – Epic Captures 10 | Portfolio Application Logic
 * Gallery, Lightbox, Filters, Mobile Nav, Form
 */

/* ══════════════════════════════════
   DATA
══════════════════════════════════ */
const PHOTOS = [
  {
    id: 1, cat: 'portraits', span: 2,
    title: 'Golden Hour Reverie', loc: 'Pushkar, Rajasthan',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    cam: 'Sony A7R V', lens: '50mm f/1.2 GM', set: '1/800s · f/1.4', iso: 'ISO 100'
  },
  {
    id: 2, cat: 'street', span: 1,
    title: 'Midnight Alley in Shinjuku', loc: 'Tokyo, Japan',
    src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85',
    cam: 'Leica Q3', lens: 'Summilux 28mm f/1.7', set: '1/125s · f/1.7', iso: 'ISO 1600'
  },
  {
    id: 3, cat: 'landscape', span: 2,
    title: 'Spiti Valley Solitude', loc: 'Himachal Pradesh, India',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    cam: 'Sony A7R V', lens: '16-35mm f/2.8 GM', set: '1/500s · f/8', iso: 'ISO 200'
  },
  {
    id: 4, cat: 'architecture', span: 1,
    title: 'Geometric Geometry', loc: 'Valencia, Spain',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    cam: 'Sony A7R V', lens: '24-70mm f/2.8 GM II', set: '1/400s · f/5.6', iso: 'ISO 100'
  },
  {
    id: 5, cat: 'monochrome', span: 2,
    title: "The Elder's Gaze", loc: 'Varanasi, Uttar Pradesh',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85',
    cam: 'Leica M11-P', lens: 'Noctilux 50mm f/0.95', set: '1/1000s · f/1.2', iso: 'ISO 400'
  },
  {
    id: 6, cat: 'street', span: 1,
    title: 'Neon Shadows', loc: 'Hong Kong',
    src: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85',
    cam: 'Sony A7R V', lens: '35mm f/1.4 GM', set: '1/160s · f/1.8', iso: 'ISO 1250'
  },
  {
    id: 7, cat: 'monochrome', span: 1,
    title: 'Silhouette in the Dunes', loc: 'Jaisalmer, Rajasthan',
    src: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=85',
    cam: 'Leica M11-P', lens: '35mm f/1.4 Summilux', set: '1/2000s · f/4', iso: 'ISO 100'
  },
  {
    id: 8, cat: 'landscape', span: 2,
    title: 'Ethereal Morning Mist', loc: 'Munnar, Kerala',
    src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85',
    cam: 'DJI Mavic 3 Pro', lens: 'Hasselblad 24mm eq.', set: '1/640s · f/2.8', iso: 'ISO 100'
  },
  {
    id: 9, cat: 'architecture', span: 1,
    title: 'Shadows on Concrete', loc: 'Berlin, Germany',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    cam: 'Sony A7R V', lens: '24-70mm f/2.8 GM II', set: '1/320s · f/7.1', iso: 'ISO 100'
  },
  {
    id: 10, cat: 'portraits', span: 2,
    title: 'Editorial Gaze in Silk', loc: 'Studio 10, Mumbai',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
    cam: 'Sony A7R V', lens: '85mm f/1.4 GM', set: '1/200s · f/2', iso: 'ISO 100'
  },
  {
    id: 11, cat: 'street', span: 1,
    title: 'Rainy Crossing', loc: 'Seoul, South Korea',
    src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85',
    cam: 'Leica Q3', lens: 'Summilux 28mm f/1.7', set: '1/200s · f/2', iso: 'ISO 800'
  },
  {
    id: 12, cat: 'landscape', span: 1,
    title: 'Alpenglow on Mount Rainier', loc: 'Washington, USA',
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
    cam: 'Sony A7R V', lens: '70-200mm f/2.8 GM II', set: '1/80s · f/11', iso: 'ISO 100'
  }
];

/* ══════════════════════════════════
   STATE
══════════════════════════════════ */
let filtered   = [...PHOTOS];
let lbIndex    = 0;
let exifOpen   = true;

/* ══════════════════════════════════
   GALLERY RENDER
══════════════════════════════════ */
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = '';

  filtered.forEach((photo, idx) => {
    const card = document.createElement('div');
    card.className = `relative group overflow-hidden rounded-2xl bg-ec-surface border border-ec-border cursor-pointer transition-all duration-500 hover:border-ec-gold/50 row-span-${photo.span}`;

    card.innerHTML = `
      <img src="${photo.src}" alt="${photo.title}" loading="lazy"
           class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div class="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span class="text-[9px] uppercase tracking-widest text-ec-gold font-mono">${photo.cat}</span>
        <h3 class="text-sm font-display font-medium text-white mt-0.5">${photo.title}</h3>
        <p class="text-[10px] text-zinc-400 mt-0.5 font-mono">${photo.loc}</p>
      </div>
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <div class="w-7 h-7 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════
   FILTER
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
   LIGHTBOX
══════════════════════════════════ */
const lb      = document.getElementById('lightbox');
const lbImg   = document.getElementById('lb-img');
const lbSpin  = document.getElementById('lb-spinner');
const lbTitle = document.getElementById('lb-title');
const lbLoc   = document.getElementById('lb-loc');
const lbCat   = document.getElementById('lb-cat');
const lbCount = document.getElementById('lb-count');
const lbExif  = document.getElementById('lb-exif');
const exCam   = document.getElementById('ex-cam');
const exLens  = document.getElementById('ex-lens');
const exSet   = document.getElementById('ex-set');
const exIso   = document.getElementById('ex-iso');

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
  setTimeout(() => lb.classList.add('hidden'), 300);
}

function updateLightbox() {
  const p = filtered[lbIndex];
  if (!p) return;

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

  lbTitle.textContent = p.title;
  lbLoc.textContent   = p.loc;
  lbCat.textContent   = p.cat.toUpperCase();
  lbCount.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(filtered.length).padStart(2, '0')}`;
  exCam.textContent   = p.cam;
  exLens.textContent  = p.lens;
  exSet.textContent   = p.set;
  exIso.textContent   = p.iso;
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
  if (e.target === lb) closeLightbox();
});

window.addEventListener('keydown', (e) => {
  if (!lb || lb.classList.contains('hidden')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowRight')  { lbIndex = (lbIndex + 1) % filtered.length; updateLightbox(); }
  if (e.key === 'ArrowLeft')   { lbIndex = (lbIndex - 1 + filtered.length) % filtered.length; updateLightbox(); }
});

/* ══════════════════════════════════
   MOBILE NAV (HAMBURGER)
══════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('mobile-drawer');

hamburger?.addEventListener('click', () => {
  const open = !drawer.classList.contains('hidden');
  drawer.classList.toggle('hidden', open);
  hamburger.setAttribute('aria-expanded', String(!open));
  // swap icon
  hamburger.innerHTML = open
    ? '<i data-lucide="menu" class="w-5 h-5 pointer-events-none"></i>'
    : '<i data-lucide="x" class="w-5 h-5 pointer-events-none"></i>';
  lucide.createIcons();
});

// Close drawer on mobile nav link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    drawer.classList.add('hidden');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<i data-lucide="menu" class="w-5 h-5 pointer-events-none"></i>';
    lucide.createIcons();
  });
});

/* ══════════════════════════════════
   CONTACT FORM (mock submit)
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
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
});
