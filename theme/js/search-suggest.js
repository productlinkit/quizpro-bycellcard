/*
 * Leaderboard search (prototype only): filters the list in place by phone number as you type.
 */
(function () {
    var input = document.getElementById('lbSearch');
    if (!input) return;
    var list = document.querySelector('.lb-list'), empty = document.getElementById('lbEmpty'), zone = document.querySelector('.lb-zone');
    var rows = Array.prototype.slice.call(document.querySelectorAll('.leaderboard-winner')).map(function (li) {
        return { li: li, name: li.querySelector('.leaderboard-winner-info-name').firstChild.textContent.trim() };
    });

    input.addEventListener('input', function () {
        var raw = input.value.trim(), term = raw.replace(/\D/g, ''), shown = 0;
        rows.forEach(function (r) {
            var ok = !raw || (term && r.name.indexOf(term) !== -1);
            r.li.hidden = !ok;
            if (ok) shown++;
        });
        if (zone) zone.hidden = !!raw;
        list.hidden = !shown;
        empty.hidden = !!shown;
        empty.textContent = shown ? '' : 'No player found for "' + raw + '"';
    });
})();
