/* ============================================================
   ADP — Ateliers de Paul | JS Partagé
   Cursor · Navbar scroll · Menu mobile · Scroll reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Cursor personnalisé ─────────────────────────────── */
    const cursor   = document.querySelector('.adp-cursor');
    const follower = document.querySelector('.adp-cursor-follower');

    if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity   = '1';
            follower.style.opacity = '0.8';
        });

        const animateCursor = () => {
            followerX += (mouseX - followerX) * 0.12;
            followerY += (mouseY - followerY) * 0.12;
            cursor.style.transform   = `translate3d(${mouseX}px,${mouseY}px,0) translate(-50%,-50%)`;
            follower.style.transform = `translate3d(${followerX}px,${followerY}px,0) translate(-50%,-50%)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Agrandir sur les éléments interactifs
        document.querySelectorAll('a, button, [data-hover]').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width   = '14px';
                cursor.style.height  = '14px';
                follower.style.width  = '52px';
                follower.style.height = '52px';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.width   = '8px';
                cursor.style.height  = '8px';
                follower.style.width  = '36px';
                follower.style.height = '36px';
            });
        });
    }

    /* ── Navbar scroll ───────────────────────────────────── */
    const navbar = document.querySelector('.adp-navbar');

    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // état initial
    }

    /* ── Menu mobile toggle ──────────────────────────────── */
    const toggle   = document.querySelector('.adp-menu-toggle');
    const navLinks = document.querySelector('.adp-nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen);

            // Animer les barres hamburger
            const bars = toggle.querySelectorAll('.adp-hamburger span');
            if (isOpen) {
                if (bars[0]) bars[0].style.transform = 'translateY(7px) rotate(45deg)';
                if (bars[1]) bars[1].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                if (bars[0]) bars[0].style.transform = '';
                if (bars[1]) bars[1].style.transform = '';
            }
        });

        // Fermer le menu au clic sur un lien
        navLinks.querySelectorAll('.adp-nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.querySelectorAll('.adp-hamburger span').forEach(b => b.style.transform = '');
            });
        });
    }

    /* ── Dropdown mobile (accordion) ────────────────────── */
    document.querySelectorAll('.adp-nav-dropdown > .adp-nav-item').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // Seulement en mobile (nav-links.open)
            if (!navLinks || !navLinks.classList.contains('open')) return;
            e.preventDefault();
            trigger.closest('.adp-nav-dropdown').classList.toggle('open');
        });
    });

    /* ── Scroll reveal (Intersection Observer) ───────────── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in-up').forEach(el => revealObserver.observe(el));

    /* ── BFCache : restaurer visibilité au retour ─────────── */
    window.addEventListener('pageshow', (e) => {
        if (e.persisted) {
            document.querySelectorAll('.fade-in-up').forEach(el => {
                el.classList.add('visible');
            });
        }
    });

    /* ── Active nav link (page courante) ─────────────────── */
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.adp-nav-item[href]').forEach(link => {
        const linkPath = link.getAttribute('href').replace(/\/$/, '') || '/';
        if (currentPath === linkPath || currentPath.startsWith(linkPath + '/')) {
            link.classList.add('active');
        }
    });

});
