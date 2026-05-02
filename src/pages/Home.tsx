import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, RefreshCw, ShieldCheck, Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const bestSellers = PRODUCTS.slice(0, 4);

  const categories = [
    { name: 'Gowns', image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop' },
    { name: 'Outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop' },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop' },
    { name: 'New Arrivals', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop' },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] bg-secondary overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1920&auto=format&fit=crop" 
            alt="High-end fashion model"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-black/20 md:bg-transparent md:bg-gradient-to-r md:from-black/40 md:to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl space-y-8 bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-2xl"
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] text-white">
              Define Your<br />Elegance.
            </h1>
            <p className="text-lg text-white/90 leading-relaxed font-medium">
              Curated luxury fashion for the modern woman. Discover the 2026 Gothar Collection — where sophistication meets edge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/shop" className="btn-primary flex items-center justify-center space-x-2 bg-white text-black hover:bg-accent hover:text-white border-none">
                <span>Shop Collection</span>
                <ShoppingBag size={18} />
              </Link>
              <Link to="/shop" className="btn-outline flex items-center justify-center border-white text-white hover:bg-white hover:text-black">
                <span>Exclusive Pieces</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-4 py-12 border-y border-gray-100 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <Truck size={24} />, title: 'Free Shipping', desc: 'On orders over $50' },
          { icon: <RefreshCw size={24} />, title: '30-Day Returns', desc: 'Hassle-free repairs' },
          { icon: <ShieldCheck size={24} />, title: 'Secure Checkout', desc: '100% protected' },
          { icon: <Headphones size={24} />, title: '24/7 Support', desc: "We're here to help" },
        ].map((feature, i) => (
          <div key={i} className="flex flex-col items-center text-center md:flex-row md:text-left space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-bold text-sm tracking-tight">{feature.title}</h4>
              <p className="text-xs text-gray-400">{feature.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold tracking-tight">Best Sellers</h2>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Our most loved pieces</p>
          </div>
          <Link to="/shop" className="group flex items-center space-x-2 text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors">
            <span>View All</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link 
              key={cat.name} 
              to={`/shop?category=${cat.name}`}
              className="relative overflow-hidden group aspect-[4/5] bg-secondary"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/30" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-white text-3xl font-display font-bold tracking-tight mb-4">{cat.name}</h3>
                <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white pb-1">Shop Now</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-secondary py-24">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8">
          <div className="flex justify-center text-accent">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <h3 className="text-2xl md:text-4xl font-display font-bold italic tracking-tight leading-relaxed">
            "Excellent quality and fast delivery. This is my go-to store now!"
          </h3>
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-widest text-sm">— Sarah J.</p>
            <p className="text-xs text-gray-400">Verified Customer</p>
          </div>
        </div>
      </section>

      {/* Final Newsletter / Promo Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white p-12 md:p-20 flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0 text-center md:text-left rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <div className="w-full h-full bg-gradient-to-br from-accent to-transparent" />
          </div>
          <div className="relative z-10 space-y-6 max-w-xl">
            <h2 className="text-5xl font-display font-bold tracking-tighter leading-tight">Get 10% Off Your First Order</h2>
            <p className="text-gray-400 text-lg">Join our newsletter for exclusive offers, styling tips, and new arrival alerts.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/10 border border-white/20 px-6 py-4 focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-white text-primary px-10 py-4 font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Star = ({ size, fill, key }: { size: number; fill: string; key?: React.Key }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
