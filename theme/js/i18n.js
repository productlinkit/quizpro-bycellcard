/*
 * Demo language switcher (prototype only).
 * Every visible text in the user app follows the chosen language:
 *   - T: exact English text -> [Khmer, Chinese]
 *   - PATTERNS: text that contains numbers or names ("6 quizzes", "Science Quizzes")
 *   - f(): whole-sentence templates for text built in JS ("Your {n} tickets were entered...")
 *   - date(): dates written the way each language writes them
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
        // ---------- home, nav, header ----------
        'Most Played Quiz': ['កម្រងសំណួរពេញនិយម', '最热门测验'],
        'Categories': ['ប្រភេទ', '分类'],
        'Lucky Draw is live!': ['ការចាប់រង្វាន់បានចាប់ផ្តើម!', '幸运抽奖进行中！'],
        'Play quizzes, collect tickets, win prizes': ['លេងកម្រងសំណួរ ប្រមូលសំបុត្រ ឈ្នះរង្វាន់', '玩测验，集奖券，赢大奖'],
        'Subscriber': ['អតិថិជនជាវ', '订阅用户'],
        'Not Subscribed': ['មិនទាន់ជាវ', '未订阅'],
        'Hi, Guest!': ['សួស្តី ភ្ញៀវ!', '你好，访客！'],
        'Login to play quizzes & win prizes': ['ចូលដើម្បីលេង និងឈ្នះរង្វាន់', '登录即可答题赢奖'],
        'Login': ['ចូល', '登录'],
        'See More Quizzes': ['មើលកម្រងសំណួរបន្ថែម', '查看更多测验'],
        'Close': ['បិទ', '关闭'],
        'Please login first to continue': ['សូមចូលគណនីជាមុនសិន', '请先登录后继续'],
        'English': ['អង់គ្លេស', '英语'],
        'Khmer': ['ខ្មែរ', '高棉语'],
        'Chinese': ['ចិន', '中文'],
        'Arabic': ['អារ៉ាប់', '阿拉伯语'],
        'French': ['បារាំង', '法语'],

        // ---------- categories ----------
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
        'Common sports terms, famous players, rules of games, and memorable moments at sports events.': ['ពាក្យកីឡាទូទៅ កីឡាករល្បីៗ ច្បាប់ប្រកួត និងព្រឹត្តិការណ៍កីឡាដែលគួរចងចាំ។', '常见体育术语、著名运动员、比赛规则以及体育赛事中的难忘瞬间。'],
        'Title of popular movies, cast, and memorable scene. Song title, singer, and composer.': ['ចំណងជើងភាពយន្តល្បីៗ តួសម្តែង និងឈុតឆាកដែលគួរចងចាំ។ ចំណងជើងបទចម្រៀង អ្នកចម្រៀង និងអ្នកនិពន្ធ។', '热门电影名称、演员和经典场景；歌曲名称、歌手和作曲家。'],
        'Social media terms, social media history, founder history, and their achievement.': ['ពាក្យបណ្តាញសង្គម ប្រវត្តិបណ្តាញសង្គម ស្ថាបនិក និងសមិទ្ធផលរបស់ពួកគេ។', '社交媒体术语、发展历史、创始人故事及其成就。'],
        'General knowledge of science, programming, physics, and chemical terms': ['ចំណេះដឹងទូទៅអំពីវិទ្យាសាស្ត្រ ការសរសេរកម្មវិធី រូបវិទ្យា និងពាក្យគីមីវិទ្យា', '科学、编程、物理和化学术语的常识'],
        'Title of popular books, novels, popular writers,': ['ចំណងជើងសៀវភៅ ប្រលោមលោក និងអ្នកនិពន្ធល្បីៗ', '热门书籍、小说和知名作家'],
        'Vehicle name, engine, technology.': ['ឈ្មោះយានយន្ត ម៉ាស៊ីន និងបច្ចេកវិទ្យា។', '车辆名称、发动机和技术。'],
        'Basic Calculation, Number line, Integers and Variables, Algebraic.': ['ការគណនាមូលដ្ឋាន បន្ទាត់ចំនួន ចំនួនគត់ អថេរ និងពីជគណិត។', '基础计算、数轴、整数与变量、代数。'],
        'World History, popular news, a world phenomenon, general terms.': ['ប្រវត្តិសាស្ត្រពិភពលោក ព័ត៌មានល្បីៗ បាតុភូតពិភពលោក និងពាក្យទូទៅ។', '世界历史、热门新闻、世界现象和常用术语。'],
        'Name of the country, the capital city, president/leader, geography, demography': ['ឈ្មោះប្រទេស រាជធានី ប្រធានាធិបតី/មេដឹកនាំ ភូមិសាស្ត្រ និងប្រជាសាស្ត្រ', '国家名称、首都、总统/领导人、地理和人口'],
        'Name of animal, type of animal, animal ability': ['ឈ្មោះសត្វ ប្រភេទសត្វ និងសមត្ថភាពរបស់សត្វ', '动物名称、种类和能力'],
        'Name of food, taste, ingredients, food country origin': ['ឈ្មោះអាហារ រសជាតិ គ្រឿងផ្សំ និងប្រទេសដើមនៃអាហារ', '食物名称、味道、配料和发源国'],

        // ---------- profile ----------
        'Hello': ['សួស្តី', '你好'],
        'History': ['ប្រវត្តិ', '历史记录'],
        'Languages': ['ភាសា', '语言'],
        'Rules and Policies': ['ច្បាប់ និងគោលការណ៍', '规则与政策'],
        'Contact Us': ['ទាក់ទងមកយើង', '联系我们'],
        'Logout': ['ចាកចេញ', '退出登录'],
        'Unsubscribe': ['ឈប់ជាវ', '取消订阅'],
        'Subscribe': ['ជាវ', '订阅'],
        'Daily subscription active · unlimited quizzes & Lucky Draw tickets': ['ការជាវប្រចាំថ្ងៃកំពុងដំណើរការ · លេងមិនកំណត់ និងទទួលសំបុត្រចាប់រង្វាន់', '每日订阅已生效 · 无限畅玩测验并获得幸运抽奖券'],
        'Subscribe to play unlimited quizzes and collect Lucky Draw tickets': ['ជាវដើម្បីលេងមិនកំណត់ និងប្រមូលសំបុត្រចាប់រង្វាន់', '订阅即可无限畅玩测验并收集幸运抽奖券'],
        'Unsubscribe?': ['ឈប់ជាវមែនទេ?', '确定取消订阅吗？'],
        "You will stop being charged, but you will lose unlimited quizzes and won't earn Lucky Draw tickets anymore.": ['អ្នកនឹងលែងត្រូវបានគិតថ្លៃ ប៉ុន្តែនឹងបាត់បង់ការលេងមិនកំណត់ ហើយលែងទទួលបានសំបុត្រចាប់រង្វាន់។', '您将不再被扣费，但会失去无限畅玩测验的权益，也无法再获得幸运抽奖券。'],
        'Stay Subscribed': ['បន្តការជាវ', '继续订阅'],
        'Yes, Unsubscribe': ['បាទ/ចាស ឈប់ជាវ', '确认取消订阅'],
        'Log out?': ['ចាកចេញ?', '要退出登录吗？'],
        'You will need to log in again to play quizzes and collect Lucky Draw tickets.': ['អ្នកនឹងត្រូវចូលម្តងទៀត ដើម្បីលេងកម្រងសំណួរ និងប្រមូលសំបុត្រចាប់រង្វាន់។', '您需要重新登录才能玩测验和收集幸运抽奖券。'],
        'Cancel': ['បោះបង់', '取消'],
        'Yes, Log out': ['បាទ/ចាស ចាកចេញ', '确认退出'],
        'Profile updated': ['បានធ្វើបច្ចុប្បន្នភាពប្រវត្តិរូប', '资料已更新'],
        'Edit Profile': ['កែប្រែប្រវត្តិរូប', '编辑资料'],
        'Edit profile photo': ['កែរូបភាពប្រវត្តិរូប', '编辑头像'],
        'Avatar': ['រូបតំណាង', '头像'],
        'Name': ['ឈ្មោះ', '姓名'],
        'Save': ['រក្សាទុក', '保存'],
        'Please enter your name': ['សូមបញ្ចូលឈ្មោះរបស់អ្នក', '请输入您的姓名'],
        'Please choose an image file': ['សូមជ្រើសរើសឯកសាររូបភាព', '请选择图片文件'],
        'This image could not be read': ['មិនអាចអានរូបភាពនេះបានទេ', '无法读取此图片'],
        'Could not save, the photo may be too large': ['មិនអាចរក្សាទុកបានទេ រូបភាពប្រហែលធំពេក', '无法保存，图片可能太大'],

        // ---------- leaderboard & search ----------
        'Leaderboard': ['តារាងពិន្ទុ', '排行榜'],
        'Score': ['ពិន្ទុ', '得分'],
        'You': ['អ្នក', '你'],
        'Find Quiz': ['ស្វែងរកកម្រងសំណួរ', '查找测验'],
        'Find Player': ['ស្វែងរកអ្នកលេង', '查找玩家'],
        'Search...': ['ស្វែងរក...', '搜索...'],
        'Search phone number...': ['ស្វែងរកលេខទូរស័ព្ទ...', '搜索手机号...'],
        'Recent Searches': ['ការស្វែងរកថ្មីៗ', '最近搜索'],
        'Popular Searches': ['ការស្វែងរកពេញនិយម', '热门搜索'],
        'Recommended for You': ['ណែនាំសម្រាប់អ្នក', '为你推荐'],
        'Top Players': ['អ្នកលេងកំពូល', '顶尖玩家'],
        'Clear': ['សម្អាត', '清除'],

        // ---------- history ----------
        'Game History': ['ប្រវត្តិហ្គេម', '游戏记录'],
        'Search quiz or level...': ['ស្វែងរកកម្រងសំណួរ ឬកម្រិត...', '搜索测验或难度...'],
        'Date range': ['ចន្លោះកាលបរិច្ឆេទ', '日期范围'],
        'All': ['ទាំងអស់', '全部'],
        'Today': ['ថ្ងៃនេះ', '今天'],
        '7 days': ['៧ ថ្ងៃ', '7天'],
        '30 days': ['៣០ ថ្ងៃ', '30天'],
        'Custom': ['កំណត់ខ្លួនឯង', '自定义'],
        'From': ['ពី', '从'],
        'To': ['ដល់', '至'],
        'No games found': ['រកមិនឃើញហ្គេម', '未找到游戏记录'],
        'Reset filters': ['កំណត់តម្រងឡើងវិញ', '重置筛选'],

        // ---------- language ----------
        'Choose your language': ['ជ្រើសរើសភាសារបស់អ្នក', '选择语言'],
        'Selected': ['បានជ្រើសរើស', '已选择'],

        // ---------- rules ----------
        'Tap a section to read the details.': ['ចុចលើផ្នែកណាមួយដើម្បីអានព័ត៌មានលម្អិត។', '点击任一部分查看详情。'],
        'General Rules': ['ច្បាប់ទូទៅ', '一般规则'],
        'Each user must register an account to participate in quizzes and appear on the leaderboard.': ['អ្នកប្រើម្នាក់ៗត្រូវចុះឈ្មោះគណនី ដើម្បីចូលរួមកម្រងសំណួរ និងបង្ហាញលើតារាងពិន្ទុ។', '每位用户必须注册账号，才能参加测验并出现在排行榜上。'],
        'Users are responsible for the accuracy of their account information.': ['អ្នកប្រើទទួលខុសត្រូវលើភាពត្រឹមត្រូវនៃព័ត៌មានគណនីរបស់ខ្លួន។', '用户需对其账号信息的准确性负责。'],
        'Only one account per user is allowed. Multiple accounts will result in disqualification.': ['អ្នកប្រើម្នាក់អាចមានគណនីតែមួយប៉ុណ្ណោះ។ ការមានគណនីច្រើននឹងត្រូវដកសិទ្ធិ។', '每位用户只能拥有一个账号，多个账号将被取消资格。'],
        'Quiz Participation': ['ការចូលរួមកម្រងសំណួរ', '参与测验'],
        'Quizzes are time-bound; ensure submission before the timer ends.': ['កម្រងសំណួរមានកំណត់ពេល សូមបញ្ជូនចម្លើយមុនពេលអស់ម៉ោង។', '测验有时间限制，请在计时结束前提交。'],
        'Users must answer all questions without external help or resources unless stated otherwise.': ['អ្នកប្រើត្រូវឆ្លើយសំណួរទាំងអស់ដោយគ្មានជំនួយ ឬឯកសារពីខាងក្រៅ លើកលែងតែមានការបញ្ជាក់ផ្សេង។', '除非另有说明，用户必须在没有外部帮助或资料的情况下回答所有问题。'],
        'Use of automated tools, bots, or third-party software is strictly prohibited.': ['ហាមឃាត់ជាដាច់ខាតការប្រើឧបករណ៍ស្វ័យប្រវត្តិ បូត ឬកម្មវិធីភាគីទីបី។', '严禁使用自动化工具、机器人或第三方软件。'],
        'Leaderboard Criteria': ['លក្ខខណ្ឌតារាងពិន្ទុ', '排行榜规则'],
        'Scores are calculated based on the number of correct answers and the time taken to complete the quiz.': ['ពិន្ទុត្រូវបានគណនាតាមចំនួនចម្លើយត្រូវ និងរយៈពេលដែលប្រើដើម្បីបញ្ចប់កម្រងសំណួរ។', '得分根据答对题数和完成测验所用时间计算。'],
        'In case of ties, rankings are determined by the submission time.': ['ក្នុងករណីពិន្ទុស្មើគ្នា ចំណាត់ថ្នាក់នឹងកំណត់តាមពេលវេលាបញ្ជូន។', '如得分相同，按提交时间决定排名。'],
        'Leaderboards are updated in real-time; any discrepancies must be reported within 24 hours.': ['តារាងពិន្ទុត្រូវបានធ្វើបច្ចុប្បន្នភាពភ្លាមៗ ភាពមិនត្រឹមត្រូវណាមួយត្រូវរាយការណ៍ក្នុងរយៈពេល ២៤ ម៉ោង។', '排行榜实时更新，如有异议须在24小时内反馈。'],
        'Rewards and Prizes': ['រង្វាន់', '奖励与奖品'],
        'Prizes, if offered, will be distributed based on the final leaderboard at the end of the quiz period.': ['រង្វាន់ (ប្រសិនបើមាន) នឹងចែកជូនតាមតារាងពិន្ទុចុងក្រោយ នៅចុងរយៈពេលកម្រងសំណួរ។', '如设有奖品，将在测验期结束时根据最终排行榜发放。'],
        'Users must verify their identity before claiming prizes.': ['អ្នកប្រើត្រូវផ្ទៀងផ្ទាត់អត្តសញ្ញាណមុនពេលទទួលរង្វាន់។', '用户领奖前须验证身份。'],
        'Prizes are non-transferable and cannot be exchanged for cash.': ['រង្វាន់មិនអាចផ្ទេរ ឬប្តូរជាសាច់ប្រាក់បានទេ។', '奖品不可转让，也不可兑换现金。'],
        'Fair Play and Conduct': ['ការលេងដោយយុត្តិធម៌ និងឥរិយាបថ', '公平竞赛与行为规范'],
        'Cheating, including sharing answers or collusion, will result in immediate disqualification': ['ការបន្លំ រួមទាំងការចែករំលែកចម្លើយ ឬការឃុបឃិត នឹងត្រូវដកសិទ្ធិភ្លាមៗ', '作弊（包括分享答案或串通）将被立即取消资格'],
        'Offensive or disruptive behavior in comments or forums associated with the portal is prohibited.': ['ហាមឃាត់ឥរិយាបថប្រមាថ ឬរំខាននៅក្នុងមតិយោបល់ ឬវេទិកាដែលពាក់ព័ន្ធនឹងគេហទំព័រ។', '禁止在与本平台相关的评论或论坛中发表冒犯或扰乱秩序的言行。'],
        'Users found violating policies will be banned from the platform.': ['អ្នកប្រើដែលបំពានគោលការណ៍នឹងត្រូវហាមឃាត់ពីវេទិកា។', '违反政策的用户将被禁止使用本平台。'],
        'Privacy and Data Usage': ['ឯកជនភាព និងការប្រើប្រាស់ទិន្នន័យ', '隐私与数据使用'],
        'User data collected during registration and participation will be used solely for leaderboard management and prize distribution.': ['ទិន្នន័យអ្នកប្រើដែលប្រមូលពេលចុះឈ្មោះ និងចូលរួម នឹងប្រើសម្រាប់គ្រប់គ្រងតារាងពិន្ទុ និងចែករង្វាន់តែប៉ុណ្ណោះ។', '注册和参与过程中收集的用户数据仅用于排行榜管理和奖品发放。'],
        'Personal information will not be shared with third parties without consent.': ['ព័ត៌មានផ្ទាល់ខ្លួននឹងមិនត្រូវចែករំលែកជាមួយភាគីទីបីដោយគ្មានការយល់ព្រមឡើយ។', '未经同意，个人信息不会与第三方共享。'],
        'Dispute Resolution': ['ការដោះស្រាយវិវាទ', '争议处理'],
        'Any disputes regarding scores, rankings, or prizes must be submitted within 7 days via the contact form.': ['វិវាទទាក់ទងនឹងពិន្ទុ ចំណាត់ថ្នាក់ ឬរង្វាន់ ត្រូវដាក់ស្នើក្នុងរយៈពេល ៧ ថ្ងៃ តាមរយៈទម្រង់ទំនាក់ទំនង។', '有关得分、排名或奖品的任何争议，须在7天内通过联系表单提交。'],
        'The portal administrator’s decision will be final and binding.': ['សេចក្តីសម្រេចរបស់អ្នកគ្រប់គ្រងគេហទំព័រ គឺជាសេចក្តីសម្រេចចុងក្រោយ។', '平台管理员的决定为最终决定，具有约束力。'],
        'Changes to Rules': ['ការផ្លាស់ប្តូរច្បាប់', '规则变更'],
        'The portal reserves the right to amend these rules at any time.': ['គេហទំព័ររក្សាសិទ្ធិកែប្រែច្បាប់ទាំងនេះគ្រប់ពេល។', '本平台保留随时修改这些规则的权利。'],
        'Users will be notified of changes via email or portal notifications.': ['អ្នកប្រើនឹងទទួលបានការជូនដំណឹងអំពីការផ្លាស់ប្តូរតាមអ៊ីមែល ឬការជូនដំណឹងលើគេហទំព័រ។', '规则变更将通过电子邮件或平台通知告知用户。'],
        'Still have questions?': ['នៅមានសំណួរទៀតឬ?', '还有疑问？'],

        // ---------- contact ----------
        'Got a question?': ['មានសំណួរមែនទេ?', '有疑问吗？'],
        "Our team is happy to help. Choose how you'd like to reach us.": ['ក្រុមការងាររបស់យើងរីករាយជួយ។ សូមជ្រើសរើសវិធីទាក់ទងមកយើង។', '我们的团队乐意为您服务，请选择联系方式。'],
        'Chat with us · usually replies in minutes': ['ជជែកជាមួយយើង · ជាធម្មតាឆ្លើយតបក្នុងរយៈពេលប៉ុន្មាននាទី', '与我们聊天 · 通常几分钟内回复'],
        'Email': ['អ៊ីមែល', '电子邮件'],
        'Support hours: Mon – Sat, 08:00 – 20:00': ['ម៉ោងផ្តល់ជំនួយ៖ ច័ន្ទ – សៅរ៍ ០៨:០០ – ២០:០០', '服务时间：周一至周六 08:00 – 20:00'],
        'Read Rules and Policies': ['អានច្បាប់ និងគោលការណ៍', '阅读规则与政策'],

        // ---------- login ----------
        'Sign In to Play the Quiz': ['ចូលដើម្បីលេងកម្រងសំណួរ', '登录开始答题'],
        'Continue as guest': ['បន្តជាភ្ញៀវ', '以访客身份继续'],
        'MSISDN': ['លេខទូរស័ព្ទ', '手机号码'],
        'Password': ['ពាក្យសម្ងាត់', '密码'],
        'Show password': ['បង្ហាញពាក្យសម្ងាត់', '显示密码'],
        'Hide password': ['លាក់ពាក្យសម្ងាត់', '隐藏密码'],
        'Please enter your MSISDN': ['សូមបញ្ចូលលេខទូរស័ព្ទរបស់អ្នក', '请输入手机号码'],
        'Please enter your password': ['សូមបញ្ចូលពាក្យសម្ងាត់របស់អ្នក', '请输入密码'],

        // ---------- quiz detail, VS, play ----------
        'Description': ['ការពិពណ៌នា', '简介'],
        'Difficulty Levels': ['កម្រិតលំបាក', '难度等级'],
        'Play': ['លេង', '开始'],
        'Beginner': ['កម្រិតដំបូង', '初级'],
        'Intermediate': ['កម្រិតមធ្យម', '中级'],
        'Advance': ['កម្រិតខ្ពស់', '高级'],
        'per answer': ['ក្នុងមួយចម្លើយ', '每题'],
        'VS': ['ទល់', 'VS'],
        'Searching…': ['កំពុងស្វែងរក…', '搜索中…'],
        'Finding an opponent…': ['កំពុងស្វែងរកគូប្រកួត…', '正在寻找对手…'],
        'Challenge Accepted!': ['ទទួលយកការប្រកួត!', '挑战已接受！'],
        "Let's Play": ['តោះលេង', '开始游戏'],
        'of': ['/', '/'],
        'True': ['ត្រូវ', '对'],
        'False': ['ខុស', '错'],
        'Correct!': ['ត្រឹមត្រូវ!', '答对了！'],
        'Wrong': ['ខុស', '答错了'],
        'Keep going!': ['បន្តទៀត!', '继续加油！'],

        // ---------- quiz questions ----------
        'Canberra is the capital city of Australia.': ['កង់បេរ៉ា គឺជារាជធានីរបស់ប្រទេសអូស្ត្រាលី។', '堪培拉是澳大利亚的首都。'],
        'The Nile flows through Brazil.': ['ទន្លេនីល ហូរកាត់ប្រទេសប្រេស៊ីល។', '尼罗河流经巴西。'],
        'Tokyo is the capital city of Japan.': ['តូក្យូ គឺជារាជធានីរបស់ប្រទេសជប៉ុន។', '东京是日本的首都。'],
        'The flag of Canada has a red maple leaf.': ['ទង់ជាតិកាណាដាមានស្លឹកម៉េភ្លពណ៌ក្រហម។', '加拿大国旗上有一片红色枫叶。'],
        'The Atlantic is the largest ocean in the world.': ['មហាសមុទ្រអាត្លង់ទិក ធំជាងគេបំផុតក្នុងពិភពលោក។', '大西洋是世界上最大的海洋。'],
        'Water boils at 100°C at sea level.': ['ទឹកពុះនៅសីតុណ្ហភាព 100°C នៅកម្រិតនីវ៉ូទឹកសមុទ្រ។', '在海平面，水的沸点是100°C。'],
        'Sound travels faster than light.': ['សំឡេងធ្វើដំណើរលឿនជាងពន្លឺ។', '声音的传播速度比光快。'],
        'Plants absorb carbon dioxide from the air.': ['រុក្ខជាតិស្រូបយកឧស្ម័នកាបូនិកពីខ្យល់។', '植物从空气中吸收二氧化碳。'],
        'A triangle has four sides.': ['ត្រីកោណមានជ្រុងបួន។', '三角形有四条边。'],
        '15 is an even number.': ['15 គឺជាចំនួនគូ។', '15是偶数。'],
        'A football team has 11 players on the field.': ['ក្រុមបាល់ទាត់មានកីឡាករ 11 នាក់នៅលើទីលាន។', '一支足球队在场上有11名球员。'],
        'A marathon is longer than 40 km.': ['ការរត់ម៉ារ៉ាតុងវែងជាង 40 គីឡូម៉ែត្រ។', '马拉松全程超过40公里。'],
        'In tennis, a score of zero is called "love".': ['ក្នុងកីឡាតេនីស ពិន្ទុសូន្យហៅថា "love"។', '在网球中，零分被称为"love"。'],
        'A whale is a mammal.': ['ត្រីបាឡែនជាសត្វថនិកសត្វ។', '鲸鱼是哺乳动物。'],
        'Spiders have six legs.': ['សត្វពីងពាងមានជើងប្រាំមួយ។', '蜘蛛有六条腿。'],
        'Penguins can fly.': ['សត្វភេនឃ្វីនអាចហើរបាន។', '企鹅会飞。'],
        'Honey is made by bees.': ['ទឹកឃ្មុំត្រូវបានផលិតដោយឃ្មុំ។', '蜂蜜是由蜜蜂酿造的。'],
        'Sushi originally comes from Japan.': ['ស៊ូស៊ីមានប្រភពដើមមកពីប្រទេសជប៉ុន។', '寿司起源于日本。'],
        'A tomato grows underground.': ['ប៉េងប៉ោះដុះនៅក្រោមដី។', '番茄长在地下。'],
        'There are seven continents.': ['ពិភពលោកមានទ្វីបប្រាំពីរ។', '世界上有七大洲。'],
        'A leap year has 365 days.': ['ឆ្នាំបូកមាន 365 ថ្ងៃ។', '闰年有365天。'],
        'The sun rises in the east.': ['ព្រះអាទិត្យរះពីទិសខាងកើត។', '太阳从东方升起。'],
        'An electric car needs petrol to run.': ['រថយន្តអគ្គិសនីត្រូវការសាំងដើម្បីដំណើរការ។', '电动汽车需要汽油才能行驶。'],
        'A bicycle has an engine.': ['កង់មានម៉ាស៊ីន។', '自行车有发动机。'],
        'A person who writes books is called an author.': ['អ្នកសរសេរសៀវភៅត្រូវបានហៅថាអ្នកនិពន្ធ។', '写书的人被称为作者。'],
        'A dictionary lists words in alphabetical order.': ['វចនានុក្រមរៀបពាក្យតាមលំដាប់អក្សរ។', '词典按字母顺序排列单词。'],
        'A guitar usually has six strings.': ['ហ្គីតាជាធម្មតាមានខ្សែប្រាំមួយ។', '吉他通常有六根弦。'],
        'A movie director acts in every scene of the film.': ['អ្នកដឹកនាំរឿងសម្តែងគ្រប់ឈុតក្នុងខ្សែភាពយន្ត។', '电影导演会出演影片的每一个场景。'],
        'A hashtag starts with the # symbol.': ['ហាសថេកចាប់ផ្តើមដោយសញ្ញា #។', '话题标签以 # 符号开头。'],
        'You need a stamp to send an email.': ['អ្នកត្រូវការតែមដើម្បីផ្ញើអ៊ីមែល។', '发送电子邮件需要贴邮票。'],

        // ---------- result ----------
        'You Win!': ['អ្នកឈ្នះ!', '你赢了！'],
        'You Lose': ['អ្នកចាញ់', '你输了'],
        'Great job, keep it up': ['ល្អណាស់ បន្តទៀត', '太棒了，继续保持'],
        'Nice try, play again to win': ['ព្យាយាមល្អ លេងម្តងទៀតដើម្បីឈ្នះ', '不错的尝试，再玩一次赢回来'],
        'Points': ['ពិន្ទុ', '积分'],
        'Final Score': ['ពិន្ទុចុងក្រោយ', '最终得分'],
        'WINNER': ['អ្នកឈ្នះ', '胜者'],
        'Summary': ['សង្ខេប', '总结'],
        'Correct answers': ['ចម្លើយត្រូវ', '答对题数'],
        'Accuracy': ['ភាពត្រឹមត្រូវ', '正确率'],
        'Level': ['កម្រិត', '难度'],
        'Questions answered': ['សំណួរបានឆ្លើយ', '已答题数'],
        'See your Ticket History': ['មើលប្រវត្តិសំបុត្ររបស់អ្នក', '查看奖券记录'],
        'Play Again': ['លេងម្តងទៀត', '再玩一次'],
        'Home': ['ទំព័រដើម', '首页'],
        'Demo Preview': ['មើលសាកល្បង', '演示预览'],
        'Demo preview': ['មើលសាកល្បង', '演示预览'],
        'Win': ['ឈ្នះ', '赢'],
        'Lose': ['ចាញ់', '输'],

        // ---------- lucky draw ----------
        'Lucky Draw': ['ការចាប់រង្វាន់', '幸运抽奖'],
        'Starting soon': ['ឆាប់ៗនេះ', '即将开始'],
        'Campaign is live': ['យុទ្ធនាការកំពុងដំណើរការ', '活动进行中'],
        'Play more quizzes, get more tickets, more chances to win!': ['លេងកាន់តែច្រើន ទទួលសំបុត្រកាន់តែច្រើន ឱកាសឈ្នះកាន់តែខ្ពស់!', '多玩测验，多得奖券，中奖机会更大！'],
        'My tickets': ['សំបុត្ររបស់ខ្ញុំ', '我的奖券'],
        'Log in to start collecting': ['ចូលដើម្បីចាប់ផ្តើមប្រមូល', '登录开始收集'],
        'Login to Join': ['ចូលដើម្បីចូលរួម', '登录参与'],
        'Starts in': ['ចាប់ផ្តើមក្នុង', '距开始'],
        'Draw in': ['ចាប់រង្វាន់ក្នុង', '距开奖'],
        'd': ['ថ្ងៃ', '天'],
        'h': ['ម៉ោង', '时'],
        'm': ['នាទី', '分'],
        's': ['វិនាទី', '秒'],
        'Campaign period': ['រយៈពេលយុទ្ធនាការ', '活动时间'],
        'Draw date': ['ថ្ងៃចាប់រង្វាន់', '开奖日期'],
        'Play Now & Earn Tickets': ['លេងឥឡូវ និងទទួលសំបុត្រ', '立即参与赢奖券'],
        'How to Earn Tickets': ['របៀបទទួលបានសំបុត្រ', '如何获得奖券'],
        '3 simple steps': ['៣ ជំហានងាយៗ', '简单3步'],
        'Play quizzes': ['លេងកម្រងសំណួរ', '玩测验'],
        'Any quiz during the campaign': ['កម្រងសំណួរណាមួយក្នុងរយៈពេលយុទ្ធនាការ', '活动期间任意测验'],
        'Earn tickets': ['ទទួលសំបុត្រ', '获得奖券'],
        'Added after every quiz': ['បន្ថែមបន្ទាប់ពីកម្រងសំណួរនីមួយៗ', '每次测验后发放'],
        'Win prizes': ['ឈ្នះរង្វាន់', '赢取奖品'],
        'questions answered': ['សំណួរបានឆ្លើយ', '已答题'],
        'correct answers': ['ចម្លើយត្រូវ', '答对题'],
        'Amazing Prizes': ['រង្វាន់ដ៏អស្ចារ្យ', '超值奖品'],
        'Up for grabs this period': ['រង្វាន់សម្រាប់វគ្គនេះ', '本期奖品'],
        'Grand Prize': ['រង្វាន់ធំ', '特等奖'],
        '2nd Prize': ['រង្វាន់លេខ ២', '二等奖'],
        '3rd Prize': ['រង្វាន់លេខ ៣', '三等奖'],
        'Smartphone': ['ស្មាតហ្វូន', '智能手机'],
        'Wireless Earbuds': ['កាសឥតខ្សែ', '无线耳机'],
        'Cellcard Credit': ['លុយ Cellcard', 'Cellcard 话费'],
        'My Ticket Tracker': ['តាមដានសំបុត្ររបស់ខ្ញុំ', '我的奖券记录'],
        'Your tickets and where they came from': ['សំបុត្ររបស់អ្នក និងប្រភពដែលទទួលបាន', '你的奖券及其来源'],
        'Current Period': ['វគ្គបច្ចុប្បន្ន', '本期'],
        'Total tickets': ['សំបុត្រសរុប', '奖券总数'],
        'Recent Activity': ['សកម្មភាពថ្មីៗ', '最近活动'],
        'No tickets yet': ['មិនទាន់មានសំបុត្រ', '暂无奖券'],
        'Play a quiz to earn your first ticket.': ['លេងកម្រងសំណួរដើម្បីទទួលសំបុត្រដំបូង។', '玩一次测验即可获得第一张奖券。'],
        'Not won': ['មិនបានឈ្នះ', '未中奖'],
        'Won': ['បានឈ្នះ', '已中奖'],
        'Ended': ['បានបញ្ចប់', '已结束'],
        'Live': ['ផ្សាយផ្ទាល់', '直播中'],
        'Done': ['រួចរាល់', '已完成'],
        'Drawing now': ['កំពុងចាប់រង្វាន់', '正在开奖'],
        'The draw is happening!': ['ការចាប់រង្វាន់កំពុងប្រព្រឹត្តទៅ!', '开奖进行中！'],
        'Winners are being picked at random from all eligible tickets.': ['អ្នកឈ្នះកំពុងត្រូវបានជ្រើសរើសដោយចៃដន្យពីសំបុត្រដែលមានសិទ្ធិទាំងអស់។', '正在从所有有效奖券中随机抽取中奖者。'],
        'My tickets in this draw': ['សំបុត្ររបស់ខ្ញុំក្នុងការចាប់រង្វាន់នេះ', '我参与本次抽奖的奖券'],
        'Entries locked': ['បានបិទការចូលរួម', '参与已锁定'],
        'Eligibility checked': ['បានពិនិត្យសិទ្ធិ', '资格已审核'],
        'Drawing winners': ['កំពុងចាប់អ្នកឈ្នះ', '正在抽取中奖者'],
        'Winners announced': ['បានប្រកាសអ្នកឈ្នះ', '已公布中奖者'],
        'Winners selected': ['បានជ្រើសរើសអ្នកឈ្នះ', '中奖者已产生'],
        'We have our winners!': ['យើងមានអ្នកឈ្នះហើយ!', '中奖者已揭晓！'],
        'Tap below to see the full results.': ['ចុចខាងក្រោមដើម្បីមើលលទ្ធផលពេញលេញ។', '点击下方查看完整结果。'],
        'See Winners': ['មើលអ្នកឈ្នះ', '查看中奖者'],
        'Keep Playing': ['បន្តលេង', '继续游戏'],
        'Results appear on this page': ['លទ្ធផលនឹងបង្ហាញនៅទំព័រនេះ', '结果将在本页公布'],
        '· New tickets count for the next period': ['· សំបុត្រថ្មីនឹងរាប់សម្រាប់វគ្គបន្ទាប់', '· 新奖券计入下一期'],
        'Congratulations, you won!': ['សូមអបអរសាទរ អ្នកបានឈ្នះ!', '恭喜，你中奖了！'],
        'Our team will contact you by SMS within 7 days.': ['ក្រុមការងាររបស់យើងនឹងទាក់ទងអ្នកតាម SMS ក្នុងរយៈពេល ៧ ថ្ងៃ។', '我们的团队将在7天内通过短信联系你。'],
        'Not this time': ['លើកនេះមិនទាន់ទេ', '这次未中奖'],
        'Play Now': ['លេងឥឡូវ', '立即开玩'],
        'Winner Announcement': ['ការប្រកាសអ្នកឈ្នះ', '中奖公告'],
        'Terms & Conditions': ['លក្ខខណ្ឌ', '条款与条件'],
        'Open to active QuizPro subscribers during the campaign period.': ['សម្រាប់អតិថិជន QuizPro ដែលកំពុងជាវក្នុងរយៈពេលយុទ្ធនាការ។', '面向活动期间的QuizPro有效订阅用户。'],
        'Winners are selected at random from eligible entries on the draw date.': ['អ្នកឈ្នះត្រូវបានជ្រើសរើសដោយចៃដន្យពីអ្នកចូលរួមដែលមានសិទ្ធិ នៅថ្ងៃចាប់រង្វាន់។', '中奖者将于开奖日从有效参与者中随机抽取。'],
        'Each mobile number can win at most one prize per campaign.': ['លេខទូរស័ព្ទនីមួយៗអាចឈ្នះរង្វាន់បានតែមួយក្នុងមួយយុទ្ធនាការ។', '每个手机号在每期活动中最多中奖一次。'],
        'Tickets are not transferable and cannot be exchanged for cash.': ['សំបុត្រមិនអាចផ្ទេរ ឬប្តូរជាសាច់ប្រាក់បានទេ។', '奖券不可转让，也不可兑换现金。'],

        // lucky draw: prototype review panel & annotations
        'Screen state': ['ស្ថានភាពអេក្រង់', '页面状态'],
        'Guest (not logged in)': ['ភ្ញៀវ (មិនទាន់ចូល)', '访客（未登录）'],
        'Not started': ['មិនទាន់ចាប់ផ្តើម', '未开始'],
        'Active': ['កំពុងដំណើរការ', '进行中'],
        'Active – 0 tickets': ['កំពុងដំណើរការ – ០ សំបុត្រ', '进行中 – 0张奖券'],
        'Drawing in progress': ['កំពុងចាប់រង្វាន់', '开奖中'],
        'Draw completed – winner': ['ចាប់រង្វាន់រួច – ឈ្នះ', '开奖完成 – 中奖'],
        'Draw completed – not won': ['ចាប់រង្វាន់រួច – មិនឈ្នះ', '开奖完成 – 未中奖'],
        'Ticket rule preview': ['មើលច្បាប់សំបុត្រ', '奖券规则预览'],
        'not confirmed': ['មិនទាន់បញ្ជាក់', '未确认'],
        'ticket(s) for every': ['សំបុត្រ សម្រាប់រាល់', '张奖券，每'],
        'Draw method': ['វិធីចាប់រង្វាន់', '开奖方式'],
        'Weighted – 1 ticket = 1 entry': ['តាមចំនួន – ១ សំបុត្រ = ១ ឱកាស', '加权 – 1张奖券 = 1次机会'],
        'One entry per eligible user': ['មួយឱកាសក្នុងមួយអ្នកប្រើ', '每位合格用户1次机会'],
        'Annotations': ['កំណត់ចំណាំ', '标注'],
        'Show section status & open questions': ['បង្ហាញស្ថានភាពផ្នែក និងសំណួរដែលនៅចំហ', '显示各部分状态和待定问题'],
        'Existing – reuse with adjustment': ['មានស្រាប់ – ប្រើឡើងវិញដោយកែសម្រួល', '已有 – 调整后复用'],
        'New': ['ថ្មី', '新增'],
        'Existing or new? – to confirm': ['មានស្រាប់ ឬថ្មី? – ត្រូវបញ្ជាក់', '已有还是新增？– 待确认'],
        'Admin view:': ['ទិដ្ឋភាពអ្នកគ្រប់គ្រង៖', '管理员视图：'],
        'Lucky Draw admin': ['គ្រប់គ្រងការចាប់រង្វាន់', '幸运抽奖管理'],
        'dates TBC': ['កាលបរិច្ឆេទនឹងបញ្ជាក់', '日期待定'],
        'prizes TBC': ['រង្វាន់នឹងបញ្ជាក់', '奖品待定'],
        'rule & basis not confirmed': ['ច្បាប់មិនទាន់បញ្ជាក់', '规则待确认'],
        'eligibility TBC': ['សិទ្ធិនឹងបញ្ជាក់', '资格待定'],
        'announcement time TBC': ['ពេលប្រកាសនឹងបញ្ជាក់', '公布时间待定'],
        'claim process TBC': ['ការទទួលរង្វាន់នឹងបញ្ជាក់', '领奖流程待定'],
        'TBC': ['នឹងបញ្ជាក់', '待定']
    };

    // Text with numbers or names. {1}/{2} = captured groups; t1/t2 = translate that group first.
    var MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var MONTHS_KM = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
    var PATTERNS = [
        [/^(.+) Quizzes$/, ['កម្រងសំណួរ{1}', '{1}测验'], { t1: 1 }],
        [/^(.+) quiz$/, ['កម្រងសំណួរ{1}', '{1}测验'], { t1: 1 }],
        [/^(\d+) Question$/, ['{1} សំណួរ', '{1} 道题']],
        [/^(\d+) Points$/, ['{1} ពិន្ទុ', '{1} 积分']],
        [/^\+(\d+) Points?$/, ['+{1} ពិន្ទុ', '+{1} 积分']],
        [/^(.+), Score$/, ['{1}, ពិន្ទុ', '{1}，得分'], { t1: 1 }],
        [/^([\d,]+) coins$/, ['{1} កាក់', '{1} 金币']],
        [/^(\d+) of (\d+) games$/, ['{1} / {2} ហ្គេម', '{1} / {2} 局']],
        [/^(\d+) answered$/, ['ឆ្លើយ {1}', '答 {1} 题']],
        [/^(\d+) correct$/, ['ត្រូវ {1}', '对 {1} 题']],
        [/^(\d+) quizzes$/, ['{1} កម្រងសំណួរ', '{1} 次测验']],
        [/^(\d+) winners?$/, ['អ្នកឈ្នះ {1} នាក់', '{1} 名中奖者']],
        [/^(\d+) tickets?$/, ['{1} សំបុត្រ', '{1} 张奖券']],
        [/^(\d+) questions answered$/, ['ឆ្លើយ {1} សំណួរ', '答 {1} 题']],
        [/^(\d+) correct answers$/, ['ឆ្លើយត្រូវ {1} សំណួរ', '答对 {1} 题']],
        [/^\+(\d+) Lucky Draw tickets?$/, ['+{1} សំបុត្រចាប់រង្វាន់', '+{1} 张幸运抽奖券']],
        [/^Results for "(.*)"$/, ['លទ្ធផលសម្រាប់ "{1}"', '"{1}" 的搜索结果']],
        [/^No quizzes found for "(.*)"$/, ['រកមិនឃើញកម្រងសំណួរសម្រាប់ "{1}"', '未找到与"{1}"相关的测验']],
        [/^Players matching "(.*)"$/, ['អ្នកលេងដែលត្រូវនឹង "{1}"', '匹配"{1}"的玩家']],
        [/^No player found for "(.*)"$/, ['រកមិនឃើញអ្នកលេងសម្រាប់ "{1}"', '未找到"{1}"的玩家']],
        [/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/, ['{m} {2}', '{2}年{n}月']]
    ];

    // Whole sentences built in JS: English template -> [km, zh]
    var F = {
        'You get {tickets} for every {every}.': ['អ្នកទទួលបាន {tickets} សម្រាប់រាល់ {every}។', '每{every}可获得{tickets}。'],
        '{n} ticket': ['{n} សំបុត្រ', '{n} 张奖券'],
        '{n} tickets': ['{n} សំបុត្រ', '{n} 张奖券'],
        '{n} questions answered': ['ការឆ្លើយ {n} សំណួរ', '答 {n} 题'],
        '{n} correct answers': ['ការឆ្លើយត្រូវ {n} សំណួរ', '答对 {n} 题'],
        'Max {n} tickets per day.': ['អតិបរមា {n} សំបុត្រក្នុងមួយថ្ងៃ។', '每天最多 {n} 张奖券。'],
        'Starts {d}': ['ចាប់ផ្តើម {d}', '{d} 开始'],
        'Drawn on {d}': ['ចាប់រង្វាន់នៅ {d}', '{d} 开奖'],
        'Draw {d}': ['ចាប់រង្វាន់ {d}', '{d} 开奖'],
        'Your {n} ticket was entered in the draw. Keep playing for the next Lucky Draw!': ['សំបុត្រ {n} របស់អ្នកបានចូលរួមការចាប់រង្វាន់។ បន្តលេងសម្រាប់ការចាប់រង្វាន់លើកក្រោយ!', '你的 {n} 张奖券已参与抽奖。继续玩，参加下一期幸运抽奖吧！'],
        'Your {n} tickets were entered in the draw. Keep playing for the next Lucky Draw!': ['សំបុត្រ {n} របស់អ្នកបានចូលរួមការចាប់រង្វាន់។ បន្តលេងសម្រាប់ការចាប់រង្វាន់លើកក្រោយ!', '你的 {n} 张奖券已参与抽奖。继续玩，参加下一期幸运抽奖吧！'],
        'Tickets are earned from quizzes played between {a} and {b}.': ['សំបុត្រទទួលបានពីកម្រងសំណួរដែលលេងចន្លោះ {a} និង {b}។', '奖券来自 {a} 至 {b} 期间完成的测验。'],
        '{a} of {b} games': ['{a} / {b} ហ្គេម', '{a} / {b} 局'],
        '🔥 {n} in a row · +{p}': ['🔥 ត្រូវ {n} ជាប់គ្នា · +{p}', '🔥 连对 {n} 题 · +{p}'],
        '+{p} points': ['+{p} ពិន្ទុ', '+{p} 积分'],
        '+{n} Lucky Draw ticket': ['+{n} សំបុត្រចាប់រង្វាន់', '+{n} 张幸运抽奖券'],
        '+{n} Lucky Draw tickets': ['+{n} សំបុត្រចាប់រង្វាន់', '+{n} 张幸运抽奖券'],
        '{n} coins': ['{n} កាក់', '{n} 金币']
    };

    function current() {
        var c; try { c = localStorage.getItem(KEY); } catch (e) {}
        return LANGS.filter(function (l) { return l.code === c; })[0] || LANGS[0];
    }
    function setLang(code) { try { localStorage.setItem(KEY, code); } catch (e) {} }
    function flagUrl(l) { return 'https://flagcdn.com/w80/' + l.flag + '.png'; }

    var lang = current(), idx = LANGS.indexOf(lang) - 1;

    // Translate one trimmed string; null when there is nothing to change
    function word(key) {
        if (idx < 0 || !key) return null;
        if (T.hasOwnProperty(key)) return T[key][idx];
        for (var i = 0; i < PATTERNS.length; i++) {
            var p = PATTERNS[i], m = key.match(p[0]);
            if (!m) continue;
            var o = p[2] || {};
            var g1 = o.t1 ? (word(m[1]) || m[1]) : m[1], g2 = o.t2 ? (word(m[2]) || m[2]) : (m[2] || '');
            var mi = MONTHS_EN.indexOf(m[1]);
            return p[1][idx].replace('{1}', g1).replace('{2}', g2).replace('{m}', MONTHS_KM[mi] || '').replace('{n}', mi + 1);
        }
        // "Wireless Earbuds · 2nd Prize", "2nd Prize · 2 winners"
        if (key.indexOf(' · ') > 0) {
            var changed = false;
            var parts = key.split(' · ').map(function (s) { var w = word(s); if (w) changed = true; return w || s; });
            return changed ? parts.join(' · ') : null;
        }
        return null;
    }
    function tr(text) {
        var key = text.trim(), w = word(key);
        return w === null ? null : text.replace(key, w);
    }
    function t(s) { return word(s) || s; }
    // f('Starts {d}', { d: '1 Oct' }) -> translated sentence with the values filled in
    function f(tpl, vars) {
        var out = idx >= 0 && F[tpl] ? F[tpl][idx] : tpl;
        Object.keys(vars || {}).forEach(function (k) { out = out.split('{' + k + '}').join(vars[k]); });
        return out;
    }
    // Dates: en "3 Nov 2026, 15:00" · km "3 វិច្ឆិកា 2026, 15:00" · zh "2026年11月3日 15:00"
    function date(d, o) {
        o = o || {};
        var day = d.getDate(), mon = d.getMonth(), yr = d.getFullYear();
        var time = o.time ? String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') : '';
        if (lang.code === 'zh') return (o.noYear ? '' : yr + '年') + (mon + 1) + '月' + day + '日' + (time ? ' ' + time : '');
        var m = lang.code === 'km' ? MONTHS_KM[mon] : MONTHS_EN[mon].slice(0, 3);
        return day + ' ' + m + (o.noYear ? '' : ' ' + yr) + (time ? ', ' + time : '');
    }

    var ATTRS = ['placeholder', 'aria-label', 'title'];
    function walk(root) {
        if (idx < 0 || !root) return;
        if (root.nodeType === 3) {
            var p0 = root.parentNode && root.parentNode.nodeName;
            if (p0 === 'SCRIPT' || p0 === 'STYLE') return;
            var v = tr(root.nodeValue); if (v !== null && v !== root.nodeValue) root.nodeValue = v;
            return;
        }
        if (root.nodeType !== 1 || root.nodeName === 'SCRIPT' || root.nodeName === 'STYLE') return;
        var it = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, out = [];
        while ((n = it.nextNode())) {
            var p = n.parentNode && n.parentNode.nodeName;
            if (p === 'SCRIPT' || p === 'STYLE') continue;
            var x = tr(n.nodeValue);
            if (x !== null && x !== n.nodeValue) out.push([n, x]);
        }
        out.forEach(function (x) { x[0].nodeValue = x[1]; });
        [root].concat(Array.prototype.slice.call(root.querySelectorAll('*'))).forEach(function (el) {
            ATTRS.forEach(function (a) { var v = el.getAttribute(a); if (v) { var w = word(v.trim()); if (w) el.setAttribute(a, w); } });
            if (el.tagName === 'INPUT' && (el.type === 'submit' || el.type === 'button')) { var w = word(el.value.trim()); if (w) el.value = w; }
        });
    }

    document.documentElement.lang = lang.code;
    document.addEventListener('DOMContentLoaded', function () {
        walk(document.body);
        if (idx < 0) return;
        // Content rendered later (search, Lucky Draw, VS screen, popups, result)
        new MutationObserver(function (muts) {
            muts.forEach(function (m) {
                if (m.type === 'characterData') walk(m.target);
                else if (m.type === 'attributes') { var w = word((m.target.getAttribute(m.attributeName) || '').trim()); if (w) m.target.setAttribute(m.attributeName, w); }
                else m.addedNodes.forEach(walk);
            });
        }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
    });

    window.QP_I18N = { LANGS: LANGS, current: current, setLang: setLang, flagUrl: flagUrl, t: t, f: f, date: date };
})();
