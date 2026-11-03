import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Faqs({ onOpenContact }) {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const faqData = [
    {
      id: 1,
      category: 'botanicals',
      questionEn: 'What is the key difference between Reishi Gano (RG) and Ganocelium (GL)?',
      questionHi: 'ऋषि गानो (RG) और गानोसेलियम (GL) में मुख्य अंतर क्या है?',
      answerEn:
        'DXN Reishi Gano (RG) is harvested from the mature 90-day cultivated red mushroom fruiting body (Ganoderma lucidum), rich in triterpenes, adenosine, and Ganoderic essence. DXN Ganocelium (GL) is derived from the youthful 14-day mycelium culture filaments, known for a higher concentration of organic germanium, polysaccharidal mycelial fractions, and minerals. Both stages complement each other and are traditionally consumed together in a 1:1 balanced ratio.',
      answerHi:
        'ऋषि गानो (RG) 90 दिन में परिपक्व लाल मशरूम (गानोडेर्मा ल्यूसिडम) के फल पिंड से निर्मित होता है, जो ट्राइटरपेन्स, एडेनोसिन और गानोडेरिक सत्व से भरपूर होता है। वहीं गानोसेलियम (GL) 14 दिन के युवा कवकजाल (मायसेलियम) से बनाया जाता है, जिसमें ऑर्गेनिक जर्मेनियम, पॉलीसेकेराइड्स और खनिज उच्च मात्रा में होते हैं। दोनों एक दूसरे के पूरक हैं और पारंपरिक रूप से 1:1 के अनुपात में साथ लिए जाते हैं।',
      relatedSlug: 'dxn-reishi-gano-rg-gl',
    },
    {
      id: 2,
      category: 'usage',
      questionEn: 'Why are RG and GL traditionally paired together in equal 1:1 proportion?',
      questionHi: 'RG और GL को हमेशा 1:1 के समान अनुपात में साथ लेने की सलाह क्यों दी जाती है?',
      answerEn:
        'In holistic mycological wellness, the mature fruiting body (RG) and mycelial culture (GL) provide distinct bioactive spectrums. Consuming both together provides dual botanical synergy: balancing triterpenoids with organic germanium and polysaccharides for holistic physiological equilibrium.',
      answerHi:
        'हर्बल विज्ञान में परिपक्व फल पिंड (RG) और कवकजाल (GL) अलग-अलग जैव सक्रिय पोषक तत्व प्रदान करते हैं। दोनों को साथ लेने से ट्राइटरपेन्स और ऑर्गेनिक जर्मेनियम का सही संतुलन मिलता है, जिससे समग्र पोषण और संतुलन प्राप्त होता है।',
      relatedSlug: 'dxn-reishi-gano-rg-gl',
    },
    {
      id: 3,
      category: 'botanicals',
      questionEn: 'What makes Spirulina platensis such a nutrient-dense whole food?',
      questionHi: 'स्पिरुलिना प्लैटेंसिस को इतना पौष्टिक आहार क्यों माना जाता है?',
      answerEn:
        'Spirulina platensis is an ancient alkaline blue-green microalga consisting of 60%–70% complete bioavailable vegetable protein by dry weight. It naturally delivers all essential amino acids, active phycocyanin pigment, plant chlorophyll A, bioavailable non-heme iron, beta-carotene, and gamma-linolenic acid (GLA).',
      answerHi:
        'स्पिरुलिना एक प्राचीन क्षारीय नील-हरित सूक्ष्म शैवाल है जिसमें शुष्क वजन के आधार पर 60% से 70% पूर्ण वनस्पति प्रोटीन होता है। इसमें सभी आवश्यक अमीनो एसिड, फाइकोसायनिन एंटीऑक्सीडेंट, क्लोरोफिल, आयरन, बीटा-कैरोटीन और जीएलए (GLA) प्राकृतिक रूप से मौजूद होते हैं।',
      relatedSlug: 'dxn-spirulina',
    },
    {
      id: 4,
      category: 'beverages',
      questionEn: 'Does DXN Lingzhi Coffee 2-in-1 contain added sugar or dairy creamers?',
      questionHi: 'क्या DXN लिंग्झी कॉफी 2-इन-1 में अतिरिक्त चीनी या डेयरी क्रीमर मिलाया जाता है?',
      answerEn:
        'No. DXN Lingzhi Coffee 2-in-1 is formulated purely from premium roasted coffee beans (Arabica/Robusta) and 100% Ganoderma lucidum extract. It contains zero added cane sugar, zero artificial sweeteners, and zero dairy creamers, making it suitable for pure black coffee drinkers and diabetic-conscious diets.',
      answerHi:
        'जी नहीं। DXN लिंग्झी कॉफी 2-इन-1 केवल उत्कृष्ट भुनी हुई कॉफी बीन्स और 100% शुद्ध गानोडेर्मा ल्यूसिडम अर्क से बनाई जाती है। इसमें कोई अतिरिक्त चीनी, कृत्रिम मिठास या डेयरी क्रीमर नहीं होता, जो इसे ब्लैक कॉफी प्रेमियों के लिए एकदम उपयुक्त बनाता है।',
      relatedSlug: 'dxn-lingzhi-coffee-2in1',
    },
    {
      id: 5,
      category: 'beverages',
      questionEn: 'What are the core ingredients and benefits of DXN Morinzhi?',
      questionHi: 'DXN मोरिन्झी के मुख्य घटक और विशेषताएं क्या हैं?',
      answerEn:
        'DXN Morinzhi is a nutritional botanical beverage crafted from fresh sun-ripened Morinda citrifolia (tropical Noni fruit) enriched with antioxidant-rich Roselle (Hibiscus sabdariffa) calyx extract. It is celebrated for its natural plant digestive enzymes, damnacanthal, scopoletin, and organic vitamin C.',
      answerHi:
        'DXN मोरिन्झी ताजे मोरिंडा सिट्रिफोलिया (नोनी फल) और एंटीऑक्सीडेंट से भरपूर रोजेल (गुड़हल कुल) अर्क से तैयार किया गया प्राकृतिक वानस्पतिक पेय है। यह प्राकृतिक पाचक एंजाइमों, डैम्नाकैनथैल, स्कोपोलेटिन और प्राकृतिक विटामिन सी के लिए जाना जाता है।',
      relatedSlug: 'dxn-morinzhi',
    },
    {
      id: 6,
      category: 'personal',
      questionEn: 'Is DXN Ganozhi Toothpaste safe and fluoride-free?',
      questionHi: 'क्या DXN गानोझी टूथपेस्ट सुरक्षित और फ्लोराइड-मुक्त है?',
      answerEn:
        'Yes. Verified packaging archives confirm that DXN Ganozhi Toothpaste is formulated without sodium fluoride, saccharin, or synthetic dyes. It utilizes Ganoderma extract, natural menthol, and gentle food-grade cleansing agents to clean teeth and soothe gums naturally.',
      answerHi:
        'हाँ। आधिकारिक लेबल से प्रमाणित है कि DXN गानोझी टूथपेस्ट में सोडियम फ्लोराइड, सैक्रीन या कृत्रिम रंगों का उपयोग नहीं किया जाता। यह गानोडेर्मा अर्क, प्राकृतिक मेन्थॉल और खाद्य-ग्रेड क्लींजिंग बेस से बना है।',
      relatedSlug: 'dxn-ganozhi-toothpaste',
    },
    {
      id: 7,
      category: 'safety',
      questionEn: 'How should DXN botanical products be stored once opened?',
      questionHi: 'DXN के उत्पादों को खोलने के बाद कैसे सुरक्षित रखना चाहिए?',
      answerEn:
        'Tablets, capsules, and tea/coffee sachets should be kept tightly capped or sealed in a cool, dry place away from moisture and direct sunlight. For liquid beverages like DXN Morinzhi, shake well before serving and refrigerate immediately after breaking the inner seal.',
      answerHi:
        'गोलियां, कैप्सूल और चाय/कॉफी के पाउच को नमी और तेज धूप से दूर ठंडी व सूखी जगह पर टाइट बंद करके रखें। मोरिन्झी जैसे तरल पेय को उपयोग से पहले हिलाएं और खोलने के बाद फ्रिज में रखें।',
      relatedSlug: null,
    },
    {
      id: 8,
      category: 'general',
      questionEn: 'Is DXNANCHAL an official company website or an independent guide?',
      questionHi: 'क्या DXNANCHAL एक आधिकारिक कॉर्पोरेट वेबसाइट है या स्वतंत्र गाइड?',
      answerEn:
        'DXNANCHAL is an independent educational reference guide curated by Anchal, an academic scholar pursuing B.Sc. Nutrition & Dietetics. It is not affiliated with, owned by, or managed by DXN Marketing India or DXN Holdings. All product profiles are derived directly from verified physical packaging archives to provide consumers with unbiased, plain-language facts.',
      answerHi:
        'DXNANCHAL एक स्वतंत्र शैक्षिक संदर्भ गाइड है जिसे आंचल (B.Sc. पोषण एवं आहारिकी की छात्रा) द्वारा तैयार किया गया है। इसका DXN मार्केटिंग इंडिया से कोई व्यावसायिक या मालिकाना संबंध नहीं है। सभी विवरण भौतिक पैकेजिंग लेबल से निष्पक्ष रूप से संकलित किए गए हैं।',
      relatedSlug: null,
    },
  ];

  const categories = [
    { key: 'all', labelEn: 'All Questions', labelHi: 'सभी प्रश्न', icon: 'help_outline' },
    { key: 'botanicals', labelEn: 'Botanicals & Herbs', labelHi: 'जड़ी-बूटी व मशरूम', icon: 'eco' },
    { key: 'usage', labelEn: 'Dosage & Synergy', labelHi: 'उपयोग व तालमेल', icon: 'schedule' },
    { key: 'beverages', labelEn: 'Beverages', labelHi: 'पेय पदार्थ', icon: 'coffee' },
    { key: 'personal', labelEn: 'Personal Care', labelHi: 'दंत व व्यक्तिगत देखभाल', icon: 'spa' },
    { key: 'safety', labelEn: 'Storage & Safety', labelHi: 'सुरक्षा व रखरखाव', icon: 'shield' },
    { key: 'general', labelEn: 'About DXNANCHAL', labelHi: 'गाइड के बारे में', icon: 'info' },
  ];

  const filteredFaqs = faqData.filter((faq) => {
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    const term = search.toLowerCase().trim();
    if (!term) return matchesCat;
    const qText = (lang === 'hi' ? faq.questionHi : faq.questionEn).toLowerCase();
    const aText = (lang === 'hi' ? faq.answerHi : faq.answerEn).toLowerCase();
    return matchesCat && (qText.includes(term) || aText.includes(term));
  });

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-4 pb-2 flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>{t('tab-home')}</span>
        </Link>
        <span className="text-outline-variant">/</span>
        <span className="text-primary font-bold">{lang === 'hi' ? 'प्रश्नोत्तरी (FAQs)' : 'Frequently Asked Questions'}</span>
      </nav>

      {/* Header Banner */}
      <section className="pt-2 pb-6 flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-secondary">help_outline</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
            {lang === 'hi' ? 'ज्ञानकोष एवं प्रश्नोत्तरी' : 'Educational Knowledge Hub'}
          </span>
        </div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
          {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQs)' : 'Frequently Asked Questions'}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
          {lang === 'hi'
            ? 'DXN उत्पादों के उपयोग, वानस्पतिक सामग्री, गुणवत्ता और दैनिक दिशा-निर्देशों से जुड़े सामान्य प्रश्नों के स्पष्ट और सत्यापित उत्तर।'
            : 'Factual answers regarding DXN botanical formulation profiles, packaging instructions, synergistic pairings, and educational verification.'}
        </p>
      </section>

      {/* Search Bar */}
      <div className="relative w-full mb-4">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-secondary">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={
            lang === 'hi'
              ? 'प्रश्नों में खोजें (उदा. Reishi, Spirulina, कॉफी, सेवन निर्देश)...'
              : 'Search questions (e.g. RG/GL, Spirulina, coffee, dosage, sugar-free)...'
          }
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-[0_2px_8px_rgba(22,71,52,0.04)] focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all border border-surface-container"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-3 flex items-center text-outline hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">cancel</span>
          </button>
        )}
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              setActiveCategory(cat.key);
              setOpenIndex(null);
            }}
            type="button"
            className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-sm ${
              activeCategory === cat.key
                ? 'bg-primary text-on-primary font-bold'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-surface-container'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${activeCategory === cat.key ? 'text-on-primary' : 'text-secondary'}`}>
              {cat.icon}
            </span>
            <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
          </button>
        ))}
      </div>

      {/* Accordion Stream */}
      <section className="flex flex-col gap-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-surface-container-lowest rounded-2xl p-6 border border-surface-container text-on-surface-variant flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[36px] text-outline">search_off</span>
            <p className="font-headline-sm text-headline-sm text-primary font-bold">
              {lang === 'hi' ? 'कोई प्रश्न नहीं मिला' : 'No matching questions found'}
            </p>
            <p className="font-body-sm text-body-sm max-w-md">
              {lang === 'hi'
                ? 'कृपया दूसरा शब्द खोजें या फ़िल्टर रीसेट करें।'
                : 'Try adjusting your search query or reset category filter to see all questions.'}
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="mt-2 px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold"
            >
              {lang === 'hi' ? 'सभी प्रश्न देखें' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const questionText = lang === 'hi' ? faq.questionHi : faq.questionEn;
            const answerText = lang === 'hi' ? faq.answerHi : faq.answerEn;

            return (
              <article
                key={faq.id}
                className="bg-surface-container-lowest rounded-2xl border border-surface-container shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 focus:outline-none hover:bg-surface-container-low/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">
                      {faq.id}
                    </span>
                    <h2 className="font-label-lg md:font-headline-sm text-label-lg md:text-headline-sm text-primary font-bold leading-snug">
                      {questionText}
                    </h2>
                  </div>
                  <span
                    className={`w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0 text-secondary transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-secondary text-on-secondary' : ''
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 md:px-5 pb-5 pt-1 border-t border-surface-container/60 animate-fadeIn">
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed pl-10">
                      {answerText}
                    </p>

                    {faq.relatedSlug && (
                      <div className="mt-3 pl-10 flex items-center gap-2">
                        <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold">
                          {lang === 'hi' ? 'संबंधित उत्पाद:' : 'Related Product:'}
                        </span>
                        <Link
                          to={`/product/${faq.relatedSlug}`}
                          className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold hover:underline"
                        >
                          <span>{lang === 'hi' ? 'विवरण देखें' : 'View Verified Specs'}</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>

      {/* Direct Contact Prompt Banner */}
      <section className="mt-10 p-6 md:p-8 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">contact_support</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {lang === 'hi' ? 'क्या आपका कोई और प्रश्न है?' : 'Have a specific question not covered here?'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {lang === 'hi'
                ? 'आंचल (B.Sc. पोषण एवं आहारिकी) से सीधे संपर्क करें और अपने विचार साझा करें।'
                : 'Send a note directly to Anchal (B.Sc. Nutrition & Dietetics) for educational feedback.'}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenContact}
          className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-secondary transition-all shrink-0 active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">mail</span>
          <span>{lang === 'hi' ? 'संदेश भेजें' : 'Send Direct Inquiry'}</span>
        </button>
      </section>
    </div>
  );
}
