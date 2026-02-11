/* ================= MOBILE MENU ================= */

function openMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  if (menu && overlay) {
    menu.classList.add("active");
    overlay.classList.add("active");
  }
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");
  if (menu && overlay) {
    menu.classList.remove("active");
    overlay.classList.remove("active");
  }
}

/* ================= PRODUCT SLIDER ================= */

const container = document.getElementById("productContainer");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

if (container && nextBtn && prevBtn) {
  nextBtn.onclick = () => (container.scrollLeft += 300);
  prevBtn.onclick = () => (container.scrollLeft -= 300);
}

/* ================= COUNTDOWN TIMER ================= */

const daysEl = document.getElementById("days");

if (daysEl) {
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 24);

  setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById("days").innerText = d;
    document.getElementById("hours").innerText = h;
    document.getElementById("minutes").innerText = m;
    document.getElementById("seconds").innerText = s;
  }, 1000);
}

/* ================= SCROLL TO TOP ================= */

const scrollBtn = document.getElementById("scrollTopBtn");

if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300) {
      scrollBtn.style.display = "flex";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

/* ================= EMAIL SUBSCRIBE ================= */

const subscribeForm = document.getElementById("subscribeForm");

if (subscribeForm) {
  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailInput").value;
    localStorage.setItem("customerEmail", email);

    alert("Subscribed Successfully!");
    document.getElementById("emailInput").value = "";
  });
}

/* ================= CART SYSTEM ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---- ADD TO CART ---- */
document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = {
      id: button.dataset.id,
      name: button.dataset.name,
      price: parseFloat(button.dataset.price),
      img: button.dataset.img,
      qty: 1,
    };

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty++;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Item added to cart!");
  });
});

/* ---- LOAD CART PAGE ---- */

function loadCart() {
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;

  let subtotal = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    subtotal += item.price * item.qty;

    cartItems.innerHTML += `
<div class="cart-row">

    <div class="cart-product">
        
        <img src="${item.img}">
        <p>${item.name}</p>
        <button class="remove-btn" onclick="removeItem(${index})">  <i class="fa-solid fa-trash"></i>×</button>
    </div>

    <div>$${item.price}</div>

    <div>
        <input type="number" min="1" value="${item.qty}" onchange="updateQty(${index},this.value)">
    </div>

    <div>$${item.price * item.qty}</div>

</div>`;
  });

  const sub = document.getElementById("subtotal");
  const total = document.getElementById("total");

  if (sub && total) {
    sub.innerText = "$" + subtotal;
    total.innerText = "$" + subtotal;
  }
}

/* ---- UPDATE QUANTITY ---- */
function updateQty(index, value) {
  cart[index].qty = parseInt(value);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
/* ---- REMOVE ITEM ---- */
function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}


loadCart();
