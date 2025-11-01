// Initialize animations
AOS.init();

// Get all necessary DOM elements
const popup = document.getElementById('contactPopup');
const contactBtn = document.getElementById('contactBtn');
const closePopup = document.getElementById('closePopup');
const emailBtn = document.getElementById('emailBtn');
const telegramBtn = document.getElementById('telegramBtn');

// Open popup when "Send Message" is clicked
contactBtn.addEventListener('click', (e) => {
  e.preventDefault();
  popup.classList.add('active');
});

// Close popup when "Close" button is clicked
closePopup.addEventListener('click', () => {
  popup.classList.remove('active');
});

// Send Email via mailto
emailBtn.addEventListener('click', () => {
  const name = encodeURIComponent(document.getElementById('name').value);
  const msg = encodeURIComponent(document.getElementById('message').value);
  window.open(
    `mailto:hubsensiofficial@gmail.com?subject=User%20Query%20from%20${name}&body=${msg}`,
    '_blank'
  );
});

// Send Telegram message (auto-filled)
telegramBtn.addEventListener('click', () => {
  const name = encodeURIComponent(document.getElementById('name').value);
  const msg = encodeURIComponent(document.getElementById('message').value);
  const phone = encodeURIComponent(document.getElementById('phone').value);
  const link = `https://t.me/anoop_628?text=Hello%2C%20my%20name%20is%20${name}%20(%20${phone}%20).%0A${msg}`;
  window.open(link, '_blank');
});
