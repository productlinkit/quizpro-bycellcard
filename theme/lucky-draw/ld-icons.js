/*
 * Lucky Draw illustrated icons.
 * ticket / idea / wheel are the supplied PNGs (theme/lucky-draw/img/).
 * The rest are flat SVGs drawn to match them: rounded shapes, warm yellow/orange,
 * darker shade on the right, cream highlights, small "sparkle" strokes.
 */
(function () {
    var Y = '#FFCC3D', YS = '#F6B12B', O = '#FE9E44', OS = '#F08A2C', R = '#F4513B', CR = '#FFF1C9', B = '#5B7DB1', BD = '#3E5F8F', BL = '#8FA8CC';
    function svg(body) { return '<svg class="ld-ill" viewBox="0 0 64 64" aria-hidden="true">' + body + '</svg>'; }
    var sparks = '<rect x="5" y="7" width="4" height="10" rx="2" fill="' + Y + '" transform="rotate(-35 7 12)"/><rect x="12" y="3" width="4" height="9" rx="2" fill="' + Y + '" transform="rotate(-10 14 7)"/>';

    var SVG = {
        trophy: svg(
            '<path d="M14 16h-4a7 7 0 0 0 7 9" fill="none" stroke="' + OS + '" stroke-width="4" stroke-linecap="round"/>' +
            '<path d="M50 16h4a7 7 0 0 1-7 9" fill="none" stroke="' + OS + '" stroke-width="4" stroke-linecap="round"/>' +
            '<path d="M15 10h34v14a17 17 0 0 1-34 0z" fill="' + Y + '"/>' +
            '<path d="M40 10h9v14a17 17 0 0 1-12 16.3A21 21 0 0 0 40 24z" fill="' + YS + '"/>' +
            '<path d="M32 17l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4-3.9-3.8 5.4-.8z" fill="' + R + '" stroke="' + R + '" stroke-width="1.5" stroke-linejoin="round"/>' +
            '<rect x="19" y="13" width="3" height="9" rx="1.5" fill="' + CR + '" opacity=".9"/>' +
            '<rect x="28.5" y="40" width="7" height="8" fill="' + OS + '"/>' +
            '<rect x="19" y="47" width="26" height="10" rx="4" fill="' + B + '"/>' +
            '<rect x="19" y="47" width="26" height="4" rx="2" fill="' + BL + '"/>'),
        calendar: svg(
            '<rect x="9" y="12" width="46" height="44" rx="9" fill="' + CR + '"/>' +
            '<path d="M9 21a9 9 0 0 1 9-9h28a9 9 0 0 1 9 9v5H9z" fill="' + R + '"/>' +
            '<rect x="19" y="6" width="6" height="13" rx="3" fill="' + BD + '"/><rect x="39" y="6" width="6" height="13" rx="3" fill="' + BD + '"/>' +
            '<g fill="' + YS + '"><rect x="16" y="32" width="7" height="6" rx="2"/><rect x="28.5" y="32" width="7" height="6" rx="2"/><rect x="16" y="43" width="7" height="6" rx="2"/><rect x="28.5" y="43" width="7" height="6" rx="2"/></g>' +
            '<circle cx="44.5" cy="41" r="8" fill="' + O + '"/>' +
            '<path d="M44.5 36.5l1.4 2.9 3.1.4-2.3 2.2.6 3.1-2.8-1.5-2.8 1.5.6-3.1-2.3-2.2 3.1-.4z" fill="#fff"/>'),
        gamepad: svg(
            '<path d="M18 18h28c7 0 11 5 12 12l2 14c1 6-6 9-10 4l-5-6H19l-5 6c-4 5-11 2-10-4l2-14c1-7 5-12 12-12z" fill="' + Y + '"/>' +
            '<path d="M46 18c7 0 11 5 12 12l2 14c1 6-6 9-10 4l-5-6h-5c6-2 9-7 8-14l-1-10z" fill="' + YS + '"/>' +
            '<rect x="15" y="27" width="5" height="14" rx="2" fill="' + R + '"/><rect x="10.5" y="31.5" width="14" height="5" rx="2" fill="' + R + '"/>' +
            '<circle cx="44" cy="29" r="3.4" fill="' + B + '"/><circle cx="50" cy="35" r="3.4" fill="' + B + '"/><circle cx="38" cy="35" r="3.4" fill="' + BD + '"/>' +
            '<rect x="22" y="21" width="12" height="3" rx="1.5" fill="' + CR + '" opacity=".9"/>'),
        phone: svg(sparks +
            '<rect x="17" y="6" width="32" height="54" rx="8" fill="' + BD + '"/>' +
            '<rect x="21" y="12" width="24" height="40" rx="4" fill="' + Y + '"/>' +
            '<path d="M38 12h3a4 4 0 0 1 4 4v32a4 4 0 0 1-4 4h-9z" fill="' + YS + '"/>' +
            '<path d="M33 24l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="' + R + '" stroke="' + R + '" stroke-width="1.5" stroke-linejoin="round"/>' +
            '<rect x="28" y="8" width="10" height="2.5" rx="1.25" fill="' + BL + '"/>' +
            '<rect x="29" y="54.5" width="8" height="2.5" rx="1.25" fill="' + BL + '"/>' +
            '<rect x="23.5" y="15" width="3" height="10" rx="1.5" fill="' + CR + '" opacity=".9"/>'),
        earbuds: svg(sparks +
            '<rect x="10" y="34" width="44" height="24" rx="11" fill="' + B + '"/>' +
            '<rect x="10" y="34" width="44" height="7" rx="3.5" fill="' + BL + '"/>' +
            '<circle cx="32" cy="50" r="2.2" fill="' + Y + '"/>' +
            '<g><circle cx="22" cy="22" r="9" fill="' + Y + '"/><path d="M25 22a9 9 0 0 1 3.5 7L30 40h-6l-1.6-9A9 9 0 0 1 25 22z" fill="' + YS + '"/><circle cx="20" cy="21" r="4" fill="' + O + '"/><circle cx="18.6" cy="19.6" r="1.4" fill="' + CR + '"/></g>' +
            '<g><circle cx="43" cy="22" r="9" fill="' + Y + '"/><path d="M40 22a9 9 0 0 0-3.5 7L35 40h6l1.6-9A9 9 0 0 0 40 22z" fill="' + YS + '"/><circle cx="45" cy="21" r="4" fill="' + O + '"/><circle cx="43.6" cy="19.6" r="1.4" fill="' + CR + '"/></g>'),
        credit: svg(sparks +
            '<g transform="rotate(-12 30 32)"><rect x="6" y="18" width="44" height="30" rx="6" fill="' + O + '"/>' +
            '<path d="M38 18h6a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6h-6z" fill="' + OS + '"/>' +
            '<rect x="6" y="24" width="44" height="6" fill="' + BD + '"/>' +
            '<rect x="12" y="35" width="9" height="7" rx="2" fill="' + Y + '"/><rect x="25" y="37" width="12" height="3" rx="1.5" fill="' + CR + '"/></g>' +
            '<circle cx="46" cy="44" r="13" fill="' + Y + '"/><path d="M52 34a13 13 0 0 1-6 23 13 13 0 0 0 6-23z" fill="' + YS + '"/>' +
            '<circle cx="46" cy="44" r="9" fill="none" stroke="' + YS + '" stroke-width="2"/>' +
            '<path d="M46 38.5l1.7 3.4 3.7.5-2.7 2.6.6 3.7-3.3-1.7-3.3 1.7.6-3.7-2.7-2.6 3.7-.5z" fill="' + R + '"/>'),
        gift: svg(sparks +
            '<rect x="10" y="26" width="44" height="12" rx="4" fill="' + R + '"/>' +
            '<rect x="13" y="36" width="38" height="22" rx="5" fill="' + O + '"/>' +
            '<path d="M40 36h6a5 5 0 0 1 5 5v12a5 5 0 0 1-5 5h-6z" fill="' + OS + '"/>' +
            '<rect x="28" y="26" width="8" height="32" fill="' + Y + '"/>' +
            '<path d="M32 26c-4-8-13-11-14-5s8 6 14 5zM32 26c4-8 13-11 14-5s-8 6-14 5z" fill="' + Y + '"/>' +
            '<rect x="15" y="40" width="3" height="10" rx="1.5" fill="' + CR + '" opacity=".85"/>')
    };

    // Spinning lucky wheel for the "drawing in progress" state: only .ld-wheel-disc rotates
    var WHEEL_SPIN = '<svg class="ld-wheel" viewBox="0 0 200 220" aria-hidden="true"><polygon points="22.0,86.0 24.6,92.4 31.5,92.9 26.3,97.4 27.9,104.1 22.0,100.5 16.1,104.1 17.7,97.4 12.5,92.9 19.4,92.4" fill="#FFCC3D" stroke="#FFCC3D" stroke-width="3" stroke-linejoin="round"/><polygon points="178.0,82.0 180.6,88.4 187.5,88.9 182.3,93.4 183.9,100.1 178.0,96.5 172.1,100.1 173.7,93.4 168.5,88.9 175.4,88.4" fill="#FFCC3D" stroke="#FFCC3D" stroke-width="3" stroke-linejoin="round"/><rect x="30" y="34" width="9" height="20" rx="4.5" fill="#3EA9F5" transform="rotate(-35 34 44)"/><rect x="160" y="40" width="9" height="20" rx="4.5" fill="#FF6B81" transform="rotate(55 164 50)"/><rect x="20" y="132" width="9" height="18" rx="4.5" fill="#FE9E44" transform="rotate(50 24 141)"/><rect x="170" y="128" width="9" height="18" rx="4.5" fill="#3EA9F5" transform="rotate(-40 174 137)"/><path d="M70 168h60l10 22H60z" fill="#8466E0"/><path d="M112 168h18l10 22h-20z" fill="#6E52CC"/><rect x="48" y="186" width="104" height="20" rx="10" fill="#5B45B0"/><rect x="56" y="188" width="70" height="5" rx="2.5" fill="#7B60D8"/><circle cx="100" cy="98" r="80" fill="#FFC93C"/><path d="M100 18a80 80 0 0 1 0 160a80 80 0 0 0 0-160z" fill="#F6B12B" opacity=".55"/><g class="ld-wheel-disc"><path d="M100 98L100.0 32.0A66 66 0 0 1 138.8 44.6Z" fill="#FFEFC9"/><path d="M100 98L138.8 44.6A66 66 0 0 1 162.8 77.6Z" fill="#F4513B"/><path d="M100 98L162.8 77.6A66 66 0 0 1 162.8 118.4Z" fill="#FFEFC9"/><path d="M100 98L162.8 118.4A66 66 0 0 1 138.8 151.4Z" fill="#FE9E44"/><path d="M100 98L138.8 151.4A66 66 0 0 1 100.0 164.0Z" fill="#FFEFC9"/><path d="M100 98L100.0 164.0A66 66 0 0 1 61.2 151.4Z" fill="#F4513B"/><path d="M100 98L61.2 151.4A66 66 0 0 1 37.2 118.4Z" fill="#FFEFC9"/><path d="M100 98L37.2 118.4A66 66 0 0 1 37.2 77.6Z" fill="#FE9E44"/><path d="M100 98L37.2 77.6A66 66 0 0 1 61.2 44.6Z" fill="#FFEFC9"/><path d="M100 98L61.2 44.6A66 66 0 0 1 100.0 32.0Z" fill="#F6B12B"/><circle cx="100" cy="98" r="66" fill="none" stroke="#F6B12B" stroke-width="3"/><circle cx="122.6" cy="28.6" r="3" fill="#FFF7E0"/><circle cx="159.1" cy="55.1" r="3" fill="#FFF7E0"/><circle cx="173.0" cy="98.0" r="3" fill="#FFF7E0"/><circle cx="159.1" cy="140.9" r="3" fill="#FFF7E0"/><circle cx="122.6" cy="167.4" r="3" fill="#FFF7E0"/><circle cx="77.4" cy="167.4" r="3" fill="#FFF7E0"/><circle cx="40.9" cy="140.9" r="3" fill="#FFF7E0"/><circle cx="27.0" cy="98.0" r="3" fill="#FFF7E0"/><circle cx="40.9" cy="55.1" r="3" fill="#FFF7E0"/><circle cx="77.4" cy="28.6" r="3" fill="#FFF7E0"/></g><circle cx="100" cy="98" r="22" fill="#FFCC3D"/><circle cx="100" cy="98" r="16" fill="#F6B12B"/><polygon points="100.0,88.0 102.7,94.3 109.5,94.9 104.4,99.4 105.9,106.1 100.0,102.6 94.1,106.1 95.6,99.4 90.5,94.9 97.3,94.3" fill="#FFEFC9" stroke="#FFEFC9" stroke-width="3" stroke-linejoin="round"/><path d="M100 52L86 26a16 16 0 1 1 28 0z" fill="#F4513B"/><path d="M104 50l10-24a16 16 0 0 0-6-18 16 16 0 0 1 2 18z" fill="#D93B27" opacity=".7"/><circle cx="100" cy="20" r="6.5" fill="#FFEFC9"/></svg>';

    var IMG = { ticket: 'theme/lucky-draw/img/ticket.png', idea: 'theme/lucky-draw/img/idea.png', wheel: 'theme/lucky-draw/img/wheel.png' };

    window.LD_WHEEL_SPIN = WHEEL_SPIN;

    window.LD_ICON = function (name, cls) {
        if (IMG[name]) return '<img class="ld-ill' + (cls ? ' ' + cls : '') + '" src="' + IMG[name] + '" alt="">';
        var s = SVG[name] || '';
        return cls ? s.replace('class="ld-ill"', 'class="ld-ill ' + cls + '"') : s;
    };
})();
