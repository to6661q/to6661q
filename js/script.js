// // File: js/script.js
// // Semua logika JavaScript yang sebelumnya ada di dalam tag <script> di setiap file HTML, kini dipindahkan ke sini.
// // Ini membuat kode lebih terpusat dan mudah untuk diperbaiki atau ditambahkan.

document.addEventListener('DOMContentLoaded', function() {
    // // Fungsi untuk memuat header dan footer secara dinamis
    const loadComponent = (url, elementId) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                // // Jalankan kembali fungsi yang bergantung pada elemen header/footer setelah dimuat
                if (elementId === 'header-container' || elementId === 'footer-container') {
                    initializeHeaderFooterLogic();
                }
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    // // Muat header dan footer di semua halaman
    loadComponent('../includes/header.html', 'header-container');
    loadComponent('../includes/footer.html', 'footer-container');

    // // Inisialisasi AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        mirror: false,
        offset: 50,
    });

    // // Fungsi yang akan dijalankan setelah header dan footer dimuat
    const initializeHeaderFooterLogic = () => {
        // // Logika Header Responsif (Menu Mobile)
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
        const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
        const mobileNavLinks = document.querySelectorAll('#mobileMenuDrawer .nav-link');

        if (mobileMenuBtn && mobileMenuDrawer && closeMobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.add('open'));
            closeMobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));

            mobileNavLinks.forEach(link => {
                if (!link.parentElement.classList.contains('portfolio-mobile-trigger') && !link.closest('.mobile-submenu')) {
                    link.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));
                }
            });
        }

        // // Logika Toggle Submenu Mobile untuk Portfolio
        const portfolioMobileTrigger = document.querySelector('.portfolio-mobile-trigger');
        const portfolioMobileSubmenu = document.querySelector('.portfolio-mobile-submenu');
        const portfolioArrowIcon = portfolioMobileTrigger ? portfolioMobileTrigger.querySelector('.arrow-icon') : null;

        if (portfolioMobileTrigger && portfolioMobileSubmenu && portfolioArrowIcon) {
            portfolioMobileTrigger.addEventListener('click', function(event) {
                event.preventDefault();
                portfolioMobileSubmenu.classList.toggle('open');
                portfolioArrowIcon.classList.toggle('rotate-180');
            });
            portfolioMobileSubmenu.querySelectorAll('a.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuDrawer.classList.remove('open');
                });
            });
        }

        // // Logika untuk Desktop Dropdown
        const portfolioDesktopTrigger = document.getElementById('portfolioDesktopTrigger');
        const desktopDropdown = portfolioDesktopTrigger ? portfolioDesktopTrigger.nextElementSibling : null;

        if (portfolioDesktopTrigger && desktopDropdown) {
             portfolioDesktopTrigger.parentElement.addEventListener('mouseenter', () => {
                desktopDropdown.style.display = 'block';
                const arrow = portfolioDesktopTrigger.querySelector('.arrow-icon');
                if(arrow) arrow.classList.add('rotate-180');
            });
             portfolioDesktopTrigger.parentElement.addEventListener('mouseleave', () => {
                desktopDropdown.style.display = 'none';
                const arrow = portfolioDesktopTrigger.querySelector('.arrow-icon');
                if(arrow) arrow.classList.remove('rotate-180');
            });
        }

        // // Update tahun di footer dan mobile drawer
        const currentYearFooter = document.getElementById('currentYearFooter');
        if (currentYearFooter) currentYearFooter.textContent = new Date().getFullYear();

        const currentYearMobileDrawer = document.getElementById('currentYearMobileDrawer');
        if (currentYearMobileDrawer) currentYearMobileDrawer.textContent = new Date().getFullYear();

        // // Logika untuk menandai link navigasi yang aktif
        setActiveNavLink();
    };

    const setActiveNavLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // // Membersihkan path dari `../` dan `./` agar perbandingan lebih akurat
            const cleanLinkHref = linkHref.replace('../', '/').replace('./', '');
            const cleanCurrentPath = currentPath.endsWith('/') ? currentPath : currentPath + '/';
            const cleanLinkPath = new URL(linkHref, window.location.origin).pathname;


            link.classList.remove('active');
            const parentDropdownButton = link.closest('.desktop-nav-item, .mobile-submenu')?.previousElementSibling;

            if (currentPath.endsWith(linkHref.split('/').pop())) {
                link.classList.add('active');
                if (parentDropdownButton) {
                    parentDropdownButton.classList.add('active');
                }
            } else if (currentPath === '/' && (linkHref === 'index.html' || linkHref === '../index.html')) {
                 link.classList.add('active');
            }
        });

        // // Highlight parent "Portfolio" jika salah satu anaknya aktif
        const activeSubmenuLink = document.querySelector('.dropdown-menu .active, .mobile-submenu .active');
        if(activeSubmenuLink){
            document.querySelectorAll('.portfolio-desktop-trigger, .portfolio-mobile-trigger').forEach(trigger => {
                trigger.classList.add('active');
            })
        }
    };


    // === LOGIKA SPESIFIK UNTUK SETIAP HALAMAN ===

    // // Logika untuk index.html
    if (document.getElementById('typed-hello')) {
        var typedHello = new Typed('#typed-hello', {
            strings: ["Hello Guys!"],
            typeSpeed: 80,
            showCursor: true,
            cursorChar: '|',
            onComplete: (self) => {
                self.cursor.remove();
                displayRandomQuote();
            }
        });

        const quotes = [
            { text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang Anda lakukan.", author: "Steve Jobs" },
            { text: "Masa depan adalah milik mereka yang percaya pada keindahan impian mereka.", author: "Eleanor Roosevelt" },
            { text: "Hidup ini sangat sederhana, tapi kita yang membuatnya rumit.", author: "Confucius" }
        ];

        function displayRandomQuote() {
            const quoteElement = document.getElementById('random-quote');
            const authorElement = document.getElementById('quote-author');
            if (quoteElement && authorElement) {
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                quoteElement.textContent = '';
                authorElement.textContent = '';
                authorElement.classList.remove('is-visible');

                new Typed('#random-quote', {
                    strings: [randomQuote.text],
                    typeSpeed: 50,
                    showCursor: true,
                    cursorChar: '_',
                    onComplete: (self) => {
                        self.cursor.remove();
                        authorElement.textContent = `- ${randomQuote.author}`;
                        authorElement.classList.add('is-visible');
                    }
                });
            }
        }
    }

    // // Logika untuk aboutMe.html
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

    // // Logika untuk something.html (Countdown)
    if (document.getElementById('days')) {
        function startCountdown(endDate) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

            const countdown = setInterval(() => {
                const now = new Date().getTime();
                const distance = endDate - now;

                if (distance < 0) {
                    clearInterval(countdown);
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                daysEl.textContent = days.toString().padStart(2, '0');
                hoursEl.textContent = hours.toString().padStart(2, '0');
                minutesEl.textContent = minutes.toString().padStart(2, '0');
                secondsEl.textContent = seconds.toString().padStart(2, '0');
            }, 1000);
        }
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30);
        startCountdown(targetDate.getTime());
    }

    // // Logika untuk halaman achievements, experience, training (Modal Gambar)
    const modal = document.getElementById("imageModal");
    if (modal) {
        const modalImg = document.getElementById("modalImage");
        const certificateCards = document.querySelectorAll(".certificate-card");
        const closeModalSpan = document.getElementById("imageModalClose");

        certificateCards.forEach(card => {
            card.addEventListener('click', function() {
                const imgElement = this.querySelector('.certificate-image-display, .certificate-image');
                if (imgElement && modal && modalImg) {
                    modal.style.display = "flex";
                    modalImg.src = imgElement.src;
                    modalImg.alt = imgElement.alt;
                }
            });
        });

        if (closeModalSpan) {
            closeModalSpan.onclick = () => { modal.style.display = "none"; }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});
