const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const CART_KEY = "cart";

function getCart() {
  const cartJSON = sessionStorage.getItem(CART_KEY);
  return cartJSON ? JSON.parse(cartJSON) : [];
}

function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(product => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button class="add-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  const cart = getCart();

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);  // Append the new product, don't overwrite
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

// Attach event listeners
document.getElementById("product-list").addEventListener("click", e => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initialize
renderProducts();
renderCart();
