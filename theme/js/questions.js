/*
 * Demo question bank (prototype only): True/False statements.
 * s = [English, Khmer, Chinese]; a = true when the statement is correct.
 * Categories not listed here show as "Coming soon".
 */
window.QP_QUESTIONS = {
    // World Map & Flags
    31: [
        { s: ['Phnom Penh is the capital of Cambodia.', 'ភ្នំពេញ គឺជារាជធានីនៃប្រទេសកម្ពុជា។', '金边是柬埔寨的首都。'], a: true },
        { s: ['Angkor Wat is located in Thailand.', 'ប្រាសាទអង្គរវត្តស្ថិតនៅក្នុងប្រទេសថៃ។', '吴哥窟位于泰国。'], a: false },
        { s: ['The Mekong River flows through Phnom Penh.', 'ទន្លេមេគង្គហូរកាត់រាជធានីភ្នំពេញ។', '湄公河流经金边。'], a: true },
        { s: ['The Atlantic is the largest ocean in the world.', 'មហាសមុទ្រអាត្លង់ទិក ធំជាងគេបំផុតក្នុងពិភពលោក។', '大西洋是世界上最大的海洋。'], a: false },
        { s: ['Tokyo is the capital of Japan.', 'តូក្យូ គឺជារាជធានីនៃប្រទេសជប៉ុន។', '东京是日本的首都。'], a: true },
        { s: ['There are five continents in the world.', 'ពិភពលោកមានទ្វីបប្រាំ។', '世界上有五大洲。'], a: false }
    ],
    // Science
    25: [
        { s: ['Plants absorb carbon dioxide from the air.', 'រុក្ខជាតិស្រូបយកឧស្ម័នកាបូនឌីអុកស៊ីតពីខ្យល់។', '植物从空气中吸收二氧化碳。'], a: true },
        { s: ['Water boils at 100°C at sea level.', 'ទឹកពុះនៅសីតុណ្ហភាព 100°C នៅកម្រិតនីវ៉ូទឹកសមុទ្រ។', '在海平面，水的沸点是100°C。'], a: true },
        { s: ['Sound travels faster than light.', 'សំឡេងធ្វើដំណើរលឿនជាងពន្លឺ។', '声音的传播速度比光快。'], a: false },
        { s: ['Mars is known as the Red Planet.', 'ភពអង្គារត្រូវបានគេហៅថាភពក្រហម។', '火星被称为红色星球。'], a: true },
        { s: ['H₂O is the chemical formula for salt.', 'H₂O គឺជារូបមន្តគីមីរបស់អំបិល។', 'H₂O是盐的化学式。'], a: false },
        { s: ['An adult human body has 106 bones.', 'រាងកាយមនុស្សពេញវ័យមានឆ្អឹង 106។', '成年人身体有106块骨头。'], a: false }
    ],
    // Maths
    29: [
        { s: '7 × 8 = 56', a: true },
        { s: '15 + 27 = 32', a: false },
        { s: '100 ÷ 4 = 25', a: true },
        { s: ['A triangle has four sides.', 'ត្រីកោណមានជ្រុងបួន។', '三角形有四条边。'], a: false },
        { s: '9² = 81', a: true },
        { s: ['15 is an even number.', '15 គឺជាចំនួនគូ។', '15是偶数。'], a: false }
    ],
    // Sports
    1: [
        { s: ['A football team has 11 players on the field.', 'ក្រុមបាល់ទាត់មានកីឡាករ 11 នាក់នៅលើទីលាន។', '一支足球队在场上有11名球员。'], a: true },
        { s: ['In tennis, a score of zero is called "love".', 'ក្នុងកីឡាតេនីស ពិន្ទុសូន្យហៅថា "love"។', '在网球中，零分被称为"love"。'], a: true },
        { s: ['A marathon is shorter than 30 km.', 'ការរត់ម៉ារ៉ាតុងខ្លីជាង 30 គីឡូម៉ែត្រ។', '马拉松全程不到30公里。'], a: false },
        { s: ['Bokator is a martial art from Cambodia.', 'ល្បុក្កតោ គឺជាក្បាច់គុនមកពីប្រទេសកម្ពុជា។', '博卡托是起源于柬埔寨的武术。'], a: true },
        { s: ['The Olympic flag has six rings.', 'ទង់អូឡាំពិកមានរង្វង់ប្រាំមួយ។', '奥运会旗上有六个环。'], a: false },
        { s: ['Cambodia hosted the 2023 SEA Games.', 'កម្ពុជាជាម្ចាស់ផ្ទះស៊ីហ្គេមឆ្នាំ 2023។', '柬埔寨主办了2023年东南亚运动会。'], a: true }
    ],
    // Animal
    32: [
        { s: ['A whale is a mammal.', 'ត្រីបាឡែនជាថនិកសត្វ។', '鲸鱼是哺乳动物。'], a: true },
        { s: ['Spiders have six legs.', 'សត្វពីងពាងមានជើងប្រាំមួយ។', '蜘蛛有六条腿。'], a: false },
        { s: ['Penguins can fly.', 'សត្វភេនឃ្វីនអាចហើរបាន។', '企鹅会飞。'], a: false },
        { s: ['Honey is made by bees.', 'ទឹកឃ្មុំត្រូវបានផលិតដោយឃ្មុំ។', '蜂蜜是由蜜蜂酿造的。'], a: true },
        { s: ['The elephant is the largest land animal.', 'ដំរីជាសត្វលើគោកធំជាងគេ។', '大象是陆地上最大的动物。'], a: true },
        { s: ['A crocodile is a mammal.', 'ក្រពើជាថនិកសត្វ។', '鳄鱼是哺乳动物。'], a: false }
    ],
    // Food
    33: [
        { s: ['Amok is a famous Cambodian dish.', 'អាម៉ុក ជាម្ហូបល្បីរបស់កម្ពុជា។', '阿莫克鱼（Amok）是柬埔寨的名菜。'], a: true },
        { s: ['Sushi originally comes from Italy.', 'ស៊ូស៊ីមានប្រភពដើមមកពីប្រទេសអ៊ីតាលី។', '寿司起源于意大利。'], a: false },
        { s: ['Durian is known as the "King of Fruits".', 'ធូរេនត្រូវបានគេហៅថា "ស្តេចផ្លែឈើ"។', '榴莲被称为“水果之王”。'], a: true },
        { s: ['Kampot is famous for its pepper.', 'ខេត្តកំពតល្បីល្បាញដោយម្រេច។', '贡布以胡椒闻名。'], a: true },
        { s: ['A tomato grows underground.', 'ប៉េងប៉ោះដុះនៅក្រោមដី។', '番茄长在地下。'], a: false },
        { s: ['Pizza comes from Japan.', 'ភីហ្សាមានប្រភពមកពីប្រទេសជប៉ុន។', '披萨起源于日本。'], a: false }
    ]
};
