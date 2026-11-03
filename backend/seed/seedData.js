const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');

const localEnv = path.resolve(__dirname, '../.env');
const rootEnv = path.resolve(__dirname, '../../.env');
if (fs.existsSync(localEnv)) {
  require('dotenv').config({ path: localEnv });
}
if (fs.existsSync(rootEnv)) {
  require('dotenv').config({ path: rootEnv });
}
require('dotenv').config();

const products = [
  {
    slug: 'dxn-reishi-gano-rg-gl',
    name: 'DXN Reishi Gano (RG) & Ganocelium (GL)',
    subtitle: 'Dual Formulation (Fruit Body & Mycelium)',
    category: 'dietary-supplements',
    categoryLabel: 'Dietary Supplements',
    badge: 'Pair',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Capsules / Powder',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwxk-fdbAPOxAG0hWzJq0ZhU3wGlViK9hWjluzy7rbJch8s6hzUE7_GsJuAewsVYbJpE98WphSOepzxWkWqVURLkDds5QgWClbhXCJMjaWKAUZyB7Y51QQRjaQz9HBmJd20R19J1MAF10ucWfg7IUV5aKmfLOrRHtq_vx_YO0STieUP_3XnddsXFk03NZMmK5aT028RUdFF7TItzedozY11spcjbM9CHY16wJzZAemdu1Q21zyho0Zzw',
    secondaryImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMRO3LuTdAFelWHrVMLxxkN71U7JCNtqM3WiX9UaUKoYE0OImvcs6GYoGZ4Y3EsdCdCu9_0VGV0j-bGTRBy295hAvAsj6PqMuJtv99N04vawyxRDwXaYwF-LN3rTIh4lTHvuHw0xt82X6ayCZWayW4au-oiUjqxe8ix0jBmEAjubKN5THgZg13rfq0a6e6KYNpASOElFdo9A4d0KlXpw2n1FYjImAn7oONfCJRLdRNEhah1Yz9kHytdg',
    imageAlt: 'DXN Reishi Gano RG and Ganocelium GL dual medicinal mushroom dietary supplement bottles',
    keyIngredients: 'Ganoderma lucidum fruit body (90-day RG) & 14-day cultivated mycelium (GL).',
    ingredientsList: [
      '100% Ganoderma lucidum powder (Fruit body)',
      '100% Ganoderma lucidum mycelium powder',
      'Vegetable hypromellose capsule shell'
    ],
    shortDescription: 'A complementary dual-formulation pairing mature Ganoderma lucidum mushroom with youthful mycelium culture.',
    fullDescription: 'DXN Reishi Gano (RG) is formulated from 90-day cultivated Ganoderma lucidum red mushroom fruiting bodies, abundant in triterpenes, polysaccharides, and adenosine. DXN Ganocelium (GL) is harvested from the 14-day young mycelium culture of Ganoderma lucidum, noted for higher concentrations of organic germanium, polysaccharides, and minerals. Both are traditionally consumed together in equal proportion.',
    packSizes: ['30 capsules', '90 capsules', '360 capsules', 'Powder format'],
    companionNotes: 'Both formulations are traditionally consumed together in equal 1:1 proportion as balanced botanical companions.',
    directions: 'Take 1 to 2 pairs daily before meals with lukewarm water during initial week, or as directed by an integrative healthcare practitioner.',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    caution: 'Individuals with mushroom allergies should consult their healthcare provider before use.',
    bioactiveMarkers: [
      'Polysaccharides (Beta-glucans)',
      'Triterpenoids (Ganoderic acids)',
      'Organic Germanium (GL fraction)',
      'Adenosine',
      'Ganoderic essence'
    ],
    matrixBreakdown: {
      rgVsGl: true,
      comparisonData: [
        {
          parameter: 'Harvesting Stage',
          rgDetail: 'Mature 90-day cultivated red mushroom fruiting body.',
          glDetail: 'Tender 14-day harvested mushroom mycelium filaments.'
        },
        {
          parameter: 'Characteristic Profile',
          rgDetail: 'Rich in polysaccharides, triterpenoids, adenosine, & Ganoderic essence.',
          glDetail: 'High in organic germanium, polysaccharidal mycelial fractions, & minerals.'
        },
        {
          parameter: 'Standard Pack Sizes',
          rgDetail: '30, 90, 360 capsules or pure powder.',
          glDetail: '30, 90, 360 capsules or pure powder.'
        },
        {
          parameter: 'Capsule Shell Purity',
          rgDetail: '100% vegetarian hypromellose shell; zero synthetic binders.',
          glDetail: '100% vegetarian hypromellose shell; zero synthetic binders.'
        }
      ]
    },
    translations: {
      hi: {
        name: 'DXN ऋषि गानो (RG) और गानोसेलियम (GL)',
        subtitle: 'युग्म फॉर्मूलेशन (फल पिंड एवं कवकजाल)',
        badge: 'जोड़ी',
        shortDescription: 'परिपक्व गानोडेर्मा मशरूम और युवा कवकजाल का पूरक प्राकृतिक आहार संयोजन।',
        fullDescription: 'ऋषि गानो (RG) 90 दिवसीय परिपक्व गानोडेर्मा ल्यूसिडम लाल मशरूम से निर्मित है, जबकि गानोसेलियम (GL) 14 दिवसीय युवा कवकजाल से तैयार किया गया है।',
        keyIngredients: 'गानोडेर्मा ल्यूसिडम फल पिंड (90 दिन) एवं गानोसेलियम कवकजाल (14 दिन)।',
        directions: 'भोजन से पूर्व गुनगुने पानी के साथ प्रतिदिन 1 से 2 जोड़े लें।',
        formFactor: 'कैप्सूल / चूर्ण'
      }
    }
  },
  {
    slug: 'dxn-spirulina',
    name: 'DXN Spirulina',
    subtitle: '100% Platensis Microalgae',
    category: 'dietary-supplements',
    categoryLabel: 'Dietary Supplements',
    badge: '100% Pure',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Tablets / Capsules',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDox5vCoro-N2CeavHXTO4b9JZUx9WXCzYLIQQDxFCmMJGdffD6MV-Wn-kZ9IXqOQs2_u6h50SsUCiLpoNyq4Xj8npoe_57vsYio4OpGXIbkX6GezmW-nm-uT2FjEBEPFr09nFYJdc9FiWDnz0qxqBVv5LmRMiiZUbcGpI9AiS8M2YBkqOKwTaYfc6pejhoGoy31f_yUOoYvqHFes0Js5lIJ7Iv9U4WVz93fZdZtG7HknB19Xp5vv9B4Q',
    secondaryImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWMguhFTWkPctUimGMHHazf6d6LYWKeuvl0zdu2kiXz09NFzfjs4822sAfOvSRWAwPyKy6rNZy3heGlBXWLE2R_mQurLmbCmBXdE-FhDAZEIT64DZGYTa6EbMFg3R_ELtdkm6I0QUgraclzHt-EnzEB1eKEjkjc_loovvmvfnkwVGZdH6gFgopF6h__V4sPkhB4RdE6bIU6GXr9C9QuKzT2M3VKadxluEFJ_lqZhHt8MXKOmdsCXpaZw',
    imageAlt: 'DXN Spirulina tablets bottle with emerald green blue-green algae motifs',
    keyIngredients: '100% pure Spirulina platensis microalgae rich in phycocyanin, proteins, & plant chlorophyll.',
    ingredientsList: [
      '100% Spirulina platensis powder',
      'No artificial binders or chemical solvents'
    ],
    shortDescription: 'Pure cultured blue-green microalgae containing complete vegetable proteins, bioavailable iron, and phycocyanin.',
    fullDescription: 'DXN Spirulina is naturally cultivated in clean alkaline water ponds under constant laboratory monitoring. Spirulina is recognized for containing 60-70% plant protein by weight, rich chlorophyll, beta-carotene, phycocyanin, and essential trace minerals.',
    packSizes: ['120 tablets', '360 tablets', '500 tablets', 'Cereal mix'],
    companionNotes: 'Can be combined with RG & GL or taken as an independent botanical food supplement.',
    directions: 'Take 4 to 6 tablets daily with water before or after meals, or as advised by a nutritionist.',
    storage: 'Keep container tightly closed in a cool and dry environment.',
    caution: 'Keep out of reach of children. Consult your doctor if pregnant or on blood thinners.',
    bioactiveMarkers: [
      'Phycocyanin (Active blue pigment)',
      'Plant Chlorophyll A',
      'Bioavailable Iron & Zinc',
      'Gamma-linolenic acid (GLA)',
      'Beta-carotene'
    ],
    matrixBreakdown: {
      rgVsGl: false,
      comparisonData: []
    },
    translations: {
      hi: {
        name: 'DXN स्पिरुलिना',
        subtitle: '100% शुद्ध प्लैटेंसिस शैवाल',
        badge: '100% शुद्ध',
        shortDescription: 'नील-हरित क्षारीय शैवाल से समृद्ध पौष्टिक प्राकृतिक आहार पूरक।',
        fullDescription: 'DXN स्पिरुलिना में 60-70% प्राकृतिक वनस्पति प्रोटीन, क्लोरोफिल, फाइकोसायनिन एवं आवश्यक सूक्ष्म पोषक तत्व प्रचुर मात्रा में उपलब्ध हैं।',
        keyIngredients: '100% शुद्ध स्पिरुलिना प्लैटेंसिस सूक्ष्म शैवाल।',
        directions: 'प्रतिदिन 4 से 6 गोलियां पर्याप्त पानी के साथ लें।',
        formFactor: 'गोलियां / कैप्सूल'
      }
    }
  },
  {
    slug: 'dxn-lingzhi-coffee-2in1',
    name: 'DXN Lingzhi Coffee 2-in-1',
    subtitle: 'Classic Black Ganoderma Coffee',
    category: 'beverages',
    categoryLabel: 'Beverages',
    badge: 'Sugar-Free',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Sachets (Single-serve)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApZwTtlg4APyJz-cpRwYLU7qD8-ccoOeZq4KJbatGtOir4F-052BvLTC0rfbn8_ov9OI3pALbG0nAAeRMW5apmFK38qLwREpU2j7hE_CMmJoB9ecIduhifPlV6ZYPg-ZJsVFvDhQ7uYyja97C2TuBHojNwZjF45vbC-hFflzEka8nXX2frSUXX1EQvBpkNIwAeQxgHcsc_w_Ka3q-6CTpPt-wgG3LP_ACqgv1v8zxE3b0wg2JVc3fFZw',
    secondaryImageUrl: '',
    imageAlt: 'DXN Lingzhi Coffee 2-in-1 black coffee sachet with roasted coffee beans',
    keyIngredients: 'Premium Instant Coffee, Ganoderma lucidum extract. Sugar-free black coffee blend with zero preservatives.',
    ingredientsList: [
      'Selected Roasted Coffee Extract (Arabica/Robusta)',
      'Ganoderma lucidum Extract (Fruiting Body)',
      'Zero added sugars, no dairy creamer'
    ],
    shortDescription: 'Rich roasted instant coffee infused with Ganoderma lucidum extract. Contains zero added sugar.',
    fullDescription: 'DXN Lingzhi Coffee 2-in-1 is uniquely created from the finest quality coffee beans and 100% pure Ganoderma extract. It contains no sugar additives, making it ideal for coffee lovers who prefer pure black coffee with botanical wellness notes.',
    packSizes: ['20 sachets x 4.5g box', 'Pouch pack'],
    companionNotes: 'Can be consumed hot or cold. Ideal morning beverage.',
    directions: 'Empty one sachet of DXN Lingzhi Coffee 2-in-1 into a cup, add 150ml of hot water, stir well and enjoy.',
    storage: 'Store in a dry location at room temperature.',
    caution: 'Contains caffeine. Moderate intake recommended for caffeine-sensitive individuals.',
    bioactiveMarkers: [
      'Ganoderma Triterpenoids',
      'Chlorogenic Acids',
      'Natural Polyphenols',
      'Caffeine'
    ],
    matrixBreakdown: {
      rgVsGl: false,
      comparisonData: []
    },
    translations: {
      hi: {
        name: 'DXN लिंग्झी कॉफी 2-इन-1',
        subtitle: 'बिना चीनी वाली ब्लैक कॉफी',
        badge: 'शर्करा-मुक्त',
        shortDescription: 'गानोडेर्मा ल्यूसिडम अर्क से समृद्ध प्रीमियम शुगर-फ्री ब्लैक कॉफी।',
        fullDescription: 'सर्वोत्तम अरेबिका और रोबस्टा कॉफी बीन्स को गानोडेर्मा अर्क के साथ मिलाकर तैयार की गई बिना चीनी वाली ब्लैक कॉफी।',
        keyIngredients: 'प्रीमियम इंस्टेंट कॉफी पाउडर एवं गानोडेर्मा अर्क।',
        directions: '1 पाउच को 150ml गर्म पानी में मिलाकर अच्छी तरह घोलें।',
        formFactor: 'पाउच (एकल-सर्व)'
      }
    }
  },
  {
    slug: 'dxn-reishi-gano-tea',
    name: 'DXN Reishi Gano Tea',
    subtitle: 'Ganozhi Camellia Infusion',
    category: 'beverages',
    categoryLabel: 'Beverages',
    badge: 'Herbal Blend',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Tea Bags / Loose Leaves',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCy61nDBCTTgPLeUIbLoXu2WlMy8ZAdi52J8GLjjFKQHBdkCx3hka9mq8TnkHrhyu77cMw3ws_eQzrq6rWsoPUOIpkBEahVkPUHSgxg1p8ZBWU9chtuZf6hv9Oe4BZgsqyKFPp5QPntNSRK4LXMLOVM3lvOGpPRz9eJSuRzEFCydyFlNpWlc74JUTUgm4dx8j_I1jKdpsSStHSE-1_NJJvxukOYFfKLjAcqzEF-51FkrFi2mCa0pV-mzQ',
    secondaryImageUrl: '',
    imageAlt: 'DXN Reishi Gano Tea carton box beside transparent cup of amber tea',
    keyIngredients: 'High-grade Camellia sinensis tea leaves blended with Ganoderma lucidum extract.',
    ingredientsList: [
      'Selected Camellia sinensis (Black tea leaves)',
      'Ganoderma lucidum mushroom extract'
    ],
    shortDescription: 'Select fermented black tea leaves blended with beneficial Ganoderma mushroom extract.',
    fullDescription: 'DXN Reishi Gano Tea blends traditional fermented black tea leaves with potent Ganoderma lucidum extract, producing a smooth, aromatic infusion rich in natural tea theaflavins and mushroom polysaccharides.',
    packSizes: ['20 tea bags carton', 'Loose tea 250g jar'],
    companionNotes: 'Can be served hot or as iced botanical tea with lemon.',
    directions: 'Place one tea bag into a cup or teapot, pour freshly boiled water, steep for 2-3 minutes, and serve without milk or with minimal natural sweetener.',
    storage: 'Store sealed in a dry, aroma-free pantry.',
    caution: 'None under standard consumption.',
    bioactiveMarkers: [
      'Theaflavins & Thearubigins',
      'Tea Polyphenols (Catechins)',
      'Ganoderma Polysaccharides',
      'L-Theanine'
    ],
    matrixBreakdown: {
      rgVsGl: false,
      comparisonData: []
    },
    translations: {
      hi: {
        name: 'DXN ऋषि गानो चाय',
        subtitle: 'गानोडेर्मा युक्त ब्लैक टी',
        badge: 'हर्बल मिश्रण',
        shortDescription: 'उत्कृष्ट कैमेलिया साइनेसिस चाय पत्तियां एवं गानोडेर्मा अर्क का अनूठा मिश्रण।',
        fullDescription: 'पारंपरिक काली चाय की पत्तियों और गानोडेर्मा अर्क का सुगंधित एवं ताजगी देने वाला पेय।',
        keyIngredients: 'उच्च गुणवत्ता की चाय पत्ती एवं गानोडेर्मा ल्यूसिडम अर्क।',
        directions: '1 टी-बैग को उबलते पानी में 2-3 मिनट तक डुबोकर पिएं।',
        formFactor: 'टी-बैग / खुली चाय'
      }
    }
  },
  {
    slug: 'dxn-cocozhi',
    name: 'DXN Cocozhi',
    subtitle: 'Malt Cocoa & Ganocelium Beverage',
    category: 'beverages',
    categoryLabel: 'Beverages',
    badge: 'Family Favorite',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Single-serve sachets',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBViX1ORbRkTFWrVoA2uyamG_eQVgGUzHNr92077Rg76gGKJQnuuHXMHqZQsvKbzYrG7EQqwYUsgxRwSh03yTT90c0nM9pCbDhVXwEbFIYqObWmE7BGKdCa52SloVcJwfPPdEct13QIwonqylJZB5eA0JHEWpNN_Ynl9cu1LtD77YIzju2cZe5tVDoqwU8IluLR1gGlWeOQ877NSUOduM0UI9Prb6VXqDEY6x6ZwmtSxIzOnp5-SKfWQ',
    secondaryImageUrl: '',
    imageAlt: 'DXN Cocozhi cocoa drink box with cacao pods and a warm chocolate mug',
    keyIngredients: 'Natural cocoa powder, Ganocelium (GL), skimmed milk powder, and nutrient-rich malt extract.',
    ingredientsList: [
      'Natural Cocoa Powder (Theobroma cacao)',
      'Ganocelium (Ganoderma lucidum mycelium extract)',
      'Malt Extract',
      'Skimmed Milk Powder',
      'Cane sugar'
    ],
    shortDescription: 'Wholesome cocoa and malt beverage formulated with Ganocelium (GL) for the entire family.',
    fullDescription: 'DXN Cocozhi is formulated from the finest cocoa blended with Ganocelium (GL) extract. It is in ready-to-drink powder form, delivering a rich chocolate aroma and the natural wellness profile of mycelial Ganoderma.',
    packSizes: ['20 sachets x 32g pack'],
    companionNotes: 'Popular family drink. Suitable for growing children, adults, and the elderly.',
    directions: 'Pour one sachet of DXN Cocozhi into a mug of hot or warm water (150-180ml), stir well, and enjoy creamy hot chocolate.',
    storage: 'Store in a clean, cool, and dry place.',
    caution: 'Contains dairy (milk powder) and gluten (malt extract).',
    bioactiveMarkers: [
      'Cocoa Flavonoids (Flavan-3-ols)',
      'Mycelial Beta-glucans',
      'Organic Germanium (GL)',
      'Theobromine'
    ],
    matrixBreakdown: {
      rgVsGl: false,
      comparisonData: []
    },
    translations: {
      hi: {
        name: 'DXN कोकोझी',
        subtitle: 'माल्ट कोको एवं गानोसेलियम पेय',
        badge: 'पारिवारिक पेय',
        shortDescription: 'स्वादिष्ट प्राकृतिक कोको, माल्ट और गानोसेलियम (GL) का पौष्टिक संयोजन।',
        fullDescription: 'स्वादिष्ट चॉकलेट और माल्ट का संतुलित फॉर्मूलेशन, जिसमें गानोसेलियम कवकजाल के प्राकृतिक गुण सम्मिलित हैं।',
        keyIngredients: 'प्राकृतिक कोको पाउडर, गानोसेलियम (GL), माल्ट और दूध का पाउडर।',
        directions: '1 पाउच को 150ml गर्म पानी में मिलाकर अच्छी तरह चलाएं।',
        formFactor: 'एकल-सर्व पाउच'
      }
    }
  },
  {
    slug: 'dxn-morinzhi',
    name: 'DXN Morinzhi',
    subtitle: 'Noni (Morinda citrifolia) & Roselle Beverage',
    category: 'beverages',
    categoryLabel: 'Beverages',
    badge: 'Botanical Juice',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Liquid bottle',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOiBpSb0TvvngRoQsAsNQolNjY8l4BXFke9KyuNTakgaYh350eiJY498hFrDXkGlI85uxR1jlYyfitFibybByp70LpSRgCRmO3OLF1blNi3o-2sIbNd-x02xYQpXymd0BTuX0_eXsMwNA9iBepOVrVU7gP9dx5Lfhlu3WysAkFI7motcTbJlrMpHi97fy97X08ls5ebQ4RHargpufXbKiRx9C7a7ggRXqrndHertJkURfu9vYEdbv9cA',
    secondaryImageUrl: '',
    imageAlt: 'DXN Morinzhi herbal fruit drink bottle with fresh Noni fruits and Roselle blossoms',
    keyIngredients: 'Morinda citrifolia (Noni) fruit juice, Hibiscus sabdariffa (Roselle).',
    ingredientsList: [
      'Morinda citrifolia (Fresh Noni juice concentrate)',
      'Hibiscus sabdariffa (Roselle calyx extract)',
      'Natural cane syrup base'
    ],
    shortDescription: 'Pure tropical Morinda citrifolia (Noni) juice enriched with antioxidant-rich Roselle calyx extract.',
    fullDescription: 'DXN Morinzhi is a nutritional botanical beverage specially formulated from Morinda citrifolia (Noni fruit) and enriched with Roselle (Hibiscus sabdariffa). Processed through strict quality controls to maintain natural enzymes and anthraquinones.',
    packSizes: ['285ml bottle', '700ml glass bottle'],
    companionNotes: 'Can be mixed with fruit juice or cool drinking water.',
    directions: 'Mix 2 tablespoons (30ml) of DXN Morinzhi with 150ml of cool water or fruit juice, drink 1-2 times daily before meals.',
    storage: 'Shake well before use. Refrigerate after opening.',
    caution: 'Consult physician if on potassium-restricted diet.',
    bioactiveMarkers: [
      'Anthraquinones & Damnacanthal',
      'Scopoletin',
      'Roselle Anthocyanins',
      'Natural Vitamin C'
    ],
    matrixBreakdown: {
      rgVsGl: false,
      comparisonData: []
    },
    translations: {
      hi: {
        name: 'DXN मोरिन्झी',
        subtitle: 'नोनी एवं रोजेल वानस्पतिक पेय',
        badge: 'प्राकृतिक रस',
        shortDescription: 'शुद्ध मोरिंडा सिट्रिफोलिया (नोनी) एवं रोजेल अर्क से भरपूर प्राकृतिक स्वास्थ्यवर्धक पेय।',
        fullDescription: 'ताजे नोनी फल और रोजेल (गुड़हल कुल) के अर्क से तैयार किया गया प्राकृतिक एंजाइमों से भरपूर पौष्टिक पेय।',
        keyIngredients: 'मोरिंडा सिट्रिफोलिया (नोनी फल रस) एवं हिबिस्कस सबडारिफा (रोजेल)।',
        directions: '2 चम्मच (30ml) को एक गिलास ठंडे पानी में मिलाकर भोजन पूर्व लें।',
        formFactor: 'तरल बोतल'
      }
    }
  },
  {
    slug: 'dxn-ganozhi-toothpaste',
    name: 'DXN Ganozhi Toothpaste',
    subtitle: 'Fluoride-Free Oral Care with Ganoderma',
    category: 'oral-care',
    categoryLabel: 'Oral Care',
    badge: 'Fluoride-Free',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Paste tube',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRMV4uNYy3QoAMl4N_-Gjfd0d4-2UcMHUysMqjSj16wBKzru4foLsuiwV29JICk2zuKHaAOAMRRMokL5oXPNVdwo6EB5KKzSXaNGY4STRjftybzwMnVLEFKnu0jC3uGAtNMRx5Bmg4rZPuBn3RQ57CTZm9DiIXkqGugcRNIpjy3zeDQIgiSkMeC-gFVdObqiY-TxBybgyqQqgRW2UzPQv06t0BAWHCVMZbxDBrHoa6jbTCaBb0GG8XGg',
    secondaryImageUrl: '',
    imageAlt: 'DXN Ganozhi Toothpaste tube lying on slate with mint leaves and Ganoderma drop',
    keyIngredients: 'Ganoderma extract, menthol, food-grade cleansing agents. No saccharin or artificial coloring.',
    ingredientsList: [
      'Ganoderma lucidum extract',
      'Menthol & natural peppermint oil',
      'Dicalcium phosphate / cleansing base',
      'No fluoride, no saccharin, no artificial coloring'
    ],
    shortDescription: 'Gentle botanical toothpaste with Ganoderma lucidum extract and cooling menthol for gum wellness.',
    fullDescription: 'DXN Ganozhi Toothpaste contains high quality Ganoderma extract, food gel, menthol, and natural flavor. It contains no saccharin or artificial coloring, cleansing your teeth effectively while leaving a fresh, pleasant sensation.',
    packSizes: ['75g tube', '150g family tube'],
    companionNotes: 'Can also be applied topically to gums for soothing support.',
    directions: 'Brush teeth thoroughly at least twice a day or after each meal using a soft bristle brush. Spit out after brushing.',
    storage: 'Store at room temperature with cap tightly closed.',
    caution: 'For dental cleaning only. Supervise young children.',
    bioactiveMarkers: [
      'Ganoderma Polysaccharides',
      'Menthol & Peppermint terpenes',
      'Food-grade Cleansing Complex'
    ],
    matrixBreakdown: {
      rgVsGl: false,
      comparisonData: []
    },
    translations: {
      hi: {
        name: 'DXN गानोझी टूथपेस्ट',
        subtitle: 'फ्लोराइड-मुक्त गानोडेर्मा ओरल केयर',
        badge: 'फ्लोराइड-मुक्त',
        shortDescription: 'गानोडेर्मा अर्क और मेन्थॉल से युक्त प्राकृतिक ओरल केयर टूथपेस्ट।',
        fullDescription: 'सैक्रीन और कृत्रिम रंगों से रहित, मसूड़ों और दांतों की स्वच्छता व ताजगी बनाए रखने वाला हर्बल टूथपेस्ट।',
        keyIngredients: 'गानोडेर्मा अर्क, प्राकृतिक मेन्थॉल एवं खाद्य-ग्रेड क्लींजिंग बेस।',
        directions: 'दिन में कम से कम 2 बार भोजन के उपरांत ब्रश करें।',
        formFactor: 'पेस्ट ट्यूब'
      }
    }
  },
  {
    slug: 'dxn-ganozhi-soap',
    name: 'DXN Ganozhi Soap',
    subtitle: 'Palm Oil & Reishi Skin Cleansing Bar',
    category: 'personal-care',
    categoryLabel: 'Personal Care',
    badge: 'Vitamin E Enriched',
    verifiedArchive: true,
    verifiedDate: 'Oct 2024',
    formFactor: 'Solid cleansing bar',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDELntvLepSCX8YKtvYylkbF0fC-wu6wxGHu8Fa4h7fcissSla3sRuxVfPiTJQ_MP7zEbO3ndtbQnu_jY1Dkjg5tGdNgAREB1vugnHyOMPlV_6lCYowo8911tystwr7_PQ_SsQns4cFBwTVr6HirEf6hyqCCFIctLqva4d2RqVxql4wDXcI9PFWVCfQigsM5ZHEITN0jqSL6O6NGmAqms4VpxuQEv_67ApDJbU5juB3CxhZ-EhpGZ8zHg',
    secondaryImageUrl: '',
    imageAlt: 'DXN Ganozhi Soap cleansing bar placed on polished river stone with ripples',
    keyIngredients: 'Palm oil base enriched with active Ganoderma lucidum extract and skin-conditioning Vitamin E.',
    ingredientsList: [
      'Elaeis guineensis (Palm oil base)',
      'Ganoderma lucidum extract',
      'Tocopheryl acetate (Vitamin E)',
      'Glycerin & gentle foamers'
    ],
    shortDescription: 'Luxurious cleansing bar formulated with nourishing palm oil, active Ganoderma lucidum, and antioxidant Vitamin E.',
    fullDescription: 'DXN Ganozhi Soap is specially formulated with pure Ganoderma extract and palm oil. It cleanses the skin gently while preserving its natural moisture barrier without depleting natural skin oils.',
    packSizes: ['Single bar 80g', 'Twin pack (2x80g)'],
    companionNotes: 'Suitable for face, hands, and full body cleansing for all skin types.',
    directions: 'Wet hands and face or body, work the soap into a rich lather, gently massage onto skin, and rinse thoroughly with clean water.',
    storage: 'Keep bar in a dry, draining soap dish between uses.',
    caution: 'Avoid direct contact with eyes. Rinse with water if contact occurs.',
    bioactiveMarkers: [
      'Ganoderma Bioactive Fraction',
      'Natural Tocopherols (Vitamin E)',
      'Palm Carotenoids & Fatty Acids'
    ],
    matrixBreakdown: {
      rgVsGl: false,
      comparisonData: []
    },
    translations: {
      hi: {
        name: 'DXN गानोझी साबुन',
        subtitle: 'ताड़ तेल और गानोडेर्मा स्नान साबुन',
        badge: 'विटामिन E युक्त',
        shortDescription: 'गानोडेर्मा अर्क और पाम ऑयल से समृद्ध प्राकृतिक पोषणकारी स्नान साबुन।',
        fullDescription: 'त्वचा की प्राकृतिक नमी को सुरक्षित रखते हुए सौम्यता से साफ करने वाला पाम ऑयल व ऋषि मशरूम स्नान बार।',
        keyIngredients: 'ताड़ का तेल, गानोडेर्मा ल्यूसिडम अर्क एवं विटामिन ई।',
        directions: 'गीली त्वचा पर झाग बनाकर हल्के हाथों से लगाएं और पानी से धो लें।',
        formFactor: 'स्नान साबुन (बार)'
      }
    }
  }
];

