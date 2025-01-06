document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || []; 
  
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  renderCart();
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name}-$${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
      saveProducts()
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveProducts()
    renderCart();
  }

  // Handle remove button clicks using event delegation
  cartItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      cart = cart.filter((c) => c.id !== productId);
      renderCart();
      saveProducts();
    }
  });

  function renderCart() {
    cartItems.innerHTML = "";
    let totalPriceValue = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      
      cart.forEach((item) => {
        totalPriceValue += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - ${item.price.toFixed(2)}
        <button data-id='${item.id}' class='remove-button'>Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });
      
      totalPrice.textContent = `$${totalPriceValue.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotal.classList.add("hidden");
      totalPrice.textContent = "$0.00";
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart = [];
    alert("Checkout successful");
    renderCart();
  });

  function saveProducts() {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
});