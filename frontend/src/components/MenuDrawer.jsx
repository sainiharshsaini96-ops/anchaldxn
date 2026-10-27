import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function MenuDrawer({ isOpen, onClose, onOpenContact }) {
  const { lang, setLanguage, t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-sm h-full bg-surface-container-lowest p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-surface-container">
            <div className="flex items-center gap-2">
              <img
                alt="Logo"
                className="h-8 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VVut_Xse5NsVxtnjRz-My8zc6MYM7EdwkELTr7L0IPhFET7KlzjID8ZdT_HqraZa2W0tEP6ppm4bwZoy_sDM_YRhqRh05BYCYy7WWVwMhUNJpb84jjpH0JQYpf3bRF3YqRO_0KJFaV1_61BxO0OD14aJQzucFR0oie1M-GPMaaZqjbHJBTTVjRIT9It8Io1MBZl1tM74OvDssfxc9zoyQHAmb0FAzHd4UfcpdqqGxLp5l-8g_aaMniP0s"
              />
              <span className="font-label-md text-label-md text-primary font-bold">DXNANCHAL</span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Language Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <span className="font-label-md text-label-md text-primary font-semibold">Language / भाषा:</span>
            <div className="inline-flex bg-surface-container-high rounded-full p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                  lang === 'en'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                  lang === 'hi'
                    ? 'bg-primary text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <Link
              to="/"
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface font-label-md text-label-md font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[22px]">home</span>
              <span>{t('tab-home')}</span>
            </Link>
            <Link
              to="/products"
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface font-label-md text-label-md font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[22px]">local_pharmacy</span>
              <span>{t('tab-products')}</span>
            </Link>
            <Link
              to="/compare"
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface font-label-md text-label-md font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[22px]">balance</span>
              <span>{t('tab-compare')}</span>
            </Link>
            <Link
              to="/ingredients"
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface font-label-md text-label-md font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[22px]">eco</span>
              <span>{t('tab-ingredients')}</span>
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className="p-3 rounded-xl hover:bg-surface-container-low flex items-center gap-3 text-on-surface font-label-md text-label-md font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-secondary text-[22px]">badge</span>
              <span>{t('owner-title')}</span>
            </Link>
          </nav>
        </div>

        {/* Drawer Bottom Action */}
        <div className="pt-6 border-t border-surface-container flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-secondary transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
            <span>{t('owner-cta-contact')}</span>
          </button>
          <p className="font-label-sm text-[11px] text-center text-on-surface-variant">
            Independent Educational Resource • India & Global
          </p>
        </div>
      </div>
    </div>
  );
}
