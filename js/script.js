document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        mirror: false,
        offset: 50,
    });

    // Typed.js for index.html (if #typed-hello exists)
    const typedHelloElement = document.getElementById('typed-hello');
    if (typedHelloElement) {
        var typedHello = new Typed('#typed-hello', {
            strings: ["Hello Guys!"],
            typeSpeed: 80,
            showCursor: true,
            cursorChar: '|',
            onComplete: (self) => {
                self.cursor.remove(); // Remove cursor after typing
                displayRandomQuote(); // Call quote function after "Hello Guys!" finishes
            }
        });

        // List of quotes and authors
        const quotes = [
            { text: "Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang Anda lakukan.", author: "Steve Jobs" },
            { text: "Masa depan adalah milik mereka yang percaya pada keindahan impian mereka.", author: "Eleanor Roosevelt" },
            { text: "Jangan pernah menyerah pada mimpi. Pergilah tidur.", author: "Anonim" },
            { text: "Hidup ini sangat sederhana, tapi kita yang membuatnya rumit.", author: "Confucius" },
            { text: "Kesempatan tidak akan datang dua kali. Jika datang, pegang erat-erat.", author: "Pepatah Lama" }
        ];

        // Function to display a random quote with typing effect
        function displayRandomQuote() {
            const quoteElement = document.getElementById('random-quote');
            const authorElement = document.getElementById('quote-author');

            if (quoteElement && authorElement) {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];

                // Reset opacity for potential re-typing on refresh
                quoteElement.textContent = '';
                authorElement.textContent = '';
                authorElement.classList.remove('is-visible'); // Hide author first

                new Typed('#random-quote', {
                    strings: [randomQuote.text],
                    typeSpeed: 50,
                    showCursor: true,
                    cursorChar: '_',
                    onComplete: (self) => {
                        self.cursor.remove(); // Remove quote cursor
                        // Show author name with fade-in/slide effect
                        authorElement.textContent = `- ${randomQuote.author}`;
                        authorElement.classList.add('is-visible');
                    }
                });
            }
        }
    }

    // Typed.js for aboutMe.html (if #typed-name exists)
    const typedNameElement = document.getElementById('typed-name');
    if (typedNameElement) {
        var typedName = new Typed('#typed-name', {
            strings: ["Toriq As Syarif", "Programmer", "Developer", "Engineer", "Guitarist"],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
        const callToActionElement = document.getElementById('call-to-action');
        if (callToActionElement) {
            setTimeout(() => {
                callToActionElement.classList.add('is-visible');
            }, 2000);
        }
        const aboutMeTextContainer = document.getElementById('about-me-text-container');
        const typingTextAboutMe = document.getElementById('typing-text-about-me');

        if (aboutMeTextContainer && typingTextAboutMe) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typingTextAboutMe.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            };
            const aboutMeObserver = new IntersectionObserver(observerCallback, observerOptions);
            aboutMeObserver.observe(typingTextAboutMe);
        }
    }


    // Logic for Programmer Skill Bars (if #codingSkillBarsContainer exists)
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


    // Chart.js: Hard Skill (Radar Chart)
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

    // Chart.js: Language Skill (Vertical Bar Chart)
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

    // Chart.js: Soft Skill (Doughnut Chart)
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

    const fadeInSections = document.querySelectorAll('.fade-in-section');
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

    // Slideshows for portfolio.html
    function initializeSlideshow(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const items = container.querySelectorAll('.certificate-item');
        if (items.length === 0) return;
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

    // Only initialize if the element exists to avoid errors on other pages
    if (document.getElementById('slideshow-container-1')) initializeSlideshow('slideshow-container-1');
    if (document.getElementById('slideshow-container-2')) initializeSlideshow('slideshow-container-2');
    if (document.getElementById('slideshow-container-3')) initializeSlideshow('slideshow-container-3');


    // Modal logic for aboutMe.html and portfolio pages
    const orgLogoItems = document.querySelectorAll('.org-logo-item');
    const courseLogoItems = document.querySelectorAll('.course-logo-item');
    const infoModal = document.getElementById('infoModal');
    const modalTitleEl = document.getElementById('modalTitle');
    const modalBodyEl = document.getElementById('modalBody');
    const closeButton = document.getElementById('closeButton');
    const imageModal = document.getElementById("imageModal"); // For portfolio achievements/experience/training
    const modalImg = document.getElementById("modalImage");
    const certificateCards = document.querySelectorAll(".certificate-card");
    const closeModalSpan = document.getElementById("imageModalClose");


    if (infoModal) infoModal.style.display = "none"; // For aboutMe.html modals
    if (imageModal) imageModal.style.display = "none"; // For portfolio page image modals


    orgLogoItems.forEach(item => {
         item.addEventListener('click', () => {
            if (modalTitleEl && modalBodyEl && infoModal) {
                modalTitleEl.textContent = item.dataset.title || 'Detail';
                modalBodyEl.innerHTML = `<p>${item.dataset.description || 'Informasi tidak tersedia.'}</p>`;
                infoModal.style.setProperty('display', 'flex', 'important');
            }
        });
    });

    if (closeButton && infoModal) closeButton.addEventListener('click', () => infoModal.style.setProperty('display', 'none', 'important'));
    if (infoModal) window.addEventListener('click', e => { if (e.target === infoModal) infoModal.style.setProperty('display', 'none', 'important'); });

    // Certificate image modal logic for portfolio achievements/experience/training
    certificateCards.forEach(card => {
        card.addEventListener('click', function() {
            // Check for both types of image elements
            const imgElement = this.querySelector('.certificate-image-display') || this.querySelector('.certificate-image');
            if (imageModal && modalImg && imgElement) {
                imageModal.style.display = "flex";
                modalImg.src = imgElement.src;
                modalImg.alt = imgElement.alt;
            }
        });
    });

    if (closeModalSpan) {
        closeModalSpan.onclick = function() {
            if (imageModal) imageModal.style.display = "none";
        }
    }

    if (imageModal) {
        window.onclick = function(event) {
            if (event.target == imageModal) {
                imageModal.style.display = "none";
            }
        }
    }

    // Logic for Responsive Header
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

    // Logic to Toggle Mobile Submenu for Portfolio
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

    // Logic for Desktop Dropdown
    const portfolioDesktopTrigger = document.getElementById('portfolioDesktopTrigger');
    const desktopDropdown = portfolioDesktopTrigger ? portfolioDesktopTrigger.nextElementSibling : null;

    if(portfolioDesktopTrigger && desktopDropdown){
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

        portfolioDesktopTrigger.addEventListener('focus', () => {
            desktopDropdown.style.display = 'block';
            const arrow = portfolioDesktopTrigger.querySelector('.arrow-icon');
            if(arrow) arrow.classList.add('rotate-180');
        });
         desktopDropdown.querySelectorAll('a.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                desktopDropdown.style.display = 'none';
                const arrow = portfolioDesktopTrigger.querySelector('.arrow-icon');
                if(arrow) arrow.classList.remove('rotate-180');
            });
        });
    }


    // Update year in footer and mobile drawer
    const currentYearFooter = document.getElementById('currentYearFooter');
    if (currentYearFooter) currentYearFooter.textContent = new Date().getFullYear();

    const currentYearMobileDrawer = document.getElementById('currentYearMobileDrawer');
    if (currentYearMobileDrawer) currentYearMobileDrawer.textContent = new Date().getFullYear();

    // Set Active Link in Navigation based on current page URL
    function setActiveLink() {
        const currentPath = window.location.pathname;
        const currentFileName = currentPath.split('/').pop().split('#')[0]; // Get filename without hash
        const headerHeight = 64; // Adjust this if your header height changes

        // Handle active class for primary nav links
        document.querySelectorAll('header nav .nav-link, aside nav .nav-link').forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref) {
                const linkFileName = linkHref.split('/').pop().split('#')[0];

                if (linkFileName === currentFileName || (currentFileName === '' && linkFileName === 'index.html')) {
                    link.classList.add('active');

                    // If it's a portfolio sub-link, activate main Portfolio link and expand submenu
                    const parentDropdown = link.closest('.dropdown-menu');
                    const parentMobileSubmenu = link.closest('.mobile-submenu');
                    if (parentDropdown || parentMobileSubmenu) {
                        const portfolioTrigger = document.querySelector('#portfolioDesktopTrigger') || document.querySelector('.portfolio-mobile-trigger span');
                        if (portfolioTrigger) {
                            const mainPortfolioLinkInNav = Array.querySelector('header nav > a.nav-link, header nav > div > button.nav-link').find(el => el.textContent.includes('Portfolio'));
                            if (mainPortfolioLinkInNav) mainPortfolioLinkInNav.classList.add('active');
                        }
                        if (parentMobileSubmenu) {
                            parentMobileSubmenu.classList.add('open');
                            const mobileTrigger = parentMobileSubmenu.previousElementSibling;
                            if (mobileTrigger) {
                                const arrowIcon = mobileTrigger.querySelector('.arrow-icon');
                                if (arrowIcon) arrowIcon.classList.add('rotate-180');
                            }
                        }
                    }
                }
            }
        });

        // Handle active class for internal section links on pages like aboutMe.html or portfolio.html
        // This is primarily for the main `index.html` if it had sections with IDs in the nav.
        const sections = document.querySelectorAll('main section[id]');
        if (sections.length > 0) {
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 10;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            // If at the very top of the page, or above the first section, consider "home-content" active
            if (!currentSectionId && pageYOffset < (sections[0]?.offsetTop - headerHeight - 10)) {
                currentSectionId = 'home-content';
            }

            document.querySelectorAll('nav .nav-link').forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref && linkHref.startsWith('../') && linkHref.includes('#')) {
                    const linkSectionId = linkHref.split('#')[1];
                    if (linkSectionId === currentSectionId) {
                        // For anchor links, only add 'active' if it's the *exact* section,
                        // and prevent it from deactivating other page links.
                        // This logic needs to be carefully managed to avoid conflicts
                        // with the file-based active class.
                        // For simplicity, let's prioritize the file-based active class.
                    }
                }
            });
        }
    }

    // Call setActiveLink on DOMContentLoaded and on scroll
    setActiveLink();
    window.addEventListener('scroll', setActiveLink);


    // Countdown Timer Logic (for something.html)
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
                // Optional: Tampilkan pesan saat countdown selesai
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

    // Only start countdown if the elements exist (i.e., on something.html)
    if (document.getElementById('days')) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30); // Example: 30 days from now
        startCountdown(targetDate.getTime());
    }

});
