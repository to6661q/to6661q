// // File: js/script.js
// // Perbaikan Final: Logika JS disesuaikan dengan struktur HTML baru.

document.addEventListener('DOMContentLoaded', function() {
    // // Fungsi untuk memuat komponen (tetap sama)
    const loadComponent = (path, elementId) => {
        // // Menentukan path yang benar baik dari root (index.html) maupun dari sub-folder (/pages/)
        const finalPath = document.body.classList.contains('is-root') ? path : `../${path}`;

        fetch(finalPath)
            .then(response => response.ok ? response.text() : Promise.reject(`File not found: ${finalPath}`))
            .then(data => {
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data;
                }
                // // Inisialisasi ulang logika header/footer SETELAH konten dimuat
                if (elementId === 'header-container' || elementId === 'footer-container') {
                    initializeHeaderFooterLogic();
                }
            })
            .catch(error => console.error(`Error loading component:`, error));
    };

    // // Tambahkan class ke body untuk menandai jika ini adalah halaman root
    if (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')) {
        document.body.classList.add('is-root');
    }

    // // Muat header dan footer
    loadComponent('includes/header.html', 'header-container');
    loadComponent('includes/footer.html', 'footer-container');

    // // Inisialisasi AOS
    AOS.init({
        duration: 800,
        once: true,
        mirror: false,
        offset: 50,
    });

    // // Fungsi yang akan dijalankan setelah header dan footer dimuat
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

        // // Perbaikan: Logika Dropdown Desktop (HANYA hover, tidak ada event click)
        const desktopNavItem = headerElement.querySelector('.desktop-nav-item');
        const desktopDropdown = headerElement.querySelector('.dropdown-menu');
        if (desktopNavItem && desktopDropdown) {
             desktopNavItem.addEventListener('mouseenter', () => {
                desktopDropdown.style.display = 'block';
             });
             desktopNavItem.addEventListener('mouseleave', () => {
                desktopDropdown.style.display = 'none';
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
    
    const setActiveNavLink = () => {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('#header-container .nav-link');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            link.classList.remove('active');

            if (currentPath === linkPath) {
                link.classList.add('active');
                
                // Jika link aktif ada di dalam dropdown, tandai juga parent-nya
                const parentDropdown = link.closest('.dropdown-menu');
                if (parentDropdown) {
                    const parentTrigger = parentDropdown.previousElementSibling;
                    if (parentTrigger) {
                        parentTrigger.classList.add('active');
                    }
                }
            }
        });
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
