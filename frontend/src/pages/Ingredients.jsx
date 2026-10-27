import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchIngredients } from '../services/api';
import { ingredientsData } from '../data/ingredientsData';

export default function Ingredients() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchIngredients({ category: selectedFilter, search })
      .then((data) => setIngredients(data))
      .catch(() => setIngredients(ingredientsData))
      .finally(() => setLoading(false));
  }, [selectedFilter, search]);

  const filterChips = [
    { key: 'all', label: 'All Ingredients', icon: 'eco', count: 8 },
    { key: 'botanicals', label: 'Botanicals & Herbs', icon: 'psychology_alt' },
    { key: 'algae', label: 'Algae', icon: 'water_drop' },
    { key: 'beverage', label: 'Beverage Bases', icon: 'coffee' },
    { key: 'personal', label: 'Oral & Skin Care', icon: 'spa' },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-16">
      {/* Top Hero & Context Header */}
      <section className="w-full px-4 md:px-8 pt-4 pb-2 flex flex-col gap-2">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">home</span>
            <span>Home</span>
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-primary font-bold">{t('tab-ingredients')}</span>
        </nav>

        {/* Page Title & Subtitle */}
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Botanical Compendium
          </span>
        </div>
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
          {t('tab-ingredients')}
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-2xl">
          Understand the botanical origins, traditional context, and verified product listings for all key active ingredients in the 8 DXN products.
        </p>
      </section>

      {/* Interactive Search & Sticky Filter Ribbon */}
      <section className="w-full px-4 md:px-8 py-3 flex flex-col gap-3">
        {/* Search Bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients (e.g. Ganoderma, Roselle, Spirulina)..."
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

        {/* Quick Filter Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {filterChips.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setSelectedFilter(chip.key)}
              type="button"
              className={`filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 shadow-sm ${
                selectedFilter === chip.key
                  ? 'text-on-primary bg-primary font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-surface-container'
              }`}
            >
              <span className={`material-symbols-outlined text-[16px] ${selectedFilter === chip.key ? 'text-on-primary' : 'text-secondary'}`}>
                {chip.icon}
              </span>
              <span>{chip.label}</span>
              {chip.count && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${selectedFilter === chip.key ? 'text-primary-fixed bg-primary-container' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  {chip.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Educational Disclaimer Notice Card */}
      <div className="px-4 md:px-8 py-2">
        <div className="bg-surface-container-low rounded-2xl p-4 flex gap-3 shadow-[0_2px_8px_rgba(22,71,52,0.03)] border border-surface-container-high/60">
          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-primary font-bold">
                Standardized Monograph Index
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-secondary-variant bg-secondary-container/70 px-1.5 py-0.5 rounded">
                Vetted 2025
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
              Each profile breaks down botanical origins, documented biochemical markers, and exact mapping to DXN formulation lines.
            </p>
          </div>
        </div>
      </div>

      {/* Ingredient Cards Stream */}
      <section className="w-full px-4 md:px-8 py-4 flex flex-col gap-6">
        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : ingredients.length === 0 ? (
          <div className="text-center py-10 text-on-surface-variant">
            No botanical entries found matching "{search}".
          </div>
        ) : (
          ingredients.map((item) => (
            <article
              key={item.slug || item.id}
              className="ingredient-card bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-[0_4px_20px_-2px_rgba(22,71,52,0.04)] border border-surface-container flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      {item.categoryLabel || item.category}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px]">stars</span>
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                    {item.botanicalName}
                  </h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant italic">
                    {item.commonName}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[26px]">
                    {item.category === 'algae' ? 'water_drop' : item.category === 'beverage' ? 'coffee' : 'psychology_alt'}
                  </span>
                </div>
              </div>

              {/* Overview Image */}
              <div className="w-full h-44 md:h-60 rounded-xl overflow-hidden my-3 relative bg-surface-container">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt || item.botanicalName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface px-2.5 py-0.5 rounded-md font-label-sm text-label-sm">
                  Harvest: {item.harvestStage}
                </div>
              </div>

              <p className="font-body-md text-body-md text-on-surface mb-3 leading-relaxed">
                {item.overview}
              </p>

              {/* Verified Components */}
              <div className="bg-surface-container-low rounded-xl p-3.5 mb-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">science</span>
                  <span className="font-label-md text-label-md text-primary font-bold">
                    Verified Natural Components
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.biochemicalComponents &&
                    item.biochemicalComponents.map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-md bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold shadow-xs"
                      >
                        {c}
                      </span>
                    ))}
                </div>
              </div>

              {/* Featured In Products List */}
              {item.featuredProducts && item.featuredProducts.length > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-label-md text-on-surface-variant font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">inventory_2</span>
                      Featured DXN Formulations ({item.featuredProducts.length}):
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold">Tap to view</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {item.featuredProducts.map((fp, fIdx) => (
                      <Link
                        key={fIdx}
                        to={`/product/${fp.productSlug}`}
                        className="p-2.5 rounded-xl bg-surface-container hover:bg-secondary-container/40 transition-colors flex items-center gap-2 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-secondary shrink-0 group-hover:scale-125 transition-transform"></span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-label-md text-label-md text-primary font-bold truncate">
                            {fp.name}
                          </span>
                          <span className="font-label-sm text-[11px] text-on-surface-variant truncate">
                            {fp.note}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Precaution Callout */}
              {item.precaution && (
                <div className="flex items-center gap-2 bg-error-container/30 p-3 rounded-xl border border-error-container">
                  <span className="material-symbols-outlined text-error text-[18px] shrink-0">info</span>
                  <span className="font-label-sm text-label-sm text-on-error-container">
                    <strong className="font-bold">Precaution:</strong> {item.precaution}
                  </span>
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
}
