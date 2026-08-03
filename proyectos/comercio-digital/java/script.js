// Sample Products Data
const products = [
    {
        id: 1,
        title: "Hoodie Heavyweight 'Cyber Eclipse'",
        category: "hoodies",
        price: 1299,
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Camiseta Boxy Fit 'Eclipc Protocol'",
        category: "tees",
        price: 599,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Pantalón Cargo Tactical Tech",
        category: "pants",
        price: 1499,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Gorra Acid Wash Minimalist",
        category: "acc",
        price: 450,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Hoodie Vintage Oversize 'Noir'",
        category: "hoodies",
        price: 1350,
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Tee Graphic 'Future Matrix'",
        category: "tees",
        price: 650,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartBody = document.getElementById('cart-body');
const cartCount = document.getElementById('cart-count');
const cartItemsQty = document.getElementById('cart-items-qty');
const cartTotalPrice = document.getElementById('cart-total-price');
const filterBtns = document.querySelectorAll('.filter-btn');
const themeToggle = document.getElementById('theme-toggle');
const openSizeModal = document.getElementById('open-size-guide');
const closeSizeModal = document.getElementById('close-modal');
const sizeModal = document.getElementById('size-modal');
const toast = document.getElementById('toast');
const checkoutBtn = document.getElementById('checkout-btn');

// Render Products
function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.image}" alt="${p.title}" class="product-img">
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <h3 class="product-title">${p.title}</h3>
                <div class="product-price">$${p.price.toLocaleString('es-MX')} MXN</div>
                <button class="add-to-cart-btn" onclick="addToCart(${p.id})">Agregar al Carrito</button>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// Add to Cart
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
    showToast(`¡${item.title} agregado!`);
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    cartCount.textContent = cart.length;
    cartItemsQty.textContent = cart.length;

    if (cart.length === 0) {
        cartBody.innerHTML = '<p class="empty-cart-msg">Tu carrito está vacío actualmente.</p>';
        cartTotalPrice.textContent = '$0.00 MXN';
        return;
    }

    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">$${item.price.toLocaleString('es-MX')} MXN</div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartBody.appendChild(cartItem);
    });

    cartTotalPrice.textContent = `$${total.toLocaleString('es-MX')} MXN`;
}

// Show Toast
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Cart Drawer Toggles
cartBtn.addEventListener('click', () => {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('active');
});

function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
}

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Category Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.dataset.category);
    });
});

// Dark / Light Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
});

// Size Guide Modal Toggles
openSizeModal.addEventListener('click', () => sizeModal.classList.add('active'));
closeSizeModal.addEventListener('click', () => sizeModal.classList.remove('active'));

// Checkout Simulation
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    alert('🎉 ¡Simulación de pago exitosa! En un sitio de producción, aquí se abriría la pasarela de Stripe o PayPal.');
    cart = [];
    updateCartUI();
    closeCart();
});

// Initialize
renderProducts();
