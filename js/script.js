// Pastikan script ini dijalankan setelah DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {

    // Fungsi untuk memuat konten HTML dari URL tertentu ke dalam elemen dengan ID
    async function loadHTML(url, elementId) {
        try {
            const response = await fetch(url);
            // Periksa apakah respons berhasil (status 200 OK)
            if (!response.ok) {
                // Jika respons tidak berhasil, lemparkan error
                throw new Error(`Gagal memuat ${url}: ${response.status} ${response.statusText}`);
            }
            const data = await response.text();
            document.getElementById(elementId).innerHTML = data;
        } catch (error) {
            console.error(`Terjadi kesalahan saat memuat ${url}:`, error);
            // Kamu bisa menambahkan pesan ke UI di sini jika ingin memberitahu pengguna
            // Misalnya: document.getElementById(elementId).innerHTML = '<p>Konten tidak dapat dimuat.</p>';
        }
    }

    // Panggil fungsi untuk memuat header dan footer
    // PERHATIKAN PATH FILE! Ini adalah penyebab paling umum mengapa tidak tampil.
    // Asumsi saat ini:
    // - File HTML utama kamu (misalnya aboutMe.html) ada di folder 'pages'
    // - File script.js ada di folder 'js' (di luar 'pages')
    // - File header.html dan footer.html ada di folder 'includes' (di luar 'pages' dan 'js')

    // Jalur yang diperbarui untuk folder "includes"
    loadHTML('../includes/header.html', 'header-container'); // Path relatif dari script.js ke includes/header.html
    loadHTML('../includes/footer.html', 'footer-container'); // Path relatif dari script.js ke includes/footer.html


    // Inisialisasi AOS (Animate On Scroll)
    // Pastikan AOS.init() dipanggil setelah elemen-elemen yang perlu dianimasikan dimuat
    AOS.init({
        // Kamu bisa menambahkan konfigurasi AOS di sini jika perlu
        duration: 1000, // durasi animasi
        once: true,    // animasi hanya berjalan sekali
    });

    // Inisialisasi Typed.js
    // Pastikan elemen dengan kelas 'typed-text' ada di dalam header.html atau footer.html
    // atau di bagian lain dari HTML utama yang sudah dimuat.
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        new Typed(typedElement, {
            strings: ["Developer", "Designer", "Content Creator"], // Ganti dengan string yang kamu inginkan
            typeSpeed: 50,
            backSpeed: 25,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // Inisialisasi Chart.js (jika kamu memiliki elemen canvas untuk chart)
    // Pastikan elemen canvas untuk chart ada di HTML setelah dimuat.
    const chartCanvas = document.getElementById('myChart'); // Ganti 'myChart' dengan ID canvas chart kamu
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Misalnya 'bar', 'line', 'pie', dll.
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
