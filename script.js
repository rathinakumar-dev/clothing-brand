// Initialize WOW.js
new WOW().init();

// Mobile Menu Toggle
const hamburger = document.getElementById("hamburger");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

const toggleMobileMenu = (show = false) => {
  if (!mobileMenu || !overlay) return;
  mobileMenu.classList.toggle("-translate-x-full", !show);
  overlay.classList.toggle("hidden", !show);
};

if (hamburger) {
  hamburger.addEventListener("click", () => toggleMobileMenu(true));
}
if (closeMenu) {
  closeMenu.addEventListener("click", () => toggleMobileMenu(false));
}
if (overlay) {
  overlay.addEventListener("click", () => toggleMobileMenu(false));
}

const initHeroSwiper = () => {
  const heroSwiperEl = document.querySelector(".heroSwiper");
  if (!heroSwiperEl) return;
  new Swiper(heroSwiperEl, {
    loop: true,
    autoplay: {
      delay: 3800,
      disableOnInteraction: false,
    },
    speed: 900,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      clickable: true,
    },
  });
};

const initReelsSwiper = () => {
  const reelsSwiperEl = document.querySelector(".reelsSwiper");
  if (!reelsSwiperEl) return;
  new Swiper(reelsSwiperEl, {
    loop: true,
    centeredSlidesBounds: true,
    slidesPerView: 2.5,
    spaceBetween: 18,
    autoplay: {
      delay: 4200,
    },
    speed: 800,
    breakpoints: {
      640: {
        slidesPerView: 3.5,
        spaceBetween: 22,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 28,
      },
    },
    navigation: {
      nextEl: "[data-reel-nav='next']",
      prevEl: "[data-reel-nav='prev']",
    },
  });
};

const animateFeatured = () => {
  if (!window.anime) return;
  anime({
    targets: ".featured .category-card",
    opacity: [0, 1],
    translateY: [40, 0],
    delay: anime.stagger(80),
    duration: 600,
    easing: "easeOutQuad",
  });
};

// tab Products
const cardData = {
  all: [
    {
      img: "./assets/images/products/shirts/blue/blue(1).jpg",
      title: "Blue Oxford Shirt",
      type: "shirts",
    },
    {
      img: "./assets/images/products/shirts/lime-green/lime-green(2).jpg",
      title: "Lime Resort Shirt",
      type: "shirts",
    },
    {
      img: "./assets/images/products/shirts/meron/meroun(2).jpg",
      title: "Meron Satin Shirt",
      type: "shirts",
    },
    {
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
      title: "Minimal Tee",
      type: "tshirts",
    },
    {
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop",
      title: "Monogram Tee",
      type: "tshirts",
    },
    {
      img: "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=500&auto=format&fit=crop",
      title: "Soft Touch Tee",
      type: "tshirts",
    },
    {
      img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500&auto=format&fit=crop",
      title: "Cozy Cable Knit",
      type: "sweaters",
    },
    {
      img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
      title: "Hybrid Knit",
      type: "sweaters",
    },
    {
      img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop",
      title: "Ribbed Crew",
      type: "sweaters",
    },
    {
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
      title: "Everyday Sweatshirt",
      type: "sweatshirts",
    },
    {
      img: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=500&auto=format&fit=crop",
      title: "Shadow Loop Sweatshirt",
      type: "sweatshirts",
    },
    {
      img: "https://images.unsplash.com/photo-1484519332611-516457305ff6?w=500&auto=format&fit=crop",
      title: "Weekend Hoodie",
      type: "sweatshirts",
    },
  ],
};
cardData.shirts = cardData.all.filter((c) => c.type === "shirts");
cardData.tshirts = cardData.all.filter((c) => c.type === "tshirts");
cardData.sweaters = cardData.all.filter((c) => c.type === "sweaters");
cardData.sweatshirts = cardData.all.filter((c) => c.type === "sweatshirts");

// DOM Refs
const cardsGrid = document.getElementById("cardsGrid");
const categoryTabs = document.getElementById("categoryTabs");

function showSkeleton(count) {
  if (!cardsGrid) return;
  cardsGrid.innerHTML = "";
  for (let i = 0; i < count; i++) {
    cardsGrid.innerHTML += `
      <div class="card bg-white border rounded-xl shadow-sm card-hover flex flex-col h-full">
        <figure class="h-44 flex items-center justify-center bg-gray-100">
          <div class="skeleton h-32 w-24"></div>
        </figure>
        <div class="card-body pt-3 pb-4 px-4">
          <div class="skeleton w-28 h-6 mb-3"></div>
          <div class="skeleton w-16 h-5"></div>
        </div>
      </div>
    `;
  }
}

function renderCards(tab = "all") {
  if (!cardsGrid) return;
  const arr = cardData[tab];
  showSkeleton(arr.length);
  setTimeout(() => {
    cardsGrid.innerHTML = "";
    arr.forEach((item) => {
      cardsGrid.innerHTML += `
         <div class="group relative bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden hover:-translate-y-1">
  <!-- Image Container with Wishlist Button -->
  <figure class="relative h-48 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
    <img 
      src="${item.img}" 
      alt="${item.title}" 
      class="object-contain h-40 w-full  transition-transform duration-300 group-hover:scale-105" 
      loading="lazy" 
    />
    <button 
      class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-red-50 hover:scale-110 transition-all duration-200 border border-gray-200" 
      aria-label="Add to wishlist"
    >
      <i class="fa-regular fa-heart text-gray-700 hover:text-red-500 transition-colors"></i>
    </button>
  </figure>

  <!-- Card Content -->
  <div class="flex-1 pt-4 pb-4 px-4 flex flex-col gap-3">
    <h2 class="font-semibold text-base text-gray-900 line-clamp-2 min-h-[2.5rem]">
      ${item.title}
    </h2>

    <button 
      class="mt-auto w-full py-2.5 px-4 bg-[var(--secondary-color)] hover:bg-[var(--secondary-color)]/90 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
      aria-label="Add ${item.title} to cart"
    >
      Buy Now
    </button>
  </div>
</div>

      `;
    });
    if (window.anime) {
      anime({
        targets: "#cardsGrid .card",
        opacity: [0, 1],
        translateY: [25, 0],
        delay: anime.stagger(60),
        easing: "easeOutCubic",
      });
    }
  }, 650);
}

// Tab switching & initial load
if (categoryTabs) {
  categoryTabs.addEventListener("click", (e) => {
    const target = e.target.closest("[data-tab]");
    if (!target) return;
    categoryTabs
      .querySelectorAll(".btn")
      .forEach((btn) => btn.classList.remove("btn-active"));
    target.classList.add("btn-active");
    renderCards(target.dataset.tab);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroSwiper();
  initReelsSwiper();
  animateFeatured();
  renderCards("all");
});
