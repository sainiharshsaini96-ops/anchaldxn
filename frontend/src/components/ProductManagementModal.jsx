import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct, checkHealth } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function ProductManagementModal({ isOpen, onClose, onProductChange }) {
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add' | 'edit'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    subtitle: '',
    category: 'dietary-supplements',
    categoryLabel: 'Dietary Supplements',
    badge: 'Verified',
    formFactor: 'Capsules / Powder',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwxk-fdbAPOxAG0hWzJq0ZhU3wGlViK9hWjluzy7rbJch8s6hzUE7_GsJuAewsVYbJpE98WphSOepzxWkWqVURLkDds5QgWClbhXCJMjaWKAUZyB7Y51QQRjaQz9HBmJd20R19J1MAF10ucWfg7IUV5aKmfLOrRHtq_vx_YO0STieUP_3XnddsXFk03NZMmK5aT028RUdFF7TItzedozY11spcjbM9CHY16wJzZAemdu1Q21zyho0Zzw',
    keyIngredients: '',
    shortDescription: '',
    directions: 'Take 1 to 2 daily with lukewarm water.',
    storage: 'Store in a cool, dry place away from sunlight.',
  };

  const [formData, setFormData] = useState(initialForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prods, h] = await Promise.all([fetchProducts(), checkHealth()]);
      setProducts(prods);
      setHealth(h);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEditClick = (p) => {
    setSelectedProduct(p);
    setFormData({
      name: p.name || '',
      slug: p.slug || '',
      subtitle: p.subtitle || '',
      category: p.category || 'dietary-supplements',
      categoryLabel: p.categoryLabel || '',
      badge: p.badge || '',
      formFactor: p.formFactor || '',
      imageUrl: p.imageUrl || '',
      keyIngredients: p.keyIngredients || '',
      shortDescription: p.shortDescription || '',
      directions: p.directions || '',
      storage: p.storage || '',
    });
    setActiveTab('edit');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    try {
      await addProduct(formData);
      setStatusMessage({ type: 'success', text: 'Product added successfully!' });
      setFormData(initialForm);
      setActiveTab('list');
      await loadData();
      if (onProductChange) onProductChange();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    try {
      const idOrSlug = selectedProduct._id || selectedProduct.slug || selectedProduct.id;
      await updateProduct(idOrSlug, formData);
      setStatusMessage({ type: 'success', text: 'Product updated successfully!' });
      setActiveTab('list');
      setSelectedProduct(null);
      await loadData();
      if (onProductChange) onProductChange();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async (p) => {
    if (!window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
      return;
    }
    setLoading(true);
    setStatusMessage(null);
    try {
      const idOrSlug = p._id || p.slug || p.id;
      await deleteProduct(idOrSlug);
      setStatusMessage({ type: 'success', text: `Product "${p.name}" deleted.` });
      await loadData();
      if (onProductChange) onProductChange();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl p-6 shadow-2xl border border-surface-container flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">database</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                MongoDB Atlas Product Manager
              </h2>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="inline-flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      health?.database?.connected ? 'bg-secondary animate-pulse' : 'bg-primary'
                    }`}
                  />
                  <span>{health?.database?.statusText || 'Checking connection...'}</span>
                </span>
                <span>•</span>
                <span>Driver: MongoDB Node Driver v6</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Status Alert Banner */}
        {statusMessage && (
          <div
            className={`p-3 rounded-xl font-label-md text-label-md flex items-center gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {statusMessage.type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-surface-container pb-2">
          <button
            onClick={() => {
              setActiveTab('list');
              setSelectedProduct(null);
            }}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all ${
              activeTab === 'list'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            All Products ({products.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('add');
              setFormData(initialForm);
            }}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'add'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Add New Product</span>
          </button>
          {activeTab === 'edit' && (
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
              Editing: {selectedProduct?.name}
            </span>
          )}
        </div>

        {/* Tab Content: 1. LIST & READ */}
        {activeTab === 'list' && (
          <div className="flex flex-col gap-2.5">
            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="py-8 text-center text-on-surface-variant">
                No products found in database. Click "Add New Product" to insert one into MongoDB Atlas.
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {products.map((p) => (
                  <div
                    key={p.slug || p._id || p.id}
                    className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between gap-3 hover:bg-surface-container transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.imageUrl}
                        alt={p.name}
                        className="w-12 h-12 rounded-lg object-cover bg-surface-container-lowest shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="font-label-md text-label-md text-primary font-bold truncate">
                          {p.name}
                        </span>
                        <span className="font-label-sm text-[12px] text-on-surface-variant truncate">
                          {p.categoryLabel || p.category} • {p.formFactor}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEditClick(p)}
                        title="Edit Product"
                        className="p-2 rounded-full bg-surface-container-lowest text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(p)}
                        title="Delete Product"
                        className="p-2 rounded-full bg-surface-container-lowest text-error hover:bg-error-container hover:text-on-error-container transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: 2. ADD & 3. UPDATE FORM */}
        {(activeTab === 'add' || activeTab === 'edit') && (
          <form
            onSubmit={activeTab === 'add' ? handleCreateSubmit : handleUpdateSubmit}
            className="flex flex-col gap-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Product Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. DXN Reishi Gano"
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                >
                  <option value="dietary-supplements">Dietary Supplements</option>
                  <option value="beverages">Beverages</option>
                  <option value="oral-care">Oral Care</option>
                  <option value="personal-care">Personal Care</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Dual Botanical Formulation"
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Form Factor
                </label>
                <input
                  type="text"
                  value={formData.formFactor}
                  onChange={(e) => setFormData({ ...formData, formFactor: e.target.value })}
                  placeholder="e.g. Capsules / Powder / Sachets"
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-primary font-semibold">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://..."
                className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-primary font-semibold">
                Key Ingredients *
              </label>
              <input
                required
                type="text"
                value={formData.keyIngredients}
                onChange={(e) => setFormData({ ...formData, keyIngredients: e.target.value })}
                placeholder="e.g. Ganoderma lucidum fruit body & mycelium"
                className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-primary font-semibold">
                Short Description *
              </label>
              <textarea
                required
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief summary for catalog card..."
                className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('list');
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:text-primary"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                type="submit"
                className="px-6 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold shadow-md hover:bg-secondary transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>{activeTab === 'add' ? 'Save to MongoDB Atlas' : 'Update in MongoDB Atlas'}</span>
                    <span className="material-symbols-outlined text-[16px]">save</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
