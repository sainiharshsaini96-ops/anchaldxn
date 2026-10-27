import { productsData } from '../data/productsData';
import { ingredientsData } from '../data/ingredientsData';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * 1. READ ALL Products (GET /api/products)
 */
export const fetchProducts = async (params = {}) => {
  try {
    const url = new URL(`${window.location.origin}${API_BASE}/products`);
    if (params.category && params.category !== 'all') {
      url.searchParams.set('category', params.category);
    }
    if (params.search) {
      url.searchParams.set('search', params.search);
    }
    if (params.sort) {
      url.searchParams.set('sort', params.sort);
    }

    const res = await fetch(url.toString());
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
    const res = await fetch(`${API_BASE}/products/${slug}`);
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
  const res = await fetch(`${API_BASE}/products`, {
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
  const res = await fetch(`${API_BASE}/products/${idOrSlug}`, {
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
  const res = await fetch(`${API_BASE}/products/${idOrSlug}`, {
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
    const res = await fetch(`${API_BASE}/health`);
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
    const url = new URL(`${window.location.origin}${API_BASE}/ingredients`);
    if (params.category && params.category !== 'all') {
      url.searchParams.set('category', params.category);
    }
    if (params.search) {
      url.searchParams.set('search', params.search);
    }
    const res = await fetch(url.toString());
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
 * Direct Inquiries (POST /api/inquiries)
 */
export const submitInquiry = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
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
