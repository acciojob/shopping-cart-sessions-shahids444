const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const CART_KEY = "cart";

// Get cart from sessionStorage
function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

// Save cart to sessionStorage
function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Render product list with "Add to Cart" buttons
function renderProducts() {
  const productListEl = document.getElementById("product-list");
  productListEl.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button class="add-btn" data-id="${product.id}">Add to Cart</button>
    `;

    productListEl.appendChild(li);
  });
}

// Render the shopping cart
function renderCart() {
  const cartListEl = document.getElementById("cart-list");
  cartListEl.innerHTML = "";

  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartListEl.appendChild(li);
  });
}

// Add a product to the cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  renderCart();
}

// Clear the cart
function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

// Attach event listeners
document.getElementById("product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
