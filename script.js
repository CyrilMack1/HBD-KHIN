document.addEventListener('DOMContentLoaded', () => {
    // 1. Welcome Screen Interaction
    const beginBtn = document.getElementById('begin-btn');
    const welcomeSection = document.getElementById('welcome');
    
    if (beginBtn && welcomeSection) {
        // Assume CSS hides body overflow initially: body { overflow: hidden; }
        beginBtn.addEventListener('click', () => {
            welcomeSection.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            
            // Smooth scroll to the next section if needed
            const nextSection = document.getElementById('greeting');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. Scroll-based Fade-in Animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Show all elements immediately if reduced motion is preferred
        fadeElements.forEach(el => el.classList.add('visible'));
    } else {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Only animate once per element
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    }

    // 3. Music Control
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle) {
        const audio = new Audio('assets/Happy Birthday Song 🎂 _ Singing Candle Barbershop Quartet (Funny Birthday Video) [1CQ1NzP0zhU].mp3');
        audio.loop = true;
        let isPlaying = false;

        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                musicToggle.classList.remove('playing');
            } else {
                audio.play().then(() => {
                    isPlaying = true;
                    musicToggle.classList.add('playing');
                }).catch(error => {
                    console.error('Audio playback failed or file not found:', error);
                });
            }
        });
    }

    // 4. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 5. Decorative Trail Animation
    const trailPath = document.querySelector('.trail-svg .trail-path');
    if (trailPath && !prefersReducedMotion) {
        const pathLength = trailPath.getTotalLength();
        
        // Set up initial state for drawing animation
        trailPath.style.strokeDasharray = pathLength;
        trailPath.style.strokeDashoffset = pathLength;
        
        // Trigger a reflow so the style changes are applied before animation begins
        trailPath.getBoundingClientRect();
        
        // Define transition and animate it in
        trailPath.style.transition = 'stroke-dashoffset 3s ease-in-out';
        
        // Small delay to coordinate with the welcome screen fade
        setTimeout(() => {
            trailPath.style.strokeDashoffset = '0';
        }, 800);
    }
});
