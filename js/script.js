document.addEventListener('DOMContentLoaded', () => {
  const loader = document.querySelector('.page-loader');
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('loaded'), 250));
  setTimeout(() => loader.classList.add('loaded'), 1800);

  const nav = document.querySelector('#mainNav');
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const count = document.querySelector('[data-count]');
  const countObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    const target = Number(count.dataset.count);
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      count.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 180);
    countObserver.disconnect();
  });
  if (count) countObserver.observe(count);

  document.querySelectorAll('.nav-link, .navbar .btn').forEach(link => link.addEventListener('click', () => {
    const menu = document.querySelector('#navbarMenu');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  window.addEventListener('scroll', () => {
    const active = sections.filter(section => window.scrollY >= section.offsetTop - 160).pop();
    navLinks.forEach(link => link.classList.toggle('active', active && link.getAttribute('href') === `#${active.id}`));
  }, { passive: true });

  const modalElement = document.querySelector('#galleryModal');
  const modalImage = document.querySelector('#modalImage');
  const galleryModal = new bootstrap.Modal(modalElement);
  document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
    modalImage.src = item.dataset.image;
    galleryModal.show();
  }));
  modalElement.addEventListener('hidden.bs.modal', () => { modalImage.src = ''; });

  const glow = document.querySelector('.cursor-glow');
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  document.querySelector('#year').textContent = new Date().getFullYear();
});
