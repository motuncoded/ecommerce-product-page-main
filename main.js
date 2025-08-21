// --- Example product ---
var product = {
  title: "Fall Limited Edition Sneakers",
  price: 125.0,
  thumbnail: "./images/image-product-1-thumbnail.jpg", // default
};
// Product thumbnails
var mainProductImage = document.getElementById("mainImage");
var productThumbnailImages = document.querySelectorAll(".thumbnail");
productThumbnailImages.forEach(function (thumb) {
  thumb.addEventListener("click", function () {
    var fullImageSrc = thumb.src.replace("-thumbnail", "");
    mainProductImage.src = fullImageSrc;
    // ✅ Update product.thumbnail dynamically
    product.thumbnail = thumb.src;
    // Reset styles
    productThumbnailImages.forEach(function (t) {
      t.style.border = "none";
      t.style.opacity = "1";
    });
    thumb.style.border = "2px solid orange";
    thumb.style.opacity = "0.5";
  });
});
// --- DOM elements ---
var decreaseBtn = document.getElementById("decreaseBtn");
var increaseBtn = document.getElementById("increaseBtn");
var quantityDisplay = document.getElementById("quantityDisplay");
var cartCount = document.getElementById("cartCount");
var cartBtn = document.getElementById("cartBtn");
var cartDropdown = document.getElementById("cartDropdown");
var addToCartBtn = document.getElementById("addToCartBtn");
var cartItems = document.getElementById("cartItems");
var checkoutContainer = document.getElementById("checkoutContainer");
var menuBtn = document.getElementById("menuBtn");
var mobileMenu = document.getElementById("mobileMenu");
menuBtn.addEventListener("click", function () {
  mobileMenu.classList.toggle("hidden"); // Show/Hide menu
});
var closeMenuBtn = document.getElementById("closeMenuBtn");
closeMenuBtn.addEventListener("click", function () {
  mobileMenu.classList.add("hidden");
});
// --- State ---
var quantity = 0; // user selected
var cartQuantity = 0; // in cart
// --- Quantity buttons ---
increaseBtn.addEventListener("click", function () {
  quantity++;
  updateQuantityDisplay();
});
decreaseBtn.addEventListener("click", function () {
  if (quantity > 0) quantity--;
  updateQuantityDisplay();
});
function updateQuantityDisplay() {
  quantityDisplay.textContent = quantity.toString();
}
// --- Cart toggle ---
cartBtn.addEventListener("click", function () {
  cartDropdown.classList.toggle("hidden");
});
// --- Render cart ---
function renderCart() {
  if (cartQuantity > 0) {
    checkoutContainer.classList.remove("hidden");
    cartCount.textContent = cartQuantity.toString();
    cartCount.classList.remove("hidden");
    cartItems.innerHTML =
      '\n      <div class="flex items-center justify-between space-x-4">\n        <img src="'
        .concat(
          product.thumbnail,
          '" alt="Product Thumbnail" class="w-12 h-12 rounded-md" />\n        <div class="text-sm text-gray-600">\n          <p>',
        )
        .concat(product.title, "</p>\n          <p>$")
        .concat(product.price.toFixed(2), " x ")
        .concat(
          cartQuantity,
          ' \n            <span class="font-bold text-black">\n              $',
        )
        .concat(
          (product.price * cartQuantity).toFixed(2),
          '\n            </span>\n          </p>\n        </div>\n        <button id="deleteItem">\n          <img src="./images/icon-delete.svg" alt="Delete Icon" class="w-4 h-4" />\n        </button>\n      </div>\n    ',
        );
    var deleteBtn = document.getElementById("deleteItem");
    deleteBtn === null || deleteBtn === void 0
      ? void 0
      : deleteBtn.addEventListener("click", function () {
          cartQuantity = 0;
          renderCart();
        });
  } else {
    cartItems.innerHTML =
      '\n      <p class="text-gray-400 text-sm text-center">\n        Your cart is empty\n      </p>\n    ';
    cartCount.classList.add("hidden");
    checkoutContainer.classList.add("hidden");
  }
}
// --- Add to cart ---
addToCartBtn === null || addToCartBtn === void 0
  ? void 0
  : addToCartBtn.addEventListener("click", function () {
      if (quantity > 0) {
        cartQuantity = quantity;
        renderCart();
      }
    });
// Initial render
renderCart();
