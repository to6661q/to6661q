// Menunggu seluruh struktur halaman (DOM) siap sebelum menjalankan skrip.
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * // FUNGSI BARU (LEBIH SEDERHANA)
     * Fungsi ini memuat konten dari sebuah file (misal: header.html)
     * dan memasukkannya ke dalam elemen placeholder di halaman utama.
     * @param {string} url - Path ke file HTML yang akan dimuat (cth: 'includes/header.html').
     * @param {string} placeholderId - ID dari elemen div tempat konten akan diletakkan (cth: 'header-placeholder').
     */
    const loadComponent = async (url, placeholderId) => {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) {
            console.error(`Error: Elemen dengan ID '${placeholderId}' tidak ditemukan.`);
            return;
        }

        try {
            const response = await fetch(url);
            if (!response.ok) {
                // Jika file tidak ditemukan (404) atau ada error server.
                throw new Error(`Gagal memuat ${url}. Status: ${response.status}`);
            }
            const content = await response.text();
            placeholder.innerHTML = content; // Cukup ganti isi placeholder dengan konten yang dimuat.
        } catch (error) {
            console.error(`Error saat memuat komponen:`, error);
            // Menampilkan pesan error langsung di halaman agar lebih jelas.
            placeholder.innerHTML = `<p style="color: red; text-align: center;">Gagal memuat konten dari ${url}</p>`;
        }
    };

    /**
     * // FUNGSI BARU
     * Menentukan path prefix yang benar. Ini penting agar komponen bisa dimuat
     * baik dari index.html (di root folder) maupun dari halaman di dalam folder /pages.
     */
    const getPathPrefix = () => {
        // Jika URL halaman mengandung '/pages/', kita ada di dalam subfolder.
        // Maka, kita perlu kembali satu level ('../').
        return window.location.pathname.includes('/pages/') ? '../' : './';
    };

    const prefix = getPathPrefix();
    
    /**
     * // FUNGSI BARU
     * Fungsi utama untuk menginisialisasi semua skrip interaktif di halaman.
     * Fungsi ini akan dijalankan SETELAH header dan footer berhasil dimuat.
     */
    const initializePageScripts = () => {
        // 1. Inisialisasi AOS (Animate on Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800, 
                once: true,
                mirror: false,
                offset: 50, 
            });
        }

        // 2. Logika untuk animasi ketik (hanya jika elemen #typed-hello ada)
        if (document.getElementById('typed-hello') && typeof Typed !== 'undefined') {
            new Typed('#typed-hello', {
                strings: ["Hello Guys!"],
                typeSpeed: 80,
                showCursor: true,
                cursorChar: '|',
                onComplete: (self) => {
                    self.cursor.remove();
                    displayRandomQuote(); // Tampilkan kutipan setelah selesai
                }
            });
        }
        
        function displayRandomQuote() {
            const quotes = [
                { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
                { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" }
            ];
            const quoteElement = document.getElementById('random-quote');
            const authorElement = document.getElementById('quote-author');
            
            if (quoteElement && authorElement) {
                const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
                quoteElement.textContent = `"${randomQuote.text}"`;
                authorElement.textContent = `- ${randomQuote.author}`;
                authorElement.classList.add('is-visible');
            }
        }

        // 3. Logika untuk Header & Menu Mobile
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuDrawer = document.getElementById('mobileMenuDrawer'); 
        const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
        
        if (mobileMenuBtn && mobileMenuDrawer && closeMobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.add('open'));
            closeMobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));
        }
        
        const portfolioMobileTrigger = document.querySelector('.portfolio-mobile-trigger');
        if (portfolioMobileTrigger) {
            portfolioMobileTrigger.addEventListener('click', (event) => {
                event.preventDefault(); 
                const submenu = portfolioMobileTrigger.nextElementSibling;
                const arrowIcon = portfolioMobileTrigger.querySelector('.arrow-icon');
                submenu.classList.toggle('open');
                arrowIcon.classList.toggle('rotate-180');
            });
        }
        
        // 4. Update Tahun di Footer
        const currentYear = new Date().getFullYear();
        document.querySelectorAll('#currentYearFooter, #currentYearMobileDrawer').forEach(el => {
            if (el) el.textContent = currentYear;
        });
        
        // 5. Logika untuk menandai link navigasi yang aktif
        const currentPath = window.location.pathname;
        document.querySelectorAll('a.nav-link').forEach(link => {
            // Menggunakan new URL() untuk mendapatkan path yang bersih tanpa domain
            const linkPath = new URL(link.href, window.location.href).pathname;

            if (linkPath === currentPath || (currentPath.endsWith('/') && linkPath.endsWith('index.html'))) {
                link.classList.add('active');
                
                // Jika link aktif ada di dalam dropdown, buat parent-nya juga aktif
                const parentDropdown = link.closest('.desktop-nav-item');
                if (parentDropdown) {
                    parentDropdown.querySelector('.nav-link').classList.add('active');
                }
                const parentSubmenu = link.closest('.mobile-submenu');
                if (parentSubmenu) {
                     const trigger = parentSubmenu.previousElementSibling;
                     trigger.classList.add('active');
                     parentSubmenu.classList.add('open');
                     trigger.querySelector('.arrow-icon')?.classList.add('rotate-180');
                }
            }
        });
    };

    /**
     * // PROSES UTAMA
     * Memuat header dan footer terlebih dahulu, kemudian menjalankan semua skrip lain.
     */
    const loadLayoutAndInit = async () => {
        await Promise.all([
            loadComponent(`${prefix}includes/header.html`, 'header-placeholder'),
            loadComponent(`${prefix}includes/footer.html`, 'footer-placeholder')
        ]);
        
        // Setelah layout selesai dimuat, baru jalankan semua skrip interaktif.
        initializePageScripts(); 
    };

    // Mulai proses!
    loadLayoutAndInit();
});
