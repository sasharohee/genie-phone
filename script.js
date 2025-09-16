// Navigation mobile
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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

// Gestion du formulaire de rendez-vous
const appointmentForm = document.getElementById('appointment-form');

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
    
    // Simulation d'envoi (remplacer par vraie logique)
    console.log('Données du formulaire:', data);
    
    // Message de confirmation
    alert('Votre demande de rendez-vous a été envoyée avec succès ! Nous vous contacterons bientôt.');
    
    // Réinitialiser le formulaire
    this.reset();
});

// Animation du scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        document.querySelector('#services').scrollIntoView({
            behavior: 'smooth'
        });
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
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Gestion des erreurs
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});

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
