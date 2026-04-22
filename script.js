'use strict';

// ============================================
// PRODUCT DATA
// ============================================
const PRODUCTS = [
  {
    id: 1,
    name: 'Landing Page',
    desc: 'High-converting, fully responsive landing page with modern design and contact form.',
    price: 50,
    category: 'web',
    icon: 'fa-globe',
    badge: 'popular',
    badgeLabel: 'Popular',
    delivery: '3 Days',
  },
  {
    id: 2,
    name: 'Portfolio Website',
    desc: 'Custom multi-page portfolio to showcase your work and attract clients professionally.',
    price: 80,
    category: 'web',
    icon: 'fa-briefcase',
    badge: null,
    delivery: '5 Days',
  },
  {
    id: 3,
    name: 'Full Business Website',
    desc: 'Complete business website with multiple pages, animations, CMS-ready structure.',
    price: 150,
    category: 'web',
    icon: 'fa-building-columns',
    badge: 'value',
    badgeLabel: 'Best Value',
    delivery: '7 Days',
  },
  {
    id: 4,
    name: 'UI Component Pack',
    desc: 'A set of 10+ reusable, polished UI components — navbars, cards, modals, sliders.',
    price: 25,
    category: 'component',
    icon: 'fa-puzzle-piece',
    badge: 'new',
    badgeLabel: 'New',
    delivery: '2 Days',
  },
  {
    id: 5,
    name: 'Navbar + Menu',
    desc: 'Animated responsive navbar with mobile menu, dropdowns, and smooth scroll behavior.',
    price: 10,
    category: 'component',
    icon: 'fa-bars',
    badge: null,
    delivery: '1 Day',
  },
  {
    id: 6,
    name: 'Hero Section',
    desc: 'Stunning animated hero section with typing effect, scroll animations, and CTA.',
    price: 15,
    category: 'component',
    icon: 'fa-star',
    badge: null,
    delivery: '1 Day',
  },
  {
    id: 7,
    name: 'Bug Fix Session',
    desc: 'Send me your broken code — I\'ll diagnose and fix the issue fast. 1-hour session.',
    price: 20,
    category: 'fix',
    icon: 'fa-bug-slash',
    badge: 'fast',
    badgeLabel: 'Fast',
    delivery: '2 Hours',
  },
  {
    id: 8,
    name: 'Speed Optimization',
    desc: 'Boost your site\'s load time with image compression, lazy loading, and code cleanup.',
    price: 35,
    category: 'fix',
    icon: 'fa-gauge-high',
    badge: null,
    delivery: '1 Day',
  },
  {
    id: 9,
    name: 'Mobile Responsive Fix',
    desc: 'Make your site look perfect on every screen size — phones, tablets, and desktops.',
    price: 25,
    category: 'fix',
    icon: 'fa-mobile-screen',
    badge: null,
    delivery: '1 Day',
  },
  {
    id: 10,
    name: 'UI/UX Redesign',
    desc: 'Modernize your existing site\'s look and feel — fresh layout, better UX, clean design.',
    price: 60,
    category: 'design',
    icon: 'fa-paintbrush',
    badge: null,
    delivery: '4 Days',
  },
  {
    id: 11,
    name: 'Brand Style Guide',
    desc: 'Color palette, typography, button styles, and component specs — your design system.',
    price: 40,
    category: 'design',
    icon: 'fa-swatchbook',
    badge: null,
    delivery: '3 Days',
  },
  {
    id: 12,
    name: 'Icon & Illustration Pack',
    desc: 'Custom SVG icons and illustrations matching your brand — ready to drop into any project.',
    price: 30,
    category: 'design',
    icon: 'fa-image',
    badge: 'new',
    badgeLabel: 'New',
    delivery: '2 Days',
  },
  {
    id: 15,
    name: 'SEO & Meta Setup',
    desc: 'Meta tags, Open Graph, sitemap, robots.txt, page speed audit — everything search engines need.',
    price: 30,
    category: 'fix',
    icon: 'fa-magnifying-glass-chart',
    badge: 'fast',
    badgeLabel: 'Fast',
    delivery: '1 Day',
  },
  // Pricing tier packages (used by pricing section buttons)
  {
    id: 13,
    name: 'Pro Website Package',
    desc: 'Up to 5 pages, custom animations, contact form, responsive design — fully delivered.',
    price: 120,
    category: 'web',
    icon: 'fa-layer-group',
    badge: 'popular',
    badgeLabel: 'Popular',
    delivery: '5 Days',
  },
  {
    id: 14,
    name: 'Premium Website Package',
    desc: 'Unlimited pages, CMS integration, advanced forms, animations — the full package.',
    price: 250,
    category: 'web',
    icon: 'fa-crown',
    badge: 'value',
    badgeLabel: 'Best Value',
    delivery: '7 Days',
  },
];

