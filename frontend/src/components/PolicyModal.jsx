import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PolicyModal({ isOpen, onClose, policyType = 'privacy' }) {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  const content = {
    privacy: {
      titleEn: 'Privacy Policy & Data Ethics',
      titleHi: 'गोपनीयता नीति एवं डेटा नैतिकता',
      icon: 'lock',
      bodyEn: (
        <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface leading-relaxed">
          <p>
            <strong>DXNANCHAL</strong> is an independent non-commercial educational resource operated for health literacy and academic nutritional study. We do not sell user data, utilize invasive cross-site tracking cookies, or monetize viewer browsing histories.
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">Direct Inquiries & Contact Form</h4>
            <p className="text-on-surface-variant">
              Information submitted via our contact inquiry module (name, email address, topic, and message text) is retained solely to facilitate educational email replies by Anchal and is stored securely in MongoDB with strict confidentiality.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">Local Storage Preferences</h4>
            <p className="text-on-surface-variant">
              We store your selected language preference (English/Hindi) and your comparison tray selection locally within your browser's localStorage for seamless viewing continuity.
            </p>
          </div>
        </div>
      ),
      bodyHi: (
        <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface leading-relaxed">
          <p>
            <strong>DXNANCHAL</strong> स्वास्थ्य साक्षरता और पोषण संबंधी शैक्षणिक अध्ययन के लिए संचालित एक स्वतंत्र गैर-व्यावसायिक शैक्षिक मंच है। हम आपका व्यक्तिगत डेटा किसी को नहीं बेचते और न ही अनैतिक ट्रैकिंग करते हैं।
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">संपर्क संदेश एवं पूछताछ</h4>
            <p className="text-on-surface-variant">
              संपर्क फॉर्म के माध्यम से भेजा गया विवरण केवल आंचल द्वारा ईमेल उत्तर देने के उद्देश्य से सुरक्षित मोंगोडीबी डेटाबेस में रखा जाता है।
            </p>
          </div>
        </div>
      ),
    },
    terms: {
      titleEn: 'Terms of Use & Academic Scope',
      titleHi: 'उपयोग की शर्तें एवं शैक्षिक दायरा',
      icon: 'gavel',
      bodyEn: (
        <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface leading-relaxed">
          <p>
            Welcome to the <strong>DXNANCHAL Product Guide</strong>. By accessing this platform, you acknowledge and agree to the following educational terms:
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">Independent Educational Charter</h4>
            <p className="text-on-surface-variant">
              This site is an academic portfolio project curated by Anchal, a student pursuing B.Sc. Nutrition & Dietetics. It is not owned, operated, or officially endorsed by DXN Marketing India Pvt. Ltd. or DXN Holdings Bhd.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">No Medical Advice Disclaimer</h4>
            <p className="text-on-surface-variant">
              All botanical profiles, ingredient analyses, and packaging summaries are presented for informational reference only. None of the content is intended as medical advice, clinical diagnosis, or prescriptive health recommendations. Always consult a qualified physician or licensed dietitian before beginning any dietary regimen.
            </p>
          </div>
        </div>
      ),
      bodyHi: (
        <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface leading-relaxed">
          <p>
            <strong>DXNANCHAL उत्पाद गाइड</strong> में आपका स्वागत है। इस वेबसाइट का उपयोग करते समय कृपया निम्नलिखित शर्तों का ध्यान रखें:
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">स्वतंत्र शैक्षिक मंच</h4>
            <p className="text-on-surface-variant">
              यह वेबसाइट आंचल (B.Sc. पोषण एवं आहारिकी की छात्रा) द्वारा केवल सूचनात्मक उद्देश्य से बनाई गई है। इसका DXN कंपनी से कोई व्यावसायिक संबंध नहीं है।
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">चिकित्सीय सलाह का अभाव</h4>
            <p className="text-on-surface-variant">
              यहाँ दी गई सामग्री चिकित्सीय परामर्श का विकल्प नहीं है। किसी भी स्वास्थ्य निर्णय से पूर्व योग्य चिकित्सक से सलाह अवश्य लें।
            </p>
          </div>
        </div>
      ),
    },
    methodology: {
      titleEn: 'Label Archive Verification Methodology',
      titleHi: 'लेबल पुरालेख सत्यापन पद्धति',
      icon: 'fact_check',
      bodyEn: (
        <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface leading-relaxed">
          <p>
            The <strong>DXNANCHAL Verification Methodology</strong> adheres to strict archival standards to insulate consumers from hyperbolic marketing claims:
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">1. Direct Physical Packaging Transcription</h4>
            <p className="text-on-surface-variant">
              Ingredients, form factors, and pack sizes are transcribed directly from physically purchased and archived product cartons, bottles, and foils across Indian and international batches.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">2. Botanical & Taxonomic Corroboration</h4>
            <p className="text-on-surface-variant">
              Active ingredients (such as <em>Ganoderma lucidum</em>, <em>Spirulina platensis</em>, and <em>Morinda citrifolia</em>) are cross-referenced with peer-reviewed botanical pharmacopoeias to ensure accurate biochemical nomenclature.
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">3. Non-Commercial Neutrality</h4>
            <p className="text-on-surface-variant">
              Zero affiliate commissions, sponsored placements, or sales pitches are allowed within the database.
            </p>
          </div>
        </div>
      ),
      bodyHi: (
        <div className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface leading-relaxed">
          <p>
            <strong>DXNANCHAL सत्यापन पद्धति</strong> पैकेजिंग की वास्तविक जानकारी को उपभोक्ताओं तक निष्पक्ष रूप से पहुँचाने के लिए प्रतिबद्ध है:
          </p>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">1. भौतिक पैकेजिंग से प्रत्यक्ष संकलन</h4>
            <p className="text-on-surface-variant">
              सभी सामग्री, उपयोग निर्देश और पैक विवरण वास्तविक उत्पाद पैकेजिंग से सीधे दर्ज किए गए हैं।
            </p>
          </div>
          <div className="p-3 bg-surface-container-low rounded-xl">
            <h4 className="font-label-md font-bold text-primary mb-1">2. वानस्पतिक वैज्ञानिक पुष्टि</h4>
            <p className="text-on-surface-variant">
              सक्रिय जड़ी-बूटियों के वानस्पतिक नामों और जैव सक्रिय घटकों की प्रामाणिक वनस्पति विज्ञान संदर्भों से पुष्टि की गई है।
            </p>
          </div>
        </div>
      ),
    },
  };

  const activeContent = content[policyType] || content.privacy;
  const title = lang === 'hi' ? activeContent.titleHi : activeContent.titleEn;
  const body = lang === 'hi' ? activeContent.bodyHi : activeContent.bodyEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-lg bg-surface-container-lowest rounded-2xl p-6 shadow-2xl border border-surface-container flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">{activeContent.icon}</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="py-1">{body}</div>

        <div className="pt-3 border-t border-surface-container flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-secondary transition-all"
          >
            {lang === 'hi' ? 'समझ गया' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
