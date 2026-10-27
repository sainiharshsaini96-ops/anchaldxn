import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onOpenContact }) {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container-high/60 pt-10 pb-20 md:pb-12 text-on-surface">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col gap-8">
        {/* Top Branding & Disclaimer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="DXNANCHAL Product Guide Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VVut_Xse5NsVxtnjRz-My8zc6MYM7EdwkELTr7L0IPhFET7KlzjID8ZdT_HqraZa2W0tEP6ppm4bwZoy_sDM_YRhqRh05BYCYy7WWVwMhUNJpb84jjpH0JQYpf3bRF3YqRO_0KJFaV1_61BxO0OD14aJQzucFR0oie1M-GPMaaZqjbHJBTTVjRIT9It8Io1MBZl1tM74OvDssfxc9zoyQHAmb0FAzHd4UfcpdqqGxLp5l-8g_aaMniP0s"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary font-bold">DXNANCHAL</span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">
                {t('footer-badge')}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[15px] text-secondary">verified</span>
            {t('footer-db-verified')}
          </span>
        </div>

        {/* Narrative Disclaimer */}
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-4xl">
          {t('footer-disclaimer')}
        </p>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-surface-container-high">
          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
              Explore
            </span>
            <Link to="/products" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              {t('footer-nav-all')}
            </Link>
            <Link to="/compare" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              {t('footer-nav-compare')}
            </Link>
            <Link to="/ingredients" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              {t('footer-nav-ingredients')}
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
              Research & Bio
            </span>
            <Link to="/about" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              {t('footer-nav-about')}
            </Link>
            <button
              onClick={onOpenContact}
              className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {t('footer-nav-contact')}
            </button>
            <a href="#disclaimer-archive" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Label Archive Methodology
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
              Key Botanicals
            </span>
            <Link to="/ingredients" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Ganoderma lucidum (Reishi)
            </Link>
            <Link to="/ingredients" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Spirulina platensis (Algae)
            </Link>
            <Link to="/ingredients" className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors">
              Morinda citrifolia (Noni)
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
              Educational Note
            </span>
            <p className="font-label-sm text-[12px] text-on-surface-variant leading-normal">
              Curated by Anchal (B.Sc. Nutrition & Dietetics learner) as an independent non-commercial reference guide.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-surface-container-high/60 text-on-surface-variant font-label-sm text-label-sm">
          <span>{t('footer-copy')}</span>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer">{t('footer-nav-privacy')}</span>
            <span>•</span>
            <span className="hover:text-primary cursor-pointer">{t('footer-nav-terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
