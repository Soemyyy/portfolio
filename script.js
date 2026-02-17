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
