document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SETUP & INITIALIZATION ---

    // Initialize Animate On Scroll (AOS)
    AOS.init({
        duration: 800, 
        once: true,
        mirror: false,
        offset: 50, 
    });

    // Determine base path for includes
    const isIndex = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');
    const basePath = isIndex ? '' : '../';

    // --- 2. DYNAMIC CONTENT INJECTION (HEADER & FOOTER) ---

    // Function to load HTML content into a placeholder
    const loadComponent = (selector, url) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(data => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                    // Re-run necessary setup after new content is loaded
                    setupNavigation(); 
                    setupFooter();
                    setActiveNavLink();
                }
            })
            .catch(error => console.error(`Error loading component from ${url}:`, error));
    };

    // Load header and footer
    loadComponent('#header-placeholder', `${basePath}includes/header.html`);
    loadComponent('#footer-placeholder', `${basePath}includes/footer.html`);


    // --- 3. NAVIGATION & UI LOGIC ---
    
    // This function sets up all navigation-related event listeners.
    // It's called after the header is loaded.
    function setupNavigation() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuDrawer = document.getElementById('mobileMenuDrawer'); 
        const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
        const portfolioMobileTrigger = document.querySelector('.portfolio-mobile-trigger');
        const portfolioMobileSubmenu = document.querySelector('.portfolio-mobile-submenu');

        // Open/close mobile drawer
        if (mobileMenuBtn && mobileMenuDrawer && closeMobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.add('open'));
            closeMobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));
        }

        // Toggle mobile submenu
        if (portfolioMobileTrigger && portfolioMobileSubmenu) {
            const arrowIcon = portfolioMobileTrigger.querySelector('.arrow-icon');
            portfolioMobileTrigger.addEventListener('click', (event) => {
                event.preventDefault(); 
                portfolioMobileSubmenu.classList.toggle('open');
                if(arrowIcon) arrowIcon.classList.toggle('rotate-180');
            });
        }
    }
    
    // This function sets the 'active' class on the correct navigation link.
    function setActiveNavLink() {
        const currentLocation = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');

        let isPortfolioPage = ['experience.html', 'training.html', 'achievements.html'].includes(currentLocation);

        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            link.classList.remove('active');

            if (linkPath === currentLocation || (currentLocation === '' && linkPath === 'index.html')) {
                link.classList.add('active');
            }

            // Highlight the main "Portfolio" link if on a portfolio sub-page
            if (isPortfolioPage && link.id === 'portfolioDesktopTrigger') {
                link.classList.add('active');
            }
             if (isPortfolioPage && link.closest('.portfolio-mobile-trigger')) {
                link.closest('.portfolio-mobile-trigger').classList.add('active');
            }
        });
    }


    // --- 4. PAGE-SPECIFIC LOGIC ---

    // Typed.js for the main page hero
    if (document.getElementById('typed-hello')) {
        new Typed('#typed-hello', {
            strings: ["Hello Guys!"],
            typeSpeed: 80,
            showCursor: false,
            onComplete: () => displayRandomQuote(),
        });
    }

    // Typed.js for the about page
    if (document.getElementById('typed-name')) {
        new Typed('#typed-name', {
            strings: ["Toriq As Syarif", "Programmer", "Developer", "Engineer", "Guitarist"],
            typeSpeed: 60, backSpeed: 30, backDelay: 1500, loop: true,
        });
    }

    // Random Quote Logic (for index.html)
    function displayRandomQuote() {
        const quotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
            { text: "Life is very simple, but we insist on making it complicated.", author: "Confucius" }
        ];
        const quoteElement = document.getElementById('random-quote');
        const authorElement = document.getElementById('quote-author');
        
        if (quoteElement && authorElement) {
            const { text, author } = quotes[Math.floor(Math.random() * quotes.length)];
            quoteElement.textContent = text;
            authorElement.textContent = `— ${author}`;
            authorElement.classList.add('is-visible');
        }
    }

    // Countdown Timer Logic (for something.html)
    const daysEl = document.getElementById('days');
    if (daysEl) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30);
        const endDate = targetDate.getTime();
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        const updateCountdown = () => {
            const distance = endDate - new Date().getTime();
            if (distance < 0) {
                clearInterval(countdownInterval);
                return;
            }
            daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        };
        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // Image Modal Logic (for portfolio/certificate pages)
    const imageModal = document.getElementById("imageModal");
    if (imageModal) {
        const modalImg = document.getElementById("modalImage");
        const closeModalSpan = document.getElementById("imageModalClose");

        document.querySelectorAll(".certificate-card").forEach(card => { 
            card.addEventListener('click', function() { 
                const imgElement = this.querySelector('.certificate-image-display, .certificate-image');
                if (imgElement && imgElement.src) {
                    imageModal.style.display = "flex"; 
                    modalImg.src = imgElement.src;
                }
            });
        });

        if(closeModalSpan) closeModalSpan.onclick = () => imageModal.style.display = "none";
        window.onclick = (event) => { if (event.target == imageModal) imageModal.style.display = "none"; };
    }


    // --- 5. FOOTER LOGIC ---

    function setupFooter() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
});
