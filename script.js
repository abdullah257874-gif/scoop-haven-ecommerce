const products = [
  {
    id: 1,
    name: 'Berry Bliss',
    category: 'Fruit Burst',
    price: 12,
    rating: 4.9,
    badge: 'Best Seller',
    description: 'Fresh berries folded into a silky vanilla base for a bright, fruity finish.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Midnight Cocoa',
    category: 'Decadent',
    price: 13,
    rating: 4.8,
    badge: 'Rich',
    description: 'Dark cocoa ice cream layered with chocolate cookie crumble and cocoa nibs.',
    image: 'https://images.unsplash.com/photo-1570197788417-0e823ef4b095?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Coconut Cloud',
    category: 'Vegan',
    price: 11,
    rating: 4.7,
    badge: 'Vegan',
    description: 'Coconut cream, toasted coconut flakes, and a silky tropical aroma.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Salted Caramel',
    category: 'Classic',
    price: 12,
    rating: 4.9,
    badge: 'Classic',
    description: 'Golden caramel ribbons swirled through velvety cream and sea salt.',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Mango Tango',
    category: 'Fruit Burst',
    price: 11,
    rating: 4.8,
    badge: 'Popular',
    description: 'Sun-ripened mango blended into a luscious, tropical scoop.',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Mint Chill',
    category: 'Classic',
    price: 10,
    rating: 4.6,
    badge: 'Fresh',
    description: 'Cool mint with dark chocolate shards for a crisp, refreshing bite.',
    image: 'https://images.unsplash.com/photo-1464306076886-da185f6a9d8a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'Hazelnut Dream',
    category: 'Decadent',
    price: 14,
    rating: 5,
    badge: 'Luxury',
    description: 'Roasted hazelnut cream with a creamy finish and nutty richness.',
    image: 'https://images.unsplash.com/photo-1560008581-09826d1de69f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Lemon Zest',
    category: 'Fruit Burst',
    price: 10,
    rating: 4.7,
    badge: 'Citrus',
    description: 'A zippy lemon cream layered with bright citrus notes and tart fruit.',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Vanilla Bean',
    category: 'Classic',
    price: 11,
    rating: 4.9,
    badge: 'Signature',
    description: 'Smooth vanilla bean cream with delicate caramel undertones.',
    image: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 10,
    name: 'Peanut Butter Swirl',
    category: 'Decadent',
    price: 13,
    rating: 4.8,
    badge: 'Gourmet',
    description: 'Creamy peanut butter swirls with crunchy caramelized peanut bits.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 11,
    name: 'Strawberry Cloud',
    category: 'Fruit Burst',
    price: 12,
    rating: 4.8,
    badge: 'Seasonal',
    description: 'Sweet strawberry ribbons mixed into a fluffy cream base.',
    image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 12,
    name: 'Almond Rose',
    category: 'Vegan',
    price: 12,
    rating: 4.7,
    badge: 'Floral',
    description: 'Creamy almond base with delicate rose notes and soft floral aroma.',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80'
  }
];

const categories = ['All', ...new Set(products.map((product) => product.category))];

const state = {
  selectedCategory: 'All',
  search: '',
  cart: []
};

const productGrid = document.getElementById('productGrid');
const filterContainer = document.getElementById('categoryFilters');
const searchInput = document.getElementById('searchInput');
const cartItems = document.getElementById('cartItems');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartCount = document.getElementById('cartCount');
const subtotalPrice = document.getElementById('subtotalPrice');
const taxPrice = document.getElementById('taxPrice');
const deliveryPrice = document.getElementById('deliveryPrice');
const totalPrice = document.getElementById('totalPrice');
const checkoutModal = document.getElementById('checkoutModal');
const checkoutBtn = document.getElementById('checkoutBtn');
const toast = document.getElementById('toast');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

function renderCategoryFilters() {
  filterContainer.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-button ${state.selectedCategory === category ? 'active' : ''}" type="button" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join('');

  filterContainer.querySelectorAll('.filter-button').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedCategory = button.dataset.category;
      renderCategoryFilters();
      renderProducts();
    });
  });
}