// ============================================
// CART STATE
// ============================================
let cart = [];

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, icon: product.icon, qty: 1 });
  }

  renderCart();
  updateCartBadge();
  showToast(`${product.name} added to cart!`);
}

// exposed globally for onclick in pricing section
window.addToCartById = addToCart;

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  renderCart();
  updateCartBadge();
}

function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
    return;
  }
  renderCart();
  updateCartBadge();
}

function clearCart() {
  cart = [];
  renderCart();
  updateCartBadge();
}

// ============================================
// CART UI RENDER
// ============================================
function updateCartBadge() {
  const count = getCartCount();
  const badge = document.getElementById('cartBadge');
  if (!badge) return;
  badge.textContent = count;
  badge.style.transform = count > 0 ? 'scale(1.3)' : 'scale(1)';
  setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
}

const EMPTY_CART_HTML = `
  <div class="cart-empty" id="cartEmpty">
    <i class="fas fa-bag-shopping mb-3"></i>
    <p>Your cart is empty</p>
    <small>Browse services and add something!</small>
  </div>`;

function renderCart() {
  const container = document.getElementById('cartItems');
  const footer    = document.getElementById('cartFooter');
  const subtotal  = document.getElementById('cartSubtotal');
  const total     = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = EMPTY_CART_HTML;
    if (footer) footer.style.setProperty('display', 'none', 'important');
    return;
  }

  if (footer) footer.style.removeProperty('display');

  const itemsHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon"><i class="fas ${item.icon}"></i></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove">
        <i class="fas fa-trash-can"></i>
      </button>
    </div>
  `).join('');

  container.innerHTML = itemsHTML;

  const totalAmt = getCartTotal();
  if (subtotal) subtotal.textContent = `$${totalAmt}`;
  if (total)    total.textContent    = `$${totalAmt}`;
}

// ============================================
// TOAST
// ============================================
let _toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('customToast');
  const msgEl = document.getElementById('customToastMsg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ============================================
// PRODUCT GRID RENDER
// ============================================
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const badgeMap = {
    popular: 'badge-popular',
    value:   'badge-value',
    fast:    'badge-fast',
    new:     'badge-new',
  };

  const categoryLabel = {
    web:       'Web Development',
    design:    'UI Design',
    component: 'Components',
    fix:       'Quick Fix',
  };

  grid.innerHTML = filtered.map(p => `
    <div class="col-sm-6 col-lg-4 reveal">
      <div class="product-card">
        <div class="product-thumb">
          <div class="product-thumb-bg"></div>
          ${p.badge ? `<span class="product-badge ${badgeMap[p.badge]}">${p.badgeLabel}</span>` : ''}
          <div class="product-thumb-icon"><i class="fas ${p.icon}"></i></div>
        </div>
        <div class="product-body">
          <div class="product-category">${categoryLabel[p.category]}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-meta">
            <div class="product-price">$${p.price}</div>
            <div class="product-delivery"><i class="fas fa-clock"></i>${p.delivery}</div>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // re-observe newly injected cards
  observeReveal();
}

// ============================================
// FILTER TABS
// ============================================
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });
}

// ============================================
// TYPING ANIMATION
// ============================================
const TYPING_WORDS = ['Modern Websites', 'Landing Pages', 'Business Websites', 'UI Components'];
let typeIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
let typeTimer  = null;

function typeLoop() {
  const el = document.getElementById('typingText');
  if (!el) return;

  const word = TYPING_WORDS[typeIndex];

  if (isDeleting) {
    charIndex--;
    el.textContent = word.slice(0, charIndex);
  } else {
    charIndex++;
    el.textContent = word.slice(0, charIndex);
  }

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === word.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    typeIndex  = (typeIndex + 1) % TYPING_WORDS.length;
    delay = 400;
  }

  typeTimer = setTimeout(typeLoop, delay);
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const startTime = performance.now();

  const tick = (now) => {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================
let revealObserver = null;

function observeReveal() {
  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // counter animation
        entry.target.querySelectorAll('.counter').forEach(counter => {
          if (!counter.dataset.animated) {
            counter.dataset.animated = 'true';
            animateCounter(counter);
          }
        });

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('visible')) {
      revealObserver.observe(el);
    }
  });
}

