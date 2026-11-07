/*
 * Lucky Draw – prototype config.
 * Everything marked confirmed:false is NOT an agreed business rule yet.
 * Change values here; both the user page and the admin page read this file.
 */
// The draw runs weekly, Monday to Sunday, so dates follow the calendar (offset 0 = this week, -1 = last week)
window.LD_WEEK = (function () {
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function day(week, plus) {
    var d = new Date(); d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - (d.getDay() + 6) % 7 + week * 7 + plus);
    return iso(d);
  }
  return { start: function (w) { return day(w, 0); }, end: function (w) { return day(w, 6); } };
})();

window.LD_CONFIG = {
  campaign: {
    name: 'QuizPro Lucky Draw',
    periodStart: LD_WEEK.start(0),
    periodEnd: LD_WEEK.end(0),
    drawDate: LD_WEEK.start(1) + 'T15:00:00',
    // Prize items are placeholders until the business confirms them
    prizes: [
      { rank: 'Grand Prize', item: 'Smartphone', icon: 'phone', img: 'theme/lucky-draw/img/prize-phone.jpg', qty: 1 }
    ],
    confirmed: false
  },

  // How tickets are earned. basis: 'answered' (questions answered) or 'correct' (correct answers).
  // every/tickets: N tickets for every X questions. Values below are SAMPLE ONLY.
  ticketRule: { basis: 'answered', every: 5, tickets: 1, dailyCap: null, confirmed: false },

  // 'weighted' = each ticket is one entry (more tickets, more chances)
  // 'one-per-user' = every eligible user gets one entry regardless of ticket count
  drawMethod: { type: 'weighted', winners: 1, backups: 2, confirmed: false },

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
  { start: LD_WEEK.start(-1), end: LD_WEEK.end(-1), draw: LD_WEEK.start(0), tickets: 14, result: 'Not won' },
  { start: LD_WEEK.start(-2), end: LD_WEEK.end(-2), draw: LD_WEEK.start(-1), tickets: 6, result: 'Won · Smartphone' },
  { start: LD_WEEK.start(-3), end: LD_WEEK.end(-3), draw: LD_WEEK.start(-2), tickets: 3, result: 'Not won' }
];

// Demo activity for the logged-in sample user (answered + correct stored so either basis works)
window.LD_DEMO_ACTIVITY = [
  { date: LD_WEEK.start(0) + ' 20:41', answered: 10, correct: 8 },
  { date: LD_WEEK.start(0) + ' 08:12', answered: 10, correct: 6 },
  { date: LD_WEEK.start(0) + ' 07:05', answered: 7, correct: 3 }
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
    // Tickets count for the week they were earned
    var c = window.LD_CONFIG.campaign, played = (JSON.parse(localStorage.getItem('qp_ld_activity')) || []).filter(function (a) {
      var day = a.date.slice(0, 10);
      return day >= c.periodStart && day <= c.periodEnd;
    });
    window.LD_DEMO_ACTIVITY = played.concat(window.LD_DEMO_ACTIVITY);
  } catch (e) {}
})();
