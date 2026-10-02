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
        { code: 'id', flag: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
        { code: 'th', flag: 'th', name: 'Thai', native: 'ภาษาไทย' },
        { code: 'vi', flag: 'vn', name: 'Vietnamese', native: 'Tiếng Việt' },
        { code: 'zh', flag: 'cn', name: 'Chinese', native: '中文' },
        { code: 'fr', flag: 'fr', name: 'French', native: 'Français' }
    ];

    // English text -> [km, id, th, vi, zh, fr]
    var T = {
        // home & nav
        'Most Played Quiz': ['កម្រងសំណួរពេញនិយម', 'Kuis Paling Sering Dimainkan', 'ควิซที่เล่นมากที่สุด', 'Quiz chơi nhiều nhất', '最热门测验', 'Quiz les plus joués'],
        'Categories': ['ប្រភេទ', 'Kategori', 'หมวดหมู่', 'Danh mục', '分类', 'Catégories'],
        'Lucky Draw is live!': ['ការចាប់រង្វាន់បានចាប់ផ្តើម!', 'Lucky Draw sudah dimulai!', 'ลุ้นรางวัลเปิดแล้ว!', 'Rút thăm may mắn đã mở!', '幸运抽奖进行中！', 'Le tirage au sort est ouvert !'],
        'Play quizzes, collect tickets, win prizes': ['លេងកម្រងសំណួរ ប្រមូលសំបុត្រ ឈ្នះរង្វាន់', 'Main kuis, kumpulkan tiket, menangkan hadiah', 'เล่นควิซ สะสมตั๋ว ลุ้นรางวัล', 'Chơi quiz, nhận vé, trúng thưởng', '玩测验，集奖券，赢大奖', 'Jouez, collectez des tickets, gagnez des prix'],
        'Subscriber': ['អតិថិជនជាវ', 'Pelanggan', 'สมาชิก', 'Người đăng ký', '订阅用户', 'Abonné'],
        'Hi, Guest!': ['សួស្តី ភ្ញៀវ!', 'Hai, Tamu!', 'สวัสดี ผู้เยี่ยมชม!', 'Chào bạn!', '你好，访客！', 'Bonjour, invité !'],
        'Login to play quizzes & win prizes': ['ចូលដើម្បីលេង និងឈ្នះរង្វាន់', 'Masuk untuk main kuis & menang hadiah', 'เข้าสู่ระบบเพื่อเล่นและลุ้นรางวัล', 'Đăng nhập để chơi và trúng thưởng', '登录即可答题赢奖', 'Connectez-vous pour jouer et gagner'],
        'Login': ['ចូល', 'Masuk', 'เข้าสู่ระบบ', 'Đăng nhập', '登录', 'Connexion'],
        // categories
        'Sports': ['កីឡា', 'Olahraga', 'กีฬา', 'Thể thao', '体育', 'Sports'],
        'Movies & Music': ['ភាពយន្ត និងតន្ត្រី', 'Film & Musik', 'ภาพยนตร์และเพลง', 'Phim & Nhạc', '电影与音乐', 'Films & Musique'],
        'Social Media': ['បណ្តាញសង្គម', 'Media Sosial', 'โซเชียลมีเดีย', 'Mạng xã hội', '社交媒体', 'Réseaux sociaux'],
        'Science': ['វិទ្យាសាស្ត្រ', 'Sains', 'วิทยาศาสตร์', 'Khoa học', '科学', 'Sciences'],
        'Books': ['សៀវភៅ', 'Buku', 'หนังสือ', 'Sách', '书籍', 'Livres'],
        'Vehicles': ['យានយន្ត', 'Kendaraan', 'ยานพาหนะ', 'Phương tiện', '交通工具', 'Véhicules'],
        'Maths': ['គណិតវិទ្យា', 'Matematika', 'คณิตศาสตร์', 'Toán học', '数学', 'Maths'],
        'General Knowledge': ['ចំណេះដឹងទូទៅ', 'Pengetahuan Umum', 'ความรู้ทั่วไป', 'Kiến thức chung', '常识', 'Culture générale'],
        'World Map & Flags': ['ផែនទីពិភពលោក និងទង់ជាតិ', 'Peta Dunia & Bendera', 'แผนที่โลกและธง', 'Bản đồ & Quốc kỳ', '世界地图与国旗', 'Carte du monde & Drapeaux'],
        'Animal': ['សត្វ', 'Hewan', 'สัตว์', 'Động vật', '动物', 'Animaux'],
        'Food': ['អាហារ', 'Makanan', 'อาหาร', 'Ẩm thực', '美食', 'Cuisine'],
        // profile
        'History': ['ប្រវត្តិ', 'Riwayat', 'ประวัติ', 'Lịch sử', '历史记录', 'Historique'],
        'Languages': ['ភាសា', 'Bahasa', 'ภาษา', 'Ngôn ngữ', '语言', 'Langues'],
        'Rules and Policies': ['ច្បាប់ និងគោលការណ៍', 'Aturan & Kebijakan', 'กฎและนโยบาย', 'Quy định & Chính sách', '规则与政策', 'Règles et politiques'],
        'Contact Us': ['ទាក់ទងមកយើង', 'Hubungi Kami', 'ติดต่อเรา', 'Liên hệ', '联系我们', 'Nous contacter'],
        'Logout': ['ចាកចេញ', 'Keluar', 'ออกจากระบบ', 'Đăng xuất', '退出登录', 'Déconnexion'],
        'Unsubscribe': ['ឈប់ជាវ', 'Berhenti Langganan', 'ยกเลิกสมาชิก', 'Hủy đăng ký', '取消订阅', 'Se désabonner'],
        'Leaderboard': ['តារាងពិន្ទុ', 'Papan Peringkat', 'กระดานผู้นำ', 'Bảng xếp hạng', '排行榜', 'Classement'],
        'Game History': ['ប្រវត្តិហ្គេម', 'Riwayat Permainan', 'ประวัติการเล่น', 'Lịch sử chơi', '游戏记录', 'Historique des parties'],
        // search
        'Find Quiz': ['ស្វែងរកកម្រងសំណួរ', 'Cari Kuis', 'ค้นหาควิซ', 'Tìm quiz', '查找测验', 'Trouver un quiz'],
        'Find Player': ['ស្វែងរកអ្នកលេង', 'Cari Pemain', 'ค้นหาผู้เล่น', 'Tìm người chơi', '查找玩家', 'Trouver un joueur'],
        'Recent Searches': ['ការស្វែងរកថ្មីៗ', 'Pencarian Terakhir', 'ค้นหาล่าสุด', 'Tìm kiếm gần đây', '最近搜索', 'Recherches récentes'],
        'Popular Searches': ['ការស្វែងរកពេញនិយម', 'Pencarian Populer', 'ค้นหายอดนิยม', 'Tìm kiếm phổ biến', '热门搜索', 'Recherches populaires'],
        'Recommended for You': ['ណែនាំសម្រាប់អ្នក', 'Rekomendasi untuk Kamu', 'แนะนำสำหรับคุณ', 'Đề xuất cho bạn', '为你推荐', 'Recommandé pour vous'],
        'Top Players': ['អ្នកលេងកំពូល', 'Pemain Teratas', 'ผู้เล่นอันดับต้น', 'Người chơi hàng đầu', '顶尖玩家', 'Meilleurs joueurs'],
        // login
        'Sign In to Play the Quiz': ['ចូលដើម្បីលេងកម្រងសំណួរ', 'Masuk untuk Bermain Kuis', 'เข้าสู่ระบบเพื่อเล่นควิซ', 'Đăng nhập để chơi quiz', '登录开始答题', 'Connectez-vous pour jouer'],
        'Continue as guest': ['បន្តជាភ្ញៀវ', 'Lanjut sebagai tamu', 'ดำเนินการต่อในฐานะผู้เยี่ยมชม', 'Tiếp tục với tư cách khách', '以访客身份继续', 'Continuer en invité'],
        // game
        'Play': ['លេង', 'Main', 'เล่น', 'Chơi', '开始', 'Jouer'],
        "Let's Play": ['តោះលេង', 'Ayo Main', 'เริ่มเล่นกัน', 'Chơi thôi', '开始游戏', 'On joue !'],
        'Challenge Accepted!': ['ទទួលយកការប្រកួត!', 'Tantangan Diterima!', 'รับคำท้าแล้ว!', 'Đã nhận thử thách!', '挑战已接受！', 'Défi accepté !'],
        'Finding an opponent…': ['កំពុងស្វែងរកគូប្រកួត…', 'Mencari lawan…', 'กำลังหาคู่แข่ง…', 'Đang tìm đối thủ…', '正在寻找对手…', 'Recherche d’un adversaire…'],
        'Beginner': ['កម្រិតដំបូង', 'Pemula', 'เริ่มต้น', 'Cơ bản', '初级', 'Débutant'],
        'Intermediate': ['កម្រិតមធ្យម', 'Menengah', 'ปานกลาง', 'Trung bình', '中级', 'Intermédiaire'],
        'Advance': ['កម្រិតខ្ពស់', 'Mahir', 'ขั้นสูง', 'Nâng cao', '高级', 'Avancé'],
        'True': ['ត្រូវ', 'Benar', 'จริง', 'Đúng', '对', 'Vrai'],
        'False': ['ខុស', 'Salah', 'เท็จ', 'Sai', '错', 'Faux'],
        'You Win!': ['អ្នកឈ្នះ!', 'Kamu Menang!', 'คุณชนะ!', 'Bạn thắng!', '你赢了！', 'Vous avez gagné !'],
        'You Lose': ['អ្នកចាញ់', 'Kamu Kalah', 'คุณแพ้', 'Bạn thua', '你输了', 'Vous avez perdu'],
        'Final Score': ['ពិន្ទុចុងក្រោយ', 'Skor Akhir', 'คะแนนสุดท้าย', 'Điểm cuối', '最终得分', 'Score final'],
        'Summary': ['សង្ខេប', 'Ringkasan', 'สรุป', 'Tóm tắt', '总结', 'Résumé'],
        'Correct answers': ['ចម្លើយត្រូវ', 'Jawaban benar', 'ตอบถูก', 'Câu đúng', '答对题数', 'Bonnes réponses'],
        'Questions answered': ['សំណួរបានឆ្លើយ', 'Soal dijawab', 'ข้อที่ตอบแล้ว', 'Câu đã trả lời', '已答题数', 'Questions répondues'],
        'Level': ['កម្រិត', 'Level', 'ระดับ', 'Cấp độ', '难度', 'Niveau'],
        'Play Again': ['លេងម្តងទៀត', 'Main Lagi', 'เล่นอีกครั้ง', 'Chơi lại', '再玩一次', 'Rejouer'],
        'Home': ['ទំព័រដើម', 'Beranda', 'หน้าแรก', 'Trang chủ', '首页', 'Accueil'],
        // language / history / contact / rules / logout
        'Choose your language': ['ជ្រើសរើសភាសារបស់អ្នក', 'Pilih bahasamu', 'เลือกภาษาของคุณ', 'Chọn ngôn ngữ', '选择语言', 'Choisissez votre langue'],
        'Save': ['រក្សាទុក', 'Simpan', 'บันทึก', 'Lưu', '保存', 'Enregistrer'],
        'All': ['ទាំងអស់', 'Semua', 'ทั้งหมด', 'Tất cả', '全部', 'Tout'],
        'Today': ['ថ្ងៃនេះ', 'Hari ini', 'วันนี้', 'Hôm nay', '今天', 'Aujourd’hui'],
        '7 days': ['៧ ថ្ងៃ', '7 hari', '7 วัน', '7 ngày', '7天', '7 jours'],
        '30 days': ['៣០ ថ្ងៃ', '30 hari', '30 วัน', '30 ngày', '30天', '30 jours'],
        'Custom': ['កំណត់ខ្លួនឯង', 'Pilih tanggal', 'กำหนดเอง', 'Tùy chọn', '自定义', 'Personnalisé'],
        'Got a question?': ['មានសំណួរមែនទេ?', 'Ada pertanyaan?', 'มีคำถามไหม?', 'Bạn có câu hỏi?', '有疑问吗？', 'Une question ?'],
        'Log out?': ['ចាកចេញ?', 'Keluar?', 'ออกจากระบบ?', 'Đăng xuất?', '要退出登录吗？', 'Se déconnecter ?'],
        'Cancel': ['បោះបង់', 'Batal', 'ยกเลิก', 'Hủy', '取消', 'Annuler'],
        'Selected': ['បានជ្រើសរើស', 'Dipilih', 'ที่เลือก', 'Đã chọn', '已选择', 'Sélectionnée'],
        'Correct!': ['ត្រឹមត្រូវ!', 'Benar!', 'ถูกต้อง!', 'Chính xác!', '答对了！', 'Correct !'],
        'Keep going!': ['បន្តទៀត!', 'Ayo terus!', 'สู้ต่อไป!', 'Cố lên!', '继续加油！', 'Continuez !'],
        'Wrong': ['ខុស', 'Salah', 'ผิด', 'Sai', '答错了', 'Faux'],
        'Yes, Log out': ['បាទ/ចាស ចាកចេញ', 'Ya, Keluar', 'ใช่ ออกจากระบบ', 'Có, đăng xuất', '确认退出', 'Oui, se déconnecter']
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
