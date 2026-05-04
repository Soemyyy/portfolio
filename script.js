/* ══════════════════════════════════════════
   SARAH NOUVIAN · Portfolio 2026 · script.js
   Animations scroll, cursor, nav, barres
   ══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── PROGRESS BAR ──────────────────────── */
    const progressBar = document.getElementById('readProgress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            const pct  = docH > 0 ? (window.scrollY / docH) * 100 : 0;
            progressBar.style.width = pct + '%';
        }, { passive: true });
    }

    /* ── CUSTOM CURSOR ─────────────────────── */
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');

    if (cursor && ring) {
        let mx = -200, my = -200, rx = -200, ry = -200;
        cursor.style.opacity = '0';
        ring.style.opacity   = '0';

        document.addEventListener('mousemove', function (e) {
            mx = e.clientX; my = e.clientY;
            cursor.style.left    = (mx - 4) + 'px';
            cursor.style.top     = (my - 4) + 'px';
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
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
        if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ── MOBILE MENU ───────────────────────── */
    const burger     = document.getElementById('navBurger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mmClose    = document.getElementById('mmClose');

    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (burger && mobileMenu) {
        burger.addEventListener('click', function () {
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
    }
    if (mmClose) mmClose.addEventListener('click', closeMobileMenu);
    document.querySelectorAll('.mm-link').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ── MODAL ─────────────────────────────── */
    const modal      = document.getElementById('legalModal');
    const closeModal = document.getElementById('closeModal');

    if (modal && closeModal) {
        closeModal.addEventListener('click', function () { modal.classList.remove('open'); });
        modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.remove('open'); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') modal.classList.remove('open'); });
    }

    /* ══════════════════════════════════════
       ANIMATIONS AU SCROLL — IntersectionObserver
       ══════════════════════════════════════ */

    /* Sélecteurs des éléments à animer */
    const animSelectors = [
        '.reveal-up', '.reveal-left', '.reveal-right',
        '.reveal-title', '.reveal-label', '.reveal-bg',
        '.reveal-hero', '.reveal-hero-img', '.sc-anim'
    ];
    const allAnimEls = document.querySelectorAll(animSelectors.join(','));

    const scrollObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    allAnimEls.forEach(function (el) { scrollObserver.observe(el); });

    /* ── DÉCALAGE DES CARTES STAT ──────────── */
    document.querySelectorAll('.sc-anim').forEach(function (el, i) {
        el.style.transitionDelay = (i * 0.1) + 's';
    });

    /* ── HERO — déclenché immédiatement ───── */
    setTimeout(function () {
        document.querySelectorAll('.reveal-hero, .reveal-hero-img').forEach(function (el) {
            el.classList.add('in');
        });
    }, 100);

    /* ══════════════════════════════════════
       BARRES DE COMPÉTENCES
       Animer quand elles entrent dans la vue
       ══════════════════════════════════════ */
    const fills = document.querySelectorAll('.sp-fill');

    const barObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const target  = entry.target;
                const percent = target.getAttribute('data-width') || '0';
                setTimeout(function () {
                    target.style.width = percent + '%';
                }, 200);
                barObserver.unobserve(target);
            }
        });
    }, { threshold: 0.1 });

    fills.forEach(function (fill) {
        fill.style.width = '0%';
        barObserver.observe(fill);
    });

    /* ══════════════════════════════════════
       NAV ACTIVE LINK au scroll
       ══════════════════════════════════════ */
    const sections  = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const activeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navAnchors.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(function (sec) { activeObserver.observe(sec); });

    /* ══════════════════════════════════════
       PARALLAXE LÉGER sur le hero bg-num
       ══════════════════════════════════════ */
    const bgNums = document.querySelectorAll('.section-bg-num');
    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                const scrollY = window.scrollY;
                bgNums.forEach(function (num) {
                    const parent = num.closest('.section');
                    if (!parent) return;
                    const rect = parent.getBoundingClientRect();
                    const mid  = rect.top + rect.height / 2;
                    const offset = (window.innerHeight / 2 - mid) * 0.04;
                    num.style.transform = 'translateY(' + offset + 'px) scale(1)';
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    /* ══════════════════════════════════════
       COMPTEUR ANIMÉ sur les stats du hero
       ══════════════════════════════════════ */
    function animateCounter(el, target, duration) {
        const isInf = target === '∞';
        if (isInf) { el.textContent = '∞'; return; }
        const num = parseInt(target.replace('+', '').replace('∞', ''));
        const suffix = target.includes('+') ? '+' : '';
        let start = 0;
        const step = num / (duration / 16);
        function update() {
            start += step;
            if (start >= num) { el.textContent = num + suffix; return; }
            el.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const el  = entry.target;
                const val = el.getAttribute('data-target');
                if (val) animateCounter(el, val, 800);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hstat-n').forEach(function (el) {
        const txt = el.textContent.trim();
        el.setAttribute('data-target', txt);
        el.textContent = '0';
        counterObserver.observe(el);
    });

    document.querySelectorAll('.asc-num').forEach(function (el) {
        const txt = el.textContent.trim();
        el.setAttribute('data-target', txt);
        el.textContent = el.closest('.dark') ? '0' : '0';
        counterObserver.observe(el);
    });

});
