/**
 * EC/10 – Epic Captures 10 | Independent Filmmaker & Visual Creator
 * Gallery filtering, interactive lightbox, EXIF data viewer, mobile nav
 */

// Portfolio Photo Dataset with realistic EXIF and metadata
const photos = [
  {
    id: 1,
    title: "Golden Hour Reverie",
    category: "portraits",
    location: "Pushkar, Rajasthan",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    camera: "Sony Alpha A7R V",
    lens: "50mm f/1.2 GM",
    settings: "1/800s • f/1.4",
    iso: "ISO 100",
    span: "row-span-2"
  },
  {
    id: 2,
    title: "Midnight Alley in Shinjuku",
    category: "street",
    location: "Tokyo, Japan",
    src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85",
    camera: "Leica Q3",
    lens: "Summilux 28mm f/1.7",
    settings: "1/125s • f/1.7",
    iso: "ISO 1600",
    span: "row-span-1"
  },
  {
    id: 3,
    title: "Spiti Valley Solitude",
    category: "landscape",
    location: "Himachal Pradesh, India",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
    camera: "Sony Alpha A7R V",
    lens: "16-35mm f/2.8 GM",
    settings: "1/500s • f/8.0",
    iso: "ISO 200",
    span: "row-span-2"
  },
  {
    id: 4,
    title: "Geometric Geometry",
    category: "architecture",
    location: "Valencia, Spain",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85",
    camera: "Sony Alpha A7R V",
    lens: "24-70mm f/2.8 GM II",
    settings: "1/400s • f/5.6",
    iso: "ISO 100",
    span: "row-span-1"
  },
  {
    id: 5,
    title: "The Elder's Gaze",
    category: "monochrome",
    location: "Varanasi, Uttar Pradesh",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85",
    camera: "Leica M11-P",
    lens: "Noctilux-M 50mm f/0.95",
    settings: "1/1000s • f/1.2",
    iso: "ISO 400",
    span: "row-span-2"
  },
  {
    id: 6,
    title: "Neon Shadows",
    category: "street",
    location: "Hong Kong",
    src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85",
    camera: "Sony Alpha A7R V",
    lens: "35mm f/1.4 GM",
    settings: "1/160s • f/1.8",
    iso: "ISO 1250",
    span: "row-span-1"
  },
  {
    id: 7,
    title: "Silhouette in the Dunes",
    category: "monochrome",
    location: "Jaisalmer, Rajasthan",
    src: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=85",
    camera: "Leica M11-P",
    lens: "35mm f/1.4 Summilux",
    settings: "1/2000s • f/4.0",
    iso: "ISO 100",
    span: "row-span-1"
  },
  {
    id: 8,
    title: "Ethereal Morning Mist",
    category: "landscape",
    location: "Munnar, Kerala",
    src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85",
    camera: "DJI Mavic 3 Pro",
    lens: "Hasselblad 24mm eq.",
    settings: "1/640s • f/2.8",
    iso: "ISO 100",
    span: "row-span-2"
  },
  {
    id: 9,
    title: "Shadows on Concrete",
    category: "architecture",
    location: "Berlin, Germany",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
    camera: "Sony Alpha A7R V",
    lens: "24-70mm f/2.8 GM II",
    settings: "1/320s • f/7.1",
    iso: "ISO 100",
    span: "row-span-1"
  },
  {
    id: 10,
    title: "Editorial Gaze in Silk",
    category: "portraits",
    location: "Studio 10, Mumbai",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    camera: "Sony Alpha A7R V",
    lens: "85mm f/1.4 GM",
    settings: "1/200s • f/2.0",
    iso: "ISO 100",
    span: "row-span-2"
  },
  {
    id: 11,
    title: "Rainy Crossing",
    category: "street",
    location: "Seoul, South Korea",
    src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85",
    camera: "Leica Q3",
    lens: "Summilux 28mm f/1.7",
    settings: "1/200s • f/2.0",
    iso: "ISO 800",
    span: "row-span-1"
  },
  {
    id: 12,
    title: "Alpenglow on Mount Rainier",
    category: "landscape",
    location: "Washington, USA",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    camera: "Sony Alpha A7R V",
    lens: "70-200mm f/2.8 GM II",
    settings: "1/80s • f/11",
    iso: "ISO 100",
    span: "row-span-1"
  }
];

// State variables
let currentFilter = 'all';
let filteredPhotos = [...photos];
let activePhotoIndex = 0;
let isExifVisible = true;

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lb-image');
const lbSpinner = document.getElementById('lb-spinner');
const lbTitle = document.getElementById('lb-title');
const lbLocation = document.getElementById('lb-location');
const lbCategory = document.getElementById('lb-category');
const lbCounter = document.getElementById('lb-counter');
const lbCloseBtn = document.getElementById('lightbox-close');
const lbPrevBtn = document.getElementById('lightbox-prev');
const lbNextBtn = document.getElementById('lightbox-next');
const toggleExifBtn = document.getElementById('toggle-exif-btn');
const lbExifPanel = document.getElementById('lb-exif-panel');

