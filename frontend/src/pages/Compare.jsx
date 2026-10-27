import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompare } from '../context/CompareContext';
import { useLanguage } from '../context/LanguageContext';
import { productsData } from '../data/productsData';

export default function Compare() {
  const { compareList, removeFromCompare, addToCompare, clearCompare } = useCompare();
  const { lang, t } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);

  // Default to 3 slots
  const slots = [0, 1, 2];

  // If compareList is empty, default to first 3 items so the user immediately sees a rich comparison matrix!
  const effectiveList = compareList.length > 0 ? compareList : productsData.slice(0, 3);

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-16">
      {/* Editorial Breadcrumb & Intro Header */}
      <section className="px-4 md:px-8 pt-4 pb-2 flex flex-col gap-2">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">home</span>
            <span>Home</span>
          </Link>
          <span className="material-symbols-outlined text-[12px] text-outline">chevron_right</span>
          <span className="font-label-sm text-label-sm text-primary font-bold">Compare Products</span>
        </nav>

        <div className="flex flex-col gap-1 mt-1">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary">
            <span className="material-symbols-outlined text-[14px] text-secondary">balance</span>
            <span className="font-label-sm text-label-sm tracking-wide uppercase font-bold">Objective Matrix</span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
            Compare Products
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-2xl">
            Review factual side-by-side comparisons of ingredients, verified packaging details, and directions without promotional bias.
          </p>
        </div>
      </section>

      {/* Interactive Comparison Slot Strip (3 Slots) */}
      <section className="px-4 md:px-8 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            <span>
              Compared Items ({effectiveList.length}/3)
            </span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              type="button"
              className="font-label-sm text-label-sm text-primary bg-surface-container-high hover:bg-secondary-container px-3 py-1 rounded-full transition-all flex items-center gap-1 font-semibold"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>Change / Add</span>
            </button>
            <button
              onClick={clearCompare}
              type="button"
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-error flex items-center gap-1 px-2.5 py-1 rounded-full hover:bg-error-container/30 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Active Slots Horizontal Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {slots.map((idx) => {
            const product = effectiveList[idx];

            if (product) {
              return (
                <div
                  key={product.slug || idx}
                  className="relative bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm flex flex-col justify-between group transition-all duration-300 border border-surface-container hover:shadow-md"
                >
                  <button
                    onClick={() => removeFromCompare(product.slug || product.id)}
                    type="button"
                    title="Remove item"
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-surface-container-high hover:bg-error-container hover:text-error text-on-surface-variant flex items-center justify-center transition-colors z-10"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>

                  <div className="flex flex-col gap-2">
                    <div className="w-full h-28 rounded-xl bg-surface-container overflow-hidden relative">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-primary-container/90 text-on-primary font-label-sm text-[10px] font-bold">
                        {product.categoryLabel || product.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-label-md text-label-md text-primary font-bold leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5 line-clamp-1">
                        {product.subtitle || product.formFactor}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>
                      <span>{product.verifiedDate || 'Oct 2024'}</span>
                    </span>
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-secondary font-bold hover:underline flex items-center"
                    >
                      Specs <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                onClick={() => setShowAddModal(true)}
                className="bg-surface-container-lowest/60 rounded-2xl p-6 border-2 border-dashed border-surface-container flex flex-col items-center justify-center gap-2 text-center text-on-surface-variant cursor-pointer hover:bg-surface-container-low transition-all min-h-[190px]"
              >
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </div>
                <span className="font-label-md text-label-md font-semibold text-primary">
                  Slot {idx + 1} Empty
                </span>
                <span className="font-label-sm text-[12px] text-on-surface-variant">
                  Tap to add a product
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Side-by-Side Detailed Specification Matrix */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-6">
        {/* Category 1: Overview */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm border border-surface-container flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[20px]">inventory</span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              1. General Overview & Classification
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {effectiveList.map((p, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-3 bg-surface-container-low/60 rounded-xl">
                <span className="font-label-md text-label-md font-bold text-primary">
                  {p.name}
                </span>
                <div className="flex flex-col gap-1 text-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold">Category</span>
                  <span className="text-on-surface font-medium">{p.categoryLabel || p.category}</span>
                </div>
                <div className="flex flex-col gap-1 text-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold">Form Factor</span>
                  <span className="text-on-surface font-medium">{p.formFactor}</span>
                </div>
                <div className="flex flex-col gap-1 text-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold">Pack Options</span>
                  <span className="text-on-surface font-medium">
                    {p.packSizes ? p.packSizes.join(', ') : 'Standard verified pack'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Bioactives & Ingredients */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm border border-surface-container flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[20px]">biotech</span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              2. Core Bioactive Botanical Profile
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {effectiveList.map((p, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-3 bg-surface-container-low/60 rounded-xl">
                <span className="font-label-md text-label-md font-bold text-primary">
                  {p.name}
                </span>
                <div className="flex flex-col gap-1 text-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold">Primary Ingredients</span>
                  <span className="text-on-surface font-medium">{p.keyIngredients}</span>
                </div>
                <div className="flex flex-col gap-1 text-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold">Bioactive Markers</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.bioactiveMarkers &&
                      p.bioactiveMarkers.map((b, bIdx) => (
                        <span key={bIdx} className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary text-[11px] font-semibold">
                          {b}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 3: Directions & Usage */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm border border-surface-container flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              3. Directions, Storage & Precautions
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {effectiveList.map((p, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-3 bg-surface-container-low/60 rounded-xl">
                <span className="font-label-md text-label-md font-bold text-primary">
                  {p.name}
                </span>
                <div className="flex flex-col gap-1 text-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold">Usage Protocol</span>
                  <span className="text-on-surface font-medium">{p.directions}</span>
                </div>
                <div className="flex flex-col gap-1 text-body-sm text-body-sm">
                  <span className="text-on-surface-variant font-label-sm text-[11px] uppercase font-bold">Storage Note</span>
                  <span className="text-on-surface font-medium">{p.storage}</span>
                </div>
                {p.caution && (
                  <div className="flex items-start gap-1.5 p-2 rounded bg-error-container/30 text-on-error-container text-[11px]">
                    <span className="material-symbols-outlined text-[15px] shrink-0 mt-0.5">info</span>
                    <span>{p.caution}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
          <div
            className="w-full max-w-xl bg-surface-container-lowest rounded-2xl p-6 shadow-2xl border border-surface-container flex flex-col gap-4 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                  Choose a Product to Compare
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Select up to 3 selections for side-by-side analysis.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {productsData.map((prod) => {
                const inComp = compareList.some((p) => p.slug === prod.slug);
                return (
                  <div
                    key={prod.slug}
                    onClick={() => {
                      addToCompare(prod);
                      setShowAddModal(false);
                    }}
                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                      inComp
                        ? 'bg-secondary-container/60 border border-secondary'
                        : 'bg-surface-container-low hover:bg-surface-container'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-surface-container shrink-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-primary font-bold">
                          {prod.name}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {prod.categoryLabel || prod.category} • {prod.formFactor}
                        </span>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-[22px]">
                      {inComp ? 'check_circle' : 'add_circle'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
