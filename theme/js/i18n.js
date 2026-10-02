/*
 * Demo language switcher (prototype only).
 * Translates the main UI labels by matching English text on the page.
 * Load after demo-backend.js on every page.
 */
(function () {
    var KEY = 'qp_lang';
    var LANGS = [
        { code: 'en', flag: 'gb', name: 'English', native: 'English' },
        { code: 'km', flag: 'kh', name: 'Khmer', native: 'ខ្មែរ' },
        { code: 'zh', flag: 'cn', name: 'Chinese', native: '中文' }
    ];

    // English text -> [km, zh] (same order as LANGS)
    var T = {
        // home & nav
        'Most Played Quiz': ['កម្រងសំណួរពេញនិយម', '最热门测验'],
        'Categories': ['ប្រភេទ', '分类'],
        'Lucky Draw is live!': ['ការចាប់រង្វាន់បានចាប់ផ្តើម!', '幸运抽奖进行中！'],
        'Play quizzes, collect tickets, win prizes': ['លេងកម្រងសំណួរ ប្រមូលសំបុត្រ ឈ្នះរង្វាន់', '玩测验，集奖券，赢大奖'],
        'Subscriber': ['អតិថិជនជាវ', '订阅用户'],
        'Hi, Guest!': ['សួស្តី ភ្ញៀវ!', '你好，访客！'],
        'Login to play quizzes & win prizes': ['ចូលដើម្បីលេង និងឈ្នះរង្វាន់', '登录即可答题赢奖'],
        'Login': ['ចូល', '登录'],
        // categories
        'Sports': ['កីឡា', '体育'],
        'Movies & Music': ['ភាពយន្ត និងតន្ត្រី', '电影与音乐'],
        'Social Media': ['បណ្តាញសង្គម', '社交媒体'],
        'Science': ['វិទ្យាសាស្ត្រ', '科学'],
        'Books': ['សៀវភៅ', '书籍'],
        'Vehicles': ['យានយន្ត', '交通工具'],
        'Maths': ['គណិតវិទ្យា', '数学'],
        'General Knowledge': ['ចំណេះដឹងទូទៅ', '常识'],
        'World Map & Flags': ['ផែនទីពិភពលោក និងទង់ជាតិ', '世界地图与国旗'],
        'Animal': ['សត្វ', '动物'],
        'Food': ['អាហារ', '美食'],
        // profile
        'History': ['ប្រវត្តិ', '历史记录'],
        'Languages': ['ភាសា', '语言'],
        'Rules and Policies': ['ច្បាប់ និងគោលការណ៍', '规则与政策'],
        'Contact Us': ['ទាក់ទងមកយើង', '联系我们'],
        'Logout': ['ចាកចេញ', '退出登录'],
        'Unsubscribe': ['ឈប់ជាវ', '取消订阅'],
        'Leaderboard': ['តារាងពិន្ទុ', '排行榜'],
        'Game History': ['ប្រវត្តិហ្គេម', '游戏记录'],
        // search
        'Find Quiz': ['ស្វែងរកកម្រងសំណួរ', '查找测验'],
        'Find Player': ['ស្វែងរកអ្នកលេង', '查找玩家'],
        'Recent Searches': ['ការស្វែងរកថ្មីៗ', '最近搜索'],
        'Popular Searches': ['ការស្វែងរកពេញនិយម', '热门搜索'],
        'Recommended for You': ['ណែនាំសម្រាប់អ្នក', '为你推荐'],
        'Top Players': ['អ្នកលេងកំពូល', '顶尖玩家'],
        // login
        'Sign In to Play the Quiz': ['ចូលដើម្បីលេងកម្រងសំណួរ', '登录开始答题'],
        'Continue as guest': ['បន្តជាភ្ញៀវ', '以访客身份继续'],
        // game
        'Play': ['លេង', '开始'],
        "Let's Play": ['តោះលេង', '开始游戏'],
        'Challenge Accepted!': ['ទទួលយកការប្រកួត!', '挑战已接受！'],
        'Finding an opponent…': ['កំពុងស្វែងរកគូប្រកួត…', '正在寻找对手…'],
        'Beginner': ['កម្រិតដំបូង', '初级'],
        'Intermediate': ['កម្រិតមធ្យម', '中级'],
        'Advance': ['កម្រិតខ្ពស់', '高级'],
        'True': ['ត្រូវ', '对'],
        'False': ['ខុស', '错'],
        'You Win!': ['អ្នកឈ្នះ!', '你赢了！'],
        'You Lose': ['អ្នកចាញ់', '你输了'],
        'Final Score': ['ពិន្ទុចុងក្រោយ', '最终得分'],
        'Summary': ['សង្ខេប', '总结'],
        'Correct answers': ['ចម្លើយត្រូវ', '答对题数'],
        'Questions answered': ['សំណួរបានឆ្លើយ', '已答题数'],
        'Level': ['កម្រិត', '难度'],
        'Play Again': ['លេងម្តងទៀត', '再玩一次'],
        'Home': ['ទំព័រដើម', '首页'],
        // language / history / contact / rules / logout
        'Choose your language': ['ជ្រើសរើសភាសារបស់អ្នក', '选择语言'],
        'Save': ['រក្សាទុក', '保存'],
        'All': ['ទាំងអស់', '全部'],
        'Today': ['ថ្ងៃនេះ', '今天'],
        '7 days': ['៧ ថ្ងៃ', '7天'],
        '30 days': ['៣០ ថ្ងៃ', '30天'],
        'Custom': ['កំណត់ខ្លួនឯង', '自定义'],
        'Got a question?': ['មានសំណួរមែនទេ?', '有疑问吗？'],
        'Log out?': ['ចាកចេញ?', '要退出登录吗？'],
        'Cancel': ['បោះបង់', '取消'],
        'Selected': ['បានជ្រើសរើស', '已选择'],
        'Correct!': ['ត្រឹមត្រូវ!', '答对了！'],
        'Keep going!': ['បន្តទៀត!', '继续加油！'],
        'Wrong': ['ខុស', '答错了'],
        'Accuracy': ['ភាពត្រឹមត្រូវ', '正确率'],
        'Great job, keep it up': ['ល្អណាស់ បន្តទៀត', '太棒了，继续保持'],
        'Nice try, play again to win': ['ព្យាយាមល្អ លេងម្តងទៀតដើម្បីឈ្នះ', '不错的尝试，再玩一次赢回来'],
        'Profile updated': ['បានធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូប', '资料已更新'],
        'Yes, Log out': ['បាទ/ចាស ចាកចេញ', '确认退出'],
    };

    function current() {
        var c; try { c = localStorage.getItem(KEY); } catch (e) {}
        return LANGS.filter(function (l) { return l.code === c; })[0] || LANGS[0];
    }
    function setLang(code) { try { localStorage.setItem(KEY, code); } catch (e) {} }
    function flagUrl(l) { return 'https://flagcdn.com/w80/' + l.flag + '.png'; }

    var lang = current(), idx = LANGS.indexOf(lang) - 1;
    function tr(text) {
        var key = text.trim(), row = T[key];
        return row && idx >= 0 ? text.replace(key, row[idx]) : null;
    }
    function walk(root) {
        if (idx < 0 || !root) return;
        var it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, out = [];
        while ((n = it.nextNode())) {
            var p = n.parentNode && n.parentNode.nodeName;
            if (p === 'SCRIPT' || p === 'STYLE') continue;
            var t = tr(n.nodeValue);
            if (t !== null && t !== n.nodeValue) out.push([n, t]);
        }
        out.forEach(function (x) { x[0].nodeValue = x[1]; });
        if (root.querySelectorAll) root.querySelectorAll('input[type=submit],input[type=button]').forEach(function (b) {
            var t = tr(b.value); if (t) b.value = t;
        });
    }

    document.documentElement.lang = lang.code;
    document.addEventListener('DOMContentLoaded', function () {
        walk(document.body);
        if (idx < 0) return;
        // Content rendered later (search suggestions, Lucky Draw, VS screen)
        var busy = false;
        new MutationObserver(function (muts) {
            if (busy) return; busy = true;
            muts.forEach(function (m) {
                if (m.type === 'characterData') { var t = tr(m.target.nodeValue); if (t !== null && t !== m.target.nodeValue) m.target.nodeValue = t; }
                m.addedNodes && m.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1) walk(node);
                    else if (node.nodeType === 3) { var t = tr(node.nodeValue); if (t !== null && t !== node.nodeValue) node.nodeValue = t; }
                });
            });
            busy = false;
        }).observe(document.body, { childList: true, subtree: true, characterData: true });
    });

    window.QP_I18N = { LANGS: LANGS, current: current, setLang: setLang, flagUrl: flagUrl, t: function (s) { return tr(s) || s; } };
})();
