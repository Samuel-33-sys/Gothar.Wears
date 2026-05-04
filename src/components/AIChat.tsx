import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minus, Maximize2, Bot, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithAI } from '../services/aiService';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
  id: string;
}

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Hello! I'm your Gothar Style Assistant. Looking for something specific or need style advice?", 
      id: 'initial' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.concat(userMsg).map(m => ({ role: m.role, text: m.text }));
    const response = await chatWithAI(history);

    // Handle function calls
    if (response.functionCalls) {
      for (const call of response.functionCalls) {
        if (call.name === "addItemToCart") {
          const { productId, quantity } = call.args as { productId: string, quantity?: number };
          const product = PRODUCTS.find(p => p.id === productId);
          if (product) {
            addToCart(product, quantity || 1);
            console.log(`[AI ACTION] Automatically added ${product.name} (x${quantity || 1}) to cart.`);
          }
        } else if (call.name === "notifyOutOfStock") {
          const { itemName } = call.args as { itemName: string };
          console.log(`[AI NOTIFICATION] User requested missing item: ${itemName}. Owner notified.`);
        }
      }
    }

    const modelMsg: Message = { role: 'model', text: response.text, id: (Date.now() + 1).toString() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  // Helper to parse links and render them neatly
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <Link 
            key={index} 
            to={match[2]} 
            className="text-accent underline font-bold hover:text-primary transition-colors"
            onClick={() => setIsMinimized(true)}
          >
            {match[1]}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '60px' : '500px',
              width: '360px'
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-100 mb-4`}
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest">Style AI</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    <span className="text-[10px] text-gray-300">Online 24/7</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                  {messages.map((m) => (
                    <div 
                      key={m.id} 
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] flex items-start space-x-2 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                         <div className={`p-2 rounded-full shrink-0 ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-gray-100 shadow-sm text-primary'}`}>
                            {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                         </div>
                         <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                           m.role === 'user' 
                           ? 'bg-primary text-white rounded-tr-none' 
                           : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                         }`}>
                           {renderMessageContent(m.text)}
                         </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="relative"
                  >
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about products, style tips..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-accent transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-accent disabled:text-gray-300 hover:scale-110 transition-all"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                  <p className="text-[9px] text-gray-400 text-center mt-3 uppercase tracking-widest">Powered by Gothar AI</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className={`${isOpen ? 'hidden' : 'flex'} items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-2xl hover:bg-accent transition-all duration-300 group`}
      >
        <MessageSquare className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent border-2 border-white rounded-full" />
      </motion.button>
    </div>
  );
};
