// ============================================
// 1. ANNÉE DYNAMIQUE DANS LE FOOTER
// ============================================
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ============================================
// 2. NAVBAR DYNAMIQUE AU SCROLL
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// ============================================
// 3. BOUTON RETOUR EN HAUT
// ============================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
            backToTop.style.opacity = '1';
        } else {
            backToTop.style.display = 'none';
            backToTop.style.opacity = '0';
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// 4. DARK MODE AVEC LOCALSTORAGE
// ============================================

// Fonction pour appliquer le thème
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    } else {
        document.body.removeAttribute('data-theme');
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// Charger le thème sauvegardé dans localStorage
const savedTheme = localStorage.getItem('afritalent-theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    // Vérifier les préférences système
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme('dark');
    }
}

// Créer et ajouter le bouton dark mode dans la navbar
function addDarkModeButton() {
    const navMenu = document.querySelector('.navbar-nav');
    if (navMenu && !document.getElementById('darkModeToggle')) {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
            <button id="darkModeToggle" class="btn btn-dark-mode" style="background:transparent; border:none; color:white; padding:0.5rem 0.75rem;">
                <i class="fas fa-moon"></i>
            </button>
        `;
        navMenu.appendChild(li);
        
        // Ajouter l'événement au bouton
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isDark = document.body.hasAttribute('data-theme');
                if (isDark) {
                    applyTheme('light');
                    localStorage.setItem('afritalent-theme', 'light');
                } else {
                    applyTheme('dark');
                    localStorage.setItem('afritalent-theme', 'dark');
                }
            });
        }
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    addDarkModeButton();
});
// ============================================
// 5. COMPTEURS ANIMÉS AU SCROLL (IntersectionObserver)
// ============================================
const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 secondes
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
};

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (counter.textContent === '0') {
                animateCounter(counter);
            }
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ============================================
// 6. ANIMATIONS FADE-IN AU SCROLL
// ============================================
const hiddenElements = document.querySelectorAll('.hidden');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

hiddenElements.forEach(element => {
    fadeObserver.observe(element);
});
// ============================================
// 7. FILTRAGE DYNAMIQUE DES FREELANCES
// ============================================
const filterButtons = document.querySelectorAll('.btn-filter');
const freelanceCards = document.querySelectorAll('.freelance-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Changer l'état actif du bouton
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filtrer les cartes
            freelanceCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // Animation d'apparition
                    card.style.animation = 'fadeIn 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Animation pour le filtrage
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);
// ============================================
// 8. VALIDATION DU FORMULAIRE DE CONTACT
// ============================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Récupérer les champs
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const email = document.getElementById('email');
        const sujet = document.getElementById('sujet');
        const message = document.getElementById('message');
        
        // Validation Nom
        if (!nom.value.trim()) {
            nom.classList.add('is-invalid');
            isValid = false;
        } else {
            nom.classList.remove('is-invalid');
            nom.classList.add('is-valid');
        }
        
        // Validation Prénom
        if (!prenom.value.trim()) {
            prenom.classList.add('is-invalid');
            isValid = false;
        } else {
            prenom.classList.remove('is-invalid');
            prenom.classList.add('is-valid');
        }
        
        // Validation Email (regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        }
        
        // Validation Sujet
        if (!sujet.value) {
            sujet.classList.add('is-invalid');
            isValid = false;
        } else {
            sujet.classList.remove('is-invalid');
            sujet.classList.add('is-valid');
        }
        
        // Validation Message (minimum 20 caractères)
        if (!message.value.trim() || message.value.trim().length < 20) {
            message.classList.add('is-invalid');
            isValid = false;
        } else {
            message.classList.remove('is-invalid');
            message.classList.add('is-valid');
        }
        
        // Si formulaire valide
        if (isValid) {
            contactForm.reset();
            contactForm.classList.add('d-none');
            successMessage.classList.remove('d-none');
            
            // Réinitialiser les classes de validation
            [nom, prenom, email, sujet, message].forEach(field => {
                field.classList.remove('is-valid', 'is-invalid');
            });
            
            // Afficher le formulaire à nouveau après 3 secondes
            setTimeout(() => {
                contactForm.classList.remove('d-none');
                successMessage.classList.add('d-none');
            }, 3000);
        }
    });
    
    // Supprimer les messages d'erreur lors de la saisie
    const formInputs = ['nom', 'prenom', 'email', 'sujet', 'message'];
    formInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
            });
        }
    });
}