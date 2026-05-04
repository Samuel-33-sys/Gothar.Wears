import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AIChat } from './AIChat';

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Design System', path: '/design' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-display font-bold tracking-tighter uppercase">Gothar.wears</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-primary' : 'text-gray-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button className="text-gray-500 hover:text-primary transition-colors">
              <User size={20} />
            </button>
            <button className="text-gray-500 hover:text-primary transition-colors">
              <Heart size={20} />
            </button>
            <Link to="/cart" className="text-gray-500 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-medium py-2 border-b border-gray-50"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-6 pt-4">
                <Search size={22} className="text-gray-500" />
                <User size={22} className="text-gray-500" />
                <Heart size={22} className="text-gray-500" />
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="relative">
                  <ShoppingCart size={22} className="text-gray-500" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-display font-bold tracking-tighter uppercase">Gothar.wears</Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Curated essentials for the modern lifestyle. Quality materials, timeless design, and sustainable practices.
            </p>
            <div className="flex space-x-4">
              {/* Social icons placeholder */}
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">f</div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">i</div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-gray-200 cursor-pointer transition-colors">t</div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Men" className="hover:text-primary transition-colors">Men</Link></li>
              <li><Link to="/shop?category=Women" className="hover:text-primary transition-colors">Women</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-6">Newsletter</h4>
            <p className="text-gray-500 text-sm mb-6">Join our newsletter to receive updates on new products and exclusive offers.</p>
            <form className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input-field py-2 text-sm"
              />
              <button className="btn-primary py-2 text-sm uppercase tracking-widest">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; 2026 Nexus E-Commerce. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Cookies</span>
            <span>Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children, cartCount }: { children: React.ReactNode; cartCount: number }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-primary text-white text-[10px] md:text-xs text-center py-2 uppercase tracking-[0.2em] font-medium">
        Free Shipping On Orders Over $50 | 30-Day Returns | Get 10% Off Your First Order
      </div>
      <Navbar cartCount={cartCount} />
      <main className="flex-grow">
        {children}
      </main>
      <AIChat />
      <Footer />
    </div>
  );
};
