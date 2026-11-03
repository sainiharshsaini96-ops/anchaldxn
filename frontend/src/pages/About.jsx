import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function About({ onOpenContact }) {
  const { lang, t } = useLanguage();

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-4 pb-2 flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>Home</span>
        </Link>
        <span className="text-outline-variant">/</span>
        <span className="text-primary font-bold">
          {lang === 'hi' ? 'आंचल के बारे में' : 'About Anchal'}
        </span>
      </nav>

      {/* Hero Bio Card */}
      <section className="mt-4 p-6 md:p-8 rounded-3xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 items-start">
        <div className="relative shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-primary flex items-center justify-center text-on-primary font-headline-lg text-[42px] font-bold shadow-lg">
            A
          </div>
          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center absolute -bottom-2 -right-2 shadow-md">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">eco</span>
              Owner & Independent Researcher
            </span>
            <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">school</span>
              Pursuing B.Sc. Nutrition & Dietetics
            </span>
          </div>

          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary font-bold">
            Meet Anchal
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {t('owner-quote')}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm hover:bg-secondary transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>Send Direct Inquiry</span>
            </button>
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold hover:bg-surface-variant transition-all"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Plain Language First
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Transforming complicated regulatory packaging and scientific nomenclature into clear, accessible product notes for everyday consumers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">fact_check</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Zero Marketing Hype
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            All details presented on DXNANCHAL are referenced directly from physical packaging archives and official company product labels without exaggerated claims.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 flex flex-col gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">translate</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Bilingual Accessibility
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Full support for English and Hindi (हिन्दी) readers, ensuring barrier-free health literacy across diverse Indian and global communities.
          </p>
        </div>
      </section>

      {/* Academic Disclaimer Box */}
      <section className="mt-8 p-5 rounded-2xl bg-surface-container-high/60 border border-surface-container-high flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-bold">
          <span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
          <span>Educational Disclaimer</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          {t('owner-disclaimer')}
        </p>
      </section>
    </div>
  );
}
