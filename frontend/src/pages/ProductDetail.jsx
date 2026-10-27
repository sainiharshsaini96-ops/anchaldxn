import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductBySlug } from '../services/api';
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
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProductBySlug(id)
      .then((data) => setProduct(data))
      .catch(() => {
        const fallback = productsData.find((p) => p.slug === id || p.id === id) || productsData[0];
        setProduct(fallback);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !product) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
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

  const relatedProducts = productsData
    .filter((p) => p.slug !== product.slug && (p.category === product.category || p.slug === 'dxn-reishi-gano-rg-gl'))
    .slice(0, 2);

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-16">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="px-4 md:px-8 pt-4 pb-2 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-on-surface-variant font-label-md text-label-md">
        <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">home</span>
          <span>Home</span>
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <Link to="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
        <span className="text-primary font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* 2. Product Hero Header */}
      <section className="px-4 md:px-8 pt-2 pb-6 flex flex-col gap-4">
        {/* Meta Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
            {product.categoryLabel || product.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm shadow-sm border border-surface-container">
            <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
            <span>Label Archive Verified • {product.verifiedDate || 'Oct 2024'}</span>
          </span>
        </div>

        {/* Title & Editorial Description */}
        <div className="flex flex-col gap-2">
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
            {product.name}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-3xl">
            {product.fullDescription || product.shortDescription}
          </p>
        </div>

        {/* Dual Hero Botanical Showcase */}
        <div className="relative w-full rounded-2xl bg-surface-container-low p-3.5 md:p-5 shadow-sm overflow-hidden flex flex-col gap-3 border border-surface-container-high/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Image 1 */}
            <div className="relative rounded-xl overflow-hidden bg-surface-container flex flex-col items-center">
              <img
                src={product.imageUrl}
                alt={product.imageAlt || product.name}
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  {product.slug === 'dxn-reishi-gano-rg-gl' ? 'RG (Fruiting Body)' : 'Product Package'}
                </span>
                <span className="material-symbols-outlined text-[15px] text-secondary">nature</span>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative rounded-xl overflow-hidden bg-surface-container flex flex-col items-center">
              <img
                src={
                  product.secondaryImageUrl ||
                  'https://lh3.googleusercontent.com/aida-public/AB6AXuCbQnP5FhZDZ40khVDi89zAFvTG9hq0w2AOB3t1gQFlD8AHeHUmZ4eNe65qqcX8tHgxDvDc-bITQShnX_rNXG7SQ-5SSFSCA0YF8VOoybBhKqJN3bNm8Df4qoNnMu3eqkJaTMUFLVKmlpbYYlhV28p4ILVVjCPUe9TD-JgAU1a_cFTOpcW2DjOGPBegJb4FOhVQfhjIA9aVjfYwaVDVfeUsb-5U3OlNip74NPnkjui1pB5y6Gra-S31Mg'
                }
                alt="Botanical closeup"
                className="w-full h-48 md:h-64 object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  {product.slug === 'dxn-reishi-gano-rg-gl' ? 'GL (Mycelium Culture)' : 'Active Botanical Harvest'}
                </span>
                <span className="material-symbols-outlined text-[15px] text-secondary">grain</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1 text-on-surface-variant font-label-sm text-label-sm pt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">nest_eco_leaf</span>
              100% Pure Botanical Extracts
            </span>
            <span className="font-semibold text-primary">
              {product.badge || 'Verified Botanical Selection'}
            </span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href="#ingredients-section"
            className="flex-1 inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-secondary active:scale-[0.98] transition-all shadow-sm font-semibold"
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
            <span>{isAdded ? 'Added' : 'Compare'}</span>
          </button>

          <button
            onClick={handleShare}
            aria-label="Share Guide"
            className="w-11 h-11 shrink-0 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-variant active:scale-[0.98] transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {copied ? 'check' : 'share'}
            </span>
          </button>
        </div>
      </section>

      {/* 3. In-Depth Side-by-Side Dual Comparison Matrix */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              Comparative Breakdown
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Dual Botanical Matrix
            </h3>
          </div>
          <span className="material-symbols-outlined text-secondary text-[24px]">balance</span>
        </div>

        {/* Comparison Table Card */}
        <div className="w-full bg-surface-container-lowest rounded-2xl p-4 md:p-6 shadow-sm flex flex-col gap-4 border border-surface-container">
          {/* Headers */}
          <div className="grid grid-cols-2 gap-3 pb-3 bg-surface-container-low p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="font-label-sm text-label-sm text-on-primary font-bold">RG</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-primary font-bold leading-tight">Reishi Gano</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Mature Stage</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="font-label-sm text-label-sm text-on-secondary font-bold">GL</span>
              </div>
              <div>
                <p className="font-label-md text-label-md text-primary font-bold leading-tight">Ganocelium</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Mycelium Stage</p>
              </div>
            </div>
          </div>

          {/* Parameter 1 */}
          <div className="flex flex-col gap-1.5 pb-2">
            <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
              <span>MUSHROOM HARVEST STAGE</span>
            </div>
            <div className="grid grid-cols-2 gap-3 font-body-sm text-body-sm">
              <div className="bg-surface-container-low/60 rounded-xl p-3 text-on-surface">
                Mature <strong className="text-primary font-semibold">90-day</strong> cultivated red mushroom fruiting body.
              </div>
              <div className="bg-surface-container-low/60 rounded-xl p-3 text-on-surface">
                Tender <strong className="text-primary font-semibold">14-day</strong> harvested mushroom mycelium filaments.
              </div>
            </div>
          </div>

          {/* Parameter 2 */}
          <div className="flex flex-col gap-1.5 pb-2">
            <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px] text-secondary">bubble_chart</span>
              <span>CHARACTERISTIC BIOCHEMICAL PROFILE</span>
            </div>
            <div className="grid grid-cols-2 gap-3 font-body-sm text-body-sm">
              <div className="bg-surface-container-low/60 rounded-xl p-3 text-on-surface">
                Rich in polysaccharides, <strong className="text-primary font-medium">triterpenoids</strong>, adenosine, & Ganoderic essence.
              </div>
              <div className="bg-surface-container-low/60 rounded-xl p-3 text-on-surface">
                High in <strong className="text-primary font-medium">organic germanium</strong>, polysaccharidal mycelial fractions, & minerals.
              </div>
            </div>
          </div>

          {/* Parameter 3 */}
          <div className="flex flex-col gap-1.5 pb-2">
            <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[16px] text-secondary">inventory_2</span>
              <span>STANDARD PACK SIZES</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container-low/60 rounded-xl p-3 flex items-center justify-between text-on-surface font-label-sm text-label-sm">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-semibold">30 caps</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-semibold">90 caps</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-semibold">360 caps</span>
              </div>
              <div className="bg-surface-container-low/60 rounded-xl p-3 flex items-center justify-between text-on-surface font-label-sm text-label-sm">
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-semibold">30 caps</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-semibold">90 caps</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-semibold">360 caps</span>
              </div>
            </div>
          </div>

          {/* Parameter 4: Pairing Banner */}
          <div className="bg-primary text-on-primary rounded-xl p-3.5 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-secondary-fixed text-[22px] shrink-0 mt-0.5">
              join_right
            </span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold text-secondary-fixed">
                Recommended Companion Ratio
              </span>
              <p className="font-body-sm text-body-sm text-on-primary/90 pt-0.5 leading-snug">
                Both formulations are traditionally consumed together in equal 1:1 proportion as balanced botanical companions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ingredients and Verified Composition */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-3" id="ingredients-section">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
            Purity & Formulation
          </span>
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Ingredients & Composition
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.ingredientsList && product.ingredientsList.length > 0 ? (
            product.ingredientsList.map((ing, idx) => (
              <div key={idx} className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-2 border border-surface-container">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                    <span className="font-label-lg text-label-lg text-primary font-bold">
                      Component {idx + 1}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                    Verified
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-medium">
                  {ing}
                </p>
                <div className="flex items-center gap-1.5 pt-1 text-on-surface-variant font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                  <span>Zero fillers, binders, or synthetic coatings</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-2 border border-surface-container">
              <span className="font-label-md text-label-md text-primary font-bold">Ingredients Breakdown</span>
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
              No artificial preservatives, colorants, or synthetic binders listed on verified pack archive.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Directions for Use & Serving Instructions */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-3">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
            Serving Protocol
          </span>
          <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
            Directions & Storage
          </h3>
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
                {product.directions}
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

      {/* Related Products */}
      <section className="px-4 md:px-8 py-6 flex flex-col gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
          Related Educational Selections
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
