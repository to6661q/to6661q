/**
 * @file Skrip utama untuk fungsionalitas situs web, termasuk inisialisasi library,
 * penanganan event, logika header responsif, modal, animasi, dan banyak lagi.
 * @author Toriq As Syarif (Diasumsikan dari konteks)
 * @version 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {

    // -----------------------------------------------------------------------------
    // Inisialisasi Library Pihak Ketiga
    // -----------------------------------------------------------------------------

    /**
     * Inisialisasi AOS (Animate On Scroll) untuk animasi elemen saat di-scroll.
     */
    AOS.init({
        duration: 800,
        once: true,
        mirror: false,
        offset: 50,
    });

    /**
     * Inisialisasi Typed.js untuk animasi teks mengetik.
     * Digunakan untuk nama di halaman utama dan sapaan di halaman lain.
     */
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

    if (document.getElementById('typed-hello')) {
        new Typed('#typed-hello', {
            strings: ["Hello Guys!"],
            typeSpeed: 80,
            showCursor: true,
            cursorChar: '|',
            onComplete: (self) => {
                self.cursor.remove(); // Hapus kursor setelah selesai
                displayRandomQuote(); // Tampilkan kutipan acak
            }
        });
    }


    // -----------------------------------------------------------------------------
    // Logika Header & Navigasi
    // -----------------------------------------------------------------------------

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
    const mobileNavLinks = document.querySelectorAll('#mobileMenuDrawer .nav-link');
    const portfolioMobileTrigger = document.querySelector('.portfolio-mobile-trigger');
    const portfolioMobileSubmenu = document.querySelector('.portfolio-mobile-submenu');
    const portfolioDesktopTrigger = document.getElementById('portfolioDesktopTrigger');
    const desktopDropdown = portfolioDesktopTrigger ? portfolioDesktopTrigger.nextElementSibling : null;

    /**
     * Mengatur event listener untuk menu mobile (burger).
     */
    if (mobileMenuBtn && mobileMenuDrawer && closeMobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.add('open'));
        closeMobileMenuBtn.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));

        // Tutup drawer saat link di-klik (kecuali pemicu submenu)
        mobileNavLinks.forEach(link => {
            if (!link.parentElement.classList.contains('portfolio-mobile-trigger')) {
                link.addEventListener('click', () => mobileMenuDrawer.classList.remove('open'));
            }
        });
    }

    /**
     * Mengatur event listener untuk submenu portfolio di tampilan mobile.
     */
    if (portfolioMobileTrigger && portfolioMobileSubmenu) {
        portfolioMobileTrigger.addEventListener('click', function(event) {
            event.preventDefault();
            portfolioMobileSubmenu.classList.toggle('open');
            const arrowIcon = portfolioMobileTrigger.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.classList.toggle('rotate-180');
            }
        });
    }

    /**
     * Mengatur event listener untuk dropdown portfolio di tampilan desktop.
     */
    if (portfolioDesktopTrigger && desktopDropdown) {
        const parent = portfolioDesktopTrigger.parentElement;
        const arrow = portfolioDesktopTrigger.querySelector('.arrow-icon');

        parent.addEventListener('mouseenter', () => {
            desktopDropdown.style.display = 'block';
            if (arrow) arrow.classList.add('rotate-180');
        });

        parent.addEventListener('mouseleave', () => {
            desktopDropdown.style.display = 'none';
            if (arrow) arrow.classList.remove('rotate-180');
        });

        portfolioDesktopTrigger.addEventListener('focus', () => {
             desktopDropdown.style.display = 'block';
            if (arrow) arrow.classList.add('rotate-180');
        });
    }

    /**
     * Mengatur link navigasi yang aktif berdasarkan scroll atau URL halaman.
     */
    const sections = document.querySelectorAll('main section[id]');
    const headerHeight = 64; // Sesuaikan dengan tinggi header Anda

    function setActiveLink() {
        let currentSectionId = '';
        const pageYOffset = window.pageYOffset;
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // Tentukan ID seksi saat scroll di halaman utama
        if (currentPath === 'index.html' || currentPath === '') {
             sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 10;
                if (pageYOffset >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });
        }
       
        document.querySelectorAll('nav .nav-link').forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (!linkHref) return;

            const linkFileName = linkHref.split('/').pop().split('#')[0];
            const linkHash = linkHref.split('#')[1];

            // Cek apakah link adalah untuk halaman saat ini
            if (linkFileName === currentPath || (currentPath === 'index.html' && linkFileName === '')) {
                // Jika di halaman utama, cocokkan dengan hash
                if (linkHash === currentSectionId) {
                    link.classList.add('active');
                } else if (currentPath === linkFileName && !linkHash) {
                    // Jika link halaman tanpa hash (misal: "About Me.html")
                     link.classList.add('active');
                }
            }
             
             // Penanganan khusus untuk item portfolio agar parent-nya juga aktif
            const isPortfolioPage = currentPath.startsWith('portfolio');
            if(isPortfolioPage && (linkFileName === currentPath)){
                link.classList.add('active'); // Aktifkan link sub-item
                // Cari dan aktifkan juga link "Portfolio" utama
                const mainPortfolioLink = document.querySelector('#portfolioDesktopTrigger, .portfolio-mobile-trigger > span');
                if(mainPortfolioLink) {
                    // Ini mungkin button atau span, jadi cari parent nav-link nya
                    const mainNavLink = mainPortfolioLink.closest('button.nav-link') || mainPortfolioLink.closest('a.nav-link');
                    if (mainNavLink) {
                        mainNavLink.classList.add('active');
                    } else { // fallback untuk mobile
                        const mobileParentLink = document.querySelector('.portfolio-mobile-trigger > a');
                        if(mobileParentLink) mobileParentLink.classList.add('active');
                    }
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Panggil sekali saat load


    // -----------------------------------------------------------------------------
    // Animasi & Interaksi Konten
    // -----------------------------------------------------------------------------

    /**
     * Intersection Observer untuk memicu animasi fade-in.
     */
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const generalFadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });
    fadeInSections.forEach(section => generalFadeInObserver.observe(section));

    /**
     * Memicu efek mengetik di bagian "About Me" saat terlihat.
     */
    const aboutMeTypingContainer = document.getElementById('about-me-typing-container');
    if (aboutMeTypingContainer) {
        const aboutMeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        aboutMeObserver.observe(aboutMeTypingContainer);
    }
    
    /**
     * Menampilkan Call to Action (CTA) setelah delay.
     */
    const callToActionElement = document.getElementById('call-to-action');
    if (callToActionElement) {
        setTimeout(() => {
            callToActionElement.classList.add('is-visible');
        }, 2000);
    }

    /**
     * Menampilkan kutipan acak dengan efek ketik.
     */
    function displayRandomQuote() {
        const quotes = [
            { text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang Anda lakukan.", author: "Steve Jobs" },
            { text: "Masa depan adalah milik mereka yang percaya pada keindahan impian mereka.", author: "Eleanor Roosevelt" },
            { text: "Hidup ini sangat sederhana, tapi kita yang membuatnya rumit.", author: "Confucius" },
        ];
        const quoteElement = document.getElementById('random-quote');
        const authorElement = document.getElementById('quote-author');

        if (quoteElement && authorElement) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteElement.textContent = '';
            authorElement.textContent = '';
            authorElement.classList.remove('is-visible');

            new Typed('#random-quote', {
                strings: [`"${randomQuote.text}"`],
                typeSpeed: 40,
                showCursor: false,
                onComplete: () => {
                    authorElement.textContent = `- ${randomQuote.author}`;
                    authorElement.classList.add('is-visible');
                }
            });
        }
    }


    // -----------------------------------------------------------------------------
    // Logika Modal
    // -----------------------------------------------------------------------------

    // Modal untuk menampilkan gambar sertifikat
    const imageModal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const certificateCards = document.querySelectorAll(".certificate-card");
    const imageModalClose = document.getElementById("imageModalClose");

    if (imageModal && modalImg && imageModalClose) {
        certificateCards.forEach(card => {
            card.addEventListener('click', function() {
                const imgElement = this.querySelector('.certificate-image, .certificate-image-display');
                if (imgElement) {
                    imageModal.style.display = "flex";
                    modalImg.src = imgElement.src;
                    modalImg.alt = imgElement.alt;
                }
            });
        });

        imageModalClose.onclick = () => imageModal.style.display = "none";
    }

    // Modal untuk info organisasi/kursus
    const infoModal = document.getElementById('infoModal');
    const modalTitleEl = document.getElementById('modalTitle');
    const modalBodyEl = document.getElementById('modalBody');
    const closeInfoButton = document.getElementById('closeButton');
    const logoItems = document.querySelectorAll('.org-logo-item, .course-logo-item');

    if (infoModal && modalTitleEl && modalBodyEl && closeInfoButton) {
        infoModal.style.display = "none";

        logoItems.forEach(item => {
            item.addEventListener('click', () => {
                modalTitleEl.textContent = item.dataset.title || 'Detail';
                modalBodyEl.innerHTML = `<p>${item.dataset.description || 'Informasi tidak tersedia.'}</p>`;
                infoModal.style.setProperty('display', 'flex', 'important');
            });
        });

        closeInfoButton.addEventListener('click', () => infoModal.style.setProperty('display', 'none', 'important'));
    }

    // Menutup modal saat mengklik di luar kontennya
    window.addEventListener('click', e => {
        if (e.target === imageModal) imageModal.style.display = "none";
        if (e.target === infoModal) infoModal.style.setProperty('display', 'none', 'important');
    });


    // -----------------------------------------------------------------------------
    // Logika Spesifik Halaman (Chart, Slideshow, Countdown)
    // -----------------------------------------------------------------------------

    /**
     * Inisialisasi Chart.js untuk skill.
     */
    function initializeCharts() {
        // Data Skill
        const hardSkillRawData = { 'An': 90, 'CS': 80, 'DS': 85, 'ML': 85, 'Mu': 85, 'Ne': 75, 'IS': 80 };
        const languageSkillLevels = { 'Bahasa': 95, 'Inggris': 80, 'Arab': 60 };
        const softSkillData = { 'Adaptable': 80, 'Communicative': 85, 'Disciplined': 75, 'Respectful': 90, 'Responsible': 88, 'Teamwork': 92 };

        // Konfigurasi Warna
        const mainColor = '#006661';
        const mainColorTransparent = 'rgba(0, 102, 97, 0.5)';
        const colorPalette = ['#006661', '#00796b', '#00897b', '#26a69a', '#4db6ac', '#80cbc4'];

        // Radar Chart (Hard Skill)
        const hardSkillCtx = document.getElementById('hardSkillChart');
        if (hardSkillCtx) {
            new Chart(hardSkillCtx.getContext('2d'), {
                type: 'radar',
                data: {
                    labels: Object.keys(hardSkillRawData),
                    datasets: [{
                        label: 'Tingkat Penguasaan',
                        data: Object.values(hardSkillRawData),
                        backgroundColor: mainColorTransparent,
                        borderColor: mainColor,
                        borderWidth: 2
                    }]
                },
                options: { /* Opsi styling disederhanakan, bisa ditambahkan kembali jika perlu */ }
            });
            // Logika legenda kustom bisa ditambahkan di sini
        }

        // Bar Chart (Language Skill)
        const languageCtx = document.getElementById('languageSkillChart');
        if (languageCtx) {
            new Chart(languageCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: Object.keys(languageSkillLevels),
                    datasets: [{
                        label: 'Tingkat Keahlian',
                        data: Object.values(languageSkillLevels),
                        backgroundColor: colorPalette,
                    }]
                },
                options: {
                    indexAxis: 'y', // Membuat bar menjadi horizontal agar lebih rapi
                    responsive: true,
                    plugins: { legend: { display: false } }
                }
            });
        }

        // Doughnut Chart (Soft Skill)
        const softSkillCtx = document.getElementById('softSkillChart');
        if (softSkillCtx) {
            new Chart(softSkillCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: Object.keys(softSkillData),
                    datasets: [{
                        data: Object.values(softSkillData),
                        backgroundColor: colorPalette,
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '50%',
                    plugins: { legend: { position: 'bottom' } } // Legenda lebih baik diatur oleh Chart.js
                }
            });
        }
    }
    initializeCharts();

    /**
     * Intersection Observer untuk skill bar pemrograman.
     */
    const programmerSkillBars = document.querySelectorAll('.skill-bar-fill-programmer');
    const programmerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level || '0';
                entry.target.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    programmerSkillBars.forEach(bar => programmerObserver.observe(bar));

    /**
     * Inisialisasi slideshow sertifikat.
     */
    function initializeSlideshow(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const items = container.querySelectorAll('.certificate-item');
        if (items.length <= 1) return; // Tidak perlu slideshow jika item hanya 1 atau 0

        let currentIndex = 0;
        let interval = setInterval(showNext, 3000);
        items[currentIndex].classList.add('active');

        function showNext() {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }

        container.addEventListener('mouseenter', () => clearInterval(interval));
        container.addEventListener('mouseleave', () => interval = setInterval(showNext, 3000));
    }
    initializeSlideshow('slideshow-container-1');
    initializeSlideshow('slideshow-container-2');
    initializeSlideshow('slideshow-container-3');

    /**
     * Logika hitung mundur (countdown).
     */
    function startCountdown(endDate) {
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        const interval = setInterval(() => {
            const distance = new Date(endDate).getTime() - new Date().getTime();
            if (distance < 0) {
                clearInterval(interval);
                // Tampilkan pesan selesai jika perlu
                document.getElementById('countdown-container').innerHTML = "<p>Waktu habis!</p>";
                return;
            }
            daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
            hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
            minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
            secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
        }, 1000);
    }
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30); // Contoh: 30 hari dari sekarang
    if(document.getElementById('countdown-container')) {
        startCountdown(targetDate);
    }


    // -----------------------------------------------------------------------------
    // Utilitas Umum
    // -----------------------------------------------------------------------------

    /**
     * Mengatur tahun saat ini di footer dan mobile drawer.
     */
    const currentYearElements = document.querySelectorAll('.current-year');
    currentYearElements.forEach(el => {
        if (el) el.textContent = new Date().getFullYear();
    });

});
