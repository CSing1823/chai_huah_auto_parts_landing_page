/* ====================================
   CHAI HUAH AUTO - CUSTOM JAVASCRIPT
   Animations & Interactive Features
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    // ============= SMOOTH SCROLLING ============= 
    // Handle smooth scrolling for navigation links
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element ID
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Close mobile menu if it's open
            const navbarToggle = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggle.click();
            }
            
            // Scroll to target with offset for fixed navbar
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============= NAVBAR ACTIVE STATE ============= 
    // Update active navigation link based on scroll position
    const updateNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // Update navigation on scroll
    window.addEventListener('scroll', updateNavigation);

    // ============= SCROLL ANIMATIONS ============= 
    // Animate elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.style.opacity = '1';
                
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                } else if (entry.target.classList.contains('why-choose-card')) {
                    entry.target.style.animation = 'scaleIn 0.6s ease-out forwards';
                } else if (entry.target.classList.contains('stat-box')) {
                    entry.target.style.animation = 'scaleIn 0.6s ease-out forwards';
                }
                
                // Stop observing once animation is applied
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.service-card, .why-choose-card, .stat-box, .brand-box, .gallery-item').forEach(element => {
        observer.observe(element);
    });

    // ============= FORM HANDLING ============= 
    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toLocaleString()
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                showFormMessage('Please fill in all required fields.', 'danger');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showFormMessage('Please enter a valid email address.', 'danger');
                return;
            }

            // Validate phone
            const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
            if (!phoneRegex.test(formData.phone)) {
                showFormMessage('Please enter a valid phone number.', 'danger');
                return;
            }

            // Store form data in localStorage for demonstration
            // In production, this would be sent to a server
            const existingForms = JSON.parse(localStorage.getItem('contactForms') || '[]');
            existingForms.push(formData);
            localStorage.setItem('contactForms', JSON.stringify(existingForms));

            // Show success message
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');

            // Log to console (for development)
            console.log('Form Data:', formData);

            // Reset form
            contactForm.reset();

            // Optional: Create WhatsApp message link
            const whatsappMessage = `Hi Chai Huah Auto,%0A%0AName: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0AService: ${formData.service}%0AMessage: ${formData.message}`;
            console.log('WhatsApp Link:', `https://wa.me/601110711896?text=${whatsappMessage}`);
        });
    }

    // Function to show form messages
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `alert alert-${type}`;
        formMessage.style.display = 'block';

        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // ============= NAVBAR BACKGROUND ON SCROLL ============= 
    // Add background color to navbar on scroll
    const navbar = document.querySelector('.navbar-custom');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // ============= COUNTER ANIMATION ============= 
    // Animate counters in stats section
    const animateCounters = () => {
        const statBoxes = document.querySelectorAll('.stat-box h3');
        let hasAnimated = false;

        const observerForCounters = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    statBoxes.forEach(box => {
                        const finalValue = box.textContent;
                        const numericValue = parseInt(finalValue);
                        
                        if (!isNaN(numericValue)) {
                            let currentValue = 0;
                            const increment = numericValue / 30;
                            
                            const counter = setInterval(() => {
                                currentValue += increment;
                                if (currentValue >= numericValue) {
                                    box.textContent = finalValue;
                                    clearInterval(counter);
                                } else {
                                    box.textContent = Math.floor(currentValue) + (finalValue.includes('+') ? '+' : finalValue.includes('k') ? 'k' : '');
                                }
                            }, 20);
                        }
                    });
                    
                    hasAnimated = true;
                    observerForCounters.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            observerForCounters.observe(aboutSection);
        }
    };

    animateCounters();

    // ============= PARALLAX EFFECT ============= 
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        });
    }

    // ============= GALLERY LIGHTBOX =============
    const galleryLightbox = document.getElementById('galleryLightbox');
    const galleryLightboxImage = document.querySelector('.gallery-lightbox-image');
    const galleryLightboxClose = document.querySelector('.gallery-lightbox-close');
    const galleryButtons = document.querySelectorAll('.gallery-link[data-gallery-src]');

    function openGalleryLightbox(src, alt) {
        if (!galleryLightbox || !galleryLightboxImage) {
            return;
        }

        galleryLightboxImage.src = src;
        galleryLightboxImage.alt = alt;
        galleryLightbox.classList.add('show');
        galleryLightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');

        if (galleryLightboxClose) {
            galleryLightboxClose.focus();
        }
    }

    function closeGalleryLightbox() {
        if (!galleryLightbox || !galleryLightboxImage) {
            return;
        }

        galleryLightbox.classList.remove('show');
        galleryLightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
        galleryLightboxImage.src = '';
        galleryLightboxImage.alt = '';
    }

    galleryButtons.forEach(button => {
        button.addEventListener('click', function() {
            openGalleryLightbox(this.dataset.gallerySrc, this.dataset.galleryAlt || 'Workshop gallery image');
        });
    });

    if (galleryLightboxClose) {
        galleryLightboxClose.addEventListener('click', closeGalleryLightbox);
    }

    if (galleryLightbox) {
        galleryLightbox.addEventListener('click', event => {
            if (event.target === galleryLightbox) {
                closeGalleryLightbox();
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && galleryLightbox && galleryLightbox.classList.contains('show')) {
            closeGalleryLightbox();
        }
    });

    // ============= BUTTON RIPPLE EFFECT ============= 
    // Add ripple effect to buttons on click
    const buttons = document.querySelectorAll('.btn, .gallery-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Remove existing ripple if any
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(ripple);
        });
    });

    // ============= TOOLTIP INITIALIZATION ============= 
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ============= LAZY LOADING IMAGES ============= 
    // Implement lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ============= BACK TO TOP BUTTON ============= 
    // Create and handle back-to-top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
    backToTopButton.className = 'back-to-top-btn';
    backToTopButton.title = 'Back to Top';
    document.body.appendChild(backToTopButton);

    // Show/hide back-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top on button click
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============= PHONE NUMBER FORMATTING ============= 
    // Format phone number input
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Allow only numbers, spaces, +, -, and parentheses
            this.value = this.value.replace(/[^0-9\s\+\-\(\)]/g, '');
        });
    }

    // ============= EMAIL VALIDATION ============= 
    // Real-time email validation
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
        });

        emailInput.addEventListener('focus', function() {
            this.classList.remove('is-invalid');
        });
    }

    // ============= MOBILE MENU CLOSE ON LINK CLICK ============= 
    // Already handled in smooth scroll section, but adding as backup
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu
            if (navbarCollapse.classList.contains('show')) {
                document.querySelector('.navbar-toggler').click();
            }
        });
    });

    // ============= KEYBOARD ACCESSIBILITY ============= 
    // Handle Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                if (modalInstance) {
                    modalInstance.hide();
                }
            });
        }
    });

    // ============= DARK MODE SUPPORT ============= 
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Optional: Add dark mode support in the future
        console.log('Dark mode preferred');
    }

    // ============= PRINT STYLES ============= 
    // Add print button (optional)
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="bi bi-printer"></i>';
    printButton.className = 'print-btn';
    printButton.title = 'Print Page';
    printButton.style.display = 'none'; // Hidden by default

    printButton.addEventListener('click', () => {
        window.print();
    });

    // ============= PERFORMANCE OPTIMIZATION ============= 
    // Debounce scroll events for better performance
    function debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    }

    // Debounced update navigation
    const debouncedUpdateNav = debounce(updateNavigation, 100);
    window.addEventListener('scroll', debouncedUpdateNav, { passive: true });

    // ============= INITIALIZATION COMPLETE ============= 
    console.log('Chai Huah Auto Landing Page - JavaScript initialized successfully!');
    console.log('Contact forms data stored in localStorage:', JSON.parse(localStorage.getItem('contactForms') || '[]'));
});

// ============= CUSTOM STYLES FOR BACK-TO-TOP BUTTON ============= 
// Add styles dynamically
const style = document.createElement('style');
style.textContent = `
    .back-to-top-btn {
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 45px;
        height: 45px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease-in-out;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
    }

    .back-to-top-btn:hover {
        background-color: #c82333;
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
    }

    .back-to-top-btn.show {
        opacity: 1;
        visibility: visible;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .print-btn {
        position: fixed;
        bottom: 170px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #667eea;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        z-index: 998;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .print-btn:hover {
        background-color: #764ba2;
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }

    @media (min-width: 769px) {
        .back-to-top-btn {
            bottom: 100px;
            right: 30px;
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
        }
    }

    .is-invalid {
        border-color: #dc3545 !important;
    }

    .is-invalid:focus {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.15) !important;
    }
`;
document.head.appendChild(style);

// ============= EXPORT FOR TESTING (Optional) ============= 
// If using modules or testing frameworks
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        smoothScrolling: true,
        animationsEnabled: true,
        formValidationEnabled: true
    };
}
