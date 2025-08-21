interface Product {
  title: string;
  price: number;
  thumbnail: string;
}

// --- Example product ---
const product: Product = {
  title: "Fall Limited Edition Sneakers",
  price: 125.0,
  thumbnail: "./images/image-product-1-thumbnail.jpg", // default
};

// --- DOM elements ---
const mainProductImage = document.getElementById(
  "mainImage",
) as HTMLImageElement;
const productThumbnailImages = document.querySelectorAll(
  ".thumbnail",
) as NodeListOf<HTMLImageElement>;

const decreaseBtn = document.getElementById("decreaseBtn") as HTMLButtonElement;
const increaseBtn = document.getElementById("increaseBtn") as HTMLButtonElement;
const quantityDisplay = document.getElementById(
  "quantityDisplay",
) as HTMLParagraphElement;
const cartCount = document.getElementById("cartCount") as HTMLSpanElement;
const cartBtn = document.getElementById("cartBtn") as HTMLButtonElement;
const cartDropdown = document.getElementById("cartDropdown") as HTMLDivElement;
const addToCartBtn = document.getElementById(
  "addToCartBtn",
) as HTMLButtonElement;
const cartItems = document.getElementById("cartItems") as HTMLDivElement;
const checkoutContainer = document.getElementById(
  "checkoutContainer",
) as HTMLDivElement;

const prevBtn = document.getElementById("prevBtn") as HTMLButtonElement;
const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;

// --- State ---
let quantity = 0;
let cartQuantity = 0;
let currentIndex = 0;

const images = [
  "./images/image-product-1.jpg",
  "./images/image-product-2.jpg",
  "./images/image-product-3.jpg",
  "./images/image-product-4.jpg",
];

// --- Helper: update thumbnail path ---
function getThumbnailPath(fullImage: string): string {
  return fullImage.replace(".jpg", "-thumbnail.jpg");
}

// --- Quantity buttons ---
increaseBtn.addEventListener("click", () => {
  quantity++;
  updateQuantityDisplay();
});

decreaseBtn.addEventListener("click", () => {
  if (quantity > 0) quantity--;
  updateQuantityDisplay();
});

function updateQuantityDisplay() {
  quantityDisplay.textContent = quantity.toString();
}

// --- Cart toggle ---
cartBtn.addEventListener("click", () => {
  cartDropdown.classList.toggle("hidden");
});

// --- Render cart ---
function renderCart() {
  if (cartQuantity > 0) {
    checkoutContainer.classList.remove("hidden");
    cartCount.textContent = cartQuantity.toString();
    cartCount.classList.remove("hidden");

    cartItems.innerHTML = `
      <div class="flex items-center justify-between space-x-4">
        <img src="${product.thumbnail}" alt="Product Thumbnail" class="w-12 h-12 rounded-md" />
        <div class="text-sm text-gray-600">
          <p>${product.title}</p>
          <p>$${product.price.toFixed(2)} x ${cartQuantity} 
            <span class="font-bold text-black">
              $${(product.price * cartQuantity).toFixed(2)}
            </span>
          </p>
        </div>
        <button id="deleteItem">
          <img src="./images/icon-delete.svg" alt="Delete Icon" class="w-4 h-4" />
        </button>
      </div>
    `;

    const deleteBtn = document.getElementById(
      "deleteItem",
    ) as HTMLButtonElement;
    deleteBtn?.addEventListener("click", () => {
      cartQuantity = 0;
      renderCart();
    });
  } else {
    cartItems.innerHTML = `
      <p class="text-gray-400 text-sm text-center">
        Your cart is empty
      </p>
    `;
    cartCount.classList.add("hidden");
    checkoutContainer.classList.add("hidden");
  }
}

// --- Add to cart ---
addToCartBtn?.addEventListener("click", () => {
  if (quantity > 0) {
    // ✅ Always use current main image for thumbnail
    product.thumbnail = getThumbnailPath(mainProductImage.src);
    cartQuantity = quantity;
    renderCart();
  }
});

// --- Slider Controls ---
function updateImage(index: number) {
  currentIndex = index;
  mainProductImage.src = images[currentIndex];
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage(currentIndex);
});

// --- Thumbnails ---
productThumbnailImages.forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    const fullImageSrc = thumb.src.replace("-thumbnail", "");
    mainProductImage.src = fullImageSrc;

    // ✅ Update product thumbnail dynamically
    product.thumbnail = thumb.src;

    // Reset styles
    productThumbnailImages.forEach((t) => {
      t.style.border = "none";
      t.style.opacity = "1";
    });

    thumb.style.border = "2px solid orange";
    thumb.style.opacity = "0.5";

    currentIndex = index;
  });
});

// --- Initial render ---
renderCart();
