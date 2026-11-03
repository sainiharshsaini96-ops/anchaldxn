import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductBySlug, fetchProducts } from '../services/api';
import { productsData } from '../data/productsData';
import { useLanguage } from '../context/LanguageContext';
import { useCompare } from '../context/CompareContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const { addToCompare, isInCompare } = useCompare();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState(productsData);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    // 1. Fetch current product
    fetchProductBySlug(id)
      .then((data) => {
        if (!data) {
          const fallback = productsData.find((p) => p.slug === id || p.id === id);
          if (fallback) {
            setProduct(fallback);
          } else {
            setNotFound(true);
          }
        } else {
          setProduct(data);
        }
      })
      .catch(() => {
        const fallback = productsData.find((p) => p.slug === id || p.id === id);
        if (fallback) {
          setProduct(fallback);
        } else {
          setNotFound(true);
        }
      })
      .finally(() => setLoading(false));

    // 2. Fetch full catalog for dynamic related products
    fetchProducts()
      .then((prods) => setAllProducts(prods))
      .catch(() => setAllProducts(productsData));
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-label-md text-label-md text-on-surface-variant animate-pulse">
          Loading verified botanical specifications...
        </p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[65vh] max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-error mb-4">
          <span className="material-symbols-outlined text-[32px]">inventory_2</span>
        </div>
        <h1 className="font-headline-md text-headline-md text-primary font-bold">
          {lang === 'hi' ? 'उत्पाद नहीं मिला' : 'Product Not Found'}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-6">
          {lang === 'hi'
            ? `अनुरोधित उत्पाद पहचानकर्ता "${id}" हमारे पुरालेख में उपलब्ध नहीं है।`
            : `The requested product identifier "${id}" could not be found in our verified archive.`}
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/products"
            className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-secondary transition-all"
          >
            {lang === 'hi' ? 'सभी 8 उत्पाद देखें' : 'Browse All Products'}
          </Link>
          <Link
            to="/"
            className="px-5 py-2.5 rounded-full bg-surface-container-high text-primary font-label-md text-label-md font-semibold hover:bg-surface-variant transition-all"
          >
            {lang === 'hi' ? 'होम पेज' : 'Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  const isAdded = isInCompare(product.slug || product.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Dynamic related products from actual catalog
  const relatedProducts = allProducts
    .filter((p) => (p.slug || p.id) !== (product.slug || product.id))
    .filter((p) => p.category === product.category || p.slug === 'dxn-reishi-gano-rg-gl')
    .slice(0, 2);

  // Clean ingredient keyword for search link
  const getIngredientQuery = (ingText) => {
    if (!ingText) return '';
    const clean = ingText
      .replace(/100%/g, '')
      .replace(/powder/gi, '')
      .replace(/extract/gi, '')
      .replace(/fruit body/gi, '')
      .replace(/mycelium/gi, '')
      .replace(/leaves/gi, '')
      .replace(/concentrate/gi, '')
      .replace(/\(.*?\)/g, '')
      .trim();
    return clean.split(' ')[0] || ingText;
  };

  const productFaqs = [
    {
      qEn: `How is ${product.name} prepared or consumed?`,
      qHi: `${product.name} का सेवन या उपयोग कैसे करें?`,
      aEn: product.directions || 'Follow standard package instructions with lukewarm water before or after meals.',
      aHi: product.translations?.hi?.directions || product.directions || 'भोजन के उपरांत या पूर्व गुनगुने पानी के साथ पैकेज निर्देशों का पालन करें।',
    },
    {
      qEn: `What are the primary active ingredients in this formulation?`,
      qHi: `इस फॉर्मूलेशन में मुख्य सक्रिय तत्व क्या हैं?`,
      aEn: product.keyIngredients || 'Contains pure standardized botanical extracts with zero unverified additives.',
      aHi: product.translations?.hi?.keyIngredients || product.keyIngredients || 'सत्यापित वानस्पतिक अर्क और प्राकृतिक तत्व सम्मिलित हैं।',
    },
    {
      qEn: `What is the recommended storage to preserve purity?`,
      qHi: `उत्पाद की शुद्धता बनाए रखने के लिए रखरखाव निर्देश क्या हैं?`,
      aEn: product.storage || 'Store in a cool, dry place away from direct sunlight.',
      aHi: 'सीधी धूप और नमी से दूर ठंडी व सूखी जगह पर टाइट बंद करके रखें।',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-16">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="px-4 md:px-8 pt-4 pb-2 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-on-surface-variant font-label-md text-label-md">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>{t('tab-home')}</span>
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link to="/products" className="hover:text-primary transition-colors">
          {t('tab-products')}
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <span className="text-primary font-semibold truncate max-w-[240px]">
          {lang === 'hi' && product.translations?.hi?.name ? product.translations.hi.name : product.name}
        </span>
      </nav>

      {/* 2. Product Hero Header */}
      <section className="px-4 md:px-8 pt-2 pb-6 flex flex-col gap-4">
        {/* Meta Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to={`/products?category=${product.category}`}
            className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {product.categoryLabel || product.category}
          </Link>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
            <span>Label Archive Verified • {product.verifiedDate || 'Oct 2024'}</span>
          </span>
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
              {lang === 'hi' && product.translations?.hi?.badge ? product.translations.hi.badge : product.badge}
            </span>
          )}
        </div>

        {/* Title & Editorial Description */}
        <div className="flex flex-col gap-2">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
            {lang === 'hi' && product.translations?.hi?.name ? product.translations.hi.name : product.name}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-3xl">
            {lang === 'hi' && product.translations?.hi?.fullDescription
              ? product.translations.hi.fullDescription
              : product.fullDescription || product.shortDescription}
          </p>
        </div>

        {/* Dynamic Botanical Showcase Gallery */}
        <div className="relative w-full rounded-2xl bg-surface-container-low p-3.5 md:p-5 shadow-sm overflow-hidden flex flex-col gap-3 border border-surface-container-high/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Primary Image */}
            <div className="relative rounded-xl overflow-hidden bg-surface-container flex flex-col items-center">
              <img
                src={product.imageUrl}
                alt={product.imageAlt || product.name}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg flex items-center justify-between shadow-xs">
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  {product.slug === 'dxn-reishi-gano-rg-gl' ? 'RG (Fruiting Body)' : 'Verified Physical Packaging'}
                </span>
                <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
              </div>
            </div>

            {/* Secondary Image or Botanical Harvest Info */}
            <div className="relative rounded-xl overflow-hidden bg-surface-container flex flex-col items-center justify-center">
              {product.secondaryImageUrl ? (
                <>
                  <img
                    src={product.secondaryImageUrl}
                    alt={`${product.name} botanical harvest view`}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg flex items-center justify-between shadow-xs">
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      {product.slug === 'dxn-reishi-gano-rg-gl' ? 'GL (Mycelium Culture)' : 'Active Botanical Source'}
                    </span>
                    <span className="material-symbols-outlined text-[15px] text-secondary">grain</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-48 md:h-64 p-6 bg-surface-container-lowest flex flex-col justify-center items-center text-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[28px]">eco</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                      100% Standardized Botanical
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mt-1">
                      {product.keyIngredients}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                    Zero Synthetic Coatings
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-on-surface-variant font-label-sm text-label-sm pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">nest_eco_leaf</span>
              Pure Botanical Extracts & Monitored Standards
            </span>
            <span className="font-semibold text-primary">
              {product.formFactor || 'Verified Formulation'}
            </span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href="#ingredients-section"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('ingredients-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-secondary active:scale-[0.98] transition-all shadow-sm font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">biotech</span>
            <span>Explore Ingredients</span>
          </a>

          <button
            onClick={() => addToCompare(product)}
            className={`inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-full font-label-md text-label-md transition-all font-semibold active:scale-[0.98] ${
              isAdded
                ? 'bg-secondary text-on-secondary shadow-md'
                : 'bg-surface-container-high text-primary hover:bg-surface-variant'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAdded ? 'check_circle' : 'add_circle'}
            </span>
            <span>{isAdded ? 'Added to Compare' : 'Compare'}</span>
          </button>

          <button
            onClick={handleShare}
            aria-label="Share Guide"
            className="w-11 h-11 shrink-0 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-variant active:scale-[0.98] transition-all"
            type="button"
            title="Share this product sheet"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'share'}
            </span>
          </button>
        </div>
      </section>

      {/* 3. DYNAMIC SECTION: Either Dual Matrix (RG/GL) OR Full Product Characteristics */}
      {product.matrixBreakdown && product.matrixBreakdown.rgVsGl ? (
        /* A. Dual Botanical Matrix (Exclusively for RG & GL) */
        <section className="px-4 md:px-8 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
                Comparative Breakdown
              </span>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                Dual Botanical Matrix (RG vs GL)
              </h2>
            </div>
            <span className="material-symbols-outlined text-secondary text-[24px]">balance</span>
          </div>

          <div className="w-full bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4 border border-surface-container">
            {/* Headers */}
            <div className="grid grid-cols-2 gap-3 pb-3 bg-surface-container-low p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="font-label-sm text-label-sm text-on-primary font-bold">RG</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary font-bold leading-tight">Reishi Gano</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Mature Stage (90d)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <span className="font-label-sm text-label-sm text-on-secondary font-bold">GL</span>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-primary font-bold leading-tight">Ganocelium</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Mycelium Stage (14d)</p>
                </div>
              </div>
            </div>

            {/* Matrix Rows */}
            {product.matrixBreakdown.comparisonData &&
              product.matrixBreakdown.comparisonData.map((row, rIdx) => (
                <div key={rIdx} className="flex flex-col gap-1.5 pb-2 border-b border-surface-container/60 last:border-b-0">
                  <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold uppercase">
                    <span className="material-symbols-outlined text-[16px] text-secondary">bubble_chart</span>
                    <span>{row.parameter}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 font-body-sm text-body-sm">
                    <div className="bg-surface-container-low/60 rounded-xl p-3 text-on-surface">
                      {row.rgDetail}
                    </div>
                    <div className="bg-surface-container-low/60 rounded-xl p-3 text-on-surface">
                      {row.glDetail}
                    </div>
                  </div>
                </div>
              ))}

            {/* Pairing Banner */}
            <div className="bg-primary text-on-primary rounded-xl p-3.5 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-secondary-fixed text-[22px] shrink-0 mt-0.5">
                join_right
              </span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-secondary-fixed">
                  Recommended Companion Ratio
                </span>
                <p className="font-body-sm text-body-sm text-on-primary/90 pt-0.5 leading-snug">
                  {product.companionNotes || 'Both formulations are traditionally consumed together in equal 1:1 proportion as balanced botanical companions.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* B. General Botanical Profile & Bioactive Matrix (For other 7 products) */
        <section className="px-4 md:px-8 py-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
                Nutritional & Botanical Profile
              </span>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                Core Specifications & Active Markers
              </h2>
            </div>
            <span className="material-symbols-outlined text-secondary text-[24px]">science</span>
          </div>

          <div className="w-full bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4 border border-surface-container">
            {/* 1. Bioactive Markers */}
            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1.5 uppercase">
                <span className="material-symbols-outlined text-secondary text-[16px]">biotech</span>
                <span>Active Bioactive Markers</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.bioactiveMarkers && product.bioactiveMarkers.length > 0 ? (
                  product.bioactiveMarkers.map((marker, mIdx) => (
                    <span
                      key={mIdx}
                      className="px-3 py-1 rounded-full bg-secondary-container/70 text-on-secondary-container font-label-md text-label-md font-semibold flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span>{marker}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-body-sm text-on-surface-variant">
                    Standardized herbal components documented on packaging archive.
                  </span>
                )}
              </div>
            </div>

            {/* 2. Form Factor & Pack Sizes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-surface-container">
              <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold">
                  Packaging / Form Factor
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {product.formFactor}
                </span>
              </div>
              <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1">
                <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-bold">
                  Available Pack Sizes
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {product.packSizes && product.packSizes.length > 0
                    ? product.packSizes.join(', ')
                    : 'Standard verified packaging unit'}
                </span>
              </div>
            </div>

            {/* 3. Companion Pairing Recommendation */}
            {product.companionNotes && (
              <div className="bg-primary/95 text-on-primary rounded-xl p-3.5 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px] shrink-0 mt-0.5">
                  recommend
                </span>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md font-bold text-secondary-fixed">
                    Curator’s Companion Synergy
                  </span>
                  <p className="font-body-sm text-body-sm text-on-primary/90 pt-0.5 leading-snug">
                    {product.companionNotes}
                  </p>
                </div>
              </div>
            )}

            {/* 4. Precaution / Advisory Callout */}
            {product.caution && (
              <div className="bg-error-container/30 border border-error-container p-3 rounded-xl flex items-start gap-2">
                <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">info</span>
                <p className="font-label-sm text-label-sm text-on-error-container">
                  <strong className="font-bold">Precaution Note:</strong> {product.caution}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Ingredients & Verified Composition (With Interactive Links to Ingredients Guide) */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-3" id="ingredients-section">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              Purity & Formulation
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              Ingredients & Composition
            </h2>
          </div>
          <Link
            to="/ingredients"
            className="text-secondary font-label-md text-label-md font-bold hover:underline flex items-center gap-1"
          >
            <span>Full Ingredient Guide</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.ingredientsList && product.ingredientsList.length > 0 ? (
            product.ingredientsList.map((ing, idx) => {
              const query = getIngredientQuery(ing);
              return (
                <div
                  key={idx}
                  className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col justify-between gap-2 border border-surface-container hover:border-secondary/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span className="font-label-md text-label-md text-primary font-bold">
                        Component {idx + 1}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px] font-semibold">
                      Verified
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface font-medium">
                    {ing}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-surface-container/60 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="flex items-center gap-1 text-[11px]">
                      <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                      Clean packaging label
                    </span>

                    {query && (
                      <Link
                        to={`/ingredients?search=${encodeURIComponent(query)}`}
                        className="text-secondary font-bold hover:underline flex items-center gap-0.5 text-[11px]"
                      >
                        <span>Explore Monograph</span>
                        <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-2 border border-surface-container col-span-2">
              <span className="font-label-md text-label-md text-primary font-bold">Key Ingredients Breakdown</span>
              <p className="font-body-md text-body-md text-on-surface">{product.keyIngredients}</p>
            </div>
          )}
        </div>

        {/* Clean Label Guarantee Banner */}
        <div className="bg-surface-container-high/60 rounded-xl p-3.5 flex items-start gap-2.5 border border-surface-container-high">
          <span className="material-symbols-outlined text-[20px] text-primary shrink-0">fact_check</span>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold text-primary">
              Verified Clean Label Guarantee
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant pt-0.5">
              Physical package archives verify no unauthorized synthetic colorants or unlisted binders.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Directions for Use & Storage Protocol */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-3">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
            Serving Protocol
          </span>
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
            Directions & Storage
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4 border border-surface-container">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">local_cafe</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary font-bold">
                Verified Label Directions
              </span>
              <p className="font-body-md text-body-md text-on-surface pt-0.5 leading-relaxed">
                {lang === 'hi' && product.translations?.hi?.directions
                  ? product.translations.hi.directions
                  : product.directions}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t border-surface-container">
            <div className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">thermostat</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-primary font-bold">
                Storage & Quality Maintenance
              </span>
              <p className="font-body-md text-body-md text-on-surface pt-0.5 leading-relaxed">
                {product.storage} Keep container tightly closed in a dry place away from heat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Product FAQs */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              Common Inquiries
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <Link to="/faqs" className="text-secondary font-label-md text-label-md font-bold hover:underline">
            View All FAQs
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          {productFaqs.map((faq, fIdx) => (
            <div
              key={fIdx}
              className="bg-surface-container-lowest rounded-xl border border-surface-container overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                className="w-full text-left p-3.5 flex items-center justify-between gap-3 hover:bg-surface-container-low transition-colors"
              >
                <span className="font-label-md text-label-md text-primary font-bold">
                  {lang === 'hi' ? faq.qHi : faq.qEn}
                </span>
                <span
                  className={`material-symbols-outlined text-secondary text-[20px] transition-transform ${
                    activeFaq === fIdx ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </button>
              {activeFaq === fIdx && (
                <div className="px-3.5 pb-3.5 pt-1 text-body-sm text-body-sm text-on-surface border-t border-surface-container/60 animate-fadeIn">
                  {lang === 'hi' ? faq.aHi : faq.aEn}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Related Educational Selections */}
      {relatedProducts.length > 0 && (
        <section className="px-4 md:px-8 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
              Related Educational Selections
            </h2>
            <Link to="/products" className="text-secondary font-label-md text-label-md font-bold hover:underline">
              All Products
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug || p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
