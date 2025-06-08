// // PERUBAHAN: Semua skrip dari file HTML asli sekarang ada di sini.

document.addEventListener('DOMContentLoaded', function() {

    

    // // PERUBAHAN BARU: Fungsi untuk memuat komponen (header/footer) secara dinamis.

    const loadComponent = async (url, placeholderId) => {

        try {

            const response = await fetch(url);

            if (!response.ok) {

                throw new Error(`Gagal memuat ${url}: Status ${response.status}`);

            }

            const content = await response.text();

            const placeholder = document.getElementById(placeholderId);

            if (placeholder) {

                // Menyisipkan HTML langsung, yang akan dirender oleh browser.

                placeholder.insertAdjacentHTML('afterbegin', content);

                // Menghapus elemen placeholder itu sendiri, menyisakan kontennya.

                placeholder.replaceWith(...placeholder.childNodes);

            }

        } catch (error) {

            console.error(error);

            const placeholder = document.getElementById(placeholderId);

            if (placeholder) {

                placeholder.innerText = `Error memuat ${placeholderId}.`;

            }

        }

    };



    // // PERUBAHAN BARU: Fungsi untuk menentukan path yang benar.

    // // Ini penting agar komponen bisa dimuat dari index.html (di root) dan dari halaman di dalam /pages.

    const getPathPrefix = () => {

        // Jika URL path mengandung '/pages/', berarti kita di dalam subfolder.

        return window.location.pathname.includes('/pages/') ? '../' : './';

    };



    const prefix = getPathPrefix();



    // // PERUBAHAN BARU: Fungsi utama untuk menginisialisasi semua skrip halaman.

    // // Fungsi ini akan dijalankan SETELAH header dan footer selesai dimuat.

    const initializePageScripts = () => {

        // 1. Inisialisasi AOS (Animate on Scroll)

        AOS.init({

            duration: 800, 

            once: true,

            mirror: false,

            offset: 50, 

        });



        // 2. Logika untuk animasi ketik (hanya berjalan jika elemennya ada di halaman)

        if (document.getElementById('typed-hello')) {

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

        

        // Fungsi untuk menampilkan kutipan acak

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

        

        // Logika untuk submenu portfolio di mobile

        const portfolioMobileTrigger = document.querySelector('.portfolio-mobile-trigger');

        const portfolioMobileSubmenu = document.querySelector('.portfolio-mobile-submenu');

        const portfolioArrowIcon = portfolioMobileTrigger?.querySelector('.arrow-icon');



        if (portfolioMobileTrigger) {

            portfolioMobileTrigger.addEventListener('click', (event) => {

                event.preventDefault(); 

                portfolioMobileSubmenu.classList.toggle('open');

                portfolioArrowIcon.classList.toggle('rotate-180');

            });

        }

        

        // 4. Update Tahun di Footer dan Drawer

        const currentYear = new Date().getFullYear();

        document.querySelectorAll('#currentYearFooter, #currentYearMobileDrawer').forEach(el => {

            if (el) el.textContent = currentYear;

        });

        

        // // PERUBAHAN PENTING: Logika untuk menandai link navigasi yang aktif telah disederhanakan

        const currentPath = window.location.pathname;

        document.querySelectorAll('a.nav-link').forEach(link => {

            const linkPath = new URL(link.href, window.location.href).pathname;

            

            // Cek jika path link sama dengan path halaman saat ini.

            // Juga menangani kasus di mana halaman home bisa berupa "/" atau "/index.html".

            if (linkPath === currentPath || (linkPath === '/' && (currentPath.endsWith('/index.html') || currentPath.endsWith('/')))) {

                link.classList.add('active');

                

                // Jika link aktif ada di dalam dropdown, buat parent-nya juga aktif

                const parentSubmenu = link.closest('.mobile-submenu');

                if (parentSubmenu) {

                    const trigger = parentSubmenu.previousElementSibling;

                    trigger.classList.add('active');

                    parentSubmenu.classList.add('open');

                    trigger.querySelector('.arrow-icon')?.classList.add('rotate-180');

                }



                const parentDropdown = link.closest('.desktop-nav-item');

                if(parentDropdown) {

                    parentDropdown.querySelector('.nav-link').classList.add('active');

                }

            }

        });

    };



    // // PERUBAHAN BARU: Memuat header dan footer, lalu menjalankan skrip utama.

    const loadLayout = async () => {

        await Promise.all([

            loadComponent(`${prefix}includes/header.html`, 'header-placeholder'),

            loadComponent(`${prefix}includes/footer.html`, 'footer-placeholder')

        ]);

        // Setelah layout selesai dimuat, baru jalankan semua skrip interaktif.

        initializePageScripts(); 

    };



    // Mulai proses!

    loadLayout();

});
