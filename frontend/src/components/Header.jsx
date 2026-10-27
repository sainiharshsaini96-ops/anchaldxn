import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Header({ onOpenSearch, onOpenMenu, onOpenContact, onOpenManager }) {
  const { lang, setLanguage, t } = useLanguage();
  const location = useLocation();

  const getPageSubtitle = () => {
    switch (location.pathname) {
      case '/':
        return t('header-subtitle');
      case '/products':
        return t('tab-products');
      case '/compare':
        return t('tab-compare');
      case '/ingredients':
        return t('tab-ingredients');
      case '/about':
        return t('owner-title');
      default:
        if (location.pathname.startsWith('/product/')) {
          return 'Product Detail';
        }
        return 'Guide';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(22,71,52,0.04)]">
      <div className="max-w-[1280px] mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-2">
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            alt="DXNANCHAL Product Guide Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VVut_Xse5NsVxtnjRz-My8zc6MYM7EdwkELTr7L0IPhFET7KlzjID8ZdT_HqraZa2W0tEP6ppm4bwZoy_sDM_YRhqRh05BYCYy7WWVwMhUNJpb84jjpH0JQYpf3bRF3YqRO_0KJFaV1_61BxO0OD14aJQzucFR0oie1M-GPMaaZqjbHJBTTVjRIT9It8Io1MBZl1tM74OvDssfxc9zoyQHAmb0FAzHd4UfcpdqqGxLp5l-8g_aaMniP0s"
          />
          <div className="flex flex-col">
            <span className="font-label-md text-label-md text-primary font-bold leading-tight tracking-wide">
              DXNANCHAL
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-normal leading-none tracking-normal">
              {getPageSubtitle()}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`font-label-md text-label-md transition-colors ${
              location.pathname === '/' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {t('tab-home')}
          </Link>
          <Link
            to="/products"
            className={`font-label-md text-label-md transition-colors ${
              location.pathname === '/products' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {t('tab-products')}
          </Link>
          <Link
            to="/compare"
            className={`font-label-md text-label-md transition-colors ${
              location.pathname === '/compare' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {t('tab-compare')}
          </Link>
          <Link
            to="/ingredients"
            className={`font-label-md text-label-md transition-colors ${
              location.pathname === '/ingredients' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            {t('tab-ingredients')}
          </Link>
        </nav>

        {/* Right Actions: Language, Search, MongoDB Atlas Manager, Drawer, Profile */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Language Switcher */}
          <div
            aria-label="Language Selector"
            className="inline-flex items-center bg-surface-container-high rounded-full p-0.5"
            role="group"
          >
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                lang === 'en'
                  ? 'bg-primary text-on-primary font-bold shadow-[0_1px_4px_rgba(22,71,52,0.1)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                lang === 'hi'
                  ? 'bg-primary text-on-primary font-bold shadow-[0_1px_4px_rgba(22,71,52,0.1)]'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              हिन्दी
            </button>
          </div>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Products"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>

          {/* MongoDB Atlas Manage Products Button */}
          <button
            onClick={onOpenManager}
            title="MongoDB Atlas Database Manager (Add / Edit / Delete Products)"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full text-secondary hover:text-primary hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">database</span>
          </button>

          {/* Menu Drawer Toggle */}
          <button
            onClick={onOpenMenu}
            aria-label="Menu Drawer"
            className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
          </button>

          {/* User / Curator Avatar */}
          <button
            onClick={onOpenContact}
            title="Curator: Anchal (B.Sc. Nutrition & Dietetics)"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 ml-0.5 text-on-primary shadow-sm hover:bg-secondary transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
}
