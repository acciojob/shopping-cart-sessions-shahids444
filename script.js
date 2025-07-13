/* --------  PRODUCT DATA  -------- */
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

/* --------  DOM ELEMENTS  -------- */
const productListEl = document.getElementById("product-list");
const cartListEl    = document.getElementById("cart-list");
const clearBtn      = document.getElementById("clear-cart-btn");

/* --------  SESSION‑STORAGE HELPERS  -------- */
const CART_KEY = "cart";

/* Retrieve cart array from sessionStorage (or empty []) */
function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

/* Save cart array back to sessionStorage */
function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* --------  RENDER PRODUCTS  -------- */
function renderProducts() {
  productListEl.innerHTML = "";                         // reset
  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.name} - $${p.price}
      <button class="add-btn" data-id="${p.id}">Add to Cart</button>
    `;
    productListEl.appendChild(li);
  });
}

/* --------  RENDER CART  -------- */
function renderCart() {
  cartListEl.innerHTML = "";                            // reset
  const cart = getCart();
  if (cart.length === 0) {
    cartListEl.innerHTML = "<li>Your cart is empty.</li>";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartListEl.appendChild(li);
  });
}

/* --------  CART OPERATIONS  -------- */
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);           // duplicates allowed; adjust if needed
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

/* --------  EVENT LISTENERS  -------- */

/* Add‑to‑cart (event delegation) */
productListEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

/* Clear cart button */
clearBtn.addEventListener("click", clearCart);

/* --------  INITIAL LOAD  -------- */
renderProducts();
renderCart();      // displays persisted cart, if any
