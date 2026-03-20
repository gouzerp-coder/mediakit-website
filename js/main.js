/* ============================================
   STUDIO BARNUEVO — Main JavaScript
   ============================================ */

(function () {
    'use strict';

    // --- Loader ---
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loader-progress');
    let loadProgress = 0;

    function updateLoader() {
        loadProgress += Math.random() * 30;
        if (loadProgress > 100) loadProgress = 100;
        progress.style.width = loadProgress + '%';

        if (loadProgress < 100) {
            setTimeout(updateLoader, 200 + Math.random() * 300);
        } else {
            setTimeout(function () {
                loader.classList.add('loaded');
                document.body.style.overflow = '';
                initAnimations();
            }, 400);
        }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('load', function () {
        setTimeout(updateLoader, 300);
    });

    // --- Header scroll effect ---
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- Mobile menu ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll reveal animations ---
    function initAnimations() {
        var reveals = document.querySelectorAll('.reveal');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(function (el) {
            observer.observe(el);
        });

        // Counter animation for stats
        initCounters();
    }

    // --- Counter animation ---
    function initCounters() {
        var counters = document.querySelectorAll('.stat-number[data-count]');

        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-count'), 10);
        var duration = 2000;
        var start = 0;
        var startTime = null;

        function update(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    }

    // --- Project filter ---
    var filterBtns = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');

            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            projectCards.forEach(function (card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function () {
                        card.style.transition = 'opacity 0.5s, transform 0.5s';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // --- Contact form ---
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('.btn-submit');
            var originalText = btn.innerHTML;
            btn.innerHTML = 'Message Sent &#10003;';
            btn.style.background = 'var(--color-accent)';
            btn.style.color = '#fff';
            setTimeout(function () {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                form.reset();
            }, 3000);
        });
    }

    // --- Parallax on hero image ---
    var heroImage = document.querySelector('.hero-image');
    if (heroImage && window.innerWidth > 768) {
        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = 'scale(' + (1.05 - scrolled * 0.00005) + ') translateY(' + (scrolled * 0.3) + 'px)';
            }
        }, { passive: true });
    }

})();
