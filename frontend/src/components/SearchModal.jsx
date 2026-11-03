import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';
import { ingredientsData } from '../data/ingredientsData';
import { fetchProducts, fetchIngredients } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState(productsData);
  const [ingredients, setIngredients] = useState(ingredientsData);
  const { lang, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchProducts()
        .then((p) => setProducts(p))
        .catch(() => setProducts(productsData));
      fetchIngredients()
        .then((i) => setIngredients(i))
        .catch(() => setIngredients(ingredientsData));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const clean = query.trim().toLowerCase();

  const matchedProducts = clean
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(clean) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(clean)) ||
          (p.keyIngredients && p.keyIngredients.toLowerCase().includes(clean)) ||
          (p.shortDescription && p.shortDescription.toLowerCase().includes(clean))
      )
    : [];

  const matchedIngredients = clean
    ? ingredients.filter(
        (i) =>
          i.botanicalName.toLowerCase().includes(clean) ||
          i.commonName.toLowerCase().includes(clean) ||
          (i.overview && i.overview.toLowerCase().includes(clean))
      )
    : [];

  const handleSelectProduct = (slugOrId) => {
    onClose();
    navigate(`/product/${slugOrId}`);
  };

  const handleSelectIngredient = (term) => {
    onClose();
    navigate(`/ingredients?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container-high overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-surface-container flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary text-[24px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'उत्पाद या सामग्री खोजें (उदा. Reishi, Spirulina, Noni, कॉफी)...'
                : 'Search products or botanical ingredients (e.g., Reishi, Spirulina, Noni, Coffee)...'
            }
            className="flex-1 bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">cancel</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm hover:bg-surface-variant"
          >
            Esc
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto flex flex-col gap-4">
          {!clean ? (
            <div className="flex flex-col gap-2 py-4 text-center items-center text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[32px]">spa</span>
              <p className="font-label-md text-label-md font-semibold text-primary">
                {lang === 'hi' ? 'DXN उत्पाद एवं वानस्पतिक ज्ञानकोष' : 'Explore DXN Products & Botanicals'}
              </p>
              <p className="font-body-sm text-body-sm max-w-md">
                {lang === 'hi'
                  ? 'किसी भी उत्पाद का नाम, सक्रिय घटक या वानस्पतिक नाम टाइप करें।'
                  : 'Type any product name, key ingredient, or botanical term to search our verified archive.'}
              </p>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                {['Reishi Gano', 'Spirulina', 'Lingzhi Coffee', 'Morinzhi', 'Ganozhi'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm hover:bg-secondary-container transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {matchedProducts.length === 0 && matchedIngredients.length === 0 && (
                <div className="py-8 text-center text-on-surface-variant flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-[32px] text-outline">search_off</span>
                  <p className="font-body-sm text-body-sm">
                    No results found for "{query}". Try searching for Ganoderma, Spirulina, or Coffee.
                  </p>
                </div>
              )}

              {/* Products Section */}
              {matchedProducts.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                    Products ({matchedProducts.length})
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.slug || p.id}
                        onClick={() => handleSelectProduct(p.slug || p.id)}
                        className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-12 h-12 rounded-lg object-cover bg-surface-container-lowest shrink-0"
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-label-md text-label-md text-primary font-bold truncate">
                            {p.name}
                          </span>
                          <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
                            {p.keyIngredients}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          arrow_forward
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients Section */}
              {matchedIngredients.length > 0 && (
                <div className="flex flex-col gap-2 pt-2 border-t border-surface-container">
                  <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                    Botanical Compendium ({matchedIngredients.length})
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {matchedIngredients.map((i) => (
                      <div
                        key={i.slug || i.id}
                        onClick={() => handleSelectIngredient(i.botanicalName || i.slug)}
                        className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center gap-3 cursor-pointer transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[18px]">eco</span>
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-label-md text-label-md text-primary font-bold">
                            {i.botanicalName}
                          </span>
                          <span className="font-body-sm text-[12px] text-on-surface-variant truncate">
                            {i.commonName}
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-secondary text-[18px]">
                          arrow_forward
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
