/*
 * Search modal suggestions (prototype only).
 * Adds recent searches, popular searches, recommended quizzes and live results
 * to the #search modal. Load after demo-backend.js.
 */
(function () {
    var D = window.QP_DEMO;
    if (!D) return;

    var RECENT_KEY = 'qp_recent_search';
    var POPULAR = [31, 1, 21, 30, 25];      // popular searches (category ids)
    var RECOMMENDED = [31, 33, 32, 29];     // recommended for you

    function get() { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) { return []; } }
    function save(list) { try { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 5))); } catch (e) {} }
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }
    function icon(id) { return D.SERVER + 'images/category/' + id + '/icon/' + id + '_01122022_icon_image.png'; }
    function link(id) { return 'game-detail.html?id=' + id; }

    function remember(term) {
        term = term.trim();
        if (!term) return;
        save([term].concat(get().filter(function (t) { return t.toLowerCase() !== term.toLowerCase(); })));
    }

    function match(term) {
        term = term.trim().toLowerCase();
        return Object.keys(D.CATEGORIES).filter(function (id) {
            var c = D.CATEGORIES[id];
            return (c[0] + ' ' + c[1]).toLowerCase().indexOf(term) !== -1;
        });
    }

    function row(id) {
        var c = D.CATEGORIES[id];
        return '<li class="quiz-list"><a href="' + link(id) + '" class="d-flex align-items-center" data-term="' + esc(c[0]) + '">' +
            '<span class="quiz-list-pict"><img src="' + icon(id) + '" alt=""></span>' +
            '<div class="quiz-list-info"><div class="quiz-list-info-title">' + esc(c[0]) + '</div>' +
            '<p>' + esc(c[1]) + '</p></div></a></li>';
    }

    function section(title, body, action) {
        return '<div class="search-section"><div class="search-section-head"><h4 class="search-section-title">' + title + '</h4>' +
            (action || '') + '</div>' + body + '</div>';
    }

    function list(ids) { return '<ul class="quiz-list-wrapper search-list">' + ids.map(row).join('') + '</ul>'; }

    function chips(items, cls) {
        return '<div class="search-chips">' + items.map(function (t) {
            return '<button type="button" class="search-chip ' + cls + '" data-term="' + esc(t) + '">' +
                (cls === 'recent' ? '<span class="qf-icon-search"></span>' : '') + esc(t) + '</button>';
        }).join('') + '</div>';
    }

    function suggestions() {
        var recent = get(), html = '';
        if (recent.length) html += section('Recent Searches', chips(recent, 'recent'),
            '<button type="button" class="search-clear">Clear</button>');
        html += section('Popular Searches', chips(POPULAR.map(function (id) { return D.CATEGORIES[id][0]; }), 'popular'));
        html += section('Recommended for You', list(RECOMMENDED));
        return html;
    }

    function results(term) {
        var ids = match(term);
        if (ids.length) return section('Results for "' + esc(term.trim()) + '"', list(ids));
        return '<div class="search-empty">No quizzes found for "' + esc(term.trim()) + '"</div>' +
            section('Recommended for You', list(RECOMMENDED));
    }

    $(function () {
        var modal = document.getElementById('search'), form = document.getElementById('search-form');
        if (!modal || !form) return;
        var input = document.getElementById('search-box');
        var box = document.createElement('div');
        box.className = 'search-suggest';
        form.querySelector('.box-wrapper').appendChild(box);
        input.setAttribute('autocomplete', 'off');

        function render() { box.innerHTML = input.value.trim() ? results(input.value) : suggestions(); }

        input.addEventListener('input', render);
        modal.addEventListener('show.bs.modal', render);
        modal.addEventListener('shown.bs.modal', function () { input.focus(); });

        box.addEventListener('click', function (e) {
            if (e.target.closest('.search-clear')) { save([]); render(); return; }
            var chip = e.target.closest('.search-chip');
            if (chip) { input.value = chip.getAttribute('data-term'); render(); return; }
            var a = e.target.closest('a[data-term]');
            if (a) remember(input.value.trim() || a.getAttribute('data-term'));
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var term = input.value.trim();
            if (!term) return;
            remember(term);
            var ids = match(term);
            if (ids.length === 1) location.href = link(ids[0]);
            else render();
        });
    });
})();
