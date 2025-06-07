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

            const aboutMeTextContainer = document.getElementById('about-me-typing-container');
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
                            aboutMeTextContainer.classList.add('is-visible');
                            observer.unobserve(entry.target); 
                        }
                    });
                };
                const aboutMeObserver = new IntersectionObserver(observerCallback, observerOptions);
                aboutMeObserver.observe(aboutMeTextContainer); 
            }

            function setProgrammerSkillLevel(skillId, level) {
                const skillBarFill = document.getElementById(skillId);
                if (skillBarFill) {
                    skillBarFill.style.width = '0%'; 
                    setTimeout(() => {
                        skillBarFill.style.width = level + '%';
                    }, 100); 
                }
            }
            
            const softSkillData = { 
                'Adaptable': 80, 
                'Communicative': 85,
                'Disciplined': 75,
                'Respectful': 90,
                'Responsible': 88,
                'Teamwork': 92
            };
            const softSkillDoughnutColors = ['#006661', '#00796b', '#00897b', '#26a69a', '#4db6ac', '#80cbc4'];


            const programmerSkillBars = document.querySelectorAll('.skill-bar-fill-programmer');
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
            initializeSlideshow('slideshow-container-1');
            initializeSlideshow('slideshow-container-2');
            initializeSlideshow('slideshow-container-3');

            const orgLogoItems = document.querySelectorAll('.org-logo-item'); 
            const courseLogoItems = document.querySelectorAll('.course-logo-item'); 
            const infoModal = document.getElementById('infoModal');
            const modalTitleEl = document.getElementById('modalTitle'); 
            const modalBodyEl = document.getElementById('modalBody');   
            const closeButton = document.getElementById('closeButton');

            if (infoModal) infoModal.style.display = "none";

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

            // Logika Header Responsif (Sinkron dengan others_page_certificates)
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
            
            const portfolioDesktopTrigger = document.getElementById('portfolioDesktopTrigger');
            const desktopDropdown = portfolioDesktopTrigger ? portfolioDesktopTrigger.nextElementSibling : null;
            
            const currentYearElements = [document.getElementById('currentYearFooter'), document.getElementById('currentYearMobileDrawer')];
            currentYearElements.forEach(el => {
                if (el) el.textContent = new Date().getFullYear();
            });
 const sections = document.querySelectorAll('main section[id]'); 
            function setActiveLink() {
                let currentSectionId = '';
                const headerHeight = 64; 
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerHeight - 10; 
                    const sectionBottom = sectionTop + section.offsetHeight;

                    if (pageYOffset >= sectionTop && pageYOffset < sectionBottom) {
                        currentSectionId = section.getAttribute('id');
                    }
                });
                if (!currentSectionId && sections.length > 0 && pageYOffset < (sections[0].offsetTop - headerHeight -10) ) {
                     currentSectionId = 'home-content'; 
                }

                document.querySelectorAll('nav .nav-link').forEach(link => { 
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');
                    
                    if (linkHref && ((linkHref.startsWith('#') && linkHref.substring(1) === currentSectionId) || (currentSectionId === 'home-content' && linkHref === '#home'))) {
                        link.classList.add('active');
                    } else if (linkHref === 'others.html' && window.location.pathname.endsWith('/others.html')) { 
                        if(link.textContent.trim() === 'Something') {
                            link.classList.add('active');
                        }
                    } else if (linkHref === 'portfolio-training.html' && window.location.pathname.endsWith('/portfolio-training.html')) {
                        const parentDropdown = link.closest('.dropdown-menu') || link.closest('.mobile-submenu');
                        if (parentDropdown) {
                            const portfolioTrigger = document.querySelector('#portfolioDesktopTrigger') || document.querySelector('.portfolio-mobile-trigger span');
                            if (portfolioTrigger) {
                                const mainPortfolioLinkInNav = Array.from(document.querySelectorAll('header nav > a.nav-link, header nav > div > button.nav-link')).find(el => el.textContent.includes('Portfolio'));
                                if (mainPortfolioLinkInNav && !mainPortfolioLinkInNav.classList.contains('active')) mainPortfolioLinkInNav.classList.add('active');
                            }
                        }
                        if (link.textContent.trim() === 'Training') {
                            link.classList.add('active');
                        }
                    }
                });
            }
            window.addEventListener('scroll', setActiveLink);
            setActiveLink(); 

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
