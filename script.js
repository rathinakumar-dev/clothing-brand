// --------------------------------------------------
// MOBILE MENU
// --------------------------------------------------
const hamburger = document.getElementById("hamburger");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");
const loginTrigger = document.getElementById("loginTrigger");
const bagTrigger = document.getElementById("bagTrigger");
const loginModal = document.getElementById("loginModal");
const bagModal = document.getElementById("bagModal");

const toggleMobileMenu = (show = false) => {
  if (!mobileMenu || !overlay) return;

  if (!window.anime) {
    mobileMenu.classList.toggle("-translate-x-full", !show);
    overlay.classList.toggle("hidden", !show);
    overlay.style.opacity = show ? "1" : "";
    return;
  }

  anime.remove([mobileMenu, overlay]);

  if (show) {
    overlay.classList.remove("hidden");
    overlay.style.opacity = 0;
    mobileMenu.classList.remove("-translate-x-full");
    mobileMenu.style.transform = "translateX(-100%)";

    anime({
      targets: mobileMenu,
      translateX: ["-100%", "0%"],
      duration: 400,
      easing: "easeOutExpo",
      complete: () => {
        mobileMenu.style.transform = "";
      },
    });

    anime({
      targets: overlay,
      opacity: [0, 0.5],
      duration: 300,
      easing: "easeOutQuad",
    });
  } else {
    anime({
      targets: mobileMenu,
      translateX: ["0%", "-100%"],
      duration: 350,
      easing: "easeInQuad",
      complete: () => {
        mobileMenu.classList.add("-translate-x-full");
        mobileMenu.style.transform = "";
      },
    });

    anime({
      targets: overlay,
      opacity: [overlay.style.opacity || 0.5, 0],
      duration: 250,
      easing: "easeOutQuad",
      complete: () => {
        overlay.classList.add("hidden");
        overlay.style.opacity = "";
      },
    });
  }
};

hamburger?.addEventListener("click", () => toggleMobileMenu(true));
closeMenu?.addEventListener("click", () => toggleMobileMenu(false));
overlay?.addEventListener("click", () => toggleMobileMenu(false));
mobileMenu?.addEventListener("click", event => {
  const closeTrigger = event.target.closest("[data-close-menu]");
  if (closeTrigger) {
    toggleMobileMenu(false);
  }
});

const setBodyLock = shouldLock => {
  document.body.classList.toggle("modal-open", shouldLock);
};

const openModal = modalEl => {
  if (!modalEl) return;
  modalEl.classList.add("is-visible", "flex");
  modalEl.classList.remove("hidden");
  modalEl.setAttribute("aria-hidden", "false");
  setBodyLock(true);
};

const closeModal = modalEl => {
  if (!modalEl) return;
  modalEl.classList.remove("is-visible", "flex");
  modalEl.classList.add("hidden");
  modalEl.setAttribute("aria-hidden", "true");
  const anyOpen = !!document.querySelector(".app-modal.is-visible");
  if (!anyOpen) {
    setBodyLock(false);
  }
};

loginTrigger?.addEventListener("click", () => openModal(loginModal));
bagTrigger?.addEventListener("click", () => openModal(bagModal));

document.addEventListener("click", event => {
  const closeEl = event.target.closest("[data-modal-close]");
  if (closeEl) {
    closeModal(closeEl.closest(".app-modal"));
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".app-modal.is-visible").forEach(closeModal);
  }
});

const loginViewButtons = document.querySelectorAll("[data-login-view]");
const existingFields = document.querySelector("[data-existing-fields]");

const toggleSegmentAppearance = (button, isActive) => {
  button.classList.toggle("bg-[var(--secondary-color)]", isActive);
  button.classList.toggle("text-white", isActive);
  button.classList.toggle("border-transparent", isActive);
  button.classList.toggle("bg-white", !isActive);
  button.classList.toggle("text-[var(--secondary-color)]", !isActive);
  button.classList.toggle("border-black/20", !isActive);
};

