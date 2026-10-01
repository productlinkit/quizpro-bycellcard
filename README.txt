QUIZPRO (Quizy Flash) - salinan front-end dari https://demo.quizpro.mobi
Diambil 1 Okt 2026, dalam keadaan LOGIN (akun demo 1234567890).

CARA BUKA
  Ekstrak, lalu double-click index.html. Semua menu & tombol navigasi bawah saling terhubung.
  Butuh internet: gambar, avatar, audio, jQuery, font Nunito & Font Awesome masih diambil dari server/CDN.

HALAMAN (12)
  index.html          Home                      (/)
  game-more.html      See More Quizzes          (/game/more)
  leaderboard.html    Leaderboard               (/game/leaderboard)
  profile.html        Profile                   (/profile)
  history.html        Game History              (/game/history)
  profile-edit.html   Edit Profile              (/profile/edit)
  language.html       Languages                 (/language/more)
  rule.html           Rules and Policies        (/rule)
  contact.html        Contact Us                (/contact)
  game-detail.html    Detail quiz World Map     (/game/detail/31)
  game-play.html      Layar main quiz           (/game/play/3)
  login.html          Login                     (/login)

CSS / JS (struktur folder sama dengan server)
  theme/css/style.css                 CSS utama  <- paling sering diedit
  theme/css/bootstrap.min.css         Bootstrap 5.1.3 (identik dengan server)
  theme/js/bootstrap.bundle.min.js    Bootstrap 5.1.3 JS (identik)
  theme/js/hammer.js                  Hammer.js 2.0.4 untuk swipe kartu (identik)
  theme/js/quiz.js                    Logika main quiz (timer, swipe, jawab, skor)
  theme/js/custom.js                  Search, pilih level, ganti bahasa
  theme/fontello/...                  Icon font qf-icon-* (woff2 identik byte-per-byte)
  theme/floating-copy/css/style.css   Tombol floating kanan bawah

AKURASI
  Isi semua halaman & file CSS/JS sudah dicek cocok dengan server (diabaikan: spasi/indentasi).

PERUBAHAN DARI ASLINYA (hanya agar bisa jalan lokal)
  - Path CSS/JS: https://demo.quizpro.mobi//theme/... -> theme/...
  - Link antar halaman diarahkan ke file .html lokal (detail quiz lain tetap ke server).
  - Tombol back di History/Rules/Contact: aslinya "halaman sebelumnya" (url()->previous()), di sini ke profile.html.
  - Token keamanan (csrf/_token) diganti CSRF_PLACEHOLDER.

YANG TIDAK JALAN LOKAL (butuh server Laravel)
  Login, logout, unsubscribe, simpan profil, ganti bahasa, search, pilih level (AJAX),
  dan seluruh alur main quiz (soal diambil via AJAX /quiz/question, jadi game-play.html tampil kosong).
  Halaman hasil (win/lose) tidak ikut karena butuh ID hasil permainan.

TAMBAHAN (prototype, 1 Okt 2026)
  Login dummy        : nomor & password apa saja diterima, lalu masuk ke Home. Logout di Profile.
  Main quiz          : Home/See More -> detail -> Play -> pilih level -> game-play.html -> result.html
  theme/js/demo-backend.js  backend tiruan: menjawab AJAX custom.js & quiz.js dengan soal dummy.
                            quiz.js, custom.js, game-play.html tidak diubah logikanya.
  result.html        halaman hasil (aslinya /game/result/win|lose di server)
  lucky-draw.html, lucky-draw-admin.html, theme/lucky-draw/  menu Lucky Draw
  Cara jalan         : python3 -m http.server di folder ini, buka http://localhost:8000
