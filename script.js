/* ============================================================
   SENSIHUB WEBSITE SCRIPT.JS
   Author: SensiHub Developers
   Purpose: Handle animations, redirects, and UI effects
   ============================================================ */

// 🔹 Initialize AOS Animations (global)
document.addEventListener("DOMContentLoaded", function () {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Floating effect for hero icons or animated shapes (like draw/star/earth)
  const floatingEls = document.querySelectorAll(".float-anim");
  floatingEls.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.3}s`;
  });
});

// 🔹 Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

// 🔹 Animate package cards on hover
const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.classList.add("hovered");
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("hovered");
  });
});

// 🔹 Redirect to Checkout Page with price
document.querySelectorAll(".btn.btn-primary, .buy-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const priceText = this.parentElement.querySelector("strong");
    const price = priceText ? priceText.textContent.replace("₹", "").trim() : 0;
    window.location.href = `checkout.html?price=${price}`;
  });
});

// 🔹 Floating effect on buttons
document.querySelectorAll("button, .btn").forEach((btn) => {
  btn.addEventListener("mousemove", function (e) {
    const x = e.offsetX;
    const y = e.offsetY;
    this.style.setProperty("--x", `${x}px`);
    this.style.setProperty("--y", `${y}px`);
  });
});

// 🔹 FAQ Section Animation (if available)
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    faqItems.forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.style.maxHeight = null;
    }
  });
});

// 🔹 Checkout Form Auto Price Fill
if (window.location.pathname.includes("checkout.html")) {
  const params = new URLSearchParams(window.location.search);
  const price = params.get("price") || "0";
  const priceElement = document.getElementById("packagePrice");
  if (priceElement) {
    priceElement.textContent = price;
  }

  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const code = document.getElementById("countryCode").value;
      const loader = document.getElementById("loader");

      if (!name || !email || !phone) {
        alert("Please fill all required fields");
        return;
      }

      loader.style.display = "block";

      setTimeout(() => {
        const paymentURL = `https://www.gocreator.in/dp?product=ac7bf376-721e-4bdc-a67d-9df309b45954&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(code + phone)}&amount=${encodeURIComponent(price)}`;
        window.location.href = paymentURL;
      }, 1500);
    });
  }
}

// 🔹 Glow animation on important text (auto-highlight)
const highlights = document.querySelectorAll(".highlight");
if (highlights.length > 0) {
  highlights.forEach((el) => {
    el.style.transition = "all 0.5s ease";
    el.style.animation = "glow 2s infinite alternate";
  });

  const style = document.createElement("style");
  style.textContent = `
    @keyframes glow {
      from { text-shadow: 0 0 5px rgba(26,115,232,0.5); color: #1a73e8; }
      to { text-shadow: 0 0 20px rgba(26,115,232,0.9); color: #0b57d0; }
    }
  `;
  document.head.appendChild(style);
}

// 🔹 Add random AOS effect for stars/earth/draw icons
const animIcons = document.querySelectorAll(".icon-anim");
const effects = ["fade-up", "fade-down", "zoom-in", "flip-left", "flip-right"];
animIcons.forEach((icon) => {
  const random = effects[Math.floor(Math.random() * effects.length)];
  icon.setAttribute("data-aos", random);
});
