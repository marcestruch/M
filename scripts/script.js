document.addEventListener("DOMContentLoaded", () => {
    
    // Initialize Lenis for smooth scrolling
    let lenis;
    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    } else {
        console.warn("Lenis not loaded. Smooth scrolling disabled.");
        document.documentElement.style.scrollBehavior = "smooth";
    }

    // Connect GSAP ScrollTrigger to Lenis
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    } else {
        console.error("GSAP or ScrollTrigger not loaded.");
        return;
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor-follower');
    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: 'power2.out'
            });
        });

        // Hover effects for cursor
        const hoverElements = document.querySelectorAll('a, button, .project-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 3,
                    duration: 0.3
                });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    }

    // Menu Logic
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-links a');

    if (menuBtn && closeBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            menuOverlay.classList.add('active');
            gsap.fromTo(menuLinks, 
                {y: 100, opacity: 0},
                {y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2, ease: 'power4.out'}
            );
        });

        closeBtn.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
            });
        });
    }

    // ANIMATIONS

    // Hero Text Reveal
    const heroLines = document.querySelectorAll('.hero-title .line');
    if (heroLines.length > 0) {
        gsap.from(heroLines, {
            y: 200,
            opacity: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power4.out',
            delay: 0.5
        });
    }

    // Marquee Animation
    const marqueeText = document.querySelector('.marquee-text');
    if (marqueeText) {
        gsap.to(marqueeText, {
            xPercent: -50,
            ease: "none",
            duration: 20,
            repeat: -1
        });

        // Speed up on scroll
        gsap.to({}, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    // Optional: adjust speed based on scroll velocity
                }
            }
        });
    }

    // Project Items Reveal
    const projects = document.querySelectorAll('.project-item');
    projects.forEach(project => {
        gsap.from(project, {
            scrollTrigger: {
                trigger: project,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Music Section Parallax/Reveal
    const musicSection = document.querySelector('.music-section');
    const musicBanner = document.querySelector('.big-text-banner');

    if (musicSection && musicBanner) {
        gsap.fromTo(musicBanner.children, 
            { x: -100, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1,
                scrollTrigger: {
                    trigger: musicSection,
                    start: "top 70%",
                    end: "top 30%",
                    scrub: 1
                }
            }
        );
    }

    // About Text Reveal
    const aboutText = document.querySelector('.large-paragraph');
    if (aboutText) {
        gsap.from(aboutText, {
            scrollTrigger: {
                trigger: aboutText,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    }

    // Gallery Horizontal Scroll
    const gallerySection = document.querySelector('.gallery-section');
    const galleryTrack = document.querySelector('.gallery-track');
    
    if (gallerySection && galleryTrack) {
        // Calculate the total width to scroll
        // We need to know how much the track overflows the container
        // But since we want a simple horizontal scroll effect driven by vertical scroll:
        
        gsap.to(galleryTrack, {
            x: () => -(galleryTrack.scrollWidth - window.innerWidth + 100), // Scroll to end + padding
            ease: "none",
            scrollTrigger: {
                trigger: gallerySection,
                start: "top bottom", // Start when section enters viewport
                end: "bottom top",   // End when section leaves viewport
                scrub: 1             // Smooth scrubbing
            }
        });
    }

    // Footer Reveal
    const footer = document.querySelector('.main-footer');
    if (footer) {
        gsap.from(footer.querySelectorAll('h2, p, a'), {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            scrollTrigger: {
                trigger: footer,
                start: "top 80%",
            }
        });
    }

});