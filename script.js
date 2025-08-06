document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavigation);

    // Mobile menu functionality for smaller screens
    function createMobileMenu() {
        const nav = document.querySelector('.nav-bar');
        const navMenu = document.querySelector('.nav-menu');
        
        // Only add mobile menu if screen is small
        if (window.innerWidth <= 768) {
            const mobileMenuButton = document.createElement('button');
            mobileMenuButton.innerHTML = '☰';
            mobileMenuButton.className = 'mobile-menu-button';
            mobileMenuButton.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--text-dark);
                cursor: pointer;
                padding: 0.5rem;
                position: absolute;
                right: 1rem;
                top: 50%;
                transform: translateY(-50%);
            `;
            
            nav.querySelector('.container').style.position = 'relative';
            nav.querySelector('.container').appendChild(mobileMenuButton);
            
            // Hide menu by default on mobile
            navMenu.style.display = 'none';
            
            mobileMenuButton.addEventListener('click', function() {
                if (navMenu.style.display === 'none') {
                    navMenu.style.display = 'flex';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.right = '0';
                    navMenu.style.background = 'var(--bg-primary)';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.padding = '1rem 0';
                    navMenu.style.boxShadow = 'var(--shadow-medium)';
                    mobileMenuButton.innerHTML = '✕';
                } else {
                    navMenu.style.display = 'none';
                    mobileMenuButton.innerHTML = '☰';
                }
            });
            
            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navMenu.style.display = 'none';
                    mobileMenuButton.innerHTML = '☰';
                });
            });
        }
    }

    // Initialize mobile menu
    createMobileMenu();

    // Reinitialize on window resize
    window.addEventListener('resize', function() {
        // Remove existing mobile menu elements
        const existingButton = document.querySelector('.mobile-menu-button');
        if (existingButton) {
            existingButton.remove();
        }
        
        // Reset nav menu styles
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.display = '';
        navMenu.style.position = '';
        navMenu.style.top = '';
        navMenu.style.left = '';
        navMenu.style.right = '';
        navMenu.style.background = '';
        navMenu.style.flexDirection = '';
        navMenu.style.padding = '';
        navMenu.style.boxShadow = '';
        
        // Recreate mobile menu if needed
        createMobileMenu();
    });

    console.log('2025年夏の大自由研究発表会ページが読み込まれました！');
    
    // Add typewriter effect to hero subtitle
    typeWriterEffect();
    
    // Add optimized scroll reveal animations
    addOptimizedScrollRevealAnimations();
});


// Typewriter effect
function typeWriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid white';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < originalText.length) {
            subtitle.textContent += originalText.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    }, 80);
}

// Optimized fast scroll reveal animations
function addOptimizedScrollRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-animate');
            }
        });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll('.note-item, .method-item, .year-link, .datetime-card, .venue-card');
    revealElements.forEach((element, index) => {
        element.style.cssText += `
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.2s ease ${index * 0.02}s;
        `;
        observer.observe(element);
    });
    
    // Add CSS for reveal animation and essential keyframes
    const style = document.createElement('style');
    style.textContent = `
        .reveal-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Essential lightweight animations */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes sparkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;
    document.head.appendChild(style);
}

