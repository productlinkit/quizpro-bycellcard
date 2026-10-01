/*
 * QuizPro demo backend (prototype only).
 * Answers the AJAX calls made by custom.js and quiz.js with dummy data,
 * so the original front-end code runs unchanged without the Laravel server.
 * Load it right after jQuery and before quiz.js / custom.js.
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

    // ---------- Session (dummy login) ----------
    var user = get(SESSION_KEY);
    var PUBLIC_PAGES = ['login.html', 'lucky-draw-admin.html'];
    if (!user && PUBLIC_PAGES.indexOf(page) === -1) {
        location.replace('login.html');
        return;
    }
    if (user && page === 'login.html') {
        location.replace('index.html');
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
    var LEVELS = [
        { id: 1, title: 'Beginner', points: 10 },
        { id: 2, title: 'Intermediate', points: 20 },
        { id: 3, title: 'Advance', points: 30 }
    ];

    // ---------- Dummy questions ----------
    // True/false statements only, so quiz.js always renders the swipe card (game_type = null).
    var BANK = [
        { cat: 31, q: 'Canberra is the capital city of Australia.', answer: true },
        { cat: 31, q: 'The Nile flows through Brazil.', answer: false },
        { cat: 31, q: 'Tokyo is the capital city of Japan.', answer: true },
        { cat: 31, q: 'The flag of Canada has a red maple leaf.', answer: true },
        { cat: 31, q: 'The Atlantic is the largest ocean in the world.', answer: false },
        { cat: 25, q: 'Water boils at 100°C at sea level.', answer: true },
        { cat: 25, q: 'Sound travels faster than light.', answer: false },
        { cat: 25, q: 'Plants absorb carbon dioxide from the air.', answer: true },
        { cat: 29, q: '7 × 8 = 56', answer: true },
        { cat: 29, q: 'A triangle has four sides.', answer: false },
        { cat: 29, q: '15 is an even number.', answer: false },
        { cat: 1,  q: 'A football team has 11 players on the field.', answer: true },
        { cat: 1,  q: 'A marathon is longer than 40 km.', answer: true },
        { cat: 1,  q: 'In tennis, a score of zero is called "love".', answer: true },
        { cat: 32, q: 'A whale is a mammal.', answer: true },
        { cat: 32, q: 'Spiders have six legs.', answer: false },
        { cat: 32, q: 'Penguins can fly.', answer: false },
        { cat: 33, q: 'Honey is made by bees.', answer: true },
        { cat: 33, q: 'Sushi originally comes from Japan.', answer: true },
        { cat: 33, q: 'A tomato grows underground.', answer: false },
        { cat: 30, q: 'There are seven continents.', answer: true },
        { cat: 30, q: 'A leap year has 365 days.', answer: false },
        { cat: 30, q: 'The sun rises in the east.', answer: true },
        { cat: 28, q: 'An electric car needs petrol to run.', answer: false },
        { cat: 28, q: 'A bicycle has an engine.', answer: false },
        { cat: 26, q: 'A person who writes books is called an author.', answer: true },
        { cat: 26, q: 'A dictionary lists words in alphabetical order.', answer: true },
        { cat: 21, q: 'A guitar usually has six strings.', answer: true },
        { cat: 21, q: 'A movie director acts in every scene of the film.', answer: false },
        { cat: 22, q: 'A hashtag starts with the # symbol.', answer: true },
        { cat: 22, q: 'You need a stamp to send an email.', answer: false }
    ];

    function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

    function buildQuestions(cat) {
        var own = shuffle(BANK.filter(function (q) { return q.cat === cat; }));
        var rest = shuffle(BANK.filter(function (q) { return q.cat !== cat; }));
        return own.concat(rest).slice(0, 10).map(function (q, i) {
            var qid = 100 + i;
            // quiz.js maps questionChoice[0] to the left button (swipe left) and [1] to the right (swipe right)
            var choices = [{ id: 'q' + qid + 'false', choice: 'False' }, { id: 'q' + qid + 'true', choice: 'True' }];
            return {
                question_id: qid,
                question: q.q,
                quiz_image: 0,
                quiz_video: null,
                game_type: null,
                questionChoice: choices,
                _correct: choices[q.answer ? 1 : 0].id
            };
        });
    }

    // ---------- Fake AJAX endpoints ----------
    var GAME_KEY = 'qp_demo_game';
    function game() { return get(GAME_KEY) || {}; }

    function isCorrect(g, qid, answer) {
        var q = (g.questions || []).filter(function (x) { return String(x.question_id) === String(qid); })[0];
        return q ? { ok: q._correct === String(answer), correct: q._correct } : { ok: false, correct: null };
    }

    var ROUTES = {
        '/game_category': function () {
            return { success: 1, result: LEVELS };
        },
        '/quiz/question': function () {
            var cat = parseInt(param('game'), 10) || 31;
            var level = LEVELS.filter(function (l) { return l.id === (parseInt(param('level'), 10) || 1); })[0];
            var qs = buildQuestions(cat);
            set(GAME_KEY, { cat: cat, level: level, questions: qs, real: 0, fake: 0, correct: 0 });
            return { success: 1, data: qs, length: qs.length };
        },
        '/quiz_timer': function () {
            return { success: 1, pair_id: 1, time: 60 };
        },
        '/quiz/play/answer_check': function (d) {
            var r = isCorrect(game(), d.question_id, d.answer);
            return { success: 1, answer: r.ok ? 'right' : 'wrong', correct_answer_id: r.correct };
        },
        '/quiz/play/score_calculation': function (d) {
            var g = game(), r = isCorrect(g, d.question_id, d.answer);
            if (r.ok) { g.real += g.level.points; g.correct++; }
            if (Math.random() < 0.6) g.fake += g.level.points; // opponent "Eissa"
            set(GAME_KEY, g);
            return { success: 1, real_user: g.real, fake_user: g.fake };
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

    // quiz.js redirects to /game/result/... on the server; send it to the local result page instead.
    // (DOMContentLoaded, not load: the game page's server-hosted audio can hold up the load event)
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof window.resultGenarate !== 'function') return;
        window.resultGenarate = function (qna) {
            if (window.timer) clearInterval(window.timer);
            try { localStorage.removeItem('setTimer'); } catch (e) {}
            var g = game(), real = 0, correct = 0, answered = 0;
            (g.questions || []).forEach(function (q) {
                if (qna[q.question_id] === undefined) return;
                answered++;
                if (q._correct === String(qna[q.question_id])) { correct++; real += g.level.points; }
            });
            var fake = Math.max(g.fake || 0, 0);
            var win = real >= fake;
            // Lucky Draw activity: store answered + correct so either ticket basis works
            var log = get('qp_ld_activity') || [];
            var now = new Date();
            log.unshift({
                date: now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') +
                      ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'),
                quiz: CATEGORIES[g.cat] ? CATEGORIES[g.cat][0] : 'Quiz', icon: g.cat, answered: answered, correct: correct
            });
            set('qp_ld_activity', log.slice(0, 50));
            location.href = 'result.html?' + new URLSearchParams({
                res: win ? 'win' : 'lose', game: g.cat, level: g.level ? g.level.id : 1,
                real: real, fake: fake, correct: correct, answered: answered, total: (g.questions || []).length
            });
        };
    });

    // ---------- Page wiring ----------
    document.addEventListener('DOMContentLoaded', function () {
        // quiz.js labels the swipe buttons No / Yes; this demo uses True / False statements
        var answerBox = document.getElementById('answerOption');
        if (answerBox) {
            var relabel = function () {
                var no = answerBox.querySelector('#nope'), yes = answerBox.querySelector('#love');
                if (no && no.textContent !== 'False') no.textContent = 'False';
                if (yes && yes.textContent !== 'True') yes.textContent = 'True';
            };
            new MutationObserver(relabel).observe(answerBox, { childList: true, subtree: true });
            relabel();
        }

        // Keep quiz links inside the local copy
        document.querySelectorAll('a[href*="demo.quizpro.mobi/game/detail/"]').forEach(function (a) {
            a.href = 'game-detail.html?id=' + a.getAttribute('href').split('/').pop();
        });
        document.querySelectorAll('a[href$="/logout"]').forEach(function (a) {
            a.addEventListener('click', function (e) { e.preventDefault(); del(SESSION_KEY); location.href = 'login.html'; });
        });

        // Show the logged-in number
        if (user) {
            if (page === 'index.html') document.querySelectorAll('.home-profile-name').forEach(function (el) { el.textContent = user.msisdn; });
            if (page === 'profile.html') document.querySelectorAll('.home-profile-status').forEach(function (el) { el.textContent = user.msisdn; });
        }

        // Login: any MSISDN + password works
        if (page === 'login.html') {
            var form = document.querySelector('form');
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                var m = document.getElementById('msisdn'), p = document.getElementById('password'), ok = true;
                [[m, 'Please enter your MSISDN'], [p, 'Please enter your password']].forEach(function (f) {
                    var err = f[0].parentNode.querySelector('.text-danger');
                    err.textContent = f[0].value.trim() ? '' : f[1];
                    if (!f[0].value.trim()) ok = false;
                });
                if (!ok) return;
                set(SESSION_KEY, { msisdn: m.value.trim() });
                location.href = 'index.html';
            });
        }

        // Game detail: fill from ?id=
        if (page === 'game-detail.html') {
            var id = parseInt(param('id'), 10) || 31, c = CATEGORIES[id] || CATEGORIES[31];
            var icon = SERVER + 'images/category/' + id + '/icon/' + id + '_01122022_icon_image.png';
            var header = document.querySelector('.page-header .box-wrapper');
            header.lastChild.textContent = ' ' + c[0] + ' ';
            document.querySelector('.quiz-thumbnail img').src = icon;
            document.querySelector('.quiz-info .section-title').textContent = c[0] + ' Quizzes';
            document.querySelector('.quiz-info-content p').textContent = c[1];
            document.getElementById('btnPlay').setAttribute('gameId', id);
            document.title = 'Quizy Flash';
            // Level links from custom.js point to /game/search/friend/{level}; play locally instead
            document.getElementById('search-result').addEventListener('click', function (e) {
                var a = e.target.closest('a'); if (!a) return;
                e.preventDefault();
                location.href = 'game-play.html?game=' + id + '&level=' + a.getAttribute('href').split('/').pop();
            });
        }
    });

    window.QP_DEMO = { CATEGORIES: CATEGORIES, LEVELS: LEVELS, SERVER: SERVER };
})();
