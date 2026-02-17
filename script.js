const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const bars = entry.target.querySelectorAll('.progress');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gestion Modale Mentions Légales
const modal = document.getElementById("legalModal");
const btn = document.getElementById("openModal");
const span = document.getElementById("closeModal");

btn.onclick = (e) => { e.preventDefault(); modal.style.display = "block"; }
span.onclick = () => { modal.style.display = "none"; }
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }
