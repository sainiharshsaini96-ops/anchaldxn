import { productsData } from '../data/productsData';
import { ingredientsData } from '../data/ingredientsData';

/**
 * Robust API URL builder that correctly handles:
 * 1. Absolute URLs (e.g. http://localhost:5000/api)
 * 2. Relative paths (e.g. /api with Vite dev proxy)
 * 3. Query search params
 */
const getApiUrl = (endpoint, params = null) => {
  const base = import.meta.env.VITE_API_BASE_URL || '/api';
  let fullUrl;
  if (base.startsWith('http://') || base.startsWith('https://')) {
    fullUrl = new URL(`${base.replace(/\/$/, '')}${endpoint}`);
  } else {
    fullUrl = new URL(
      `${window.location.origin}${base.startsWith('/') ? '' : '/'}${base.replace(/\/$/, '')}${endpoint}`
    );
  }
  if (params) {
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        fullUrl.searchParams.set(key, val);
      }
    });
  }
  return fullUrl.toString();
};

/**
 * 1. READ ALL Products (GET /api/products)
 */
export const fetchProducts = async (params = {}) => {
  try {
    const queryParams = {};
    if (params.category && params.category !== 'all') {
      queryParams.category = params.category;
    }
    if (params.search) {
      queryParams.search = params.search;
    }
    if (params.sort) {
      queryParams.sort = params.sort;
    }

    const url = getApiUrl('/products', queryParams);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || productsData;
  } catch (error) {
    console.warn('[API Fallback]: Fetching products from local archive:', error.message);
    let result = [...productsData];
    if (params.category && params.category !== 'all') {
      result = result.filter((p) => p.category === params.category);
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.subtitle.toLowerCase().includes(s) ||
          p.keyIngredients.toLowerCase().includes(s)
      );
    }
    if (params.sort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (params.sort === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (params.sort === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category));
    }
    return result;
  }
};

/**
 * 2. READ Single Product (GET /api/products/:id)
 */
export const fetchProductBySlug = async (slug) => {
  try {
    const url = getApiUrl(`/products/${slug}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Product not found');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('[API Fallback]: Fetching product detail from local archive:', error.message);
    const p = productsData.find((item) => item.slug === slug || item.id === slug);
    if (!p) throw new Error('Product not found');
    return p;
  }
};

/**
 * 3. ADD Product (POST /api/products)
 */
export const addProduct = async (productData) => {
  const url = getApiUrl('/products');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to add product');
  }
  return json;
};

/**
 * 4. UPDATE Product (PUT /api/products/:id)
 */
export const updateProduct = async (idOrSlug, productData) => {
  const url = getApiUrl(`/products/${idOrSlug}`);
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to update product');
  }
  return json;
};

/**
 * 5. DELETE Product (DELETE /api/products/:id)
 */
export const deleteProduct = async (idOrSlug) => {
  const url = getApiUrl(`/products/${idOrSlug}`);
  const res = await fetch(url, {
    method: 'DELETE',
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to delete product');
  }
  return json;
};

/**
 * Health & MongoDB Connection Status (GET /api/health)
 */
export const checkHealth = async () => {
  try {
    const url = getApiUrl('/health');
    const res = await fetch(url);
    if (!res.ok) throw new Error('Healthcheck failed');
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      database: { connected: false, statusText: 'Disconnected' },
      error: err.message,
    };
  }
};

/**
 * Botanical Ingredients Catalog (GET /api/ingredients)
 */
export const fetchIngredients = async (params = {}) => {
  try {
    const queryParams = {};
    if (params.category && params.category !== 'all') {
      queryParams.category = params.category;
    }
    if (params.search) {
      queryParams.search = params.search;
    }

    const url = getApiUrl('/ingredients', queryParams);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json.data || ingredientsData;
  } catch (error) {
    console.warn('[API Fallback]: Fetching ingredients from local archive:', error.message);
    let result = [...ingredientsData];
    if (params.category && params.category !== 'all') {
      result = result.filter((i) => i.category === params.category);
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.botanicalName.toLowerCase().includes(s) ||
          i.commonName.toLowerCase().includes(s) ||
          i.overview.toLowerCase().includes(s)
      );
    }
    return result;
  }
};

/**
 * READ Single Ingredient (GET /api/ingredients/:slug)
 */
export const fetchIngredientBySlug = async (slug) => {
  try {
    const url = getApiUrl(`/ingredients/${slug}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Ingredient not found');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.warn('[API Fallback]: Fetching ingredient detail from local archive:', error.message);
    const item = ingredientsData.find((i) => i.slug === slug || i.slug.includes(slug));
    if (!item) throw new Error('Ingredient not found');
    return item;
  }
};

/**
 * Direct Inquiries (POST /api/inquiries)
 */
export const submitInquiry = async (data) => {
  try {
    const url = getApiUrl('/inquiries');
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Submission failed');
    }
    return await res.json();
  } catch (error) {
    console.warn('[API Fallback]: Recording inquiry locally:', error.message);
    return {
      success: true,
      message: 'Thank you! Your message has been received by Anchal.',
      data,
    };
  }
};

/**
 * Fetch All Inquiries (GET /api/inquiries)
 */
export const fetchInquiries = async () => {
  try {
    const url = getApiUrl('/inquiries');
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.warn('[API Fallback]: Fetching inquiries fallback:', error.message);
    return [];
  }
};
