/*
 * Quiz round (prototype only): solo play, 5 multiple-choice questions, one 30-second timer per round.
 * Each answer shows right/wrong straight away, then moves to the next question.
 * Needs demo-backend.js, i18n.js and questions.js.
 */
(function () {
    var QUESTIONS_PER_ROUND = 5, ROUND_SECONDS = 30, NEXT_DELAY = 1200;

    var D = window.QP_DEMO, I = window.QP_I18N, BANK = window.QP_QUESTIONS || {};
    var p = new URLSearchParams(location.search);
    var cat = parseInt(p.get('game'), 10) || 31;
    var level = D.LEVELS.filter(function (l) { return l.id === (parseInt(p.get('level'), 10) || 1); })[0] || D.LEVELS[0];
    var li = Math.max(0, I.LANGS.indexOf(I.current()));   // 0 en, 1 km, 2 zh

    function text(v) { return typeof v === 'string' ? v : (v[li] || v[0]); }
    function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function $(id) { return document.getElementById(id); }

    // Pick 5 questions from this category (others only if the category is short), shuffle the answers
    var own = shuffle(BANK[cat] || []);
    var extra = shuffle([].concat.apply([], Object.keys(BANK).filter(function (k) { return +k !== cat; }).map(function (k) { return BANK[k]; })));
    var round = own.concat(extra).slice(0, QUESTIONS_PER_ROUND).map(function (q) {
        var order = shuffle([0, 1, 2, 3]);
        return { q: text(q.q), options: order.map(function (i) { return text(q.o[i]); }), answer: order.indexOf(q.a) };
    });

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
    var idx = 0, score = 0, correct = 0, answered = 0, left = ROUND_SECONDS, timer = null, locked = false, streak = 0, done = false;
    var CIRC = 2 * Math.PI * 19;

    $('gp-total').textContent = round.length;
    $('gp-cat-img').src = D.SERVER + 'images/category/' + cat + '/icon/' + cat + '_01122022_icon_image.png';
    $('gp-dots').innerHTML = round.map(function () { return '<i></i>'; }).join('');
    var bar = $('gp-timer-bar');
    bar.style.strokeDasharray = CIRC;

    function drawTimer() {
        $('gp-time').textContent = left;
        bar.style.strokeDashoffset = CIRC * (1 - left / ROUND_SECONDS);
        $('gp-timer').classList.toggle('low', left <= 10);
    }

    function show() {
        var q = round[idx];
        locked = false;
        $('gp-num').textContent = idx + 1;
        $('gp-question').innerHTML = '<span>' + q.q + '</span>';
        $('gp-question').classList.remove('in'); void $('gp-question').offsetWidth; $('gp-question').classList.add('in');
        $('gp-options').innerHTML = q.options.map(function (o, i) {
            return '<li><button type="button" class="play-opt" data-i="' + i + '" style="animation-delay:' + (i * 0.05) + 's">' +
                '<span class="play-opt-key">' + 'ABCD'.charAt(i) + '</span><span class="play-opt-text">' + o + '</span>' +
                '<span class="play-opt-mark"></span></button></li>';
        }).join('');
        var dots = $('gp-dots').children;
        for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('now', d === idx);
    }

    function toast(ok) {
        var t = $('answerToast');
        var sub = ok ? (streak >= 2 ? I.f('🔥 {n} in a row · +{p}', { n: streak, p: level.points }) : I.f('+{p} points', { p: level.points })) : I.t('Keep going!');
        t.className = 'answer-toast ' + (ok ? 'ok' : 'bad');
        t.innerHTML = (ok ? '<span class="toast-sparks" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>' : '') +
            '<span class="toast-ico"><span class="fa ' + (ok ? 'fa-check' : 'fa-times') + '"></span></span>' +
            '<span class="toast-text"><b>' + I.t(ok ? 'Correct!' : 'Wrong') + '</b><small>' + sub + '</small></span>';
        void t.offsetWidth; t.classList.add('show');
    }

    function pick(i) {
        if (locked || done) return;
        locked = true; answered++;
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
        toast(ok);
        setTimeout(function () {
            if (done) return;
            if (++idx >= round.length) finish(); else show();
        }, NEXT_DELAY);
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
                quiz: D.CATEGORIES[cat] ? D.CATEGORIES[cat][0] : 'Quiz', icon: cat, answered: answered, correct: correct
            });
            localStorage.setItem('qp_ld_activity', JSON.stringify(log.slice(0, 50)));
        } catch (e) {}
        location.href = 'result.html?' + new URLSearchParams({
            res: correct >= Math.ceil(round.length * 0.6) ? 'win' : 'lose', game: cat, level: level.id,
            real: score, correct: correct, answered: answered, total: round.length, time: ROUND_SECONDS - left,
            quick: D.quick ? 1 : 0
        });
    }

    $('gp-options').addEventListener('click', function (e) {
        var b = e.target.closest('.play-opt'); if (b) pick(+b.getAttribute('data-i'));
    });

    // Exit asks for confirmation; the round timer keeps running meanwhile
    $('gp-exit').addEventListener('click', function () { bootstrap.Modal.getOrCreateInstance($('modalExit')).show(); });
    $('gp-exit-yes').addEventListener('click', function () { done = true; clearInterval(timer); location.href = D.quick ? 'index.html' : 'game-detail.html?id=' + cat; });

    drawTimer();
    show();
    timer = setInterval(function () {
        left--; drawTimer();
        if (left <= 5 && left > 0) sfx.tick();
        if (left <= 0) {
            clearInterval(timer);
            // Time is up: unanswered questions count as missed
            locked = true;
            var t = $('answerToast');
            t.className = 'answer-toast bad';
            t.innerHTML = '<span class="toast-ico"><span class="fa fa-clock-o"></span></span><span class="toast-text"><b>' + I.t("Time's up!") + '</b></span>';
            void t.offsetWidth; t.classList.add('show');
            setTimeout(finish, 900);
        }
    }, 1000);
})();
