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

// Hero slideshow: uses whichever photos in .hero-slides actually load.
// With none, the drawn scene stays on show.
(() => {
  const SECONDS_PER_PHOTO = 6;
  const hero = document.querySelector('.hero');
  const dotsWrap = document.querySelector('.hero-dots');
  const imgs = [...document.querySelectorAll('.hero-slides img')];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const loaded = img => new Promise(res => {
    if (img.complete) return res(img.naturalWidth > 0);
    img.addEventListener('load', () => res(true), { once: true });
    img.addEventListener('error', () => res(false), { once: true });
  });

  Promise.all(imgs.map(loaded)).then(ok => {
    imgs.forEach((img, i) => { if (!ok[i]) img.remove(); });
    const slides = imgs.filter((_, i) => ok[i]);
    if (!slides.length) return;
    hero.classList.add('has-photos');

    let current = 0, timer;
    const dots = slides.length > 1 ? slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Photo ${i + 1} of ${slides.length}`);
      b.addEventListener('click', () => { show(i); start(); });
      dotsWrap.append(b);
      return b;
    }) : [];

    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle('active', j === current));
      dots.forEach((d, j) => d.setAttribute('aria-current', j === current));
    }
    function start() {
      clearInterval(timer);
      if (slides.length > 1 && !reduceMotion && !document.hidden) {
        timer = setInterval(() => show(current + 1), SECONDS_PER_PHOTO * 1000);
      }
    }
    document.addEventListener('visibilitychange', start);
    show(0);
    start();
  });
})();

// Enquiry form -> pre-filled email
document.getElementById('enquiry').addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const body = `Name: ${f.get('name')}\nContact: ${f.get('contact')}\nArrive: ${f.get('arrive')}\nDepart: ${f.get('depart')}\nType: ${f.get('type')}\n\n${f.get('message')}`;
  location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent('Booking enquiry – Baxter Mill')}&body=${encodeURIComponent(body)}`;
});
