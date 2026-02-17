// Animation au défilement
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const bars = entry.target.querySelectorAll('.progress');
            bars.forEach(bar => bar.style.width = bar.getAttribute('data-width'));
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gestion Modale
const modal = document.getElementById("legalModal");
const btn = document.getElementById("openModal");
const close = document.querySelector(".close-btn");

btn.onclick = () => modal.style.display = "block";
close.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; }
