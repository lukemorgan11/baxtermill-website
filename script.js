// EDIT: set this to the email address enquiries should go to
const ENQUIRY_EMAIL = "info@example.com";

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
const setMenu = open => {
  menu.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
};
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Header goes solid once you scroll past the top of the hero
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Enquiry form -> pre-filled email
document.getElementById('enquiry').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get('name')}\nContact: ${f.get('contact')}\nArrive: ${f.get('arrive')}\nDepart: ${f.get('depart')}\nType: ${f.get('type')}\n\n${f.get('message')}`;
  location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent('Booking enquiry – Baxter Mill')}&body=${encodeURIComponent(body)}`;
});