loginViewButtons.forEach(button => {
  const isDefault = button.dataset.loginView === "new";
  toggleSegmentAppearance(button, isDefault);
});

loginViewButtons.forEach(button => {
  button.addEventListener("click", () => {
    loginViewButtons.forEach(btn => {
      const isActive = btn === button;
      toggleSegmentAppearance(btn, isActive);
    });
    const view = button.dataset.loginView;
    existingFields?.toggleAttribute("hidden", view !== "existing");
  });
});

// --------------------------------------------------
// HERO SWIPER (#1 - Main Hero Section)
// --------------------------------------------------
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
    fadeEffect: { crossFade: true },
    pagination: {
      clickable: true,
    },
  });
};

// --------------------------------------------------
// HERO SWIPER (#2 - myHeroSwiper with anime.js animation)
// --------------------------------------------------
const initMyHeroSwiper = () => {
  const swiperEl = document.querySelector(".myHeroSwiper");
  if (!swiperEl) return;

  const swiper = new Swiper(".myHeroSwiper", {
    loop: true,
    autoplay: {
      delay: 3000,
    },
    speed: 900,
    effect: "fade",
    fadeEffect: { crossFade: true },
  });

  // Save instance globally for anime.js
  window.myHeroSwiper = swiper;

  swiper.on("slideChangeTransitionStart", () => {
    if (!window.anime) return;
    anime({
      targets: ".myHeroSwiper .swiper-slide-active img",
      scale: [1.15, 1],
      opacity: [0.5, 1],
      duration: 1000,
      easing: "easeOutQuad",
    });
  });
};

// --------------------------------------------------
// REELS SWIPER
// --------------------------------------------------
const initReelsSwiper = () => {
  const reelsSwiperEl = document.querySelector(".reelsSwiper");
  if (!reelsSwiperEl) return;

  new Swiper(reelsSwiperEl, {
    loop: true,
    centeredSlidesBounds: true,
    slidesPerView: 2.5,
    spaceBetween: 18,
    autoplay: { delay: 4200 },
    speed: 800,
    breakpoints: {
      640: { slidesPerView: 3.5, spaceBetween: 22 },
      1024: { slidesPerView: 4.5, spaceBetween: 28 },
    },
    navigation: {
      nextEl: "[data-reel-nav='next']",
      prevEl: "[data-reel-nav='prev']",
    },
  });
};

// --------------------------------------------------
// FEATURE ANIMATION
// --------------------------------------------------
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

