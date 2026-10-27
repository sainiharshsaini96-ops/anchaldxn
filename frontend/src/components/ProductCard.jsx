import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCompare } from '../context/CompareContext';

export default function ProductCard({ product, detailed = false }) {
  const { lang, t } = useLanguage();
  const { addToCompare, isInCompare } = useCompare();

  const isAdded = isInCompare(product.slug || product.id);

  const getCategoryTitle = (cat) => {
    switch (cat) {
      case 'dietary-supplements':
        return t('filter-supplements').replace(/\s*\(\d+\)/, '');
      case 'beverages':
        return t('filter-beverages').replace(/\s*\(\d+\)/, '');
      case 'oral-care':
        return t('filter-oral').replace(/\s*\(\d+\)/, '');
      case 'personal-care':
        return t('filter-personal').replace(/\s*\(\d+\)/, '');
      default:
        return product.categoryLabel || 'Wellness';
    }
  };

  const getDisplayTitle = () => {
    if (lang === 'hi' && product.translations?.hi?.name) {
      return product.translations.hi.name;
    }
    return product.name;
  };

  const getDisplayDesc = () => {
    if (lang === 'hi' && product.translations?.hi?.shortDescription) {
      return product.translations.hi.shortDescription;
    }
    return product.shortDescription;
  };

  const getDisplayBadge = () => {
    if (lang === 'hi' && product.translations?.hi?.badge) {
      return product.translations.hi.badge;
    }
    return product.badge;
  };

  return (
    <article
      data-category={product.category}
      className="product-item rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-[0_12px_32px_-4px_rgba(22,71,52,0.08)] transition-all flex flex-col gap-3 relative overflow-hidden group border border-transparent hover:border-surface-container"
    >
      <div className="flex items-start gap-3.5">
        {/* Botanical Image Thumbnail */}
        <div className="w-24 h-28 rounded-xl overflow-hidden bg-surface-container shrink-0 relative flex items-center justify-center p-1.5 shadow-sm">
          <img
            src={product.imageUrl}
            alt={product.imageAlt || product.name}
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-1 left-1 bg-primary text-on-primary font-label-sm text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
              {getDisplayBadge()}
            </span>
          )}
        </div>

        {/* Info Column */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-[10px] font-bold tracking-wider uppercase">
              {getCategoryTitle(product.category)}
            </span>
            <span className="flex items-center gap-0.5 text-secondary font-label-sm text-[10px]" title="Label Archive Verified">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>{product.verifiedDate || 'Archive'}</span>
            </span>
          </div>

          <h3 className="font-headline-sm text-headline-sm text-primary font-bold leading-snug line-clamp-2">
            <Link to={`/product/${product.slug}`} className="hover:text-secondary transition-colors">
              {getDisplayTitle()}
            </Link>
          </h3>

          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              {product.category === 'beverages' ? 'coffee' : product.category === 'oral-care' ? 'dentistry' : product.category === 'personal-care' ? 'soap' : 'medication'}
            </span>
            <span className="truncate">{product.formFactor}</span>
          </div>
        </div>
      </div>

      {/* Key Botanical Ingredients Box */}
      <div className="bg-surface-container-low rounded-xl p-2.5 flex flex-col gap-1">
        <span className="font-label-sm text-[11px] uppercase tracking-wide text-on-surface-variant font-bold">
          {lang === 'hi' ? 'प्रमुख सामग्री:' : 'Key Ingredients:'}
        </span>
        <p className="font-body-sm text-body-sm text-on-surface leading-snug">
          {lang === 'hi' && product.translations?.hi?.keyIngredients
            ? product.translations.hi.keyIngredients
            : product.keyIngredients}
        </p>
      </div>

      {detailed && (
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          {getDisplayDesc()}
        </p>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <Link
          to={`/product/${product.slug}`}
          className="flex-1 py-2 px-3 rounded-full bg-surface-container-high text-primary hover:bg-secondary-container hover:text-on-secondary-container font-label-md text-label-md text-center transition-colors flex items-center justify-center gap-1 font-semibold"
        >
          <span>{t('btn-view-details')}</span>
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </Link>

        <button
          onClick={() => addToCompare(product)}
          type="button"
          className={`compare-toggle-btn py-2 px-3.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1 shadow-sm font-semibold active:scale-95 ${
            isAdded
              ? 'bg-secondary text-on-secondary shadow-md'
              : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {isAdded ? 'check_circle' : 'add_circle'}
          </span>
          <span>{isAdded ? t('btn-added') : t('btn-compare')}</span>
        </button>
      </div>
    </article>
  );
}
