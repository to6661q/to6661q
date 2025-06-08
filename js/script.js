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

        // --- Mulai Skrip Khusus Halaman About Me (atau halaman Pages lainnya) ---

        // Typed.js untuk 'typed-name' (hanya jika elemen ada)
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

        // Call to Action visibility (hanya jika elemen ada)
        const callToActionElement = document.getElementById('call-to-action');
        if (callToActionElement) {
            setTimeout(() => {
                callToActionElement.classList.add('is-visible');
            }, 2000);
        }

        // About Me Typing Container visibility (hanya jika elemen ada)
        const aboutMeTextContainer = document.getElementById('about-me-typing-container');
        const typingTextAboutMe = document.getElementById('typing-text-about-me'); // Ini tidak digunakan dalam skrip yang Anda berikan, tapi biarkan jika ada di HTML

        if (aboutMeTextContainer) { // Cukup cek container utama
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutMeTextContainer.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            };
            const aboutMeObserver = new IntersectionObserver(observerCallback, observerOptions);
            aboutMeObserver.observe(aboutMeTextContainer);
        }

        // Programmer Skill Level animations (hanya jika elemen ada)
        function setProgrammerSkillLevel(skillId, level) {
            const skillBarFill = document.getElementById(skillId);
            if (skillBarFill) {
                skillBarFill.style.width = '0%';
                setTimeout(() => {
                    skillBarFill.style.width = level + '%';
                }, 100);
            }
        }

        const programmerSkillBars = document.querySelectorAll('.skill-bar-fill-programmer');
        if (programmerSkillBars.length > 0) {
            const programmerObserverOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
            const programmerObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetId = entry.target.id;
                        if (targetId === 'python-skill') setProgrammerSkillLevel(targetId, 90);
                        else if (targetId === 'html-skill') setProgrammerSkillLevel(targetId, 95);
                        else if (targetId === 'php-skill') setProgrammerSkillLevel(targetId, 80);
                        else if (targetId === 'css-skill') setProgrammerSkillLevel(targetId, 90);
                        else if (targetId === 'java-skill') setProgrammerSkillLevel(targetId, 75);
                        else if (targetId === 'javascript-skill') setProgrammerSkillLevel(targetId, 85);
                        else if (targetId === 'cpp-skill') setProgrammerSkillLevel(targetId, 70);
                        else if (targetId === 'c-skill') setProgrammerSkillLevel(targetId, 65);
                        else if (targetId === 'r-skill') setProgrammerSkillLevel(targetId, 60);
                        else if (targetId === 'kotlin-skill') setProgrammerSkillLevel(targetId, 70);
                        observer.unobserve(entry.target);
                    }
                });
            }, programmerObserverOptions);
            programmerSkillBars.forEach(bar => programmerObserver.observe(bar));
        }


        // Chart.js: Hard Skill (Radar Chart) (hanya jika elemen ada)
        const hardSkillCtx = document.getElementById('hardSkillChart');
        if (hardSkillCtx) {
            const hardSkillRawData = {
                'An': 90, 'CS': 80, 'DS': 85,
                'ML': 85, 'Mu': 85, 'Ne': 75, 'IS': 80
            };
            const radarChartFillColor = 'rgba(0, 102, 97, 0.5)';
            const radarChartBorderColorTheme = '#006661';

            const hardSkillChartData = {
                labels: Object.keys(hardSkillRawData),
                datasets: [{
                    label: 'Tingkat Penguasaan',
                    data: Object.values(hardSkillRawData),
                    backgroundColor: radarChartFillColor,
                    borderColor: radarChartBorderColorTheme,
                    borderWidth: 2,
                    pointBackgroundColor: radarChartBorderColorTheme,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: radarChartBorderColorTheme
                }]
            };
            new Chart(hardSkillCtx.getContext('2d'), {
                type: 'radar',
                data: hardSkillChartData,
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` }}
                    },
                    scales: { r: {
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { font: { family: 'Lexend', size: 10, weight: '500' }, color: '#4a5568' },
                        ticks: { beginAtZero: true, max: 100, stepSize: 20, color: '#666', backdropColor: 'rgba(255,255,255,0.7)', font: { family: 'Lexend', size: 8 }}
                    }},
                    elements: { line: { tension: 0.1 }, point: { radius: 3, hitRadius: 8, hoverRadius: 5 }}
                }
            });

            const hardSkillChartLegend = document.getElementById('hardSkillChartLegend');
            if (hardSkillChartLegend) {
                const legendTextMapping = {
                    'An': 'Android', 'CS': 'Cyber Security', 'DS': 'Data Science',
                    'ML': 'Machine Learning', 'Mu': 'Multimedia', 'Ne': 'Networking',
                    'IS': 'IT Support'
                };
                hardSkillChartLegend.innerHTML = '';
                for (const key in legendTextMapping) {
                    if (legendTextMapping.hasOwnProperty(key)) {
                        const legendItem = document.createElement('div');
                        legendItem.classList.add('legend-item');
                        legendItem.textContent = `${key} = ${legendTextMapping[key]}`;
                        hardSkillChartLegend.appendChild(legendItem);
                    }
                }
            }
        }

        // Chart.js: Language Skill (Vertical Bar Chart) (hanya jika elemen ada)
        const languageCtx = document.getElementById('languageSkillChart');
        if (languageCtx) {
            const languageSkillLevels = {
                'Bahasa': 95,
                'Inggris': 80,
                'Arab': 60
            };
            const languageBarColors = ['#006661', '#00796b', '#00897b'];
            const languageSkillData = {
                labels: Object.keys(languageSkillLevels),
                datasets: [{
                    label: 'Tingkat Keahlian',
                    data: Object.values(languageSkillLevels),
                    backgroundColor: languageBarColors,
                    borderColor: languageBarColors,
                    borderWidth: 1
                }]
            };
            new Chart(languageCtx.getContext('2d'), {
                type: 'bar',
                data: languageSkillData,
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` }}
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                stepSize: 25,
                                callback: val => val + '%' ,
                                font: { family: 'Lexend', size: 8 }, color: '#666'
                            },
                            grid: { color: 'rgba(0,0,0,0.1)' }
                        },
                        x: {
                            ticks: { font: { family: 'Lexend', size: 10 }, color: '#4a5568' },
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // Chart.js: Soft Skill (Doughnut Chart) (hanya jika elemen ada)
        const softSkillCtx = document.getElementById('softSkillChart');
        if (softSkillCtx) {
            const softSkillData = {
                'Adaptable': 80,
                'Communicative': 85,
                'Disciplined': 75,
                'Respectful': 90,
                'Responsible': 88,
                'Teamwork': 92
            };
            const softSkillDoughnutColors = ['#006661', '#00796b', '#00897b', '#26a69a', '#4db6ac', '#80cbc4'];

            new Chart(softSkillCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: Object.keys(softSkillData),
                    datasets: [{
                        label: 'Tingkat Penguasaan',
                        data: Object.values(softSkillData),
                        backgroundColor: softSkillDoughnutColors,
                        borderColor: softSkillDoughnutColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    cutout: '50%',
                    plugins: {
                        legend: { display: false },
                        tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` }}
                    }
                }
            });
            const softSkillChartLegend = document.getElementById('softSkillChartLegend');
            if (softSkillChartLegend) {
                softSkillChartLegend.innerHTML = '';
                Object.keys(softSkillData).forEach((label, index) => {
                    const item = document.createElement('div'); item.className = 'legend-item';
                    const colorBox = document.createElement('div'); colorBox.className = 'legend-color';
                    colorBox.style.backgroundColor = softSkillDoughnutColors[index % softSkillDoughnutColors.length];
                    const labelText = document.createElement('span'); labelText.className = 'legend-label';
                    labelText.textContent = label;
                    item.append(colorBox, labelText); softSkillChartLegend.appendChild(item);
                });
            }
        }

        // General Fade In Sections (hanya jika elemen ada)
        const fadeInSections = document.querySelectorAll('.fade-in-section');
        if (fadeInSections.length > 0) {
            const generalFadeInObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.id !== 'about-me-text-container') {
                             entry.target.classList.add('is-visible');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { root: null, rootMargin: '0px', threshold: 0.1 });
            fadeInSections.forEach(section => generalFadeInObserver.observe(section));
        }

        // Slideshows (hanya jika elemen ada)
        function initializeSlideshow(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return; // Exit if container doesn't exist
            const items = container.querySelectorAll('.certificate-item');
            if (items.length === 0) return; // Exit if no items
            let currentIndex = 0;
            let interval;
            items[currentIndex].classList.add('active');

            function showNext() {
                items[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % items.length;
                items[currentIndex].classList.add('active');
            }
            function showPrev() {
                items[currentIndex].classList.remove('active');
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                items[currentIndex].classList.add('active');
            }
            function start() { clearInterval(interval); interval = setInterval(showNext, 3000); }
            function pause() { clearInterval(interval); }

            start();
            container.addEventListener('mouseenter', pause);
            container.addEventListener('mouseleave', start);
            container.addEventListener('touchstart', pause, {passive: true});
            container.addEventListener('touchend', start);
            container.addEventListener('click', (e) => {
                const rect = container.getBoundingClientRect();
                e.clientX - rect.left > rect.width / 2 ? showNext() : showPrev();
                pause(); start();
            });
        }
        // Initialize specific slideshows if their containers exist
        if (document.getElementById('slideshow-container-1')) initializeSlideshow('slideshow-container-1');
        if (document.getElementById('slideshow-container-2')) initializeSlideshow('slideshow-container-2');
        if (document.getElementById('slideshow-container-3')) initializeSlideshow('slideshow-container-3');


        // Organization Logo Modal Logic (hanya jika elemen ada)
        const orgLogoItems = document.querySelectorAll('.org-logo-item');
        const infoModal = document.getElementById('infoModal');
        const modalTitleEl = document.getElementById('modalTitle');
        const modalBodyEl = document.getElementById('modalBody');
        const closeButton = document.getElementById('closeButton');

        if (infoModal) infoModal.style.display = "none"; // Hide initially if it exists

        if (orgLogoItems.length > 0 && infoModal && modalTitleEl && modalBodyEl && closeButton) {
            orgLogoItems.forEach(item => {
                item.addEventListener('click', () => {
                    modalTitleEl.textContent = item.dataset.title || 'Detail';
                    modalBodyEl.innerHTML = `<p>${item.dataset.description || 'Informasi tidak tersedia.'}</p>`;
                    infoModal.style.setProperty('display', 'flex', 'important');
                });
            });

            closeButton.addEventListener('click', () => infoModal.style.setProperty('display', 'none', 'important'));
            window.addEventListener('click', e => { if (e.target === infoModal) infoModal.style.setProperty('display', 'none', 'important'); });
        }


        // CV Modal Logic (hanya jika elemen ada)
        const openCvModalBtn = document.getElementById('openCvModalBtn');
        const cvModal = document.getElementById('cvModal');
        const closeCvButton = document.getElementById('closeCvButton');
        const cvPdfViewer = document.getElementById('cvPdfViewer');
        const downloadPdfButton = document.getElementById('downloadPdfButton');

        const cvPdfUrl = 'https://www.africau.edu/images/default/sample.pdf'; // Pastikan URL ini benar
        if (downloadPdfButton) {
            downloadPdfButton.href = cvPdfUrl;
        }

        if (openCvModalBtn && cvModal && closeCvButton && cvPdfViewer) {
            openCvModalBtn.addEventListener('click', () => {
                cvPdfViewer.src = cvPdfUrl;
                cvModal.style.setProperty('display', 'flex', 'important');
            });

            closeCvButton.addEventListener('click', () => {
                cvModal.style.setProperty('display', 'none', 'important');
                cvPdfViewer.src = '';
            });

            window.addEventListener('click', (e) => {
                if (e.target === cvModal) {
                    cvModal.style.setProperty('display', 'none', 'important');
                    cvPdfViewer.src = '';
                }
            });
        }


        // --- Akhir Skrip Khusus Halaman About Me (atau halaman Pages lainnya) ---

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
