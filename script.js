// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded and DOM ready');

    // Navigation mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        console.log('Hamburger menu elements found');
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    } else {
        console.log('Hamburger menu elements not found');
    }

    // Fermer le menu mobile quand on clique sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation d'apparition au scroll (AOS simple)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Configuration EmailJS
    (function() {
        emailjs.init("K8CEDm-343xUK7mH1");
    })();

    // Gestion du formulaire de rendez-vous avec EmailJS
    const appointmentForm = document.getElementById('appointment-form');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation simple
            if (!data.name || !data.phone || !data.email || !data.device || !data.problem || !data.date || !data.time) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Désactiver le bouton d'envoi pour éviter les envois multiples
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            
            // Préparer les paramètres pour EmailJS
            const templateParams = {
                from_name: data.name,
                from_email: data.email,
                phone: data.phone,
                device: data.device,
                problem: data.problem,
                date: data.date,
                time: data.time,
                to_email: 'geniephone2025@gmail.com'
            };
            
            // Envoyer l'email via EmailJS
            emailjs.send('service_yto6438', 'template_lz4j5aa', templateParams)
                .then(function(response) {
                    console.log('Email envoyé avec succès!', response.status, response.text);
                    
                    // Message de confirmation
                    alert('Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons bientôt.');
                    
                    // Réinitialiser le formulaire
                    appointmentForm.reset();
                })
                .catch(function(error) {
                    console.error('Erreur lors de l\'envoi de l\'email:', error);
                    alert('Une erreur est survenue lors de l\'envoi de votre demande. Veuillez réessayer ou nous contacter directement au 07 83 24 09 17.');
                })
                .finally(function() {
                    // Réactiver le bouton d'envoi
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
        });
    }

    // Animation du scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Animation des cartes de service au hover
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animation des boutons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Effet de parallaxe léger sur le hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animation des icônes dans les animations
    document.querySelectorAll('.phone-repair-animation i, .workshop-animation i').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = 'scale(1)';
        });
    });

    // Gestion de la date minimale pour le formulaire (aujourd'hui)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Animation de chargement de la page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Performance: Lazy loading des animations
    const lazyElements = document.querySelectorAll('[data-aos]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    lazyElements.forEach(el => {
        lazyObserver.observe(el);
    });

    // Gestion de la modal CGV
    const cgvLink = document.getElementById('cgv-link');
    const cgvModal = document.getElementById('cgv-modal');
    const closeBtn = document.querySelector('.close');

    // Ouvrir la modal CGV
    if (cgvLink && cgvModal) {
        cgvLink.addEventListener('click', function(e) {
            e.preventDefault();
            cgvModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
        });
    }

    // Fermer la modal CGV
    if (closeBtn && cgvModal) {
        closeBtn.addEventListener('click', function() {
            cgvModal.classList.remove('show');
            document.body.style.overflow = 'auto'; // Rétablir le scroll de la page
        });
    }

    // Fermer la modal en cliquant à l'extérieur
    if (cgvModal) {
        cgvModal.addEventListener('click', function(e) {
            if (e.target === cgvModal) {
                cgvModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Fermer la modal avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && cgvModal && cgvModal.classList.contains('show')) {
            cgvModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Animation d'ouverture de la modal
    if (cgvModal) {
        cgvModal.addEventListener('transitionend', function() {
            if (cgvModal.classList.contains('show')) {
                // Focus sur le premier élément focusable pour l'accessibilité
                const firstFocusable = cgvModal.querySelector('h2, .close');
                if (firstFocusable) {
                    firstFocusable.focus();
                }
            }
        });
    }

    console.log('All scripts initialized');
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});