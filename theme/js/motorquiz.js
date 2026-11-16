/*
 * MotorQuiz – plans, play allowance, points and Lucky Draw entries (prototype only).
 * Confirmed rules come from the MotorQuiz brief. Everything with confirmed:false is
 * NOT an agreed business rule yet: it is a configurable placeholder pending confirmation.
 * Load after demo-backend.js. State lives in localStorage for the demo.
 */
(function () {
    var D = window.QP_DEMO || {};

    var CONFIG = {
        brand: 'MotorQuiz',
        currency: '$',

        // Confirmed plans
        plans: [
            { id: 'daily', name: 'Daily Plan', price: 0.15, per: 'day', days: 1, questions: 10, entries: 1 },
            { id: 'weekly', name: 'Weekly Plan', price: 0.75, per: 'week', days: 7, questions: 70, entries: 7 }
        ],

        // Confirmed: new users get a free 1-day trial.
        // NOT confirmed: what the trial includes. The demo uses the Daily Plan allowance as a placeholder.
        trial: { days: 1, questions: 10, entries: 1, confirmed: false, note: 'Trial allowance pending confirmation (placeholder = Daily Plan)' },

        // Confirmed gameplay rewards
        pointsPerCorrect: 1,
        bonus: { everyCorrect: 5, entries: 1 },

        // Existing quiz format (10 True/False questions per round, 20 seconds each) is kept
        roundSize: 10,

        // Confirmed prizes
        grandPrize: { item: 'Motorbike', value: 2500, qty: 1, every: 'week' },
        leaderboardPrizes: [50, 30, 20, 10, 10],

        // Rules the brief does not cover: kept configurable and shown as "pending confirmation"
        pending: [
            { id: 'trialAllowance', label: 'Questions and Lucky Draw entries included in the Free 1-Day Trial' },
            { id: 'trialEnd', label: 'What happens when the trial ends (stop, or move to a paid plan)' },
            { id: 'planEntryCredit', label: 'When plan entries are added (at each successful billing is assumed)' },
            { id: 'bonusCarry', label: 'Whether progress toward the next bonus entry carries over between rounds and draw weeks' },
            { id: 'questionsRollover', label: 'Whether unused questions carry over to the next billing period' },
            { id: 'questionUse', label: 'When a question counts as used (once it is shown is assumed)' },
            { id: 'drawWeek', label: 'Draw week, draw day & time, and which entries count for which draw' },
            { id: 'leaderboardTie', label: 'Leaderboard tie-break when players have the same points' },
            { id: 'eligibility', label: 'Prize eligibility and claim process (draw and leaderboard)' },
            { id: 'planChange', label: 'Switching between Daily and Weekly while a plan is active' },
            { id: 'cancellation', label: 'What the user keeps after unsubscribing (demo: plays on until the paid period ends)' },
            { id: 'billingTerms', label: 'Billing, renewal and failed-payment terms' },
            { id: 'payment', label: 'Payment method and confirmation step (demo: Cellcard balance + 4-digit SMS code)' },
            { id: 'resubscribe', label: 'Subscribing again while an unsubscribed plan is still running (demo: new plan starts now)' }
        ],
        // Placeholder choices for the pending rules above (change here)
        rules: {
            bonusCarryOver: true,      // progress toward the next bonus entry continues in the next round
            questionsRollover: false   // unused questions expire at the end of the billing period
        }
    };

    var KEY = 'mq_state_' + (D.user ? D.user.msisdn : 'guest');
    function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
    function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
    var S = load();
    if (new URLSearchParams(location.search).get('reset') === '1') { S = {}; save(S); }

    function plan(id) {
        if (id === 'trial') return { id: 'trial', name: 'Free Trial', price: 0, per: 'day', days: CONFIG.trial.days, questions: CONFIG.trial.questions, entries: CONFIG.trial.entries, trial: true };
        return CONFIG.plans.filter(function (p) { return p.id === id; })[0] || null;
    }
    function money(n) { return CONFIG.currency + (n % 1 ? n.toFixed(2) : n.toLocaleString('en-US')); }

    // Draw week: Monday to Sunday (placeholder, see pending.drawWeek)
    function weekStart(d) { d = new Date(d || Date.now()); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return d; }
    function weekKey(d) { var w = weekStart(d); return w.getFullYear() + '-' + (w.getMonth() + 1) + '-' + w.getDate(); }
    function monthKey(d) { d = new Date(d || Date.now()); return d.getFullYear() + '-' + (d.getMonth() + 1); }

    // A billing period starts when the user subscribes and renews every plan.days days.
    // Each renewal (a successful billing) resets the questions and adds the plan's entries.
    function sub() {
        var s = S.sub;
        if (!s) return null;
        var p = plan(s.plan), now = Date.now(), len = p.days * 864e5;
        if (p.trial || s.cancelled) {
            if (now >= s.start + len) return null;    // trial or cancelled plan runs to the end of its period
        } else {
            while (now >= s.periodStart + len) {       // renewals that happened since the last visit
                s.periodStart += len; s.used = 0; credit(p.entries, 'plan');
            }
            save(S);
        }
        return { plan: p, start: s.start, periodStart: s.periodStart, periodEnd: s.periodStart + len, used: s.used || 0,
                 left: Math.max(0, p.questions - (s.used || 0)), cancelled: !!s.cancelled };
    }

    function week() {
        var k = weekKey();
        if (!S.week || S.week.key !== k) {
            S.week = { key: k, plan: 0, bonus: 0, rounds: [] };
            if (!CONFIG.rules.bonusCarryOver) S.progress = 0;
            save(S);
        }
        return S.week;
    }
    function credit(n, kind) { var w = week(); w[kind] += n; save(S); }

    function subscribe(id) {
        var p = plan(id); if (!p) return;
        if (p.trial) S.trialUsed = true;
        S.sub = { plan: id, start: Date.now(), periodStart: Date.now(), used: 0 };
        credit(p.entries, 'plan');
        save(S);
    }
    function cancel() { if (S.sub) { S.sub.cancelled = true; save(S); } }
    function resume() { if (S.sub) { delete S.sub.cancelled; save(S); } }

    // Demo only: refreshing the Play tab refills the plan's questions so the prototype can be played again
    function demoRefill() { if (S.sub) { S.sub.used = 0; save(S); } }

    function useQuestion() { var s = sub(); if (s) { S.sub.used = (S.sub.used || 0) + 1; save(S); } }

    // Called once per correct answer; returns true when it completes a bonus entry
    function addCorrect() {
        S.progress = (S.progress || 0) + 1;
        var got = S.progress >= CONFIG.bonus.everyCorrect;
        if (got) { S.progress -= CONFIG.bonus.everyCorrect; credit(CONFIG.bonus.entries, 'bonus'); }
        var m = monthKey();
        if (!S.month || S.month.key !== m) S.month = { key: m, points: 0 };
        S.month.points += CONFIG.pointsPerCorrect;
        S.points = (S.points || 0) + CONFIG.pointsPerCorrect;
        save(S);
        return got;
    }
    function logRound(r) { var w = week(); w.rounds.unshift(r); w.rounds = w.rounds.slice(0, 50); save(S); }

    function stats() {
        var w = week(), m = monthKey();
        return {
            points: S.points || 0,
            monthPoints: S.month && S.month.key === m ? S.month.points : 0,
            entries: w.plan + w.bonus, planEntries: w.plan, bonusEntries: w.bonus,
            progress: S.progress || 0, rounds: w.rounds
        };
    }

    // Monthly leaderboard (sample players; the current user is ranked by their real points this month)
    var SAMPLE_PLAYERS = [
        ['012•••4821', 486, '#F4513B'], ['097•••3304', 452, '#8E6CEF'], ['088•••7655', 431, '#14b8a6'], ['061•••2190', 398, '#F59E0B'],
        ['077•••0472', 377, '#EC4899'], ['085•••5233', 341, '#22B573'], ['076•••1908', 322, '#1F6BFF'], ['092•••8611', 296, '#64748B'],
        ['099•••4027', 271, '#0EA5E9'], ['089•••3745', 248, '#A855F7'], ['078•••6620', 219, '#EF4444'], ['011•••9013', 187, '#10B981']
    ];
    function leaderboard() {
        var mine = stats().monthPoints, list = SAMPLE_PLAYERS.map(function (p) { return { name: p[0], points: p[1], color: p[2] }; });
        if (D.user) list.push({ name: D.user.name || D.user.msisdn, points: mine, me: true });
        // Placeholder tie-break: the current user is listed after players with the same points (see pending.leaderboardTie)
        list.sort(function (a, b) { return b.points - a.points || (a.me ? 1 : b.me ? -1 : 0); });
        list.forEach(function (p, i) { p.rank = i + 1; p.prize = CONFIG.leaderboardPrizes[i] || 0; });
        return list;
    }

    window.MQ = {
        leaderboard: leaderboard,
        CONFIG: CONFIG, plan: plan, money: money, sub: sub, subscribe: subscribe, cancel: cancel, resume: resume,
        trialAvailable: function () { return !S.trialUsed; },
        useQuestion: useQuestion, demoRefill: demoRefill, addCorrect: addCorrect, logRound: logRound, stats: stats,
        weekStart: weekStart,
        canPlay: function () { var s = sub(); return !!(s && s.left > 0); }
    };
})();
