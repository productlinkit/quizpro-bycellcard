/*
 * Lucky Draw – prototype config.
 * Everything marked confirmed:false is NOT an agreed business rule yet.
 * Change values here; both the user page and the admin page read this file.
 */
window.LD_CONFIG = {
  campaign: {
    name: 'QuizPro Lucky Draw',
    periodStart: '2026-10-01',
    periodEnd: '2026-10-31',
    drawDate: '2026-11-03T15:00:00',
    // Prize items are placeholders until the business confirms them
    prizes: [
      { rank: 'Grand Prize', item: 'Smartphone', icon: 'phone', img: 'theme/lucky-draw/img/prize-phone.jpg', qty: 1 },
      { rank: '2nd Prize', item: 'Wireless Earbuds', icon: 'earbuds', img: 'theme/lucky-draw/img/prize-earbuds.jpg', qty: 2 },
      { rank: '3rd Prize', item: 'Cellcard Credit', icon: 'credit', img: 'theme/lucky-draw/img/prize-credit.jpg', qty: 5 }
    ],
    confirmed: false
  },

  // How tickets are earned. basis: 'answered' (questions answered) or 'correct' (correct answers).
  // every/tickets: N tickets for every X questions. Values below are SAMPLE ONLY.
  ticketRule: { basis: 'answered', every: 5, tickets: 1, dailyCap: null, confirmed: false },

  // 'weighted' = each ticket is one entry (more tickets, more chances)
  // 'one-per-user' = every eligible user gets one entry regardless of ticket count
  drawMethod: { type: 'weighted', winners: 8, backups: 2, confirmed: false },

  // Proposed eligibility checks (admin side). confirmed:false = proposal from wireframe.
  eligibility: [
    { id: 'sub', label: 'Active QuizPro subscription on draw date', confirmed: false },
    { id: 'billing', label: 'At least one successful billing during the campaign period', confirmed: false },
    { id: 'tickets', label: 'Has at least 1 ticket in this campaign', confirmed: false },
    { id: 'blacklist', label: 'MSISDN not on test / staff / blacklist', confirmed: false },
    { id: 'onewin', label: 'Max one prize per MSISDN per campaign', confirmed: false }
  ],

  // Prototype annotation per section: 'existing' = Existing – reuse with adjustment,
  // 'new' = new for this campaign, 'tbc' = not yet confirmed whether it already exists in QuizPro.
  sectionStatus: {
    entry: 'tbc',
    hero: 'tbc',
    period: 'new',
    drawing: 'new',
    prizes: 'new',
    myTickets: 'tbc',
    howToEarn: 'new',
    history: 'new',
    winners: 'new',
    terms: 'tbc',
    adminSetup: 'tbc',
    adminEligibility: 'new',
    adminDraw: 'new',
    adminAudit: 'new'
  }
};

// Previous periods for the Ticket Tracker "History" tab (sample data)
window.LD_PAST_PERIODS = [
  { name: 'September 2026', start: '2026-09-01', end: '2026-09-30', draw: '2026-10-03', tickets: 14, result: 'Not won' },
  { name: 'August 2026', start: '2026-08-01', end: '2026-08-31', draw: '2026-09-03', tickets: 6, result: 'Won · Cellcard Credit' },
  { name: 'July 2026', start: '2026-07-01', end: '2026-07-31', draw: '2026-08-03', tickets: 3, result: 'Not won' }
];

// Demo activity for the logged-in sample user (answered + correct stored so either basis works)
window.LD_DEMO_ACTIVITY = [
  { date: '2026-10-14 20:41', quiz: 'Science', icon: 25, answered: 10, correct: 8 },
  { date: '2026-10-14 08:12', quiz: 'Sports', icon: 1, answered: 10, correct: 6 },
  { date: '2026-10-12 19:05', quiz: 'World Map & Flags', icon: 31, answered: 10, correct: 9 },
  { date: '2026-10-09 12:30', quiz: 'Maths', icon: 29, answered: 7, correct: 3 },
  { date: '2026-10-05 21:47', quiz: 'Food', icon: 33, answered: 10, correct: 7 },
  { date: '2026-10-02 17:20', quiz: 'Animal', icon: 32, answered: 4, correct: 2 }
];

window.LD = {
  status: {
    existing: 'Existing – reuse with adjustment',
    new: 'New',
    tbc: 'Existing or new? – to confirm'
  },
  ticketsFor: function (a, rule) {
    var n = rule.basis === 'correct' ? a.correct : a.answered;
    return Math.floor(n / rule.every) * rule.tickets;
  },
  basisLabel: function (rule) {
    return rule.basis === 'correct' ? 'correct answers' : 'questions answered';
  },
  fmtDate: function (s, withTime, noYear) {
    var d = new Date(s.replace(' ', 'T'));
    if (window.QP_I18N) return QP_I18N.date(d, { time: withTime, noYear: noYear });
    var o = { day: 'numeric', month: 'short', year: 'numeric' };
    if (withTime) { o.hour = '2-digit'; o.minute = '2-digit'; }
    return d.toLocaleString('en-GB', o);
  }
};

// Quizzes played in this demo copy (saved by demo-backend.js) come first in Ticket History
(function () {
  try {
    var played = JSON.parse(localStorage.getItem('qp_ld_activity')) || [];
    window.LD_DEMO_ACTIVITY = played.concat(window.LD_DEMO_ACTIVITY);
  } catch (e) {}
})();