// --------------------------------------------------
// PRODUCT TAB SYSTEM
// --------------------------------------------------
const cardData = {
  all: [
    // Shirts (4)
    { img: "assets/images/products/shirts/blue/blue1.jpg",        hoverImg: "assets/images/products/shirts/blue/blue2.jpg",        title: "Blue Oxford Shirt",    type: "shirts" },
    { img: "assets/images/products/shirts/lime-green/lime-green-trans.png",  hoverImg: "assets/images/products/shirts/lime-green/lime-green1.jpg",  title: "Lime Resort Shirt",   type: "shirts" },
    { img: "assets/images/products/shirts/dark-blue/dark-blue4.jpeg", hoverImg: "assets/images/products/shirts/dark-blue/dark-blue1.jpeg", title: "Dark Blue Shirt", type: "shirts" },
    { img: "assets/images/products/shirts/mixed/mixed6.jpg",      hoverImg: "assets/images/products/shirts/mixed/mixed7.jpg",      title: "Mixed Print Shirt",   type: "shirts" },

    // Trousers (3)
    { img: "assets/images/products/pants/cotton/cotton4.jpg",     hoverImg: "assets/images/products/pants/cotton/cotton5.jpg",     title: "Cotton Trouser",      type: "trousers" },
    { img: "assets/images/products/pants/cotton/cotton6.jpg",     hoverImg: "assets/images/products/pants/cotton/cotton7.jpg",     title: "Cotton Comfort",      type: "trousers" },
    { img: "assets/images/products/pants/jean/jeans7.jpg",         hoverImg: "assets/images/products/pants/jean/jeans8.png",         title: "Denim Trouser",      type: "trousers" },

    // T-Shirts (3)
    { img: "assets/images/products/t-shirts/t-shirt-1.webp",         hoverImg: "assets/images/products/t-shirts/t-shirt-4.webp",         title: "Minimal Tee",         type: "tshirts" },
    { img: "assets/images/products/t-shirts/t-shirt-2.webp",         hoverImg: "assets/images/products/t-shirts/t-shirt-5.webp",         title: "Monogram Tee",        type: "tshirts" },
    { img: "assets/images/products/t-shirts/t-shirt-3.webp",         hoverImg: "assets/images/products/t-shirts/t-shirt-1.webp",         title: "Soft Touch Tee",      type: "tshirts" },

    // Jeans (2)
    { img: "assets/images/products/pants/jean/jeans1.jpg",        hoverImg: "assets/images/products/pants/jean/jeans3.jpg",        title: "Slim Fit Jeans",      type: "jeans" },
    { img: "assets/images/products/pants/jean/jeans2.jpg",        hoverImg: "assets/images/products/pants/jean/jeans4.jpg",        title: "Classic Blue Jeans",  type: "jeans" },

    // Cargo (2)
    { img: "assets/images/products/pants/cargo/cargo2.png",       hoverImg: "assets/images/products/pants/cargo/cargo1.jpg",       title: "Utility Cargo",       type: "cargo" },
    { img: "assets/images/products/pants/cargo/cargo1.jpg",       hoverImg: "assets/images/products/pants/cargo/cargo2.png",       title: "Urban Cargo",         type: "cargo" },
    
    // Special  
    { img: "assets/images/products/shirts/mixed/mixed8.jpg",      hoverImg: "assets/images/products/shirts/mixed/mixed1.jpg",      title: "Printed Shirt",          type: "shirts" },
    { img: "assets/images/products/pants/jean/jeans10.jpg",        hoverImg: "assets/images/products/pants/jean/jeans9.png",        title: "Stretch Jeans",          type: "jeans" }
  ]
};

const cardsGrid = document.getElementById("cardsGrid");
const categoryTabs = document.getElementById("categoryTabs");
cardData.shirts   = cardData.all.filter(c => c.type === "shirts");
cardData.trousers = cardData.all.filter(c => c.type === "trousers");
cardData.tshirts  = cardData.all.filter(c => c.type === "tshirts");
cardData.jeans    = cardData.all.filter(c => c.type === "jeans");
cardData.cargo    = cardData.all.filter(c => c.type === "cargo"); 

 // improved showSkeleton + renderCards

function showSkeleton(count = 6) {
  if (!cardsGrid) return;
  cardsGrid.innerHTML = "";

  // ensure at least 1 and default to 6 if count is falsy/0
  const skeletonCount = Math.max(1, count || 6);

  const frag = document.createDocumentFragment();

  for (let i = 0; i < skeletonCount; i++) {
    const wrapper = document.createElement("div");
    wrapper.className = "group relative bg-white border border-gray-300 rounded-xl shadow-sm flex flex-col h-full animate-pulse overflow-hidden";

    // Skeleton card markup mirrors final card markup so layout doesn't jump
    wrapper.innerHTML = `
      <figure class="relative h-60 sm:h-100 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div class="skeleton h-full w-full bg-gray-200"></div>
      </figure>

      <div class="render-products">
        <div class="flex-1 py-2 sm:py-4 px-2.5 sm:px-4 flex justify-between items-center gap-1 bg-transparent absolute bottom-0 w-full">
          <div class="skeleton w-28 h-4 sm:h-6 mb-0 bg-gray-200 rounded"></div>
          <div class="skeleton w-12 sm:w-16 h-6 sm:h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    `;

    frag.appendChild(wrapper);
  }

  cardsGrid.appendChild(frag);
}

