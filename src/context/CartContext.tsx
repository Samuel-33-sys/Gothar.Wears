import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (id: string, color?: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedColor === color && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
    });
  };

  const removeFromCart = (id: string, color?: string, size?: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.selectedColor === color && item.selectedSize === size)));
  };

  const updateQuantity = (id: string, quantity: number, color?: string, size?: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
