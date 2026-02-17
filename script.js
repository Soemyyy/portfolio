/* ── CUSTOM CURSOR ─────────────────────────────────── */
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx - 4 + 'px';
    cursor.style.top  = my - 4 + 'px';
});

function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx - 16 + 'px';
    ring.style.top  = ry - 16 + 'px';
    requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
});

/* ── REVEAL AU SCROLL ──────────────────────────────── */
// On cache d'abord via JS, puis on anime — si JS est désactivé, tout reste visible
document.querySelectorAll('.reveal').forEach(el => el.classList.add('hidden'));

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 50);
        }
    });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── NAV — FOND AU SCROLL ──────────────────────────── */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    nav.style.background = window.scrollY > 50
        ? 'rgba(6, 8, 16, 0.95)'
        : 'rgba(6, 8, 16, 0.7)';
});

/* ── MODALE MENTIONS LÉGALES ───────────────────────── */
const modal = document.getElementById('legalModal');

document.getElementById('openModal').onclick = e => {
    e.preventDefault();
    modal.classList.add('open');
};

document.getElementById('closeModal').onclick = () => {
    modal.classList.remove('open');
};

modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('open');
});
