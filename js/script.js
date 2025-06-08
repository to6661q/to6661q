<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil Saya - Keahlian & Informasi</title>

    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"></script>
    <script src="https://unpkg.com/chart.js"></script>

    <link rel="stylesheet" href="../css/style.css">

</head>
<body class="bg-[#f0fdf4]">

    <div id="header-placeholder"></div> <main id="mainContent" class="main-content-area">


        </main>

    <div id="footer-placeholder"></div> <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

    <script src="../js/script.js"></script>

    <script>
        // Definisikan fungsi yang akan dipanggil dari script.js setelah layout dimuat
        function initializePageSpecificScripts() {
            // AOS.init sudah dipanggil di script.js, tidak perlu di sini lagi
            // Tapi jika ada konfigurasi AOS khusus halaman ini, bisa ditambahkan di sini.

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
            const typingTextAboutMe = document.getElementById('typing-text-about-me'); // Ini tidak digunakan dalam skrip yang Anda berikan, tapi biarkan jika ada di HTML

            if (aboutMeTextContainer) {
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

            // CV Modal Logic
            const openCvModalBtn = document.getElementById('openCvModalBtn');
            const cvModal = document.getElementById('cvModal');
            const closeCvButton = document.getElementById('closeCvButton');
            const cvPdfViewer = document.getElementById('cvPdfViewer');
            const downloadPdfButton = document.getElementById('downloadPdfButton');

            // Set the PDF URL here. Replace 'path/to/your-cv.pdf' with your actual CV PDF link.
            const cvPdfUrl = 'https://www.africau.edu/images/default/sample.pdf';
            // Ensure the download link uses the same URL
            if (downloadPdfButton) {
                downloadPdfButton.href = cvPdfUrl;
            }

            if (openCvModalBtn && cvModal && closeCvButton && cvPdfViewer) {
                openCvModalBtn.addEventListener('click', () => {
                    cvPdfViewer.src = cvPdfUrl; // Load the PDF into the iframe
                    cvModal.style.setProperty('display', 'flex', 'important');
                });

                closeCvButton.addEventListener('click', () => {
                    cvModal.style.setProperty('display', 'none', 'important');
                    cvPdfViewer.src = ''; // Clear iframe src to stop PDF loading
                });

                // Close modal when clicking outside the modal content
                window.addEventListener('click', (e) => {
                    if (e.target === cvModal) {
                        cvModal.style.setProperty('display', 'none', 'important');
                        cvPdfViewer.src = ''; // Clear iframe src
                    }
                });
            }
        }
    </script>
</body>
</html>
