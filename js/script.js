// // File: js/script.js
// // Perbaikan Final: Logika setActiveNavLink diperbarui untuk penandaan link aktif yang lebih akurat.

document.addEventListener('DOMContentLoaded', function() {
    // // Fungsi untuk memuat komponen
    const loadComponent = (path, elementId) => {
        const finalPath = document.body.classList.contains('is-root') ? path : `../${path}`;

        fetch(finalPath)
            .then(response => response.ok ? response.text() : Promise.reject(`File not found: ${finalPath}`))
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                }
                if (elementId === 'header-container' || elementId === 'footer-container') {
                    initializeHeaderFooterLogic();
                }
            })
            .catch(error => console.error(`Error loading component:`, error));
    };

    if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
        document.body.classList.add('is-root');
    }

    loadComponent('includes/header.html', 'header-container');
    loadComponent('includes/footer.html', 'footer-container');

    AOS.init({
        duration: 800,
        once: true,
        mirror: false,
        offset: 50,
    });

    const initializeHeaderFooterLogic = () => {
        const headerElement = document.getElementById('header-container');
        if (!headerElement) return;

        // Logika Menu Mobile
        const mobileMenuBtn = headerElement.querySelector('#mobileMenuBtn');
        const mobileMenuDrawer = headerElement.querySelector('#mobileMenuDrawer');
        const closeMobileMenuBtn = headerElement.querySelector('#closeMobileMenuBtn');

        if (mobileMenuBtn && mobileMenuDrawer && closeMobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.add('open'));
            closeMobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));
        }
        
        // Logika Submenu Mobile
        const portfolioMobileTrigger = headerElement.querySelector('.portfolio-mobile-trigger');
        const portfolioMobileSubmenu = headerElement.querySelector('.portfolio-mobile-submenu');
        if (portfolioMobileTrigger && portfolioMobileSubmenu) {
            portfolioMobileTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                portfolioMobileSubmenu.classList.toggle('open');
                const icon = portfolioMobileTrigger.querySelector('.arrow-icon');
                if (icon) icon.classList.toggle('rotate-180');
            });
        }

        // Logika Dropdown Desktop
        const desktopNavItem = headerElement.querySelector('.desktop-nav-item');
        if (desktopNavItem) {
             desktopNavItem.addEventListener('mouseenter', () => {
                const dropdown = desktopNavItem.querySelector('.dropdown-menu');
                if(dropdown) dropdown.style.display = 'block';
             });
             desktopNavItem.addEventListener('mouseleave', () => {
                const dropdown = desktopNavItem.querySelector('.dropdown-menu');
                if(dropdown) dropdown.style.display = 'none';
             });
        }
        
        // Update tahun
        const currentYearFooter = document.getElementById('currentYearFooter');
        if (currentYearFooter) currentYearFooter.textContent = new Date().getFullYear();
        const currentYearMobileDrawer = headerElement.querySelector('#currentYearMobileDrawer');
        if (currentYearMobileDrawer) currentYearMobileDrawer.textContent = new Date().getFullYear();

        // Atur link aktif
        setActiveNavLink();
    };
    
    // // === FUNGSI PERBAIKAN UNTUK ACTIVE LINK ===
    const setActiveNavLink = () => {
        // // Dapatkan path URL saat ini (contoh: "/pages/experience.html")
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#header-container .nav-link');

        // // Pertama, hapus semua kelas 'active' dari semua link
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // // Kedua, iterasi lagi untuk menambahkan kelas 'active' ke link yang tepat
        navLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;

            // // Kondisi 1: Kecocokan persis antara URL saat ini dan href link
            if (currentPath === linkPath) {
                link.classList.add('active');
            }
        });

        // // Ketiga, logika khusus untuk parent "Portfolio"
        // // Jika URL saat ini ada di dalam /pages/ dan bukan portfolio.html itu sendiri,
        // // maka kita juga aktifkan link ke portfolio.html
        if (currentPath.includes('/pages/') && (currentPath.endsWith('experience.html') || currentPath.endsWith('training.html') || currentPath.endsWith('achievements.html'))) {
            const portfolioHubLink = document.querySelector('a.nav-link[href="/pages/portfolio.html"]');
            if (portfolioHubLink) {
                portfolioHubLink.classList.add('active');
            }
        }
    };

    // === LOGIKA SPESIFIK HALAMAN (TETAP SAMA) ===
    // ... (kode untuk Typed.js, Countdown, Modal, dll. tetap di sini)
    // Logika Modal Gambar
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
