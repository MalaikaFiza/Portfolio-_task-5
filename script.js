/* Shared behavior across pages:
   - mobile menu toggle
   - active nav highlight
   - smooth scroll for same-page anchor links
   - form validation on contact page
   - reveal-on-scroll simple effect
*/

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');

menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Active nav highlight (based on filename)
function setActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === current || (href === 'index.html' && current === '')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}
setActiveNav();

// Smooth scroll for in-page anchors (only if target on same page)
document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // If it's linking to another page (contact.html etc.), let browser handle it
    if (href.includes('http') || href.includes('contact.html') || href.includes('about.html')) {
      // close mobile nav if open
      nav.classList.remove('active');
      return;
    }
    // Otherwise it's a hash link or index.html#... - smooth scroll if element exists
    const id = href.split('#')[1];
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      nav.classList.remove('active');
    }
  });
});

// Simple reveal-on-scroll for some elements
const revealEls = document.querySelectorAll('.card, .project-card, .team-card, .hero-text, .split-image, .split-text');
revealEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'transform .8s ease, opacity .8s ease';
});
function revealOnScroll(){
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Contact form validation (contact.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
      status.textContent = 'Please complete all required fields.';
      status.style.color = '#b91c1c';
      return;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      status.style.color = '#b91c1c';
      return;
    }

    // Simulated submit success (this is front-end only)
    status.textContent = 'Message sent successfully — thank you!';
    status.style.color = '#065f46';
    contactForm.reset();
  });
  }
