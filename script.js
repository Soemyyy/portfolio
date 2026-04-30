/* ══════════════════════════════════════════
   SARAH NOUVIAN · Portfolio 2026 · script.js
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── CUSTOM CURSOR ─────────────────────── */
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');

    if (cursor && ring) {
        let mx = -200, my = -200, rx = -200, ry = -200;
        cursor.style.opacity = '0';
        ring.style.opacity   = '0';

        document.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left    = (mx - 4)  + 'px';
            cursor.style.top     = (my - 4)  + 'px';
            cursor.style.opacity = '1';
            ring.style.opacity   = '0.6';
        });

        (function animRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = (rx - 16) + 'px';
            ring.style.top  = (ry - 16) + 'px';
            requestAnimationFrame(animRing);
        })();

        document.querySelectorAll('a, button').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursor.style.transform = 'scale(2.5)';
                ring.style.transform   = 'scale(1.6)';
                ring.style.opacity     = '1';
            });
            el.addEventListener('mouseleave', function () {
                cursor.style.transform = 'scale(1)';
                ring.style.transform   = 'scale(1)';
                ring.style.opacity     = '0.6';
            });
        });
    }

    /* ── NAV AU SCROLL ─────────────────────── */
    const nav = document.getElementById('mainNav');
    function handleNavScroll() {
        if (nav) {
            nav.classList.toggle('scrolled', window.scrollY > 60);
        }
        const btn = document.getElementById('backToTop');
        if (btn) btn.classList.toggle('visible', window.scrollY > 400);
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    /* ── BOUTON RETOUR EN HAUT ─────────────── */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── MOBILE MENU ───────────────────────── */
    const burger     = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        document.querySelectorAll('.mm-link').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ── REVEAL AU SCROLL ──────────────────── */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) {
        revealObserver.observe(el);
    });

    /* ── MODALE MENTIONS LÉGALES ───────────── */
    const modal      = document.getElementById('legalModal');
    const closeModal = document.getElementById('closeModal');

    if (modal && closeModal) {
        closeModal.addEventListener('click', function () {
            modal.classList.remove('open');
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) modal.classList.remove('open');
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') modal.classList.remove('open');
        });
    }

    /* ── BARRE DE PROGRESSION LECTURE ─────── */
    const progressBar = document.createElement('div');
    progressBar.id = 'readProgress';
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:var(--gold);z-index:2000;width:0%;transition:width 0.1s linear;pointer-events:none;';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        const docH   = document.documentElement.scrollHeight - window.innerHeight;
        const pct    = docH > 0 ? (window.scrollY / docH) * 100 : 0;
        progressBar.style.width = pct + '%';
    }, { passive: true });

    /* ── NAV ACTIVE LINK ───────────────────── */
    const sections  = document.querySelectorAll('section[id], header[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

    const activeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(function (sec) { activeObserver.observe(sec); });

    /* ── ANIMATION BARRES DE COMPÉTENCES ──── */
    const fills = document.querySelectorAll('.sp-fill');
    const barObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'width 0.8s cubic-bezier(0.4,0,0.2,1)';
                barObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    fills.forEach(function (fill) {
        const targetW = fill.style.width;
        fill.style.width = '0%';
        barObserver.observe(fill);
        setTimeout(function () {
            fill.style.width = targetW;
        }, 200);
    });

});
