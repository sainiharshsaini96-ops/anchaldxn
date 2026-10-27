import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCompare } from '../context/CompareContext';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { productsData } from '../data/productsData';

export default function Home({ onOpenContact }) {
  const { lang, t } = useLanguage();
  const { count } = useCompare();
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    fetchProducts({ category: activeCategory })
      .then((data) => setProducts(data))
      .catch(() => setProducts(productsData));
  }, [activeCategory]);

  const categoryChips = [
    { key: 'all', label: t('filter-all') },
    { key: 'beverages', label: t('filter-beverages') },
    { key: 'dietary-supplements', label: t('filter-supplements') },
    { key: 'oral-care', label: t('filter-oral') },
    { key: 'personal-care', label: t('filter-personal') },
  ];

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-8">
      {/* 1. Editorial Hero Section */}
      <section className="px-4 md:px-8 pt-5 md:pt-8 pb-6 md:pb-10 flex flex-col gap-4">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary shadow-sm">
          <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            {t('hero-eyebrow')}
          </span>
        </div>

        {/* Hero Titles & Editorial Narrative */}
        <div className="flex flex-col gap-2.5 max-w-3xl">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
            {t('hero-title')}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {t('hero-desc')}
          </p>
        </div>

        {/* CTA Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#products-archive"
            className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-md hover:bg-secondary transition-all active:scale-95"
          >
            <span>{t('hero-cta-explore')}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
          </a>
          <Link
            to="/ingredients"
            className="px-5 py-3 rounded-full bg-surface-container-lowest text-primary font-label-lg text-label-lg flex items-center justify-center gap-1.5 shadow-sm hover:bg-surface-container-low transition-all border border-surface-container"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">eco</span>
            <span>{t('hero-cta-ingredients')}</span>
          </Link>
        </div>

        {/* Trust Markers Bar */}
        <div className="p-3 md:p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 shadow-sm border border-surface-container-high/60 mt-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px] fill-1">
              check_circle
            </span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              {t('trust-heading')}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-surface-container-high/40">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">menu_book</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('trust-item-1')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">fact_check</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('trust-item-2')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">shield_with_heart</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {t('trust-item-3')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Anchal Bio Section */}
      <section className="px-4 md:px-8 pb-6">
        <div className="p-4 md:p-6 rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-3.5 relative overflow-hidden border border-surface-container">
          <div className="flex items-start gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm text-on-primary font-headline-sm text-headline-sm font-bold">
                A
              </div>
              <div className="w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center absolute -bottom-1 -right-1 shadow-sm">
                <span className="material-symbols-outlined text-[13px]">eco</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">verified</span>
                  <span>{t('owner-badge-1')}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">school</span>
                  <span>{t('owner-badge-2')}</span>
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold leading-tight mt-1">
                {t('owner-title')}
              </h2>
            </div>
          </div>

          <div className="p-2.5 px-3 rounded-xl bg-surface-container-low flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">target</span>
            <p className="font-label-sm text-label-sm text-primary font-semibold">
              <span className="text-secondary uppercase tracking-wider font-bold mr-1">Purpose:</span>
              {t('owner-purpose')}
            </p>
          </div>

          <blockquote className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed pl-3 border-l-2 border-secondary py-0.5 italic">
            {t('owner-quote')}
          </blockquote>

          <div className="p-2.5 rounded-xl bg-surface-container flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">info</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">
              {t('owner-disclaimer')}
            </p>
          </div>

          <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
            <Link
              to="/about"
              className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shadow-sm hover:bg-secondary transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>{t('owner-cta-about')}</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
            <button
              onClick={onOpenContact}
              className="font-label-sm text-label-sm text-secondary font-bold hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">mail</span>
              <span>{t('owner-cta-contact')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Category Quick-Filter Horizontal Scroll Strip (Sticky) */}
      <section className="sticky top-16 z-30 bg-surface/90 backdrop-blur-md py-2.5 px-4 md:px-8 flex items-center shadow-sm border-y border-surface-container">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full py-1">
          {categoryChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setActiveCategory(chip.key)}
              type="button"
              className={`category-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md shrink-0 shadow-sm transition-all active:scale-95 ${
                activeCategory === chip.key
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container-low'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </section>

      {/* Comparison Drawer Quick Floating Banner */}
      {count > 0 && (
        <div className="sticky top-[114px] z-20 px-4 md:px-8 py-2.5 bg-secondary-container text-on-secondary-container flex items-center justify-between shadow-md transition-all animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">balance</span>
            <span className="font-label-md text-label-md font-bold">
              {count} {t('compare-tray-suffix')}
            </span>
          </div>
          <Link
            to="/compare"
            className="px-3.5 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm hover:bg-secondary transition-all"
          >
            {t('compare-now-btn')}
          </Link>
        </div>
      )}

      {/* 3. Featured 8 Curated Products Grid */}
      <section className="px-4 md:px-8 py-6 flex flex-col gap-4" id="products-archive">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
              {t('catalog-eyebrow')}
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              {t('catalog-heading')}
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {lang === 'hi' ? `दिखा रहे हैं: ${filteredProducts.length}` : `Showing: ${filteredProducts.length}`}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.slug || p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. Why Use This Guide? Editorial Integrity Section */}
      <section className="px-4 md:px-8 py-8 flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
            {t('why-eyebrow')}
          </span>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            {t('why-title')}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant pt-1">
            {t('why-desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-2 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {t('pillar1-title')}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {t('pillar1-desc')}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-2 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {t('pillar2-title')}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {t('pillar2-desc')}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container flex flex-col gap-2 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">balance</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {t('pillar3-title')}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {t('pillar3-desc')}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Know What's Inside Botanical Highlights */}
      <section className="px-4 md:px-8 py-6 flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
              {t('inside-eyebrow')}
            </span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              {t('inside-title')}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t('inside-desc')}
            </p>
          </div>
          <Link
            to="/ingredients"
            className="hidden sm:inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold hover:underline"
          >
            <span>{t('inside-cta')}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bot 1 */}
          <Link
            to="/ingredients"
            className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-secondary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">psychology_alt</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary font-bold truncate">
                {t('bot1-name')}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {t('bot1-sub')}
              </span>
            </div>
          </Link>

          {/* Bot 2 */}
          <Link
            to="/ingredients"
            className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-secondary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">water_drop</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary font-bold truncate">
                {t('bot2-name')}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {t('bot2-sub')}
              </span>
            </div>
          </Link>

          {/* Bot 3 */}
          <Link
            to="/ingredients"
            className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container hover:shadow-md transition-all flex items-center gap-3 group"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0 text-secondary group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[26px]">eco</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-md text-label-md text-primary font-bold truncate">
                {t('bot3-name')}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                {t('bot3-sub')}
              </span>
            </div>
          </Link>
        </div>

        <div className="sm:hidden pt-1">
          <Link
            to="/ingredients"
            className="w-full py-2.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5"
          >
            <span>{t('inside-cta')}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 6. Independent Research & Archive Box */}
      <section className="px-4 md:px-8 py-6" id="disclaimer-archive">
        <div className="p-4 md:p-6 rounded-2xl bg-surface-container-low border border-surface-container-high flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
              {t('disc-header')}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant px-2.5 py-0.5 rounded-full bg-surface-container-lowest">
              {t('disc-verified')}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            {t('disc-text')}
          </p>
        </div>
      </section>
    </div>
  );
}
