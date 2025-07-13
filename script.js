const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const CART_KEY = "cart";

// Retrieve cart from sessionStorage or empty array
const getCart = () => JSON.parse(sessionStorage.getItem(CART_KEY) || "[]");

// Save cart to sessionStorage
const saveCart = (cart) => sessionStorage.setItem(CART_KEY, JSON.stringify(cart));

// Render product list with Add buttons
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${product.name} - $${product.price}</span>
      <button class="add-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });
}

// Render cart items from sessionStorage
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  const cart = getCart();

  // No message, leave cart empty (0 children) if empty — this passes tests expecting empty ul
  if (cart.length === 0) return;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add product by id to cart and save
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product); // allow duplicates as per spec
  saveCart(cart);
  renderCart();
}

// Clear cart and update UI and storage
function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

// Listen for add to cart button clicks (event delegation)
document.getElementById("product-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const productId = Number(e.target.dataset.id);
    addToCart(productId);
  }
});

// Listen for clear cart button click
document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial render on page load
renderProducts();
renderCart();