function renderCards(tab = "all") {
  const arr = cardData[tab] || [];
  // show skeletons while we "load"
  showSkeleton(arr.length || 6);
 
  setTimeout(() => { 
    if (!arr.length) {
      cardsGrid.innerHTML = `<div class="p-6 text-center text-gray-500">No items found.</div>`;
      return;
    }

    // build cards using map -> join
    cardsGrid.innerHTML = arr.map(item => {
      const hoverImg = item.hoverImg || item.img; // Fallback to main image if no hover image
      return `
      <div class="group relative bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden hover:-translate-y-1 product-card" data-animate="hover-card">
        <figure class="relative h-60 sm:h-100 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <img src="${item.img}" alt="${item.title}" class="product-img-main object-cover h-full w-full transition-opacity duration-300 group-hover:opacity-0" loading="lazy" />
          <img src="${hoverImg}" alt="${item.title}" class="product-img-hover absolute inset-0 object-cover h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" loading="lazy" />
        </figure>

        <div class="render-products">
          <div class="flex-1 py-2 sm:py-4 px-2.5 sm:px-4 flex justify-between items-center gap-1 bg-transparent absolute bottom-0 w-full">
            <h2 class="font-semibold text-xs sm:text-base text-white">${item.title}</h2>
            <button class="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white text-[var(--secondary-color)] text-[10px] sm:text-sm font-bold cursor-pointer">Buy</button>
          </div>
        </div>
      </div>
    `;
    }).join('');

    initHoverAnimations();
  }, 650);
}
 

// --------------------------------------------------
// TAB CLICK HANDLER
// --------------------------------------------------
categoryTabs?.addEventListener("click", (e) => {
  const target = e.target.closest("[data-tab]");
  if (!target) return;

  // Remove active class from all tabs
  categoryTabs
    .querySelectorAll(".btn")
    .forEach(btn => btn.classList.remove("btn-active"));

  // Set active tab
  target.classList.add("btn-active");

  // Render filtered cards
  renderCards(target.dataset.tab);
});

// --------------------------------------------------
// GLOBAL PAGE ANIMATIONS
// --------------------------------------------------
const animatePageIntro = () => {
  const introEls = document.querySelectorAll(".intro-animate");
  if (!introEls.length) return;

  const prepareElement = el => {
    if (el.dataset.introPrepared) return;
    el.dataset.introPrepared = "true";
    el.style.opacity = "0";
    el.style.transform = "translateY(45px)";
    el.style.willChange = "opacity, transform";
  };

  const animateIn = el => {
    if (el.dataset.introShown) return;
    el.dataset.introShown = "true";

    const cleanup = () => {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.willChange = "";
    };

    if (window.anime) {
      anime({
        targets: el,
        opacity: [0, 1],
        translateY: [45, 0],
        duration: 700,
        delay: Number(el.dataset.introDelay) || 0,
        easing: "easeOutQuad",
        complete: cleanup,
      });
    } else {
      cleanup();
    }
  };

  introEls.forEach(prepareElement);

  if (!("IntersectionObserver" in window)) {
    introEls.forEach(animateIn);
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateIn(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
  );

  introEls.forEach(el => observer.observe(el));
};

const initHoverAnimations = () => {
  if (!window.anime) return;
  const hoverEls = document.querySelectorAll("[data-animate='hover-card']");
  if (!hoverEls.length) return;

  hoverEls.forEach(el => {
    const animateIn = () => {
      anime.remove(el);
      anime({
        targets: el,
        scale: 1.03,
        translateY: -6,
        duration: 260,
        easing: "easeOutQuad",
      });
    };

    const animateOut = () => {
      anime.remove(el);
      anime({
        targets: el,
        scale: 1,
        translateY: 0,
        duration: 260,
        easing: "easeOutQuad",
      });
    };

    el.addEventListener("mouseenter", animateIn);
    el.addEventListener("focus", animateIn);
    el.addEventListener("mouseleave", animateOut);
    el.addEventListener("blur", animateOut);
  });
};

// --------------------------------------------------
// PAGE LOAD
// --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initHeroSwiper();
  initMyHeroSwiper(); 
  initReelsSwiper();
  animateFeatured();
  animatePageIntro();
  renderCards("all");
  initHoverAnimations();
});
