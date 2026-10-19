/*
 * Demo question bank (prototype only): multiple choice, 4 answers each.
 * Each text is [English, Khmer, Chinese]; a plain string is the same in every language.
 * a = index of the correct answer. Categories not listed here show as "Coming soon".
 */
window.QP_QUESTIONS = {
    // World Map & Flags
    31: [
        { q: ['What is the capital of Cambodia?', 'តើរាជធានីនៃប្រទេសកម្ពុជាគឺជាអ្វី?', '柬埔寨的首都是哪里？'],
          o: [['Phnom Penh', 'ភ្នំពេញ', '金边'], ['Siem Reap', 'សៀមរាប', '暹粒'], ['Battambang', 'បាត់ដំបង', '马德望'], ['Kampot', 'កំពត', '贡布']], a: 0 },
        { q: ['Which country is home to Angkor Wat?', 'ប្រាសាទអង្គរវត្តស្ថិតនៅក្នុងប្រទេសណា?', '吴哥窟位于哪个国家？'],
          o: [['Thailand', 'ថៃ', '泰国'], ['Cambodia', 'កម្ពុជា', '柬埔寨'], ['Vietnam', 'វៀតណាម', '越南'], ['Laos', 'ឡាវ', '老挝']], a: 1 },
        { q: ['What is the capital of Japan?', 'តើរាជធានីនៃប្រទេសជប៉ុនគឺជាអ្វី?', '日本的首都是哪里？'],
          o: [['Seoul', 'សេអ៊ូល', '首尔'], ['Beijing', 'ប៉េកាំង', '北京'], ['Tokyo', 'តូក្យូ', '东京'], ['Bangkok', 'បាងកក', '曼谷']], a: 2 },
        { q: ['Which river flows through Phnom Penh?', 'តើទន្លេណាហូរកាត់រាជធានីភ្នំពេញ?', '哪条河流经金边？'],
          o: [['Mekong', 'មេគង្គ', '湄公河'], ['Nile', 'នីល', '尼罗河'], ['Amazon', 'អាម៉ាហ្សូន', '亚马孙河'], ['Danube', 'ដានូប', '多瑙河']], a: 0 },
        { q: ['Which is the largest ocean in the world?', 'តើមហាសមុទ្រណាធំជាងគេក្នុងពិភពលោក?', '世界上最大的海洋是哪个？'],
          o: [['Atlantic', 'អាត្លង់ទិក', '大西洋'], ['Indian', 'ឥណ្ឌា', '印度洋'], ['Arctic', 'អាកទិក', '北冰洋'], ['Pacific', 'ប៉ាស៊ីហ្វិក', '太平洋']], a: 3 },
        { q: ['How many continents are there?', 'តើពិភពលោកមានទ្វីបប៉ុន្មាន?', '世界上有几个大洲？'],
          o: ['5', '6', '7', '8'], a: 2 }
    ],
    // Science
    25: [
        { q: ['Which gas do plants absorb from the air?', 'តើរុក្ខជាតិស្រូបយកឧស្ម័នអ្វីពីខ្យល់?', '植物从空气中吸收哪种气体？'],
          o: [['Oxygen', 'អុកស៊ីសែន', '氧气'], ['Carbon dioxide', 'កាបូនឌីអុកស៊ីត', '二氧化碳'], ['Nitrogen', 'អាសូត', '氮气'], ['Helium', 'អេលីយ៉ូម', '氦气']], a: 1 },
        { q: ['At what temperature does water boil at sea level?', 'តើទឹកពុះនៅសីតុណ្ហភាពប៉ុន្មាន នៅកម្រិតនីវ៉ូទឹកសមុទ្រ?', '在海平面，水在多少度沸腾？'],
          o: ['50°C', '90°C', '100°C', '120°C'], a: 2 },
        { q: ['Which planet is known as the Red Planet?', 'តើភពណាដែលគេហៅថាភពក្រហម?', '哪颗行星被称为红色星球？'],
          o: [['Venus', 'ភពសុក្រ', '金星'], ['Mars', 'ភពអង្គារ', '火星'], ['Jupiter', 'ភពព្រហស្បតិ៍', '木星'], ['Saturn', 'ភពសៅរ៍', '土星']], a: 1 },
        { q: ['What is H₂O?', 'តើ H₂O គឺជាអ្វី?', 'H₂O 是什么？'],
          o: [['Salt', 'អំបិល', '盐'], ['Water', 'ទឹក', '水'], ['Sugar', 'ស្ករ', '糖'], ['Air', 'ខ្យល់', '空气']], a: 1 },
        { q: ['Which of these travels the fastest?', 'តើមួយណាធ្វើដំណើរលឿនជាងគេ?', '以下哪一个传播得最快？'],
          o: [['Sound', 'សំឡេង', '声音'], ['Light', 'ពន្លឺ', '光'], ['A car', 'រថយន្ត', '汽车'], ['A plane', 'យន្តហោះ', '飞机']], a: 1 },
        { q: ['How many bones are in an adult human body?', 'តើរាងកាយមនុស្សពេញវ័យមានឆ្អឹងប៉ុន្មាន?', '成年人身体有多少块骨头？'],
          o: ['106', '156', '206', '306'], a: 2 }
    ],
    // Maths
    29: [
        { q: ['7 × 8 = ?', '7 × 8 = ?', '7 × 8 = ?'], o: ['54', '56', '58', '64'], a: 1 },
        { q: ['15 + 27 = ?', '15 + 27 = ?', '15 + 27 = ?'], o: ['32', '42', '43', '52'], a: 1 },
        { q: ['100 ÷ 4 = ?', '100 ÷ 4 = ?', '100 ÷ 4 = ?'], o: ['20', '25', '30', '40'], a: 1 },
        { q: ['How many sides does a triangle have?', 'តើត្រីកោណមានជ្រុងប៉ុន្មាន?', '三角形有几条边？'], o: ['2', '3', '4', '5'], a: 1 },
        { q: ['What is 9²?', 'តើ 9² ស្មើនឹងប៉ុន្មាន?', '9² 等于多少？'], o: ['18', '72', '81', '99'], a: 2 },
        { q: ['Which number is even?', 'តើលេខណាជាចំនួនគូ?', '哪个是偶数？'], o: ['7', '13', '21', '24'], a: 3 }
    ],
    // Sports
    1: [
        { q: ['How many players does a football team have on the field?', 'តើក្រុមបាល់ទាត់មានកីឡាករប៉ុន្មាននាក់នៅលើទីលាន?', '一支足球队在场上有几名球员？'],
          o: ['9', '10', '11', '12'], a: 2 },
        { q: ['In tennis, what is a score of zero called?', 'ក្នុងកីឡាតេនីស តើពិន្ទុសូន្យហៅថាអ្វី?', '在网球中，零分叫什么？'],
          o: ['Love', 'Nil', 'Zero', 'Duck'], a: 0 },
        { q: ['How long is a marathon?', 'តើការរត់ម៉ារ៉ាតុងមានចម្ងាយប៉ុន្មាន?', '马拉松全程有多长？'],
          o: ['21 km', '30 km', '42 km', '50 km'], a: 2 },
        { q: ['Which martial art comes from Cambodia?', 'តើក្បាច់គុនណាមានប្រភពពីកម្ពុជា?', '哪种武术起源于柬埔寨？'],
          o: [['Bokator', 'ល្បុក្កតោ', '博卡托'], ['Karate', 'ការ៉ាតេ', '空手道'], ['Judo', 'យូដូ', '柔道'], ['Taekwondo', 'តេក្វាន់ដូ', '跆拳道']], a: 0 },
        { q: ['How many rings are on the Olympic flag?', 'តើទង់អូឡាំពិកមានរង្វង់ប៉ុន្មាន?', '奥运会旗上有几个环？'],
          o: ['3', '4', '5', '6'], a: 2 },
        { q: ['Which country hosted the 2023 SEA Games?', 'តើប្រទេសណាជាម្ចាស់ផ្ទះស៊ីហ្គេមឆ្នាំ 2023?', '哪个国家主办了2023年东南亚运动会？'],
          o: [['Thailand', 'ថៃ', '泰国'], ['Vietnam', 'វៀតណាម', '越南'], ['Cambodia', 'កម្ពុជា', '柬埔寨'], ['Malaysia', 'ម៉ាឡេស៊ី', '马来西亚']], a: 2 }
    ],
    // Animal
    32: [
        { q: ['Which animal is a mammal?', 'តើសត្វណាជាថនិកសត្វ?', '以下哪种动物是哺乳动物？'],
          o: [['Shark', 'ត្រីឆ្លាម', '鲨鱼'], ['Whale', 'ត្រីបាឡែន', '鲸鱼'], ['Crocodile', 'ក្រពើ', '鳄鱼'], ['Salmon', 'ត្រីសាលម៉ុន', '三文鱼']], a: 1 },
        { q: ['How many legs does a spider have?', 'តើសត្វពីងពាងមានជើងប៉ុន្មាន?', '蜘蛛有几条腿？'], o: ['4', '6', '8', '10'], a: 2 },
        { q: ['Which bird cannot fly?', 'តើសត្វស្លាបណាដែលមិនអាចហើរបាន?', '哪种鸟不会飞？'],
          o: [['Eagle', 'ឥន្ទ្រី', '老鹰'], ['Penguin', 'ភេនឃ្វីន', '企鹅'], ['Parrot', 'សេក', '鹦鹉'], ['Owl', 'ទីទុយ', '猫头鹰']], a: 1 },
        { q: ['What do bees make?', 'តើឃ្មុំផលិតអ្វី?', '蜜蜂会产出什么？'],
          o: [['Milk', 'ទឹកដោះគោ', '牛奶'], ['Silk', 'សូត្រ', '丝绸'], ['Honey', 'ទឹកឃ្មុំ', '蜂蜜'], ['Cotton', 'កប្បាស', '棉花']], a: 2 },
        { q: ['What is the largest land animal?', 'តើសត្វលើគោកណាធំជាងគេ?', '陆地上最大的动物是什么？'],
          o: [['Lion', 'តោ', '狮子'], ['Giraffe', 'ហ្សីរ៉ាហ្វ', '长颈鹿'], ['Elephant', 'ដំរី', '大象'], ['Horse', 'សេះ', '马']], a: 2 },
        { q: ['Which animal is called the "King of the Jungle"?', 'តើសត្វណាដែលគេហៅថា "ស្តេចព្រៃ"?', '哪种动物被称为“百兽之王”？'],
          o: [['Tiger', 'ខ្លា', '老虎'], ['Lion', 'តោ', '狮子'], ['Bear', 'ខ្លាឃ្មុំ', '熊'], ['Wolf', 'ចចក', '狼']], a: 1 }
    ],
    // Food
    33: [
        { q: ['Amok is a famous dish from which country?', 'អាម៉ុក ជាម្ហូបល្បីរបស់ប្រទេសណា?', '阿莫克鱼（Amok）是哪个国家的名菜？'],
          o: [['Thailand', 'ថៃ', '泰国'], ['Cambodia', 'កម្ពុជា', '柬埔寨'], ['Japan', 'ជប៉ុន', '日本'], ['Italy', 'អ៊ីតាលី', '意大利']], a: 1 },
        { q: ['Sushi originally comes from which country?', 'ស៊ូស៊ីមានប្រភពដើមមកពីប្រទេសណា?', '寿司起源于哪个国家？'],
          o: [['China', 'ចិន', '中国'], ['Korea', 'កូរ៉េ', '韩国'], ['Japan', 'ជប៉ុន', '日本'], ['Vietnam', 'វៀតណាម', '越南']], a: 2 },
        { q: ['Which fruit is known as the "King of Fruits"?', 'តើផ្លែឈើណាដែលគេហៅថា "ស្តេចផ្លែឈើ"?', '哪种水果被称为“水果之王”？'],
          o: [['Mango', 'ស្វាយ', '芒果'], ['Durian', 'ធូរេន', '榴莲'], ['Banana', 'ចេក', '香蕉'], ['Apple', 'ប៉ោម', '苹果']], a: 1 },
        { q: ['Kampot is famous for which spice?', 'ខេត្តកំពតល្បីល្បាញដោយគ្រឿងទេសអ្វី?', '贡布以哪种香料闻名？'],
          o: [['Pepper', 'ម្រេច', '胡椒'], ['Ginger', 'ខ្ញី', '生姜'], ['Garlic', 'ខ្ទឹមស', '大蒜'], ['Chili', 'ម្ទេស', '辣椒']], a: 0 },
        { q: ['Which vegetable makes people cry when cut?', 'តើបន្លែណាដែលធ្វើឱ្យមនុស្សស្រក់ទឹកភ្នែកពេលកាត់?', '切哪种蔬菜会让人流眼泪？'],
          o: [['Carrot', 'ការ៉ុត', '胡萝卜'], ['Onion', 'ខ្ទឹមបារាំង', '洋葱'], ['Cabbage', 'ស្ពៃក្តោប', '卷心菜'], ['Potato', 'ដំឡូងបារាំង', '土豆']], a: 1 },
        { q: ['Pizza comes from which country?', 'ភីហ្សាមានប្រភពមកពីប្រទេសណា?', '披萨起源于哪个国家？'],
          o: [['France', 'បារាំង', '法国'], ['Italy', 'អ៊ីតាលី', '意大利'], ['Spain', 'អេស្ប៉ាញ', '西班牙'], ['Greece', 'ក្រិក', '希腊']], a: 1 }
    ]
};
