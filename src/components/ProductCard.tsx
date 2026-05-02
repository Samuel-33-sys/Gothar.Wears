import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block overflow-hidden relative aspect-[4/5] bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.tags?.map((tag) => (
          <span 
            key={tag}
            className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 ${
              tag === 'Sale' ? 'bg-error text-white' : 'bg-primary text-white'
            }`}
          >
            {tag}
          </span>
        ))}
        
        <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-full bg-white text-primary text-xs font-bold uppercase tracking-widest py-3 shadow-xl hover:bg-primary hover:text-white transition-colors">
            Quick Add
          </button>
        </div>
      </Link>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{product.category}</p>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-sm font-medium hover:text-accent transition-colors">{product.name}</h3>
            </Link>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-xs text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                className={i < Math.floor(product.rating) ? 'text-accent' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviewsCount})</span>
        </div>
      </div>
    </motion.div>
  );
};