function getFilteredProducts() {
  return products.filter((product) => {
    const matchesCategory = state.selectedCategory === 'All' || product.category === state.selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(state.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  const filteredProducts = getFilteredProducts();

  if (!filteredProducts.length) {
    productGrid.innerHTML = `
      <div class="empty-cart" style="grid-column: 1 / -1;">
        No flavors match your search. Try another keyword.
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
            <span class="product-badge">${product.badge}</span>
          </div>
          <div class="product-body">
            <div class="product-head">
              <h3>${product.name}</h3>
              <span class="product-price">$${product.price.toFixed(2)}</span>
            </div>
            <div class="product-rating">★★★★★ ${product.rating}</div>
            <p class="product-description">${product.description}</p>
            <div class="product-actions">
              <button class="add-button" type="button" data-add-id="${product.id}">Add to cart</button>
              <button class="heart-button" type="button" aria-label="Save ${product.name}">♡</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('[data-add-id]').forEach((button) => {
    button.addEventListener('click', () => {
      addToCart(Number(button.dataset.addId));
    });
  });
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  showToast(`${product.name} added to cart`);
}

function updateCartUI() {
  const cartItemTotal = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = String(cartItemTotal);

  if (!state.cart.length) {
    cartItems.innerHTML = '<div class="empty-cart">Your cart is empty. Add a delicious scoop.</div>';
    subtotalPrice.textContent = '$0.00';
    taxPrice.textContent = '$0.00';
    deliveryPrice.textContent = '$0.00';
    totalPrice.textContent = '$0.00';
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = '0.5';
    checkoutBtn.style.cursor = 'not-allowed';
    return;
  }

  checkoutBtn.disabled = false;
  checkoutBtn.style.opacity = '1';
  checkoutBtn.style.cursor = 'pointer';

  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.06;
  const delivery = subtotal > 60 ? 0 : 6.5;
  const total = subtotal + tax + delivery;

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h4>${item.name}</h4>
            <div class="cart-meta">${item.category}</div>
            <div class="qty-row">
              <div class="qty-controls">
                <button type="button" data-decrease="${item.id}" aria-label="Decrease quantity">−</button>
                <span>${item.quantity}</span>
                <button type="button" data-increase="${item.id}" aria-label="Increase quantity">+</button>
              </div>
              <span class="cart-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          </div>
        </div>
      `
    )
    .join('');

  subtotalPrice.textContent = `$${subtotal.toFixed(2)}`;
  taxPrice.textContent = `$${tax.toFixed(2)}`;
  deliveryPrice.textContent = delivery === 0 ? 'Free' : `$${delivery.toFixed(2)}`;
  totalPrice.textContent = `$${total.toFixed(2)}`;

  document.querySelectorAll('[data-increase]').forEach((button) => {
    button.addEventListener('click', () => {
      const item = state.cart.find((cartItem) => cartItem.id === Number(button.dataset.increase));
      if (item) item.quantity += 1;
      updateCartUI();
    });
  });

  document.querySelectorAll('[data-decrease]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.decrease);
      const item = state.cart.find((cartItem) => cartItem.id === id);
      if (!item) return;
      if (item.quantity === 1) {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== id);
      } else {
        item.quantity -= 1;
      }
      updateCartUI();
    });
  });
}

function openCart() {
  cartDrawer.classList.add('open');
  cartBackdrop.classList.add('visible');
}

function closeCart() {
  cartDrawer.classList.remove('open');
  cartBackdrop.classList.remove('visible');
}

function openCheckout() {
  if (!state.cart.length) {
    showToast('Add products to your cart first.');
    return;
  }
  closeCart();
  checkoutModal.classList.add('open');
}

function closeCheckout() {
  checkoutModal.classList.remove('open');
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2200);
}

searchInput.addEventListener('input', (event) => {
  state.search = event.target.value.trim();
  renderProducts();
});

document.querySelector('.cart-toggle').addEventListener('click', openCart);
document.querySelector('.close-drawer').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', openCheckout);
document.querySelector('.close-modal').addEventListener('click', closeCheckout);

document.getElementById('checkoutForm').addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();

  if (!name || !email) {
    showToast('Please fill in your details.');
    return;
  }

  state.cart = [];
  updateCartUI();
  closeCheckout();
  showToast('Order placed successfully! We will contact you soon.');
  event.currentTarget.reset();
});

document.getElementById('newsletterForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const emailField = document.getElementById('newsletterEmail');
  if (!emailField.value.trim()) {
    showToast('Please enter your email.');
    return;
  }

  showToast('Thanks for subscribing!');
  emailField.value = '';
});

menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('is-open');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('is-open'));
});

renderCategoryFilters();
renderProducts();
updateCartUI();

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCart();
    closeCheckout();
  }
});

