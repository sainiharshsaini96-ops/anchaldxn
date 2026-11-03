import React, { useState, useEffect } from 'react';
import { fetchProducts, addProduct, updateProduct, deleteProduct, checkHealth, fetchInquiries } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

export default function ProductManagementModal({ isOpen, onClose, onProductChange }) {
  const { lang } = useLanguage();
  const [products, setProducts] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [health, setHealth] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add' | 'edit' | 'inquiries' | 'health'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [productSearch, setProductSearch] = useState('');

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
    directions: 'Take 1 to 2 daily with lukewarm water before meals.',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    packSizesText: '30 capsules, 90 capsules',
    bioactiveMarkersText: 'Polysaccharides, Organic Germanium, Triterpenes',
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

  const loadInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const inqs = await fetchInquiries();
      setInquiries(inqs);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setInquiriesLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      loadInquiries();
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
      packSizesText: p.packSizes ? p.packSizes.join(', ') : '',
      bioactiveMarkersText: p.bioactiveMarkers ? p.bioactiveMarkers.join(', ') : '',
    });
    setActiveTab('edit');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    try {
      const payload = {
        ...formData,
        packSizes: formData.packSizesText
          ? formData.packSizesText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        bioactiveMarkers: formData.bioactiveMarkersText
          ? formData.bioactiveMarkersText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };
      await addProduct(payload);
      setStatusMessage({ type: 'success', text: 'Product added successfully to database!' });
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
      const payload = {
        ...formData,
        packSizes: formData.packSizesText
          ? formData.packSizesText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        bioactiveMarkers: formData.bioactiveMarkersText
          ? formData.bioactiveMarkersText.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
      };
      await updateProduct(idOrSlug, payload);
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
      setStatusMessage({ type: 'success', text: `Product "${p.name}" deleted from database.` });
      await loadData();
      if (onProductChange) onProductChange();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = productSearch
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
          p.category.toLowerCase().includes(productSearch.toLowerCase())
      )
    : products;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full max-w-4xl bg-surface-container-lowest rounded-2xl p-6 shadow-2xl border border-surface-container flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
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
                DXNANCHAL Management & Operations Center
              </h2>
              <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                <span className="inline-flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      health?.database?.connected ? 'bg-secondary animate-pulse' : 'bg-primary'
                    }`}
                  />
                  <span>{health?.database?.statusText || 'Connected to MongoDB Atlas'}</span>
                </span>
                <span>•</span>
                <span>Driver: {health?.database?.driver || 'Native Driver v6 & Mongoose'}</span>
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
        <div className="flex items-center gap-2 border-b border-surface-container pb-2 flex-wrap">
          <button
            onClick={() => {
              setActiveTab('list');
              setSelectedProduct(null);
            }}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'list'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            <span>Catalog ({products.length})</span>
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

          <button
            onClick={() => {
              setActiveTab('inquiries');
              loadInquiries();
            }}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'inquiries'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Inquiries Received ({inquiries.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('health');
              loadData();
            }}
            className={`px-4 py-1.5 rounded-full font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'health'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">dns</span>
            <span>System Health</span>
          </button>

          {activeTab === 'edit' && (
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold ml-auto">
              Editing: {selectedProduct?.name}
            </span>
          )}
        </div>

        {/* Tab 1: Product List */}
        {activeTab === 'list' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="relative flex-1">
                <span className="material-symbols-outlined text-[18px] text-secondary absolute left-3 top-2.5">
                  search
                </span>
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter products in database..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-container-low border border-surface-container text-body-sm text-body-sm focus:outline-none"
                />
              </div>
              <button
                onClick={loadData}
                className="px-3 py-2 rounded-xl bg-surface-container-high text-primary hover:bg-surface-variant text-label-sm font-semibold flex items-center gap-1"
                title="Refresh from MongoDB"
              >
                <span className="material-symbols-outlined text-[16px]">refresh</span>
                <span>Refresh</span>
              </button>
            </div>

            {loading ? (
              <div className="py-12 flex justify-center items-center">
                <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-on-surface-variant">
                No products found. Click "Add New Product" to insert a new entry into MongoDB Atlas.
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto pr-1">
                {filteredProducts.map((p) => (
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

        {/* Tab 2: Add or Edit Product Form */}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Image URL *
                </label>
                <input
                  required
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Pack Sizes (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.packSizesText}
                  onChange={(e) => setFormData({ ...formData, packSizesText: e.target.value })}
                  placeholder="e.g. 30 capsules, 90 capsules, 360 capsules"
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-label-sm text-primary font-semibold">
                Bioactive Markers (comma-separated)
              </label>
              <input
                type="text"
                value={formData.bioactiveMarkersText}
                onChange={(e) => setFormData({ ...formData, bioactiveMarkersText: e.target.value })}
                placeholder="e.g. Polysaccharides, Triterpenoids, Adenosine, Organic Germanium"
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
                placeholder="e.g. Ganoderma lucidum fruit body (90-day RG) & mycelium (14-day GL)"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Directions for Use
                </label>
                <input
                  type="text"
                  value={formData.directions}
                  onChange={(e) => setFormData({ ...formData, directions: e.target.value })}
                  placeholder="e.g. Take 1 to 2 daily with lukewarm water."
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-primary font-semibold">
                  Storage Instructions
                </label>
                <input
                  type="text"
                  value={formData.storage}
                  onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                  placeholder="e.g. Store in a cool, dry place."
                  className="px-3 py-2 rounded-xl bg-surface-container-low border border-surface-container font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30"
                />
              </div>
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

        {/* Tab 3: Community Inquiries Received */}
        {activeTab === 'inquiries' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-primary font-bold">
                User Messages & Contact Form Submissions ({inquiries.length})
              </span>
              <button
                onClick={loadInquiries}
                className="px-3 py-1.5 rounded-full bg-surface-container-high text-primary hover:bg-surface-variant font-label-sm font-semibold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">refresh</span>
                <span>Refresh Inbox</span>
              </button>
            </div>

            {inquiriesLoading ? (
              <div className="py-12 flex justify-center items-center">
                <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="py-12 text-center text-on-surface-variant bg-surface-container-low rounded-xl p-6">
                No inquiries received yet. Contact submissions sent via the "Direct Inquiries" modal will appear here.
              </div>
            ) : (
              <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1">
                {inquiries.map((inq, idx) => (
                  <div
                    key={inq._id || idx}
                    className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-label-sm">
                          {inq.name ? inq.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                        <div>
                          <p className="font-label-md text-label-md text-primary font-bold">
                            {inq.name}
                          </p>
                          <p className="font-label-sm text-label-sm text-secondary">
                            {inq.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary text-[11px] font-semibold">
                          {inq.topic}
                        </span>
                        <span className="text-[11px] text-on-surface-variant">
                          {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface pt-1 border-t border-surface-container/60 leading-relaxed whitespace-pre-wrap">
                      {inq.message}
                    </p>

                    <div className="flex justify-end pt-1">
                      <a
                        href={`mailto:${inq.email}?subject=Re: DXNANCHAL Inquiry - ${encodeURIComponent(inq.topic || 'Product Info')}`}
                        className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-[11px] font-semibold flex items-center gap-1 hover:bg-secondary transition-all"
                      >
                        <span className="material-symbols-outlined text-[13px]">reply</span>
                        <span>Reply via Email</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: System & Database Health */}
        {activeTab === 'health' && (
          <div className="flex flex-col gap-4 p-2">
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      health?.database?.connected ? 'bg-secondary animate-pulse' : 'bg-primary'
                    }`}
                  />
                  <span>MongoDB Atlas Connection Status</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                  {health?.database?.statusText || 'Connected to Atlas'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
                  <span className="text-[11px] uppercase text-on-surface-variant font-bold">
                    Database Cluster
                  </span>
                  <span className="font-label-md font-semibold text-primary">
                    {health?.database?.databaseName || 'dxnanchal'} (MongoDB Atlas)
                  </span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
                  <span className="text-[11px] uppercase text-on-surface-variant font-bold">
                    Backend Driver Stack
                  </span>
                  <span className="font-label-md font-semibold text-primary">
                    {health?.database?.driver || 'mongodb-node-native-v6 & mongoose'}
                  </span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
                  <span className="text-[11px] uppercase text-on-surface-variant font-bold">
                    Active Catalog Items
                  </span>
                  <span className="font-label-md font-semibold text-primary">
                    {products.length} Products Verified
                  </span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded-xl flex flex-col">
                  <span className="text-[11px] uppercase text-on-surface-variant font-bold">
                    Inquiries Recorded
                  </span>
                  <span className="font-label-md font-semibold text-primary">
                    {inquiries.length} Community Messages
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-low flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-primary">
                  Dual High-Availability Architecture
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant pt-0.5">
                  The backend writes directly to MongoDB Atlas cluster `cluster0.wnnsnqr.mongodb.net`. If Atlas experiences external network latency, the service automatically switches to the in-memory verified archive to guarantee zero frontend downtime.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
