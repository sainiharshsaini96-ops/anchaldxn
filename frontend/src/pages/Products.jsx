import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { productsData } from '../data/productsData';

export default function Products() {
  const { lang, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlCategory = searchParams.get('category') || 'all';
  const urlSearch = searchParams.get('search') || '';
  const urlSort = searchParams.get('sort') || 'name-asc';

  const [search, setSearch] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState(urlCategory);
  const [sortBy, setSortBy] = useState(urlSort);
  const [products, setProducts] = useState(productsData);
  const [allProducts, setAllProducts] = useState(productsData);
  const [loading, setLoading] = useState(false);

  // Sync state if URL changes externally (e.g. browser back/forward or link from another page)
  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSearch(urlSearch);
    setSortBy(urlSort);
  }, [urlCategory, urlSearch, urlSort]);

  // Fetch full list once to accurately calculate category badges
  useEffect(() => {
    fetchProducts()
      .then((data) => setAllProducts(data))
      .catch(() => setAllProducts(productsData));
  }, []);

  // Fetch filtered list whenever filters change
  useEffect(() => {
    setLoading(true);
    fetchProducts({
      category: selectedCategory,
      search,
      sort: sortBy,
    })
      .then((data) => setProducts(data))
      .catch(() => setProducts(productsData))
      .finally(() => setLoading(false));
  }, [selectedCategory, search, sortBy]);

  // Update URL params smoothly
  const updateFilters = (newCat, newSearch, newSort) => {
    const params = {};
    if (newCat && newCat !== 'all') params.category = newCat;
    if (newSearch && newSearch.trim()) params.search = newSearch.trim();
    if (newSort && newSort !== 'name-asc') params.sort = newSort;
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (catKey) => {
    setSelectedCategory(catKey);
    updateFilters(catKey, search, sortBy);
  };

  const handleSearchChange = (val) => {
    setSearch(val);
    updateFilters(selectedCategory, val, sortBy);
  };

  const handleSortChange = (sortVal) => {
    setSortBy(sortVal);
    updateFilters(selectedCategory, search, sortVal);
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSortBy('name-asc');
    setSearchParams({}, { replace: true });
  };

  // Dynamic category counts from real database list
  const getCategoryCount = (key) => {
    if (key === 'all') return allProducts.length;
    return allProducts.filter((p) => p.category === key).length;
  };

  const categories = [
    { key: 'all', labelEn: 'All', labelHi: 'सभी', count: getCategoryCount('all') },
    { key: 'beverages', labelEn: 'Beverages', labelHi: 'पेय पदार्थ', count: getCategoryCount('beverages') },
    { key: 'dietary-supplements', labelEn: 'Dietary Supplements', labelHi: 'आहार पूरक', count: getCategoryCount('dietary-supplements') },
    { key: 'oral-care', labelEn: 'Oral Care', labelHi: 'दंत सुरक्षा', count: getCategoryCount('oral-care') },
    { key: 'personal-care', labelEn: 'Personal Care', labelHi: 'व्यक्तिगत देखभाल', count: getCategoryCount('personal-care') },
  ];

  return (
    <div className="flex flex-col w-full max-w-[1280px] mx-auto pb-12">
      {/* Top Botanical Glow Accent */}
      <div className="w-full h-1 bg-gradient-to-r from-secondary via-secondary-container to-primary"></div>

      {/* Header / Breadcrumb / Title Area */}
      <section className="px-4 md:px-8 pt-4 pb-2 flex flex-col gap-2">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
          <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[16px]">spa</span>
            <span>{t('tab-home')}</span>
          </Link>
          <span className="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
          <span className="text-primary font-semibold">{t('tab-products')}</span>
        </nav>

        <div className="flex items-baseline justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-baseline gap-2">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-bold">
              {t('tab-products')}
            </h1>
            <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold shadow-sm">
              {allProducts.length} {lang === 'hi' ? 'सत्यापित' : 'Verified'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
            <span>{lang === 'hi' ? 'लेबल पुरालेख' : 'Indexed Physical Archive'}</span>
          </div>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-2xl">
          {lang === 'hi'
            ? 'आधिकारिक पैकेजिंग से सत्यापित आठ प्रमुख DXN पेय, आहार पूरक और व्यक्तिगत देखभाल उत्पादों का पारदर्शी संकलन।'
            : 'Browse our curated catalogue of eight verified DXN wellness, beverage, and personal care products with clinical botanical documentation.'}
        </p>
      </section>

      {/* Interactive Search & Filtering Hub */}
      <section className="px-4 md:px-8 py-3 flex flex-col gap-3">
        {/* Search Bar */}
        <div className="relative w-full rounded-xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(22,71,52,0.05)] border border-surface-container">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'उत्पाद या घटक खोजें (उदा. Ganoderma, Reishi, Spirulina, कॉफी, नोनी)...'
                : 'Search products, ingredients (e.g., Ganoderma, Noni, Spirulina, Coffee)...'
            }
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all"
          />
          {search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              type="button"
              className={`filter-pill whitespace-nowrap px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 shrink-0 shadow-sm ${
                selectedCategory === cat.key
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low border border-surface-container'
              }`}
            >
              <span>{lang === 'hi' ? cat.labelHi : cat.labelEn}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  selectedCategory === cat.key
                    ? 'bg-surface-container-lowest text-primary'
                    : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sorting & Reset Bar */}
        <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1 rounded-lg border border-surface-container-high/60">
            <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
            <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="sort-dropdown">
              {lang === 'hi' ? 'क्रम:' : 'Sort:'}
            </label>
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent font-label-sm text-label-sm text-primary font-semibold focus:outline-none cursor-pointer"
            >
              <option value="name-asc">{lang === 'hi' ? 'नाम (A से Z)' : 'Name (A–Z)'}</option>
              <option value="name-desc">{lang === 'hi' ? 'नाम (Z से A)' : 'Name (Z–A)'}</option>
              <option value="category">{lang === 'hi' ? 'श्रेणी अनुसार' : 'Category'}</option>
            </select>
          </div>

          {(selectedCategory !== 'all' || search || sortBy !== 'name-asc') && (
            <button
              onClick={handleResetFilters}
              type="button"
              className="font-label-sm text-label-sm text-secondary hover:text-primary flex items-center gap-1 py-1 px-2.5 rounded-md hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              <span>{lang === 'hi' ? 'फ़िल्टर रीसेट करें' : 'Reset Filters'}</span>
            </button>
          )}
        </div>
      </section>

      {/* Product Count Indicator & Live Status */}
      <div className="px-4 md:px-8 py-2 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-b border-surface-container-high/40 pb-3">
        <span>
          {lang === 'hi'
            ? `${allProducts.length} में से ${products.length} उत्पाद प्रदर्शित`
            : `Showing ${products.length} of ${allProducts.length} products`}
        </span>
        <span className="flex items-center gap-1.5 text-secondary font-semibold">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span>{lang === 'hi' ? 'तुलना के लिए तैयार' : 'Ready for Comparison'}</span>
        </span>
      </div>

      {/* Product Cards Catalogue Section */}
      <section className="px-4 md:px-8 py-4 flex flex-col gap-4">
        {loading ? (
          <div className="py-12 flex justify-center items-center">
            <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest rounded-2xl shadow-sm gap-3 border border-surface-container">
            <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[28px]">nature_people</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {lang === 'hi' ? 'कोई उत्पाद नहीं मिला' : 'No matching products found'}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              {lang === 'hi'
                ? 'आपके खोज मापदंड से मेल खाता कोई उत्पाद उपलब्ध नहीं है। कृपया दूसरे शब्द से खोजें या फ़िल्टर रीसेट करें।'
                : "We couldn't find any products matching your active filters. Try adjusting your search query or reset filters."}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 px-5 py-2 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold shadow-sm hover:bg-secondary transition-all"
            >
              {lang === 'hi' ? 'सभी फ़िल्टर रीसेट करें' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.slug || product.id} product={product} detailed={true} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
