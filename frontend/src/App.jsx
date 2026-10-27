import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CompareProvider } from './context/CompareContext';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import SearchModal from './components/SearchModal';
import MenuDrawer from './components/MenuDrawer';
import ContactModal from './components/ContactModal';
import ProductManagementModal from './components/ProductManagementModal';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Compare from './pages/Compare';
import Ingredients from './pages/Ingredients';
import About from './pages/About';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Global keyboard shortcut to open search (/)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <ScrollToTop />

      {/* Top Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenManager={() => setManagerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16">
        <Routes>
          <Route
            path="/"
            element={<Home key={refreshKey} onOpenContact={() => setContactOpen(true)} />}
          />
          <Route path="/products" element={<Products key={refreshKey} />} />
          <Route path="/product/:id" element={<ProductDetail key={refreshKey} />} />
          <Route path="/compare" element={<Compare key={refreshKey} />} />
          <Route path="/ingredients" element={<Ingredients key={refreshKey} />} />
          <Route path="/about" element={<About onOpenContact={() => setContactOpen(true)} />} />
          <Route
            path="*"
            element={<Home key={refreshKey} onOpenContact={() => setContactOpen(true)} />}
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer onOpenContact={() => setContactOpen(true)} />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Modals & Drawers */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenContact={() => setContactOpen(true)}
      />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      <ProductManagementModal
        isOpen={managerOpen}
        onClose={() => setManagerOpen(false)}
        onProductChange={() => setRefreshKey((prev) => prev + 1)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CompareProvider>
        <Router>
          <MainLayout />
        </Router>
      </CompareProvider>
    </LanguageProvider>
  );
}
