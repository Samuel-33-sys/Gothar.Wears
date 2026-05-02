import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, RefreshCw, ShieldCheck, Heart, Minus, Plus, ShoppingCart, ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

export const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found.</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-6">Go Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    // Optional: show a toast or notification
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-10">
        <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => navigate('/shop')} className="hover:text-primary">Shop</button>
        <ChevronRight size={10} />
        <span className="text-primary">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-6">
          <div className="aspect-[4/5] bg-secondary overflow-hidden rounded-2xl">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-secondary rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all">
                 <img src={product.images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-bold">({product.reviewsCount} reviews)</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">{product.name}</h1>
            
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                  <span className="bg-error/10 text-error text-[10px] font-bold px-2 py-1 rounded uppercase">Save {Math.round((1 - product.price/product.originalPrice) * 100)}%</span>
                </>
              )}
            </div>
            
            <p className="text-gray-500 leading-relaxed max-w-lg">{product.description}</p>
          </div>

          {/* Options */}
          <div className="space-y-8 py-8 border-y border-gray-100">
            {product.colors && (
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Color: <span className="text-primary">{selectedColor}</span></h4>
                <div className="flex space-x-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 p-0.5 transition-all ${selectedColor === color ? 'border-primary ring-2 ring-primary/10' : 'border-transparent'}`}
                    >
                      <div className={`w-full h-full rounded-full bg-${color.toLowerCase().replace(' ', '-') || 'gray-400'}`} style={{ backgroundColor: color.toLowerCase() }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Size: <span className="text-primary">{selectedSize}</span></h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] h-12 flex items-center justify-center border text-xs font-bold transition-all ${selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-200 hover:border-primary'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quantity</h4>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center border border-gray-200">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 hover:bg-secondary transition-colors"><Minus size={16} /></button>
                        <span className="w-10 text-center font-bold font-mono">{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="p-3 hover:bg-secondary transition-colors"><Plus size={16} /></button>
                    </div>
                    <p className="text-[10px] text-error font-bold flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 bg-error rounded-full" />
                        <span>Only 5 left in stock!</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={handleAddToCart}
                    className="flex-grow btn-primary flex items-center justify-center space-x-3 py-4"
                >
                    <ShoppingCart size={20} />
                    <span className="uppercase tracking-widest font-bold">Add to Cart</span>
                </button>
                <button className="flex-shrink-0 w-16 h-16 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-400 hover:text-error">
                    <Heart size={24} />
                </button>
            </div>
            
            <button className="w-full btn-outline py-4 uppercase tracking-widest font-bold text-xs bg-accent text-white border-accent hover:bg-opacity-90">Buy It Now</button>
          </div>

          {/* Delivery & Trust */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-xl flex items-center space-x-4">
               <Truck size={20} className="text-gray-400" />
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-tight">Free Shipping</p>
                  <p className="text-[10px] text-gray-400">On orders over $50</p>
               </div>
            </div>
            <div className="p-4 bg-secondary rounded-xl flex items-center space-x-4">
               <RefreshCw size={20} className="text-gray-400" />
               <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-tight">Easy Returns</p>
                  <p className="text-[10px] text-gray-400">30-day policy</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Tabs */}
      <div className="mt-24 border-t border-gray-100">
         <div className="flex justify-center space-x-12 border-b border-gray-100">
            {['description', 'reviews', 'faqs'].map(tab => (
               <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-8 text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative ${activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
               >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 inset-x-0 h-0.5 bg-primary" />}
               </button>
            ))}
         </div>
         <div className="py-12 max-w-3xl mx-auto text-center">
            {activeTab === 'description' && (
                <div className="space-y-6 text-gray-500 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p>Our {product.name} is crafted from the highest quality materials to ensure lasting comfort and style. Every detail has been considered, from the reinforced stitching to the premium finishing.</p>
                    <ul className="text-xs font-bold uppercase tracking-widest space-y-2">
                        <li>• Premium cotton blend</li>
                        <li>• Soft & breathable</li>
                        <li>• Machine washable</li>
                        <li>• Unisex fit</li>
                    </ul>
                </div>
            )}
            {activeTab === 'reviews' && <p className="text-gray-400">No reviews yet. Be the first to share your experience!</p>}
            {activeTab === 'faqs' && <p className="text-gray-400">Have questions? Check out our help center or contact support.</p>}
         </div>
      </div>

      {/* Featured Together / Related */}
      {relatedProducts.length > 0 && (
          <div className="mt-20 space-y-12">
             <div className="flex justify-between items-end">
                <h3 className="text-2xl font-display font-bold">Frequently Bought Together</h3>
                <button className="btn-primary py-2 px-6 scale-90 uppercase tracking-widest text-[10px]">Add All to Cart</button>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(p => (
                   <ProductCard key={p.id} product={p} />
                ))}
             </div>
          </div>
      )}
    </div>
  );
};
