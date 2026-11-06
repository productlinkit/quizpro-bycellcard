/*
 * Demo question bank (prototype only): True/False statements.
 * s = [English, Khmer, Chinese]; a = true when the statement is correct.
 * img = a real photo shown with the question (Wikimedia Commons, picked to match the subject).
 * Grouped by topic only to keep this file tidy; every round draws from all of them.
 */
window.QP_QUESTIONS = {
    // World Map & Flags
    31: [
        { s: ['Phnom Penh is the capital of Cambodia.', 'ភ្នំពេញ គឺជារាជធានីនៃប្រទេសកម្ពុជា។', '金边是柬埔寨的首都。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Phnom_Penh_skyline_from_TK_district_Dec_2024.jpg/500px-Phnom_Penh_skyline_from_TK_district_Dec_2024.jpg' },
        { s: ['Angkor Wat is located in Thailand.', 'ប្រាសាទអង្គរវត្តស្ថិតនៅក្នុងប្រទេសថៃ។', '吴哥窟位于泰国。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Angkor_Wat.jpg/500px-Angkor_Wat.jpg' },
        { s: ['The Mekong River flows through Phnom Penh.', 'ទន្លេមេគង្គហូរកាត់រាជធានីភ្នំពេញ។', '湄公河流经金边。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mekong-River-Near-Luang-Prabang.jpg/500px-Mekong-River-Near-Luang-Prabang.jpg' },
        { s: ['The Atlantic is the largest ocean in the world.', 'មហាសមុទ្រអាត្លង់ទិក ធំជាងគេបំផុតក្នុងពិភពលោក។', '大西洋是世界上最大的海洋。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Pacific_Ocean_as_viewed_from_GOES-18_on_September_23%2C_2023.jpg/500px-Pacific_Ocean_as_viewed_from_GOES-18_on_September_23%2C_2023.jpg' },
        { s: ['Tokyo is the capital of Japan.', 'តូក្យូ គឺជារាជធានីនៃប្រទេសជប៉ុន។', '东京是日本的首都。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/500px-Skyscrapers_of_Shinjuku_2009_January.jpg' },
        { s: ['There are five continents in the world.', 'ពិភពលោកមានទ្វីបប្រាំ។', '世界上有五大洲。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Meteosat-12-fci-march-equinox-2025-noon.jpg/500px-Meteosat-12-fci-march-equinox-2025-noon.jpg' }
    ],
    // Science
    25: [
        { s: ['Plants absorb carbon dioxide from the air.', 'រុក្ខជាតិស្រូបយកឧស្ម័នកាបូនឌីអុកស៊ីតពីខ្យល់។', '植物从空气中吸收二氧化碳。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Lisc_lipy.jpg/500px-Lisc_lipy.jpg' },
        { s: ['Water boils at 100°C at sea level.', 'ទឹកពុះនៅសីតុណ្ហភាព 100°C នៅកម្រិតនីវ៉ូទឹកសមុទ្រ។', '在海平面，水的沸点是100°C。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Boilingkettle.jpg/500px-Boilingkettle.jpg' },
        { s: ['Sound travels faster than light.', 'សំឡេងធ្វើដំណើរលឿនជាងពន្លឺ។', '声音的传播速度比光快。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Port_and_lighthouse_overnight_storm_with_lightning_in_Port-la-Nouvelle.jpg/500px-Port_and_lighthouse_overnight_storm_with_lightning_in_Port-la-Nouvelle.jpg' },
        { s: ['Mars is known as the Red Planet.', 'ភពអង្គារត្រូវបានគេហៅថាភពក្រហម។', '火星被称为红色星球。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png/500px-Mars_-_August_30_2021_-_Flickr_-_Kevin_M._Gill.png' },
        { s: ['H₂O is the chemical formula for salt.', 'H₂O គឺជារូបមន្តគីមីរបស់អំបិល។', 'H₂O是盐的化学式。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Rock_salt_%28halitite%29_%28Billianwala_Salt_Member%2C_Salt_Range_Formation%2C_Ediacaran_to_Lower_Cambrian%3B_Khewra_Salt_Mine%2C_Salt_Range%2C_Pakistan%29_14.jpg/500px-Rock_salt_%28halitite%29_%28Billianwala_Salt_Member%2C_Salt_Range_Formation%2C_Ediacaran_to_Lower_Cambrian%3B_Khewra_Salt_Mine%2C_Salt_Range%2C_Pakistan%29_14.jpg' },
        { s: ['An adult human body has 106 bones.', 'រាងកាយមនុស្សពេញវ័យមានឆ្អឹង 106។', '成年人身体有106块骨头。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Human-Skeleton.jpg/500px-Human-Skeleton.jpg' }
    ],
    // Maths: a stock photo doesn't illustrate an equation, so those have no img
    29: [
        { s: '7 × 8 = 56', a: true },
        { s: '15 + 27 = 32', a: false },
        { s: '100 ÷ 4 = 25', a: true },
        { s: ['A triangle has four sides.', 'ត្រីកោណមានជ្រុងបួន។', '三角形有四条边。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Give_way_outdoor.jpg/500px-Give_way_outdoor.jpg' },
        { s: '9² = 81', a: true },
        { s: ['15 is an even number.', '15 គឺជាចំនួនគូ។', '15是偶数。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Abacus_%28PSF%29.png/500px-Abacus_%28PSF%29.png' }
    ],
    // Sports
    1: [
        { s: ['A football team has 11 players on the field.', 'ក្រុមបាល់ទាត់មានកីឡាករ 11 នាក់នៅលើទីលាន។', '一支足球队在场上有11名球员。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Football_in_Bloomington%2C_Indiana%2C_1995.jpg/500px-Football_in_Bloomington%2C_Indiana%2C_1995.jpg' },
        { s: ['In tennis, a score of zero is called "love".', 'ក្នុងកីឡាតេនីស ពិន្ទុសូន្យហៅថា "love"។', '在网球中，零分被称为"love"。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/2013_Australian_Open_-_Guillaume_Rufin.jpg/500px-2013_Australian_Open_-_Guillaume_Rufin.jpg' },
        { s: ['A marathon is shorter than 30 km.', 'ការរត់ម៉ារ៉ាតុងខ្លីជាង 30 គីឡូម៉ែត្រ។', '马拉松全程不到30公里。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/BSK_CSOB_MARATON046_%2833791445325%29.jpg/500px-BSK_CSOB_MARATON046_%2833791445325%29.jpg' },
        { s: ['Bokator is a martial art from Cambodia.', 'ល្បុក្កតោ គឺជាក្បាច់គុនមកពីប្រទេសកម្ពុជា។', '博卡托是起源于柬埔寨的武术。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Angkor_Wat_bas-reliefs_%289729596514%29_%28cropped%29.jpg/500px-Angkor_Wat_bas-reliefs_%289729596514%29_%28cropped%29.jpg' },
        { s: ['The Olympic flag has six rings.', 'ទង់អូឡាំពិកមានរង្វង់ប្រាំមួយ។', '奥运会旗上有六个环。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Olympic_rings_without_rims.svg/500px-Olympic_rings_without_rims.svg.png' },
        { s: ['Cambodia hosted the 2023 SEA Games.', 'កម្ពុជាជាម្ចាស់ផ្ទះស៊ីហ្គេមឆ្នាំ 2023។', '柬埔寨主办了2023年东南亚运动会。'], a: true }
    ],
    // Animal
    32: [
        { s: ['A whale is a mammal.', 'ត្រីបាឡែនជាថនិកសត្វ។', '鲸鱼是哺乳动物。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Southern_right_whale.jpg/500px-Southern_right_whale.jpg' },
        { s: ['Spiders have six legs.', 'សត្វពីងពាងមានជើងប្រាំមួយ។', '蜘蛛有六条腿。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Araneus_diadematus_%28Clerck%2C_1757%29.JPG/500px-Araneus_diadematus_%28Clerck%2C_1757%29.JPG' },
        { s: ['Penguins can fly.', 'សត្វភេនឃ្វីនអាចហើរបាន។', '企鹅会飞。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg/500px-South_Shetland-2016-Deception_Island%E2%80%93Chinstrap_penguin_%28Pygoscelis_antarctica%29_04.jpg' },
        { s: ['Honey is made by bees.', 'ទឹកឃ្មុំត្រូវបានផលិតដោយឃ្មុំ។', '蜂蜜是由蜜蜂酿造的。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/The_Lone_Pollinator.jpg/500px-The_Lone_Pollinator.jpg' },
        { s: ['The elephant is the largest land animal.', 'ដំរីជាសត្វលើគោកធំជាងគេ។', '大象是陆地上最大的动物。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/500px-African_Bush_Elephant.jpg' },
        { s: ['A crocodile is a mammal.', 'ក្រពើជាថនិកសត្វ។', '鳄鱼是哺乳动物。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Nile_crocodile_head.jpg/500px-Nile_crocodile_head.jpg' }
    ],
    // Food
    33: [
        { s: ['Amok is a famous Cambodian dish.', 'អាម៉ុក ជាម្ហូបល្បីរបស់កម្ពុជា។', '阿莫克鱼（Amok）是柬埔寨的名菜。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fish_Amok_with_Rice.jpg/500px-Fish_Amok_with_Rice.jpg' },
        { s: ['Sushi originally comes from Italy.', 'ស៊ូស៊ីមានប្រភពដើមមកពីប្រទេសអ៊ីតាលី។', '寿司起源于意大利。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/500px-Sushi_platter.jpg' },
        { s: ['Durian is known as the "King of Fruits".', 'ធូរេនត្រូវបានគេហៅថា "ស្តេចផ្លែឈើ"។', '榴莲被称为“水果之王”。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Durian_in_black.jpg/500px-Durian_in_black.jpg' },
        { s: ['Kampot is famous for its pepper.', 'ខេត្តកំពតល្បីល្បាញដោយម្រេច។', '贡布以胡椒闻名。'], a: true, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Poivre_kampot01.jpg/500px-Poivre_kampot01.jpg' },
        { s: ['A tomato grows underground.', 'ប៉េងប៉ោះដុះនៅក្រោមដី។', '番茄长在地下。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/500px-Tomato_je.jpg' },
        { s: ['Pizza comes from Japan.', 'ភីហ្សាមានប្រភពមកពីប្រទេសជប៉ុន។', '披萨起源于日本。'], a: false, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/500px-Pizza-3007395.jpg' }
    ]
};
