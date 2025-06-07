document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, 
        once: true,
        mirror: false,
        offset: 50, 
    });

    // --- Navigation Logic ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer'); 
    const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
    const mainContent = document.getElementById('mainContent');

    // Open/close mobile drawer
    if (mobileMenuBtn && mobileMenuDrawer && closeMobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.add('open'));
        closeMobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));
    }

    // Toggle mobile submenu
    const portfolioMobileTrigger = document.querySelector('.portfolio-mobile-trigger');
    const portfolioMobileSubmenu = document.querySelector('.portfolio-mobile-submenu');
    if (portfolioMobileTrigger && portfolioMobileSubmenu) {
        const portfolioArrowIcon = portfolioMobileTrigger.querySelector('.arrow-icon');
        portfolioMobileTrigger.addEventListener('click', function(event) {
            event.preventDefault(); 
            portfolioMobileSubmenu.classList.toggle('open');
            if (portfolioArrowIcon) {
                portfolioArrowIcon.classList.toggle('rotate-180');
            }
        });
        // Close drawer when a submenu link is clicked
         portfolioMobileSubmenu.querySelectorAll('a.nav-link').forEach(link => {
             link.addEventListener('click', () => {
                if (mobileMenuDrawer) mobileMenuDrawer.classList.remove('open');
             });
        });
    }

    // Close mobile drawer when a main link is clicked
    document.querySelectorAll('#mobileMenuDrawer a.nav-link').forEach(link => {
        if (!link.closest('.mobile-submenu') && !link.classList.contains('portfolio-mobile-trigger')) {
            link.addEventListener('click', () => {
                if (mobileMenuDrawer) mobileMenuDrawer.classList.remove('open');
            });
        }
    });

    // --- Typed.js Initialization ---
    if (document.getElementById('typed-hello')) {
        new Typed('#typed-hello', {
            strings: ["Hello Guys!"],
            typeSpeed: 80,
            showCursor: true,
            cursorChar: '|',
            onComplete: (self) => {
                if (self.cursor) self.cursor.remove();
                displayRandomQuote(); // Trigger quote after typing
            }
        });
    }

    if (document.getElementById('typed-name')) {
        new Typed('#typed-name', {
            strings: ["Toriq As Syarif", "Programmer", "Developer", "Engineer", "Guitarist"],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // --- Random Quote Logic (for index.html) ---
    function displayRandomQuote() {
        const quotes = [
            { text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang Anda lakukan.", author: "Steve Jobs" },
            { text: "Masa depan adalah milik mereka yang percaya pada keindahan impian mereka.", author: "Eleanor Roosevelt" },
            { text: "Hidup ini sangat sederhana, tapi kita yang membuatnya rumit.", author: "Confucius" }
        ];
        const quoteElement = document.getElementById('random-quote');
        const authorElement = document.getElementById('quote-author');
        
        if (quoteElement && authorElement) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            
            quoteElement.textContent = ''; 
            authorElement.textContent = '';
            authorElement.classList.remove('is-visible');

            new Typed(quoteElement, {
                strings: [randomQuote.text],
                typeSpeed: 40,
                showCursor: false,
                onComplete: (self) => {
                    authorElement.textContent = `- ${randomQuote.author}`;
                    authorElement.classList.add('is-visible');
                }
            });
        }
    }

    // --- Countdown Timer Logic (for something.html) ---
    const daysEl = document.getElementById('days');
    if (daysEl) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30); // Set countdown for 30 days from now
        const endDate = targetDate.getTime();
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate - now;
            if (distance < 0) {
                clearInterval(countdown);
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }
            daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);
    }

    // --- Image Modal Logic (for portfolio pages) ---
    const imageModal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeModalSpan = document.getElementById("imageModalClose");

    if (imageModal && modalImg && closeModalSpan) {
        document.querySelectorAll(".certificate-card").forEach(card => { 
            card.addEventListener('click', function() { 
                // Find the image source within the card
                const imgElement = this.querySelector('.certificate-image-display') || this.querySelector('.certificate-image');
                if (imgElement && imgElement.src) {
                    imageModal.style.display = "flex"; 
                    modalImg.src = imgElement.src;
                    modalImg.alt = imgElement.alt;
                }
            });
        });

        // Close modal actions
        closeModalSpan.onclick = () => { imageModal.style.display = "none"; }
        window.onclick = (event) => {
            if (event.target == imageModal) {
                imageModal.style.display = "none";
            }
        }
    }

    // --- Footer Year ---
    document.querySelectorAll('#currentYearFooter, #currentYearMobileDrawer').forEach(el => {
        if (el) el.textContent = new Date().getFullYear();
    });

});
