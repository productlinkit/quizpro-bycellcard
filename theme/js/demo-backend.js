/*
 * QuizPro demo backend (prototype only).
 * Dummy login, profile, settings (theme, sound) and page wiring so the copied
 * front-end runs without the Laravel server. Load it right after jQuery.
 */
(function () {
    var SERVER = 'https://demo.quizpro.mobi//';
    var SESSION_KEY = 'qp_demo_user';

    function store(kind) { try { return window[kind]; } catch (e) { return null; } }
    function get(key) { try { return JSON.parse(store('localStorage').getItem(key)); } catch (e) { return null; } }
    function set(key, val) { try { store('localStorage').setItem(key, JSON.stringify(val)); } catch (e) {} }
    function del(key) { try { store('localStorage').removeItem(key); } catch (e) {} }
    function param(name) { return new URLSearchParams(location.search).get(name); }
    var page = (location.pathname.split('/').pop() || 'index.html');

    // ---------- Settings: theme & sound (Profile menu) ----------
    function raw(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
    function setRaw(key, v) { try { localStorage.setItem(key, v); } catch (e) {} }
    var THEMES = [
        { id: 'blue', name: 'Ocean Blue', bg: '#3EA9F5', top: '#1888D8' },
        { id: 'purple', name: 'Purple', bg: '#8E6CEF', top: '#6B46E0' },
        { id: 'green', name: 'Mint Green', bg: '#2DBE8C', top: '#169A6E' },
        { id: 'pink', name: 'Pink', bg: '#EE6FA6', top: '#D24887' },
        { id: 'night', name: 'Night', bg: '#1B2340', top: '#0E1428' }
    ];
    (function () {
        var css = THEMES.slice(1).map(function (t) {
            return '[data-theme="' + t.id + '"]{--qp-bg:' + t.bg + ';--qp-top:' + t.top + '}' +
                '[data-theme="' + t.id + '"] body{background-color:' + t.bg + '}' +
                '[data-theme="' + t.id + '"] body::before{background:linear-gradient(180deg,' + t.top + ' 0%,transparent 100%)}';
        }).join('');
        var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    })();
    function applyTheme(id) { document.documentElement.setAttribute('data-theme', id || 'blue'); }
    applyTheme(raw('qp_theme'));

    // ---------- Session (dummy login) ----------
    // Guests can browse; login is asked only when they use a feature (play, Lucky Draw, profile).
    var user = get(SESSION_KEY);
    var MEMBER_PAGES = ['game-play.html', 'result.html', 'history.html', 'profile.html', 'profile-edit.html'];
    function loginUrl(next) { return 'login.html?next=' + encodeURIComponent(next || (page + location.search)); }
    function safeNext() {
        var n = param('next') || '';
        return /^[a-z-]+\.html(\?[^#]*)?$/.test(n) && n.indexOf('login.html') !== 0 ? n : 'index.html';
    }
    if (!user && MEMBER_PAGES.indexOf(page) !== -1) {
        location.replace(loginUrl());
        return;
    }
    if (user && page === 'login.html') {
        location.replace(safeNext());
        return;
    }

    // ---------- Category data (from the copied pages) ----------
    var CATEGORIES = {
        1:  ['Sports', 'Common sports terms, famous players, rules of games, and memorable moments at sports events.'],
        21: ['Movies & Music', 'Title of popular movies, cast, and memorable scene. Song title, singer, and composer.'],
        22: ['Social Media', 'Social media terms, social media history, founder history, and their achievement.'],
        25: ['Science', 'General knowledge of science, programming, physics, and chemical terms'],
        26: ['Books', 'Title of popular books, novels, popular writers,'],
        28: ['Vehicles', 'Vehicle name, engine, technology.'],
        29: ['Maths', 'Basic Calculation, Number line, Integers and Variables, Algebraic.'],
        30: ['General Knowledge', 'World History, popular news, a world phenomenon, general terms.'],
        31: ['World Map & Flags', 'Name of the country, the capital city, president/leader, geography, demography'],
        32: ['Animal', 'Name of animal, type of animal, animal ability'],
        33: ['Food', 'Name of food, taste, ingredients, food country origin']
    };
    // Categories that have questions in theme/js/questions.js; the rest show "Coming soon"
    var PLAYABLE = [31, 25, 29, 1, 32, 33];
    function playable(id) { return PLAYABLE.indexOf(+id) !== -1; }

    var DEFAULT_AVATAR = SERVER + 'uploads/user/2/91819a12c87646f315a23b80fbf283ea.jpg';
    var USER_AVATAR = (user && user.avatar) || DEFAULT_AVATAR;

    // A round is 5 questions in 30 seconds (see theme/js/play.js)
    var LEVELS = [
        { id: 1, title: 'Beginner', points: 10, icon: 'fa-leaf' },
        { id: 2, title: 'Intermediate', points: 20, icon: 'fa-bolt' },
        { id: 3, title: 'Advance', points: 30, icon: 'fa-fire' }
    ];

    // ---------- Fake AJAX endpoints (custom.js) ----------
    var ROUTES = {
        '/game_category': function () {
            return { success: 1, result: LEVELS };
        },
        '/changlang': function () {
            return { success: 1 };
        }
    };

    function parseData(d) {
        if (!d) return {};
        if (typeof d === 'object') return d;
        var o = {}; new URLSearchParams(d).forEach(function (v, k) { o[k] = v; }); return o;
    }

    if (window.jQuery) {
        jQuery.ajaxTransport('+*', function (opts) {
            var path = Object.keys(ROUTES).filter(function (r) { return (opts.url || '').slice(-r.length) === r; })[0];
            if (!path) return;
            return {
                send: function (headers, complete) {
                    var body = ROUTES[path](parseData(opts.data));
                    complete(200, 'OK', { text: JSON.stringify(body) });
                },
                abort: function () {}
            };
        });
    }

    function t(s) { return window.QP_I18N ? QP_I18N.t(s) : s; }
    function f(s, v) { return window.QP_I18N ? QP_I18N.f(s, v) : s.replace(/\{(\w+)\}/g, function (m, k) { return v[k]; }); }
    function toastMsg(html) {
        var n = document.createElement('div');
        n.className = 'saved-toast info';
        n.innerHTML = html;
        document.body.appendChild(n);
        setTimeout(function () { n.classList.add('hide'); }, 1800);
        setTimeout(function () { n.remove(); }, 2300);
    }

    // ---------- Page wiring ----------
    document.addEventListener('DOMContentLoaded', function () {
        // Keep quiz links inside the local copy
        document.querySelectorAll('a[href*="demo.quizpro.mobi/game/detail/"]').forEach(function (a) {
            a.href = 'game-detail.html?id=' + a.getAttribute('href').split('/').pop();
        });
        // Logout asks for confirmation first
        document.querySelectorAll('a[data-logout], a[href$="/logout"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                e.preventDefault();
                var m = document.getElementById('modalLogout');
                if (!m) {
                    m = document.createElement('div');
                    m.className = 'modal fade modal-standard';
                    m.id = 'modalLogout';
                    m.tabIndex = -1;
                    m.innerHTML =
                        '<div class="modal-dialog modal-dialog-centered"><div class="modal-content confirm-modal">' +
                            '<span class="confirm-ico"><span class="qf-icon-out"></span></span>' +
                            '<h3 class="modal-level-title mb-2">Log out?</h3>' +
                            '<p class="confirm-text">You will need to log in again to play quizzes and collect Lucky Draw tickets.</p>' +
                            '<button type="button" class="btn btn-lg button-primary w-100 mb-2" data-bs-dismiss="modal">Cancel</button>' +
                            '<button type="button" class="btn btn-lg confirm-danger w-100" id="btnLogoutConfirm">Yes, Log out</button>' +
                        '</div></div>';
                    document.body.appendChild(m);
                    m.querySelector('#btnLogoutConfirm').addEventListener('click', function () {
                        del(SESSION_KEY); location.href = 'index.html';
                    });
                }
                bootstrap.Modal.getOrCreateInstance(m).show();
            });
        });

        // Categories without questions yet: greyed out with a "Coming soon" tag, playable ones first
        document.querySelectorAll('.quiz-box[href*="game-detail.html?id="]').forEach(function (a) {
            if (playable(a.getAttribute('href').split('id=').pop())) return;
            a.classList.add('is-soon');
            a.setAttribute('aria-disabled', 'true');
            a.insertAdjacentHTML('beforeend', '<span class="soon-tag">Coming soon</span>');
            var col = a.parentNode;
            if (col && col.parentNode) col.parentNode.appendChild(col);
        });
        document.addEventListener('click', function (e) {
            var a = e.target.closest('a[href*="game-detail.html?id="]');
            if (!a || playable(a.getAttribute('href').split('id=').pop())) return;
            e.preventDefault();
            toastMsg('<span class="fa fa-clock-o"></span> ' + t('Quizzes for this category are coming soon'));
        });

        // Home: tap the photo to change it
        if (user && page === 'index.html') {
            var ava = document.querySelector('.home-profile .avatar');
            if (ava) {
                var link = document.createElement('a');
                link.href = 'profile-edit.html';
                link.className = 'avatar home-ava-edit';
                link.setAttribute('aria-label', 'Change profile photo');
                link.innerHTML = ava.innerHTML + '<span class="home-ava-cam fa fa-camera"></span>';
                ava.parentNode.replaceChild(link, ava);
            }
        }

        // Login links return to the page the user came from
        document.querySelectorAll('a[href="login.html"]').forEach(function (a) { a.href = loginUrl(); });

        if (!user) {
            // Home: guest card instead of the member profile
            var card = page === 'index.html' && document.querySelector('.home-profile');
            if (card) card.innerHTML =
                '<div class="d-flex align-items-center">' +
                    '<div class="avatar guest-avatar"><span class="qf-icon-profile"></span></div>' +
                    '<div class="flex-grow-1 ms-2 min-w-0"><div class="home-profile-name">Hi, Guest!</div>' +
                    '<div class="home-profile-status">Login to play quizzes &amp; win prizes</div></div>' +
                    '<a href="' + loginUrl() + '" class="btn button-green guest-login">Login</a>' +
                '</div>';
            // Profile tab: go to login, then come back to the profile
            document.querySelectorAll('.bottom-nav a[href="profile.html"]').forEach(function (a) { a.href = loginUrl('profile.html'); });
            // Leaderboard: no "You" row or position card for guests
            var meCard = document.querySelector('.lb-me'); if (meCard) meCard.remove();
            document.querySelectorAll('.leaderboard-winner.is-you').forEach(function (li) {
                li.classList.remove('is-you');
                var tag = li.querySelector('.lb-you'); if (tag) tag.remove();
            });
        }

        // Show the logged-in user's name, number and photo
        if (user) {
            var name = user.name || user.msisdn;
            if (page === 'index.html') document.querySelectorAll('.home-profile-name').forEach(function (el) { el.textContent = name; });
            if (page === 'profile.html') {
                document.querySelectorAll('.home-profile-name').forEach(function (el) { el.textContent = user.name || 'Hello'; });
                document.querySelectorAll('.home-profile-status').forEach(function (el) { el.textContent = user.msisdn; });
            }
            if (user.avatar) document.querySelectorAll('img[src="' + DEFAULT_AVATAR + '"]').forEach(function (img) { img.src = user.avatar; });
        }

        // Profile saved: short confirmation on the profile page
        if (page === 'profile.html' && param('saved')) {
            var note = document.createElement('div');
            note.className = 'saved-toast';
            note.innerHTML = '<span class="qf-icon-thumbs-up"></span> Profile updated';
            document.body.appendChild(note);
            setTimeout(function () { note.classList.add('hide'); }, 2200);
            history.replaceState(null, '', 'profile.html');
        }

        // Edit profile: save locally instead of posting to the server
        if (page === 'profile-edit.html' && user) {
            var pform = document.querySelector('form'), nameIn = document.getElementById('username'),
                fileIn = document.getElementById('avatar'), preview = document.querySelector('.avatar img'), newAvatar = null;
            nameIn.value = user.name || '';
            nameIn.maxLength = 20;
            fileIn.accept = 'image/*';
            var err = document.createElement('small');
            err.className = 'text-danger d-block mt-1';
            nameIn.parentNode.appendChild(err);
            var ferr = document.createElement('small');
            ferr.className = 'text-danger d-block mt-1';
            fileIn.parentNode.appendChild(ferr);

            // Shrink the photo so it fits in browser storage
            fileIn.addEventListener('change', function () {
                ferr.textContent = '';
                var file = fileIn.files[0]; if (!file) return;
                if (!/^image\//.test(file.type)) { ferr.textContent = 'Please choose an image file'; fileIn.value = ''; return; }
                var reader = new FileReader();
                reader.onload = function () {
                    var img = new Image();
                    img.onload = function () {
                        var size = 200, c = document.createElement('canvas'), k = Math.min(img.width, img.height);
                        c.width = c.height = size;
                        c.getContext('2d').drawImage(img, (img.width - k) / 2, (img.height - k) / 2, k, k, 0, 0, size, size);
                        newAvatar = c.toDataURL('image/jpeg', 0.85);
                        preview.src = newAvatar;
                    };
                    img.onerror = function () { ferr.textContent = 'This image could not be read'; };
                    img.src = reader.result;
                };
                reader.readAsDataURL(file);
            });

            pform.addEventListener('submit', function (e) {
                e.preventDefault();
                var v = nameIn.value.trim();
                err.textContent = v ? '' : 'Please enter your name';
                if (!v) return;
                user.name = v;
                if (newAvatar) user.avatar = newAvatar;
                set(SESSION_KEY, user);
                if (!get(SESSION_KEY) || get(SESSION_KEY).name !== v) { ferr.textContent = 'Could not save, the photo may be too large'; return; }
                location.href = 'profile.html?saved=1';
            });
        }

        // Login: any MSISDN + password works
        if (page === 'login.html') {
            var form = document.querySelector('form');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var m = document.getElementById('msisdn'), p = document.getElementById('password'), ok = true;
                [[m, 'Please enter your MSISDN'], [p, 'Please enter your password']].forEach(function (f) {
                    var err = f[0].closest('.mb-3').querySelector('.text-danger');
                    err.textContent = f[0].value.trim() ? '' : f[1];
                    if (!f[0].value.trim()) ok = false;
                });
                if (!ok) return;
                set(SESSION_KEY, { msisdn: m.value.trim() });
                location.href = safeNext();
            });
        }

        // Game detail: fill from ?id=, then Play opens the level picker (guests are asked to log in)
        if (page === 'game-detail.html') {
            var id = parseInt(param('id'), 10) || 31, c = CATEGORIES[id] || CATEGORIES[31];
            var icon = SERVER + 'images/category/' + id + '/icon/' + id + '_01122022_icon_image.png';
            var header = document.querySelector('.page-header .box-wrapper');
            header.lastChild.textContent = ' ' + c[0] + ' ';
            document.querySelector('.quiz-thumbnail img').src = icon;
            document.querySelector('.quiz-info .section-title').textContent = c[0] + ' Quizzes';
            document.querySelector('.quiz-info-content p').textContent = c[1];
            document.title = 'Quizy Flash';
            var meta = document.querySelectorAll('.quiz-info-meta .col-6');
            if (meta.length === 2) {
                meta[0].lastChild.textContent = ' ' + f('{n} questions', { n: 5 });
                meta[1].lastChild.textContent = ' ' + f('{n} sec', { n: 30 });
                meta[1].querySelector('.quiz-info-meta-circle').innerHTML = '<span class="fa fa-clock-o"></span>';
            }
            var play = document.getElementById('btnPlay');
            play.setAttribute('gameId', id);
            if (!playable(id)) {
                play.classList.add('disabled', 'button-grey');
                play.classList.remove('button-primary');
                play.textContent = 'Coming soon';
            }
            var list = document.getElementById('search-result');
            list.innerHTML = LEVELS.map(function (l) {
                return '<a href="game-play.html?game=' + id + '&level=' + l.id + '" class="lvl-card lvl-' + l.id + '">' +
                    '<span class="lvl-ico"><span class="fa ' + l.icon + '"></span></span>' +
                    '<span class="lvl-text"><b>' + t(l.title) + '</b><small>' + f('{n} questions', { n: 5 }) + ' · ' + f('{n} sec', { n: 30 }) + '</small></span>' +
                    '<span class="lvl-pts"><span class="lvl-pts-badge qf-icon-crown"></span>+' + l.points + ' ' + t('Point') + '</span></a>';
            }).join('');
            document.addEventListener('click', function (e) {
                if (!e.target.closest('#btnPlay')) return;
                e.preventDefault(); e.stopPropagation();   // keep custom.js from loading the server's level list
                if (!playable(id)) return;
                bootstrap.Modal.getOrCreateInstance(document.getElementById(user ? 'level' : 'modalplay')).show();
            }, true);
        }

        // Profile: theme picker and sound switch
        if (page === 'profile.html') {
            var themeRow = document.getElementById('menuTheme'), soundRow = document.getElementById('menuSound');
            var cur = raw('qp_theme') || 'blue';
            function themeLabel() {
                var th = THEMES.filter(function (x) { return x.id === cur; })[0] || THEMES[0];
                document.getElementById('menuThemeVal').innerHTML = '<i style="background:' + th.bg + '"></i>' + t(th.name);
            }
            if (themeRow) {
                themeLabel();
                var sheet = document.getElementById('modalTheme'), grid = document.getElementById('themeGrid');
                grid.innerHTML = THEMES.map(function (th) {
                    return '<button type="button" class="theme-opt" data-theme-id="' + th.id + '">' +
                        '<span class="theme-swatch" style="background:linear-gradient(180deg,' + th.top + ',' + th.bg + ')"><span class="fa fa-check"></span></span>' +
                        '<span>' + t(th.name) + '</span></button>';
                }).join('');
                function mark() { grid.querySelectorAll('.theme-opt').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-theme-id') === cur); }); }
                mark();
                grid.addEventListener('click', function (e) {
                    var b = e.target.closest('.theme-opt'); if (!b) return;
                    cur = b.getAttribute('data-theme-id');
                    setRaw('qp_theme', cur); applyTheme(cur); mark(); themeLabel();
                });
                themeRow.addEventListener('click', function (e) { e.preventDefault(); bootstrap.Modal.getOrCreateInstance(sheet).show(); });
            }
            if (soundRow) {
                var sw = document.getElementById('soundSwitch');
                sw.checked = raw('qp_sound') !== 'off';
                soundRow.addEventListener('click', function (e) {
                    if (e.target !== sw) { e.preventDefault(); sw.checked = !sw.checked; }
                    setRaw('qp_sound', sw.checked ? 'on' : 'off');
                    toastMsg('<span class="fa ' + (sw.checked ? 'fa-volume-up' : 'fa-volume-off') + '"></span> ' + t(sw.checked ? 'Sound on' : 'Sound off'));
                });
            }
        }
    });

    window.QP_DEMO = { CATEGORIES: CATEGORIES, LEVELS: LEVELS, SERVER: SERVER, user: user, loginUrl: loginUrl,
        USER_AVATAR: USER_AVATAR, PLAYABLE: PLAYABLE, playable: playable };
})();
