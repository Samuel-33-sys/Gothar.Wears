import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, CreditCard, Truck, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export const CartCheckout = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const shippingCost = 0; // Free for demo
  const tax = Math.round(cartTotal * 0.08 * 100) / 100;
  const finalTotal = cartTotal + shippingCost + tax;

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-display font-bold">Your cart is empty</h2>
        <p className="text-gray-400">Seems like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn-primary inline-block">Explore Shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Checkout Progress */}
      {step !== 'success' && (
        <div className="flex justify-center items-center space-x-4 mb-20">
          {['cart', 'shipping', 'payment'].map((s, i) => (
            <React.Fragment key={s}>
              <div 
                className={`flex items-center space-x-2 ${
                  step === s ? 'text-primary font-bold' : 'text-gray-300'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border ${
                  step === s ? 'border-primary bg-primary text-white' : 'border-gray-200'
                }`}>{i + 1}</span>
                <span className="text-[10px] uppercase tracking-widest">{s}</span>
              </div>
              {i < 2 && <div className="w-10 h-0.5 bg-gray-100" />}
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-8 flex-grow">
          <AnimatePresence mode="wait">
            {step === 'cart' && (
              <motion.div 
                key="cart"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-10"
              >
                <h2 className="text-3xl font-display font-bold tracking-tight">Shopping Cart</h2>
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-6 py-6 border-b border-gray-100 last:border-0 group">
                      <div className="w-24 h-32 md:w-32 md:h-40 bg-secondary rounded-xl overflow-hidden flex-shrink-0">
                        <img src={item.images[0]} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{item.category}</p>
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {item.selectedColor && `Color: ${item.selectedColor}`}
                              {item.selectedSize && ` • Size: ${item.selectedSize}`}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                            className="text-gray-300 hover:text-error transition-colors p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex justify-between items-end mt-4">
                          <div className="flex items-center border border-gray-100 rounded-lg bg-white shadow-sm overflow-hidden scale-90 origin-left">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                              className="px-3 py-2 hover:bg-secondary text-gray-400 hover:text-primary transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-sm font-bold font-mono">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                              className="px-3 py-2 hover:bg-secondary text-gray-400 hover:text-primary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-10">
                   <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-primary flex items-center space-x-2 hover:text-accent transition-colors">
                      <ArrowLeft size={14} />
                      <span>Continue Shopping</span>
                   </Link>
                   <button 
                    onClick={() => setStep('shipping')}
                    className="btn-primary"
                   >
                    Proceed to Shipping
                   </button>
                </div>
              </motion.div>
            )}

            {step === 'shipping' && (
              <motion.div 
                key="shipping"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-bold tracking-tight">Shipping Information</h2>
                    <p className="text-gray-400 text-sm">Please enter your delivery details below.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input-field" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input-field" placeholder="Doe" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" placeholder="john@example.com" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Address line 1</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="input-field" placeholder="123 Studio Street" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input-field" placeholder="Design City" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">ZIP / Postcode</label>
                        <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} className="input-field" placeholder="10001" />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-10">
                   <button onClick={() => setStep('cart')} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Back to Cart</button>
                   <button 
                    onClick={() => setStep('payment')}
                    className="btn-primary"
                   >
                    Continue to Payment
                   </button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-bold tracking-tight">Payment Method</h2>
                    <p className="text-gray-400 text-sm">All transactions are secure and encrypted.</p>
                </div>

                <div className="space-y-4">
                    <div className="p-6 border-2 border-primary rounded-2xl bg-primary/5 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <p className="font-bold">Credit / Debit Card</p>
                                <p className="text-xs text-gray-400">Visa, Mastercard, AMEX</p>
                            </div>
                        </div>
                        <div className="w-5 h-5 rounded-full border-4 border-primary" />
                    </div>
                    
                    <div className="p-6 border border-gray-100 rounded-2xl flex items-center justify-between hover:border-gray-300 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-xs italic">PP</div>
                            <p className="font-bold">PayPal</p>
                        </div>
                        <div className="w-5 h-5 rounded-full border border-gray-200" />
                    </div>
                </div>

                <div className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Card Number</label>
                        <input type="text" className="input-field" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
                            <input type="text" className="input-field" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">CVV</label>
                            <input type="text" className="input-field" placeholder="123" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-10">
                   <button onClick={() => setStep('shipping')} className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors">Back to Shipping</button>
                   <button 
                    onClick={() => {
                        clearCart();
                        setStep('success');
                    }}
                    className="btn-primary min-w-[200px]"
                   >
                    Place Order • ${finalTotal.toFixed(2)}
                   </button>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 text-center space-y-8"
                >
                    <div className="mx-auto w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mb-10">
                        <CheckCircle2 size={48} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-5xl font-display font-bold tracking-tighter">Order Placed!</h2>
                        <p className="text-gray-500 max-w-sm mx-auto">Your order has been successfully placed. We've sent a confirmation email to you.</p>
                    </div>
                    <div className="pt-8">
                        <button 
                            onClick={() => navigate('/')}
                            className="btn-primary px-12"
                        >
                            Return Home
                        </button>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        {step !== 'success' && (
          <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-8">
            <div className="bg-secondary rounded-2xl p-8 space-y-8">
                <h3 className="font-display font-bold uppercase tracking-widest text-sm">Order Summary</h3>
                
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span className="text-success font-bold">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estimated Tax</span>
                        <span className="font-bold">${tax.toFixed(2)}</span>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-between items-end">
                    <span className="text-sm uppercase tracking-widest font-bold">Total</span>
                    <span className="text-3xl font-display font-bold">${finalTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-4 pt-4">
                   <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Lock size={14} />
                      <span>Secure Payment Encryption</span>
                   </div>
                   <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Truck size={14} />
                      <span>Eco-friendly Shipping</span>
                   </div>
                </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

const ArrowLeft = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 19-7-7 7-7" /><path d="M19 12H5" />
    </svg>
);
