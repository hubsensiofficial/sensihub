// -------------------- Initialize AOS (Animate On Scroll) --------------------
AOS.init({
  duration: 800,
  once: true,
  offset: 120,
});

// -------------------- Navbar Scroll Shadow Effect --------------------
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// -------------------- Contact Popup Logic --------------------
const popup = document.getElementById("contactPopup");
const contactBtn = document.getElementById("contactBtn");
const closePopup = document.getElementById("closePopup");
const emailBtn = document.getElementById("emailBtn");
const telegramBtn = document.getElementById("telegramBtn");

if (contactBtn) {
  contactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("active");
    popup.querySelector(".contact-box").classList.add("show");
  });
}

if (closePopup) {
  closePopup.addEventListener("click", () => {
    popup.classList.remove("active");
  });
}

// -------------------- Email & Telegram Message System --------------------
if (emailBtn) {
  emailBtn.addEventListener("click", () => {
    const name = encodeURIComponent(document.getElementById("name").value);
    const msg = encodeURIComponent(document.getElementById("message").value);
    const email = "hubsensiofficial@gmail.com";
    window.open(
      `mailto:${email}?subject=User%20Query%20from%20${name}&body=${msg}`,
      "_blank"
    );
  });
}

if (telegramBtn) {
  telegramBtn.addEventListener("click", () => {
    const name = encodeURIComponent(document.getElementById("name").value);
    const msg = encodeURIComponent(document.getElementById("message").value);
    const phone = encodeURIComponent(document.getElementById("phone").value);
    const link = `https://t.me/anoop_628?text=Hello%2C%20my%20name%20is%20${name}%20(%20${phone}%20).%0A${msg}`;
    window.open(link, "_blank");
  });
}

// -------------------- Smooth Scroll for Internal Links --------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// -------------------- Animate Buttons --------------------
const animatedButtons = document.querySelectorAll(".btn, .hero-btn, .contact-btn");
animatedButtons.forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
    btn.style.transition = "transform 0.2s ease";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});

// -------------------- FAQ Section Animation --------------------
const accordionButtons = document.querySelectorAll(".accordion-button");
accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

// -------------------- Scroll Reveal Animation (Extra Layer) --------------------
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// -------------------- Checkout Form (Auto Price Fill and Payment Logic) --------------------
if (window.location.pathname.includes("checkout.html")) {
  // Auto-fill price from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const price = urlParams.get("price") || 499;
  const priceField = document.getElementById("packagePrice");
  if (priceField) {
    priceField.textContent = price;
  }
  const amountField = document.getElementById("amount");
  if (amountField) {
    amountField.value = price;
  }

  // Update price display when amount input changes
  if (amountField) {
    amountField.addEventListener("input", function() {
      if (priceField) {
        priceField.textContent = this.value;
      }
    });
  }

  // Payment submission logic
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const countryCode = document.getElementById("countryCode").value;
      const amount = document.getElementById("amount").value;

      const loader = document.getElementById("loader");
      if (loader) {
        loader.style.display = "block";
      }

      // Simulate webhook payload
      const payload = {
        name: name,
        email: email,
        phone: countryCode + phone,
        amount: amount,
        method: "GoCreator"
      };
      console.log("Sending to webhook:", payload);

      // Redirect to GoCreator Payment Gateway
      setTimeout(() => {
        const paymentURL = `https://www.gocreator.in/dp?product=ac7bf376-721e-4bdc-a67d-9df309b45954&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(countryCode + phone)}&amount=${encodeURIComponent(amount)}`;
        window.location.href = paymentURL;
      }, 2000);
    });
  }
}

// -------------------- Floating Animation on Cards --------------------
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
    card.style.transition = "transform 0.3s ease";
    card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  });
});

// -------------------- Testimonials Carousel Auto-Play --------------------
const carousel = document.querySelector("#testimonialCarousel");
if (carousel) {
  const bsCarousel = new bootstrap.Carousel(carousel, {
    interval: 4000,
    ride: "carousel",
  });
}
