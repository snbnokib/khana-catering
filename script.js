document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.getElementById('close-modal');
    const loginForm = document.getElementById('login-form');
    const reservationForm = document.getElementById('reservation-form');
    const newsletterForm = document.getElementById('newsletter-form');
    const scrollDown = document.querySelector('.scroll-down');
    const offersGrid = document.querySelector('.offers-grid');

    // Sample data for special offers
    const specialOffers = [
        {
            title: "Truffle Infused Pasta",
            description: "Handmade pasta with black truffle cream sauce",
            price: 28.99,
            image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            badge: "Chef's Special",
            rating: 4.5
        },
        {
            title: "Japanese Wagyu Steak",
            description: "A5 grade Wagyu with truffle mashed potatoes",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            badge: "New",
            rating: 5
        },
        {
            title: "Ocean's Bounty Platter",
            description: "Fresh lobster, oysters, crab and shrimp",
            price: 65.99,
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
            badge: "Popular",
            rating: 4
        }
    ];

    // Initialize special offers
    function initSpecialOffers() {
        offersGrid.innerHTML = '';
        specialOffers.forEach((offer, index) => {
            const offerItem = document.createElement('div');
            offerItem.className = 'offer-item';
            offerItem.style.animationDelay = `${index * 0.2}s`;
            
            // Generate star rating
            let stars = '';
            const fullStars = Math.floor(offer.rating);
            const hasHalfStar = offer.rating % 1 !== 0;
            
            for (let i = 0; i < fullStars; i++) {
                stars += '<i class="fas fa-star"></i>';
            }
            
            if (hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            }
            
            for (let i = 0; i < 5 - Math.ceil(offer.rating); i++) {
                stars += '<i class="far fa-star"></i>';
            }
            
            offerItem.innerHTML = `
                <div class="offer-img">
                    <img src="${offer.image}" alt="${offer.title}">
                    <div class="offer-badge">${offer.badge}</div>
                </div>
                <div class="offer-item-content">
                    <h3>${offer.title}</h3>
                    <p>${offer.description}</p>
                    <span class="price">$${offer.price.toFixed(2)}</span>
                    <div class="rating">${stars}</div>
                </div>
            `;
            
            offersGrid.appendChild(offerItem);
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Login modal toggle
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    closeModal.addEventListener('click', function() {
        loginModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Here you would typically send data to server
        console.log('Login attempt with:', { email, password });
        
        // Show success message (in a real app, you'd check credentials first)
        alert('Login successful! (This is a demo)');
        loginModal.classList.remove('show');
        document.body.style.overflow = 'auto';
        loginForm.reset();
    });

    // Reservation form submission
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('reservation-name').value,
            email: document.getElementById('reservation-email').value,
            phone: document.getElementById('reservation-phone').value,
            guests: document.getElementById('reservation-guests').value,
            date: document.getElementById('reservation-date').value,
            time: document.getElementById('reservation-time').value,
            notes: document.getElementById('reservation-notes').value
        };
        
        // Here you would typically send data to server
        console.log('Reservation submitted:', formData);
        
        // Show success message
        alert(`Thank you, ${formData.name}! Your reservation has been received.`);
        reservationForm.reset();
    });

    // Newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        
        // Here you would typically send data to server
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });

    // Scroll down button
    scrollDown.addEventListener('click', function() {
        window.scrollTo({
            top: window.innerHeight - navbar.offsetHeight,
            behavior: 'smooth'
        });
    });

    // Initialize the page
    initSpecialOffers();

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.offer-item, .about-content, .about-image, .reservation-form, .footer-col');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.offer-item, .about-content, .about-image, .reservation-form, .footer-col').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});