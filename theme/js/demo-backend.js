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
    // First theme is the default (orange); the original QuizPro blue stays as a choice
    var THEMES = [
        { id: 'orange', name: 'Orange', bg: '#FFA048', top: '#F7731B' },
        { id: 'blue', name: 'Ocean Blue', bg: '#3EA9F5', top: '#1888D8' },
        { id: 'purple', name: 'Purple', bg: '#8E6CEF', top: '#6B46E0' },
        { id: 'green', name: 'Mint Green', bg: '#2DBE8C', top: '#169A6E' },
        { id: 'pink', name: 'Pink', bg: '#EE6FA6', top: '#D24887' },
        { id: 'night', name: 'Night', bg: '#1B2340', top: '#0E1428' }
    ];
    (function () {
        var css = THEMES.map(function (t) {
            return '[data-theme="' + t.id + '"]{--qp-bg:' + t.bg + ';--qp-top:' + t.top + '}' +
                '[data-theme="' + t.id + '"] body{background-color:' + t.bg + '}' +
                '[data-theme="' + t.id + '"] body::before{background:linear-gradient(180deg,' + t.top + ' 0%,transparent 100%)}';
        }).join('');
        var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    })();
    function applyTheme(id) { document.documentElement.setAttribute('data-theme', id || THEMES[0].id); }
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
    // Quick Play (Play Now on Home) can be played without logging in
    var quick = param('quick') === '1' && (page === 'game-play.html' || page === 'result.html');
    if (!user && !quick && MEMBER_PAGES.indexOf(page) !== -1) {
        location.replace(loginUrl());
        return;
    }
    if (user && page === 'login.html') {
        location.replace(safeNext());
        return;
    }

    // The copied pages use this server photo for the demo account; members without their own photo get the orange default
    var DEFAULT_AVATAR = SERVER + 'uploads/user/2/91819a12c87646f315a23b80fbf283ea.jpg';
    var ORANGE_AVATAR = 'data:image/svg+xml;utf8,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#FE9E44"/>' +
        '<circle cx="50" cy="40" r="17" fill="#fff"/><path d="M18 88c3-17 16-27 32-27s29 10 32 27z" fill="#fff"/></svg>');
    var USER_AVATAR = (user && user.avatar) || ORANGE_AVATAR;

    // A round is 10 questions, 20 seconds each (see theme/js/play.js)
    var LEVELS = [
        { id: 1, title: 'Beginner', points: 10, entries: 1, icon: 'fa-leaf', tagline: 'Easy questions to warm up' },
        { id: 2, title: 'Intermediate', points: 20, entries: 3, icon: 'fa-bolt', tagline: 'A bit more challenging' },
        { id: 3, title: 'Advance', points: 30, entries: 3, icon: 'fa-fire', tagline: 'For true quiz masters' }
    ];

    // Entries per level reset every day; a round uses one as soon as it starts. ?reset=1 clears them for demos.
    var ENTRY_KEY = 'qp_entries_' + (user ? 'member' : 'guest');
    if (param('reset') === '1') del(ENTRY_KEY);
    function entryLog() {
        var d = new Date(), day = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(), log = get(ENTRY_KEY);
        return log && log.day === day ? log : { day: day, used: {} };
    }
    function entriesLeft(id) {
        var l = LEVELS.filter(function (x) { return x.id === id; })[0];
        return l ? Math.max(0, l.entries - (entryLog().used[id] || 0)) : 0;
    }
    function useEntry(id) { var log = entryLog(); log.used[id] = (log.used[id] || 0) + 1; set(ENTRY_KEY, log); }

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
            document.querySelectorAll('.leaderboard-winner.is-you').forEach(function (li) {
                li.classList.remove('is-you');
                var tag = li.querySelector('.lb-you'); if (tag) tag.remove();
            });
        }

        // Photo: the member's own, otherwise the orange default (guests too)
        document.querySelectorAll('img[src="' + DEFAULT_AVATAR + '"]').forEach(function (img) { img.src = USER_AVATAR; });

        // Show the logged-in user's name, number and photo
        if (user) {
            var name = user.name || user.msisdn;
            if (page === 'index.html') document.querySelectorAll('.home-profile-name').forEach(function (el) { el.textContent = name; });
            if (page === 'profile.html') {
                document.querySelectorAll('.home-profile-name').forEach(function (el) { el.textContent = user.name || 'Hello'; });
                document.querySelectorAll('.home-profile-status').forEach(function (el) { el.textContent = user.msisdn; });
            }

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

        // Level cards: touch screens have no hover, so the lift shows on press and stays a moment before leaving
        document.addEventListener('pointerdown', function (e) {
            var c = e.target.closest('a.lvl-card'); if (c) c.classList.add('is-press');
        });
        ['pointerup', 'pointercancel'].forEach(function (type) {
            document.addEventListener(type, function () {
                document.querySelectorAll('.lvl-card.is-press').forEach(function (c) { c.classList.remove('is-press'); });
            });
        });
        document.addEventListener('click', function (e) {
            var c = e.target.closest('a.lvl-card');
            if (!c || e.metaKey || e.ctrlKey) return;
            e.preventDefault();
            c.classList.add('is-press');
            setTimeout(function () { location.href = c.getAttribute('href'); }, 220);
        });

        // Home: Daily Competition card opens a level picker first (guests can play too, via quick=1)
        if (page === 'index.html') {
            var homeList = document.getElementById('homeLevelList');
            if (homeList) {
                var renderLevels = function () {
                    homeList.innerHTML = LEVELS.map(function (l) {
                        var left = entriesLeft(l.id), tag = left ? 'a href="game-play.html?quick=1&level=' + l.id + '"' : 'div aria-disabled="true"';
                        return '<' + tag + ' class="lvl-card lvl-' + l.id + (left ? '' : ' is-out') + '">' +
                            '<span class="lvl-ico"><span class="fa ' + l.icon + '"></span></span>' +
                            '<span class="lvl-text"><b>' + t(l.title) + '</b><small>' + t(l.tagline) + '</small>' +
                            '<em class="lvl-entries">' + (left ? f('Entries left: {n}/{m}', { n: left, m: l.entries }) : t('No entries left today')) + '</em></span>' +
                            '<span class="lvl-pts"><span class="lvl-pts-badge qf-icon-crown"></span>+' + l.points + ' ' + t('Point') + '</span>' +
                            (left ? '</a>' : '</div>');
                    }).join('');
                };
                renderLevels();
                document.getElementById('level').addEventListener('show.bs.modal', renderLevels);
                var banner = document.getElementById('levelBanner'), grand = window.LD_CONFIG && LD_CONFIG.campaign.prizes[0];
                if (banner && grand) banner.innerHTML = '<span class="lvl-banner-photo"><img src="' + grand.img + '" alt=""></span>' +
                    '<span class="lvl-banner-text"><em>' + t('Weekly Grand Prize') + '</em><b>' + t(grand.item) + '</b><small>' + t('Every round earns tickets') + '</small></span>' +
                    '<span class="lvl-banner-go qf-icon-arrow-right"></span>';
                function openLevels() { bootstrap.Modal.getOrCreateInstance(document.getElementById('level')).show(); }
                document.getElementById('quickPlay').addEventListener('click', function (e) { e.preventDefault(); openLevels(); });
                // Fresh open or refresh: splash, then straight to the level picker
                var splash = document.getElementById('splash');
                if (!splash && location.hash === '#play') openLevels();   // from a Play button on another page
                if (splash) {
                    var splashEyes = splash.querySelector('.owl-pupils');
                    ['pointerdown', 'pointermove'].forEach(function (type) {
                        splash.addEventListener(type, function (e) {
                            splash.classList.add('is-live');
                            splashEyes.style.transform = 'translate(' + ((e.clientX / innerWidth - 0.5) * 6).toFixed(1) + 'px,' + ((e.clientY / innerHeight - 0.5) * 5).toFixed(1) + 'px)';
                        });
                    });
                    setTimeout(function () {
                        openLevels();
                        splash.classList.add('out');
                        setTimeout(function () { splash.remove(); }, 350);
                    }, 2500);
                }
            }
        }

        // Profile: theme picker and sound switch
        if (page === 'profile.html') {
            var themeRow = document.getElementById('menuTheme'), soundRow = document.getElementById('menuSound');
            var cur = raw('qp_theme') || THEMES[0].id;
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

    window.QP_DEMO = { LEVELS: LEVELS, SERVER: SERVER, user: user, loginUrl: loginUrl, quick: quick, entriesLeft: entriesLeft, useEntry: useEntry, USER_AVATAR: USER_AVATAR };
})();
