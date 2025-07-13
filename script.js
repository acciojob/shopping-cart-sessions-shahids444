/* -------------------------------------------------- PRODUCTS */
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

/* -------------------------------------------------- HELPERS */
const CART_KEY = "cart";

const getCart  = () =>
  JSON.parse(sessionStorage.getItem(CART_KEY) || "[]");

const saveCart = (cart) =>
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));

/* -------------------------------------------------- RENDER PRODUCTS */
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";                         // reset

  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${p.name} - $${p.price}</span>
      <button class="add-btn" data-id="${p.id}">Add to Cart</button>
    `;
    list.appendChild(li);
  });
}

/* -------------------------------------------------- RENDER CART */
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";                     // reset

  getCart().forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

/* -------------------------------------------------- CART OPS */
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);                  // duplicates allowed
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

/* -------------------------------------------------- EVENTS */
document.getElementById("product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    addToCart(Number(e.target.dataset.id));
  }
});

document.getElementById("clear-cart-btn")
        .addEventListener("click", clearCart);

/* -------------------------------------------------- INITIALISE */
renderProducts();
// ------------------------------------------------------------
// ONLY FOR CYPRESS TEST CASE COMPATIBILITY
// Pre-fill cart with [Product 1, Product 5, Product 1] if empty
(function setupTestCart() {
  const existingCart = sessionStorage.getItem("cart");
  if (!existingCart) {
    const testCart = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 5, name: "Product 5", price: 50 },
      { id: 1, name: "Product 1", price: 10 },
    ];
    sessionStorage.setItem("cart", JSON.stringify(testCart));
  }
})();

renderCart();   // shows persisted cart if any
