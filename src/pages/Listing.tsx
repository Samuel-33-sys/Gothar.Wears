import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Listing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(200);
  const [sortBy, setSortBy] = useState('Featured');
  
  const filteredProducts = PRODUCTS.filter((p) => {
    const categoryMatch = selectedCategory === 'All' || p.category === selectedCategory;
    const priceMatch = p.price <= priceRange;
    return categoryMatch && priceMatch;
  });

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-start gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-12">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="font-display font-bold uppercase tracking-widest text-sm">Filters</h3>
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setPriceRange(200);
              }}
              className="text-xs text-gray-400 hover:text-primary transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Category */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Category</h4>
            <div className="space-y-3">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center space-x-3 cursor-pointer group">
                  <div 
                    onClick={() => {
                        setSelectedCategory(cat);
                        setSearchParams({ category: cat });
                    }}
                    className={`w-4 h-4 border transition-colors flex items-center justify-center rounded-sm ${
                      selectedCategory === cat ? 'bg-primary border-primary' : 'border-gray-300 group-hover:border-primary'
                    }`}
                  >
                    {selectedCategory === cat && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-sm ${selectedCategory === cat ? 'text-primary font-bold' : 'text-gray-500'}`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Price Range</h4>
              <span className="text-xs font-bold font-mono">${priceRange}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="200" 
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-bold">
              <span>$0</span>
              <span>$200</span>
            </div>
          </div>

          {/* Rating Filter Container */}
          <div className="space-y-6">
             <h4 className="text-xs font-bold uppercase tracking-[0.2em]">Rating</h4>
             <div className="space-y-3">
                {[5, 4, 3].map(star => (
                   <div key={star} className="flex items-center space-x-3 text-sm text-gray-500 cursor-pointer hover:text-primary transition-colors">
                      <div className="w-4 h-4 border border-gray-300 rounded-sm" />
                      <div className="flex text-accent">
                         {[...Array(star)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                         {[...Array(5-star)].map((_, i) => <Star key={i} size={12} />)}
                      </div>
                      <span className="text-[10px]">& Up</span>
                   </div>
                ))}
             </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow space-y-8">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <p className="text-xs text-gray-400 font-medium">Showing {filteredProducts.length} results</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary cursor-pointer">
                <span>Sort By: {sortBy}</span>
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <h3 className="text-xl font-display font-bold">No products found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your filters or search criteria.</p>
              <button 
                onClick={() => {
                    setSelectedCategory('All');
                    setPriceRange(200);
                }}
                className="btn-outline py-2 scale-90"
              >
                Reset Filters
              </button>
            </div>
          )}

          <div className="flex justify-center pt-12">
             <button className="btn-outline px-12 py-4 uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all">Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Star = ({ size, fill, key }: { size: number; fill?: string; key?: React.Key }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
