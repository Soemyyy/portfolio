// 1. Animation au défilement (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Gestion de la modale Mentions Légales
const modal = document.getElementById("legal-modal");
const btn = document.getElementById("open-legal");
const span = document.querySelector(".close-modal");

// Ouvrir la modale
if (btn) {
    btn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Empêche le scroll derrière
    }
}

// Fermer avec la croix
if (span) {
    span.onclick = function() {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Fermer en cliquant en dehors de la fenêtre
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}
// Effet de parallaxe sur les cartes (pour le côté complexe et 3D)
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});