// ============================================
// NAVBAR SCROLL EFFECT + ACTIVE LINK
// ============================================
function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link-custom');

  const onScroll = () => {
    // glassmorphism
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 160) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      if (collapse && collapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    });
  });
}

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================
// CHECKOUT FORM
// ============================================
function initCheckout() {
  const btn = document.getElementById('checkoutBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      if (cart.length === 0) return;

      const summaryBox = document.getElementById('orderSummaryBox');
      if (summaryBox) {
        const rows = cart.map(item =>
          `<div class="summary-row"><span>${item.name} × ${item.qty}</span><span>$${item.price * item.qty}</span></div>`
        ).join('');
        summaryBox.innerHTML = rows +
          `<div class="summary-total"><span>Total</span><span>$${getCartTotal()}</span></div>`;
      }

      const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('cartSidebar'));
      offcanvas?.hide();

      setTimeout(() => {
        new bootstrap.Modal(document.getElementById('checkoutModal')).show();
      }, 350);
    });
  }

  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) clearBtn.addEventListener('click', clearCart);

  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = checkoutForm.querySelector('[type="submit"]');
      const orig = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending…';
      submitBtn.disabled = true;

      const data = new FormData(checkoutForm);
      data.append('_subject', 'New Quote Request — arbin.dev');
      if (cart.length > 0) {
        data.append('Services Requested', cart.map(i => `${i.name} × ${i.qty} ($${i.price * i.qty})`).join(', '));
        data.append('Estimated Total', `$${getCartTotal()}`);
      }

      try {
        const res = await fetch('https://formspree.io/f/mnjlgerb', {
          method: 'POST', body: data, headers: { Accept: 'application/json' }
        });
        bootstrap.Modal.getInstance(document.getElementById('checkoutModal'))?.hide();
        clearCart();
        showToast(res.ok ? "Quote request sent! I'll be in touch within 2 hours." : 'Something went wrong. Email me directly.');
      } catch {
        bootstrap.Modal.getInstance(document.getElementById('checkoutModal'))?.hide();
        clearCart();
        showToast("Quote request sent! I'll be in touch within 2 hours.");
      } finally {
        submitBtn.innerHTML = orig;
        submitBtn.disabled = false;
      }
    });
  }
}

// ============================================
// CUSTOM ORDER FORM
// ============================================
function initCustomOrder() {
  const form = document.getElementById('customForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('customSubmitBtn');
    const orig = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending…';
    submitBtn.disabled = true;

    try {
      const res = await fetch('https://formspree.io/f/mnjlgerb', {
        method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }
      });
      bootstrap.Modal.getInstance(document.getElementById('customModal'))?.hide();
      showToast(res.ok ? 'Request received! Expect a quote in 2 hours.' : 'Failed to send. Please email me directly.');
      if (res.ok) form.reset();
    } catch {
      bootstrap.Modal.getInstance(document.getElementById('customModal'))?.hide();
      showToast('Request received! Expect a quote in 2 hours.');
      form.reset();
    } finally {
      submitBtn.innerHTML = orig;
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('contactSubmitBtn');
    const orig = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending…';
    submitBtn.disabled = true;

    const data = new FormData(form);
    if (cart.length > 0) {
      data.append('Services Interested In', cart.map(i => `${i.name} × ${i.qty} ($${i.price * i.qty})`).join(', '));
      data.append('Estimated Budget', `$${getCartTotal()}`);
    }

    try {
      const res = await fetch('https://formspree.io/f/mnjlgerb', {
        method: 'POST', body: data, headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        showToast("Message sent! I'll reply within 2 hours.");
        form.reset();
      } else {
        showToast('Failed to send. Please email me directly.');
      }
    } catch {
      showToast('Failed to send. Please email me directly.');
    } finally {
      submitBtn.innerHTML = orig;
      submitBtn.disabled = false;
    }
  });
}

// ============================================
// BOOT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');
  renderCart();
  updateCartBadge();
  initFilters();
  initNavbar();
  initSmoothScroll();
  initCheckout();
  initCustomOrder();
  initContactForm();
  observeReveal();
  typeLoop();
});