const ingredients = [
  {
    slug: 'ganoderma-lucidum',
    botanicalName: 'Ganoderma lucidum',
    commonName: 'Reishi, Lingzhi, Mannentake',
    category: 'botanicals',
    categoryLabel: 'Botanicals & Herbs',
    badge: 'Key DXN Botanical',
    harvestStage: 'Fruit Body (90-day) & Mycelium (14-day)',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVhOeYFj4crIOfi7doxSFt6s7zA8NO8Ad7UZCC8CCWoZGdeO3jhKP5appic02jZuOrNe9UGGWjsXvHRbs_eNppHmMvw5XkDCeGX8joyFpA3wF0HobOkvDMcF8WR8xPQW77Hpc_psQkA6QXqHT4NBcYfpzDg5jdpHzNQSS9NFJEQeHluVn_3MNJxAxzXwaKni03tDry2IEwgmAJDoupLqtZBuTMEYMy-xb0s1SJMKjwIbRPE2LKmF7q3Q',
    imageAlt: 'Ganoderma lucidum Reishi mushroom growing on natural hardwood log',
    overview: 'Renowned red mushroom utilized in traditional Asian wellness systems for centuries, harvested for both its mature fruiting body (RG) and rapid mycelial filaments (GL).',
    biochemicalComponents: [
      'Polysaccharides (Beta-1,3/1,6-D-glucans)',
      'Triterpenes (Ganoderic acids A, B, C, D)',
      'Adenosine & Guanosine',
      'Organic Germanium (GL fraction)',
      'Sterols & Ergosterol'
    ],
    featuredProducts: [
      { productSlug: 'dxn-reishi-gano-rg-gl', name: 'Reishi Gano & GL', note: 'Dual harvest capsules' },
      { productSlug: 'dxn-lingzhi-coffee-2in1', name: 'Lingzhi Coffee 2-in-1', note: 'Arabica + Ganoderma' },
      { productSlug: 'dxn-reishi-gano-tea', name: 'Reishi Gano Tea', note: 'Infused Camellia leaves' },
      { productSlug: 'dxn-cocozhi', name: 'DXN Cocozhi', note: 'Cocoa + Ganocelium GL' },
      { productSlug: 'dxn-ganozhi-toothpaste', name: 'Ganozhi Toothpaste', note: 'Non-fluoride oral paste' },
      { productSlug: 'dxn-ganozhi-soap', name: 'Ganozhi Soap', note: 'Palm oil & Reishi bar' }
    ],
    precaution: 'Persons with known mushroom sensitivities or bleeding disorders should exercise caution and consult their physician.',
    purityIndex: 'Laboratory Monitored Organically Grown',
    translations: {
      hi: {
        botanicalName: 'गानोडेर्मा ल्यूसिडम',
        commonName: 'लाल ऋषि मशरूम, लिंग्झी',
        overview: 'शताब्दियों से पारंपरिक स्वास्थ्य पद्धतियों में प्रयुक्त लाल मशरूम, जो अपने परिपक्व फल पिंड और कवकजाल दोनों के लिए जाना जाता है।',
        precaution: 'मशरूम से एलर्जी वाले व्यक्ति चिकित्सक से परामर्श करें।'
      }
    }
  },
  {
    slug: 'spirulina-platensis',
    botanicalName: 'Spirulina platensis',
    commonName: 'Blue-Green Microalgae',
    category: 'algae',
    categoryLabel: 'Algae',
    badge: 'Complete Plant Protein',
    harvestStage: 'Aquatic Alkaline Culture Pond',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWMguhFTWkPctUimGMHHazf6d6LYWKeuvl0zdu2kiXz09NFzfjs4822sAfOvSRWAwPyKy6rNZy3heGlBXWLE2R_mQurLmbCmBXdE-FhDAZEIT64DZGYTa6EbMFg3R_ELtdkm6I0QUgraclzHt-EnzEB1eKEjkjc_loovvmvfnkwVGZdH6gFgopF6h__V4sPkhB4RdE6bIU6GXr9C9QuKzT2M3VKadxluEFJ_lqZhHt8MXKOmdsCXpaZw',
    imageAlt: 'Microscopic view and pure emerald deep-green Spirulina algae culture',
    overview: 'Ancient aquatic photosynthetic organism cultivated for its dense natural concentration of plant proteins, phycocyanin pigment, bioavailable iron, and B-complex vitamins.',
    biochemicalComponents: [
      'Phycocyanin (Active blue antioxidant pigment)',
      'Vegetable Proteins (60-70% dry weight)',
      'Chlorophyll A',
      'Gamma-Linolenic Acid (GLA)',
      'Beta-Carotene & Zeaxanthin'
    ],
    featuredProducts: [
      { productSlug: 'dxn-spirulina', name: 'DXN Spirulina', note: '100% pure tablets and capsules' }
    ],
    precaution: 'Persons with phenylketonuria (PKU) should avoid spirulina as it naturally contains phenylalanine.',
    purityIndex: 'Laboratory Monitored Alkaline Cultivation',
    translations: {
      hi: {
        botanicalName: 'स्पिरुलिना प्लैटेंसिस',
        commonName: 'नील-हरित क्षारीय सूक्ष्म शैवाल',
        overview: 'प्राकृतिक वनस्पति प्रोटीन, फाइकोसायनिन और आवश्यक खनिजों से भरपूर प्राचीन जलीय शैवाल।',
        precaution: 'पीकेयू (PKU) से प्रभावित व्यक्ति सेवन से बचें।'
      }
    }
  },
  {
    slug: 'morinda-citrifolia',
    botanicalName: 'Morinda citrifolia',
    commonName: 'Noni, Indian Mulberry, Ba Ji Tian',
    category: 'botanicals',
    categoryLabel: 'Botanicals & Herbs',
    badge: 'Tropical Botanical',
    harvestStage: 'Sun-ripened Tropical Fruit',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOiBpSb0TvvngRoQsAsNQolNjY8l4BXFke9KyuNTakgaYh350eiJY498hFrDXkGlI85uxR1jlYyfitFibybByp70LpSRgCRmO3OLF1blNi3o-2sIbNd-x02xYQpXymd0BTuX0_eXsMwNA9iBepOVrVU7gP9dx5Lfhlu3WysAkFI7motcTbJlrMpHi97fy97X08ls5ebQ4RHargpufXbKiRx9C7a7ggRXqrndHertJkURfu9vYEdbv9cA',
    imageAlt: 'Fresh tropical Noni fruit on branch',
    overview: 'Polynesian and Indian tropical evergreen tree known for its unique bumpy fruit, celebrated for rich digestive enzymes, damnacanthal, and scopoletin.',
    biochemicalComponents: [
      'Damnacanthal (Anthraquinone)',
      'Scopoletin (Phyto-coumarin)',
      'Proxeronine / Xeronine precursor system',
      'Ascorbic Acid (Vitamin C)'
    ],
    featuredProducts: [
      { productSlug: 'dxn-morinzhi', name: 'DXN Morinzhi', note: 'Concentrated fruit juice' }
    ],
    precaution: 'Due to natural potassium content, individuals with kidney conditions should consult their nephrologist.',
    purityIndex: 'Cold-pressed Juice Concentrate',
    translations: {
      hi: {
        botanicalName: 'मोरिंडा सिट्रिफोलिया',
        commonName: 'नोनी फल',
        overview: 'प्राकृतिक पाचक एंजाइमों और जैव सक्रिय यौगिकों से भरपूर उष्णकटिबंधीय फल।',
        precaution: 'गुर्दे के रोगी पोटेशियम की मात्रा के कारण चिकित्सक से सलाह लें।'
      }
    }
  }
];

// Seed function using official MongoDB Node.js driver (MongoClient)
async function seedDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'dxnanchal';

  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment.');
  }

  const client = new MongoClient(uri);

  try {
    console.log('[Seed]: Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('[Seed]: Connected successfully. Seeding database:', dbName);

    const db = client.db(dbName);
    const productsColl = db.collection('products');
    const ingredientsColl = db.collection('ingredients');

    // Remove existing seed documents
    await productsColl.deleteMany({});
    await ingredientsColl.deleteMany({});

    // Insert rich product & ingredient catalog
    const prodResult = await productsColl.insertMany(products);
    const ingResult = await ingredientsColl.insertMany(ingredients);

    console.log(`✅ [Seed Success]: Inserted ${prodResult.insertedCount} products into Atlas collection "products".`);
    console.log(`✅ [Seed Success]: Inserted ${ingResult.insertedCount} ingredients into Atlas collection "ingredients".`);

    return {
      success: true,
      productsCount: prodResult.insertedCount,
      ingredientsCount: ingResult.insertedCount,
    };
  } finally {
    await client.close();
  }
}

if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding script finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding script failed:', err.message);
      process.exit(1);
    });
}

module.exports = {
  products,
  ingredients,
  seedDatabase,
};
