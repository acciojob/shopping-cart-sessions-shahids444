// -------- PRODUCT DATA --------
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// -------- DOM ELEMENTS --------
const productListEl = document.getElementById("product-list");
const cartListEl = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

const CART_KEY = "cart";

// Get cart array from sessionStorage or return empty array
function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

// Save cart array to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// -------- RENDER PRODUCTS --------
function renderProducts() {
  productListEl.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productListEl.appendChild(li);
  });
}

// -------- RENDER CART --------
function renderCart() {
  cartListEl.innerHTML = "";
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartListEl.appendChild(li);
  });
}

// -------- CART OPERATIONS --------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product); // add product (duplicates allowed)
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

// -------- EVENT LISTENERS --------
productListEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

clearBtn.addEventListener("click", clearCart);

// -------- INITIAL PAGE LOAD --------
renderProducts();
renderCart();
