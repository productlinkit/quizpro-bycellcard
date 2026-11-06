/*
 * Leaderboard search (prototype only): find a player by phone number and jump to their row.
 * Load after demo-backend.js.
 */
(function () {
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';'; }); }

    function section(title, body, action) {
        return '<div class="search-section"><div class="search-section-head"><h4 class="search-section-title">' + title + '</h4>' +
            (action || '') + '</div>' + body + '</div>';
    }

    function playerSearch(modal, form, input, box) {
        var rows = Array.prototype.slice.call(document.querySelectorAll('.leaderboard-winner')).map(function (li, i) {
            return {
                li: li, rank: i + 1,
                name: li.querySelector('.leaderboard-winner-info-name').firstChild.textContent.trim(),
                pict: li.querySelector('.leaderboard-winner-pict').innerHTML,
                coin: li.querySelector('.leaderboard-coin').textContent.trim()
            };
        });
        input.placeholder = 'Search phone number...';
        input.setAttribute('inputmode', 'numeric');

        function prow(p) {
            return '<li class="quiz-list"><a href="#" class="d-flex align-items-center" data-rank="' + p.rank + '">' +
                '<span class="search-player-rank">#' + p.rank + '</span>' +
                '<span class="quiz-list-pict search-player-pict">' + p.pict + '</span>' +
                '<div class="quiz-list-info"><div class="quiz-list-info-title">' + esc(p.name) + '</div>' +
                '<p><span class="coin"></span> ' + esc(p.coin) + ' coins</p></div></a></li>';
        }
        function plist(ps) { return '<ul class="quiz-list-wrapper search-list">' + ps.map(prow).join('') + '</ul>'; }
        function render() {
            var term = input.value.replace(/\D/g, '');
            if (!input.value.trim()) { box.innerHTML = section('Top Players', plist(rows.slice(0, 3))); return; }
            var hits = rows.filter(function (p) { return p.name.indexOf(term) !== -1 && term; });
            box.innerHTML = hits.length ? section('Players matching "' + esc(input.value.trim()) + '"', plist(hits))
                : '<div class="search-empty">No player found for "' + esc(input.value.trim()) + '"</div>' + section('Top Players', plist(rows.slice(0, 3)));
        }
        function jump(rank) {
            var li = rows[rank - 1].li;
            bootstrap.Modal.getOrCreateInstance(modal).hide();
            li.scrollIntoView({ behavior: 'smooth', block: 'center' });
            li.classList.remove('search-flash'); void li.offsetWidth; li.classList.add('search-flash');
        }
        input.addEventListener('input', render);
        modal.addEventListener('show.bs.modal', render);
        modal.addEventListener('shown.bs.modal', function () { input.focus(); });
        box.addEventListener('click', function (e) {
            var a = e.target.closest('a[data-rank]'); if (!a) return;
            e.preventDefault(); jump(+a.getAttribute('data-rank'));
        });
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var term = input.value.replace(/\D/g, '');
            var hit = term && rows.filter(function (p) { return p.name.indexOf(term) !== -1; })[0];
            if (hit) jump(hit.rank); else render();
        });
    }

    $(function () {
        var modal = document.getElementById('search'), form = document.getElementById('search-form');
        if (!modal || !form) return;
        var input = document.getElementById('search-box'), box = document.createElement('div');
        box.className = 'search-suggest';
        form.querySelector('.box-wrapper').appendChild(box);
        input.setAttribute('autocomplete', 'off');
        playerSearch(modal, form, input, box);
    });
})();
