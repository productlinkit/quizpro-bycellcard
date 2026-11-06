/*
 * Quiz round (prototype only): solo play, 10 True/False statements, 20 seconds for each one.
 * Each answer shows right/wrong straight away, then moves to the next question.
 * Statements come from the whole question bank.
 * Needs demo-backend.js, i18n.js and questions.js.
 */
(function () {
    var QUESTION_SECONDS = 20, FEEDBACK_MS = 880, FEEDBACK_OUT_MS = 120;   // 1 second in total
    // I = photo question, T = text only: 5 of each, switching every 2 (10 can't split evenly, so the last pair is I + T)
    var ROUND_PATTERN = 'IITTIITTIT';

    var D = window.QP_DEMO, I = window.QP_I18N, BANK = window.QP_QUESTIONS || {};
    var p = new URLSearchParams(location.search);
    var level = D.LEVELS.filter(function (l) { return l.id === (parseInt(p.get('level'), 10) || 1); })[0] || D.LEVELS[0];
    var li = Math.max(0, I.LANGS.indexOf(I.current()));   // 0 en, 1 km, 2 zh

    function text(v) { return typeof v === 'string' ? v : (v[li] || v[0]); }
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function $(id) { return document.getElementById(id); }

    // A text slot simply doesn't show the photo
    var pool = shuffle([].concat.apply([], Object.keys(BANK).map(function (k) { return BANK[k]; })));
    var round = ROUND_PATTERN.split('').map(function (slot) {
        var at = slot === 'I' ? pool.findIndex(function (x) { return x.img; }) : 0;
        var q = pool.splice(Math.max(at, 0), 1)[0];
        return { q: text(q.s), answer: q.a ? 0 : 1, img: slot === 'I' ? q.img : null };   // button 0 = True, 1 = False
    });
    round.forEach(function (q) { if (q.img) new Image().src = q.img; });
    var OWLS = { ok: 'theme/images/owl-happy.png', bad: 'theme/images/owl-sad.png', time: 'theme/images/owl-sad.png' };
    new Image().src = OWLS.ok; new Image().src = OWLS.bad;

    // ---------- Sound (on unless turned off in Profile) ----------
    var soundOn = (function () { try { return localStorage.getItem('qp_sound') !== 'off'; } catch (e) { return true; } })();
    var ctx = null;
    function tone(freqs, dur) {
        if (!soundOn) return;
        try {
            ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
            freqs.forEach(function (f, i) {
                var o = ctx.createOscillator(), g = ctx.createGain(), t0 = ctx.currentTime + i * dur;
                o.type = 'sine'; o.frequency.value = f;
                g.gain.setValueAtTime(0.0001, t0);
                g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
                g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
                o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0 + dur);
            });
        } catch (e) {}
    }
    var sfx = {
        correct: function () { tone([660, 880], 0.12); },
        wrong: function () { tone([300, 200], 0.16); },
        tick: function () { tone([1000], 0.05); },
        end: function () { tone([523, 659, 784], 0.14); }
    };

    // ---------- State & UI ----------
    var idx = 0, score = 0, correct = 0, answered = 0, left = QUESTION_SECONDS, used = 0, timer = null, nextTimer = null, locked = false, streak = 0, done = false;

    $('gp-total').textContent = round.length;
    $('gp-dots').innerHTML = round.map(function () { return '<i></i>'; }).join('');

    function drawTimer() {
        $('gp-time').textContent = left;
        $('gp-timer-fill').style.transform = 'scaleY(' + left / QUESTION_SECONDS + ')';
        $('gp-timer').classList.toggle('low', left <= 5);
    }

    function show() {
        var q = round[idx];
        locked = false;
        $('gp-num').textContent = idx + 1;
        var card = $('gp-card'), img = $('gp-qimg');
        img.innerHTML = q.img ? '<img src="' + q.img + '" alt="">' : '';
        if (q.img) img.firstChild.onerror = function () { img.innerHTML = ''; card.className = 'play-card text-only in'; };
        $('gp-question').innerHTML = '<span>' + q.q + '</span>';
        card.className = 'play-card ' + (q.img ? 'has-img' : 'text-only');
        void card.offsetWidth; card.classList.add('in');
        $('gp-options').innerHTML = [['True', 'fa-check', 'tf-true'], ['False', 'fa-times', 'tf-false']].map(function (o, i) {
            return '<li><button type="button" class="play-opt play-tf ' + o[2] + '" data-i="' + i + '" style="animation-delay:' + (i * 0.05) + 's">' +
                '<span class="play-opt-key"><span class="fa ' + o[1] + '"></span></span><span class="play-opt-text">' + I.t(o[0]) + '</span></button></li>';
        }).join('');
        var dots = $('gp-dots').children;
        for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('now', d === idx);
        startTimer();
    }

    // Each question has its own 20 seconds; running out counts as a missed question
    function startTimer() {
        clearInterval(timer);
        left = QUESTION_SECONDS; drawTimer();
        timer = setInterval(function () {
            left--; used++; drawTimer();
            if (left <= 5 && left > 0) sfx.tick();
            if (left <= 0) timeUp();
        }, 1000);
    }

    function timeUp() {
        clearInterval(timer);
        if (locked || done) return;
        locked = true; streak = 0; sfx.wrong();
        $('gp-options').querySelectorAll('.play-opt').forEach(function (b) { b.disabled = true; });
        $('gp-dots').children[idx].className = 'bad';
        var q = round[idx];
        $('gp-options').querySelectorAll('.play-opt')[q.answer].classList.add('is-correct');
        feedback('time', I.t("Time's up!"), answerLine(q));
        next();
    }

    function next() { nextTimer = setTimeout(advance, FEEDBACK_MS); }

    // Runs when the popup times out, or sooner if the player taps it
    function advance() {
        if (nextTimer === null || done) return;
        clearTimeout(nextTimer); nextTimer = null;
        var f = $('answerFb');
        f.classList.remove('show'); f.classList.add('out');
        setTimeout(function () {
            f.className = 'answer-fb'; f.innerHTML = '';
            if (done) return;
            if (++idx >= round.length) finish(); else show();
        }, FEEDBACK_OUT_MS);
    }

    function answerLine(q) { return I.f('Correct answer: {a}', { a: I.t(q.answer === 0 ? 'True' : 'False') }); }

    // Small burst under the chip; stays above the question card
    function sparks() {
        var colors = ['#FFCC5F', '#34d399', '#60a5fa', '#f472b6'], out = '';
        for (var n = 0; n < 10; n++) {
            var a = Math.PI * n / 9, d = 44 + Math.random() * 26;
            out += '<i style="--x:' + Math.round(Math.cos(a) * d * 1.6) + 'px;--y:' + Math.round(Math.sin(a) * d * 0.5) + 'px;background:' + colors[n % colors.length] + '"></i>';
        }
        return '<span class="fb-sparks" aria-hidden="true">' + out + '</span>';
    }

    function feedback(kind, title, sub) {
        var f = $('answerFb');
        f.innerHTML = (kind === 'ok' ? sparks() : '') + '<img class="fb-owl" src="' + OWLS[kind] + '" alt="">' +
            '<span class="fb-text"><b class="fb-title">' + title + '</b><span class="fb-sub">' + sub + '</span></span>';
        f.className = 'answer-fb ' + kind + ' show';
    }

    function pick(i) {
        if (locked || done) return;
        locked = true; answered++; clearInterval(timer);
        var q = round[idx], ok = i === q.answer, btns = $('gp-options').querySelectorAll('.play-opt');
        btns.forEach(function (b) { b.disabled = true; });
        btns[q.answer].classList.add('is-correct');
        if (!ok) btns[i].classList.add('is-wrong');
        $('gp-dots').children[idx].className = ok ? 'ok' : 'bad';
        if (ok) {
            correct++; streak++; score += level.points;
            $('gp-score').textContent = score;
            $('gp-score').classList.remove('pop'); void $('gp-score').offsetWidth; $('gp-score').classList.add('pop');
            $('gp-gain').textContent = '+' + level.points;
            $('gp-gain').classList.remove('show'); void $('gp-gain').offsetWidth; $('gp-gain').classList.add('show');
            sfx.correct();
        } else { streak = 0; sfx.wrong(); }
        $('gp-me').classList.remove('flash-ok', 'flash-bad'); void $('gp-me').offsetWidth;
        $('gp-me').classList.add(ok ? 'flash-ok' : 'flash-bad');
        feedback(ok ? 'ok' : 'bad', I.t(ok ? 'Correct!' : 'Wrong'), ok ?
            (streak >= 2 ? I.f('🔥 {n} in a row · +{p}', { n: streak, p: level.points }) : I.f('+{p} points', { p: level.points })) : answerLine(q));
        next();
    }

    function finish() {
        if (done) return;
        done = true; clearInterval(timer); sfx.end();
        // Lucky Draw ticket history keeps answered + correct so either ticket rule works (members only)
        if (D.user) try {
            var log = JSON.parse(localStorage.getItem('qp_ld_activity')) || [], now = new Date();
            log.unshift({
                date: now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') +
                      ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0'),
                answered: answered, correct: correct
            });
            localStorage.setItem('qp_ld_activity', JSON.stringify(log.slice(0, 50)));
        } catch (e) {}
        location.href = 'result.html?' + new URLSearchParams({
            res: correct >= Math.ceil(round.length * 0.6) ? 'win' : 'lose', level: level.id,
            real: score, correct: correct, answered: answered, total: round.length, time: used,
            quick: D.quick ? 1 : 0
        });
    }

    $('answerFb').addEventListener('click', advance);
    $('gp-options').addEventListener('click', function (e) {
        var b = e.target.closest('.play-opt'); if (b) pick(+b.getAttribute('data-i'));
    });

    // Exit asks for confirmation; the question timer keeps running meanwhile
    $('gp-exit').addEventListener('click', function () { bootstrap.Modal.getOrCreateInstance($('modalExit')).show(); });
    $('gp-exit-yes').addEventListener('click', function () { done = true; clearInterval(timer); location.href = 'index.html'; });

    show();
})();
