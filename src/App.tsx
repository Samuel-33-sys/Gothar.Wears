import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { Layout } from './components/Layout';
import { DesignSystem } from './pages/DesignSystem';
import { Home } from './pages/Home';
import { Listing } from './pages/Listing';
import { Detail } from './pages/Detail';
import { CartCheckout } from './pages/CartCheckout';

const AppContent = () => {
  const { cartCount } = useCart();
  
  return (
    <Layout cartCount={cartCount}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design" element={<DesignSystem />} />
        <Route path="/shop" element={<Listing />} />
        <Route path="/product/:id" element={<Detail />} />
        <Route path="/cart" element={<CartCheckout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}