// EXIF fields
const exifCamera = document.getElementById('exif-camera');
const exifLens = document.getElementById('exif-lens');
const exifSettings = document.getElementById('exif-settings');
const exifIso = document.getElementById('exif-iso');

// Render Gallery Cards
function renderGallery() {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';

  filteredPhotos.forEach((photo, index) => {
    const card = document.createElement('div');
    card.className = `group relative overflow-hidden rounded-2xl bg-brand-surface border border-brand-border cursor-pointer transition-all duration-500 hover:border-brand-gold/50 ${photo.span || 'row-span-1'}`;

    card.innerHTML = `
      <img 
        src="${photo.src}" 
        alt="${photo.title}" 
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
        <span class="text-[10px] uppercase tracking-widest text-brand-gold font-mono">${photo.category}</span>
        <h3 class="text-base font-display font-medium text-white">${photo.title}</h3>
        <div class="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
          <span>${photo.location}</span>
          <span class="font-mono text-zinc-500">${photo.camera.split(' ')[0]}</span>
        </div>
      </div>
      <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span class="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
          <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i>
        </span>
      </div>
    `;

    card.addEventListener('click', () => {
      openLightbox(index);
    });

    galleryGrid.appendChild(card);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Filtering
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('active', 'bg-brand-gold', 'text-black');
      b.classList.add('bg-brand-surface', 'text-zinc-300');
    });

    btn.classList.add('active', 'bg-brand-gold', 'text-black');
    btn.classList.remove('bg-brand-surface', 'text-zinc-300');

    currentFilter = btn.getAttribute('data-category');
    if (currentFilter === 'all') {
      filteredPhotos = [...photos];
    } else {
      filteredPhotos = photos.filter(p => p.category.toLowerCase() === currentFilter.toLowerCase());
    }

    renderGallery();
  });
});

// Lightbox Open & Update
function openLightbox(index) {
  activePhotoIndex = index;
  updateLightboxContent();
  lightbox.classList.remove('hidden');
  requestAnimationFrame(() => {
    lightbox.classList.remove('opacity-0');
  });
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.add('opacity-0');
  setTimeout(() => {
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }, 300);
}

function updateLightboxContent() {
  const photo = filteredPhotos[activePhotoIndex];
  if (!photo) return;

  lbSpinner.classList.remove('hidden');
  lbImage.classList.add('opacity-0');

  const highResImg = new Image();
  highResImg.src = photo.src;
  highResImg.onload = () => {
    lbImage.src = photo.src;
    lbImage.alt = photo.title;
    lbSpinner.classList.add('hidden');
    lbImage.classList.remove('opacity-0');
  };

  lbTitle.textContent = photo.title;
  lbLocation.textContent = photo.location;
  lbCategory.textContent = photo.category.toUpperCase();
  lbCounter.textContent = `${String(activePhotoIndex + 1).padStart(2, '0')} / ${String(filteredPhotos.length).padStart(2, '0')}`;

  exifCamera.textContent = photo.camera;
  exifLens.textContent = photo.lens;
  exifSettings.textContent = photo.settings;
  exifIso.textContent = photo.iso;
}

function nextPhoto() {
  activePhotoIndex = (activePhotoIndex + 1) % filteredPhotos.length;
  updateLightboxContent();
}

function prevPhoto() {
  activePhotoIndex = (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
  updateLightboxContent();
}

// Lightbox Event Listeners
if (lbCloseBtn) lbCloseBtn.addEventListener('click', closeLightbox);
if (lbNextBtn) lbNextBtn.addEventListener('click', nextPhoto);
if (lbPrevBtn) lbPrevBtn.addEventListener('click', prevPhoto);

if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('select-none')) {
      closeLightbox();
    }
  });
}

// Keyboard Navigation
window.addEventListener('keydown', (e) => {
  if (lightbox && !lightbox.classList.contains('hidden')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  }
});

// Toggle EXIF Drawer
if (toggleExifBtn && lbExifPanel) {
  toggleExifBtn.addEventListener('click', () => {
    isExifVisible = !isExifVisible;
    if (isExifVisible) {
      lbExifPanel.classList.remove('hidden');
    } else {
      lbExifPanel.classList.add('hidden');
    }
  });
}

// Mobile Menu Toggle
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// Booking Form submission mock feedback
const bookingForm = document.getElementById('booking-form');
const formFeedback = document.getElementById('form-feedback');
if (bookingForm && formFeedback) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formFeedback.classList.remove('hidden');
    bookingForm.reset();
    setTimeout(() => {
      formFeedback.classList.add('hidden');
    }, 6000);
  });
}

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
  renderGallery();
});

