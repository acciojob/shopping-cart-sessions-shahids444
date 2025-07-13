const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

const productTableBody = document.getElementById("product-table");
const cartListEl = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

const CART_KEY = "cart";

function getCart() {
  try {
    return JSON.parse(sessionStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function renderProducts() {
  // Remove loading row if it exists
  const loadingRow = document.getElementById("loading");
  if (loadingRow) {
    loadingRow.remove();
  }

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td><button class="add-btn" data-id="${product.id}">Add to Cart</button></td>
    `;
    productTableBody.appendChild(row);
  });
}

function renderCart() {
  cartListEl.innerHTML = "";
  const cart = getCart();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartListEl.appendChild(li);
  });
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  sessionStorage.removeItem(CART_KEY);
  renderCart();
}

productTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

clearBtn.addEventListener("click", clearCart);

renderProducts();
renderCart();
