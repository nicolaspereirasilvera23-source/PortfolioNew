// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Mobile menu (simple toggle -> scrolls to nav links shown as list)
const toggle = document.getElementById('menuToggle');
if(toggle){
  toggle.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.position = 'absolute';
    links.style.top = '58px';
    links.style.right = '20px';
    links.style.background = '#F7F1E2';
    links.style.border = '1.5px solid #221D26';
    links.style.borderRadius = '8px';
    links.style.padding = '16px 20px';
    links.style.flexDirection = 'column';
    links.style.gap = '14px';
    links.style.boxShadow = '4px 4px 0 #6A46E5';
  });
}
