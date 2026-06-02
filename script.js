// ── Data ─────────────────────────────────────
let products = [];

// ── Helpers ───────────────────────────────────
const fmt = n => new Intl.NumberFormat('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

// ── State ─────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('ks_cart')) || [];
let activeCategory = 'all';

// ── Toast 
let toastTimer;
function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ── Cart ─────────────────────────────────────
function saveCart() { localStorage.setItem('ks_cart', JSON.stringify(cart)); }

window.addToCart = function(id, e) {
    if (e) e.stopPropagation();
    const p = products.find(x => x.id === id);
    const ex = cart.find(x => x.id === id);
    if (ex) ex.qty++; else cart.push({ ...p, qty: 1 });
    saveCart(); renderCart();

    // Button feedback
    const btn = document.querySelector(`[data-id="${id}"]`);
    if (btn) {
        btn.textContent = 'Added ✓';
        btn.style.background = 'var(--yellow)';
        btn.style.borderColor = 'var(--yellow)';
        btn.style.color = 'var(--black)';
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 1400);
    }

    // Popup button feedback
    const popupBtn = document.getElementById('popup-add-btn');
    if (popupBtn && popupBtn.getAttribute('onclick')?.includes(`${id}`)) {
        popupBtn.textContent = 'Added ✓';
        setTimeout(() => popupBtn.textContent = 'Add to Cart', 1400);
    }

    // Show toast
    showToast(`${p.name} added to cart!`);
};

window.removeFromCart = function(id) {
    cart = cart.filter(x => x.id !== id);
    saveCart(); renderCart();
};

function renderCart() {
    const count = cart.reduce((s, x) => s + x.qty, 0);
    document.getElementById('cart-count').textContent = count;
    const container = document.getElementById('drawer-items');
    if (!cart.length) {
        container.innerHTML = '<div class="empty-msg"><span>Empty</span>Your cart awaits.</div>';
        document.getElementById('cart-total').textContent = '0.00';
        return;
    }
    let total = 0;
    container.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `<div class="cart-item">
            <div class="ci-info">
                <div class="ci-name">${item.name}</div>
                <div class="ci-price">₱${fmt(item.price)} × ${item.qty} = ₱${fmt(item.price * item.qty)}</div>
            </div>
            <button class="ci-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>`;
    }).join('');
    document.getElementById('cart-total').textContent = fmt(total);
}

// ── Product Info Popup ────────────────────────
window.openPopup = function(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    document.getElementById('popup-img').src = p.image;
    document.getElementById('popup-img').alt = p.name;
    document.getElementById('popup-img').onerror = function() {
        this.src = `https://placehold.co/600x450/171620/c89644?text=${encodeURIComponent(p.name)}`;
    };
    document.getElementById('popup-tag').textContent = p.tag;
    document.getElementById('popup-name').textContent = p.name;
    document.getElementById('popup-price').textContent = `₱${fmt(p.price)}`;
    document.getElementById('popup-desc').textContent = p.description;
    document.getElementById('popup-add-btn').setAttribute('onclick', `addToCart(${p.id}, event)`);
    document.getElementById('popup-add-btn').textContent = 'Add to Cart';
    document.getElementById('popup-specs').innerHTML = Object.entries(p.specs).map(([k, v]) => `
        <div class="spec-row">
            <span class="spec-key">${k}</span>
            <span class="spec-val">${v}</span>
        </div>
    `).join('');
    document.getElementById('product-popup').classList.add('show');
    document.getElementById('popup-overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
};

window.closePopup = function() {
    document.getElementById('product-popup').classList.remove('show');
    document.getElementById('popup-overlay').classList.remove('show');
    document.body.style.overflow = '';
};

document.getElementById('popup-overlay').addEventListener('click', closePopup);
document.getElementById('popup-close-btn').addEventListener('click', closePopup);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePopup(); });

// ── Category Filter ───────────────────────────
function filterProducts(cat) {
    activeCategory = cat;
    return cat === 'all' ? products : products.filter(p => p.category === cat);
}

function updateTabs(cat) {
    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.cat === cat);
    });
}

// ── Render Products ───────────────────────────
function renderProducts(cat = 'all') {
    const filtered = filterProducts(cat);
    document.getElementById('product-count').textContent = filtered.length;

    const badgeClass = { keyboard: 'badge-keyboard', keycaps: 'badge-keycaps', switches: 'badge-switches' };
    const badgeLabel = { keyboard: 'Keyboard', keycaps: 'Keycap Set', switches: 'Switch' };

    const grid = document.getElementById('product-grid');
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openPopup(${p.id})">
            <span class="product-cat-badge ${badgeClass[p.category]}">${badgeLabel[p.category]}</span>
            <div class="product-img-wrap">
                <img src="${p.image}" alt="${p.name}" loading="lazy"
                     onerror="this.src='https://placehold.co/600x450/171620/c89644?text=${encodeURIComponent(p.name)}'">
            </div>
            <p class="product-tag">${p.tag}</p>
            <h3 class="product-name">${p.name}</h3>
            <p class="product-price"><strong>₱${fmt(p.price)}</strong>${p.category === 'switches' ? '<span style="font-size:.75rem;color:var(--grey)"> / 10pcs</span>' : ''}</p>
            <button class="add-btn" onclick="addToCart(${p.id}, event)" data-id="${p.id}">Add to Cart</button>
        </div>
    `).join('');

    // Animate in
    const observer = new IntersectionObserver(entries => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('visible'), i * 60);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });
    document.querySelectorAll('.product-card').forEach(c => observer.observe(c));
}

// Tab click handler
document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const cat = tab.dataset.cat;
        updateTabs(cat);
        renderProducts(cat);
    });
});

// Nav link handlers (Switches / Keycaps in header)
document.querySelectorAll('nav a[data-filter]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const cat = link.dataset.filter;
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            updateTabs(cat);
            renderProducts(cat);
        }, 400);
    });
});

// ── Drawer Toggle ─────────────────────────────
function openCart() {
    document.getElementById('cart-drawer').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    document.getElementById('cart-drawer').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = '';
}

document.getElementById('cart-btn').addEventListener('click', openCart);
document.getElementById('drawer-close').addEventListener('click', closeCart);
document.getElementById('overlay').addEventListener('click', closeCart);
document.getElementById('clear-btn').addEventListener('click', () => {
    if (confirm('Clear all items?')) { cart = []; saveCart(); renderCart(); }
});

// ── Init ─────────────────────────────────────
async function init() {
    try {
        const res = await fetch('products.json');
        const data = await res.json();
        products = data.products.map(p => ({
            ...p,
            category: p.category ? p.category.toLowerCase() : 'keyboard',
            tag: p.tags ? p.tags.join(' · ') : 'Premium',
            specs: {
                Stock: p.stock ? p.stock + ' units' : 'Out of stock',
                Rating: p.rating ? p.rating + ' / 5.0' : 'N/A',
                Colors: p.colors ? p.colors.join(', ') : 'Standard'
            }
        }));
        renderProducts('all');
        renderCart();
    } catch (err) {
        console.error('Failed to load products:', err);
    }
}
init();
