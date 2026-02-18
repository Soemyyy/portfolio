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

    // Bouton retour en haut
    const btn = document.getElementById('backToTop');
    if (btn) {
        btn.classList.toggle('visible', window.scrollY > 400);
    }
});

/* ── BOUTON RETOUR EN HAUT ─────────────────────────── */
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

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
