import React from 'react';
import { motion } from 'motion/react';

export const DesignSystem = () => {
  const colors = [
    { name: 'Primary', value: '#000000', code: 'bg-primary' },
    { name: 'Secondary', value: '#F5F5F5', code: 'bg-secondary' },
    { name: 'Accent', value: '#FF6A00', code: 'bg-accent' },
    { name: 'Success', value: '#16A34A', code: 'bg-success' },
    { name: 'Error', value: '#DC2626', code: 'bg-error' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 space-y-24">
      <section>
        <h1 className="text-5xl font-display font-bold tracking-tighter mb-4">1. Design System</h1>
        <p className="text-gray-500 max-w-2xl">The visual foundations of Nexus E-Commerce. Built for clarity, premium feel, and consistent user experience.</p>
      </section>

      {/* Colors */}
      <section className="space-y-12">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 border-b border-gray-100 pb-4">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {colors.map((color) => (
            <div key={color.name} className="space-y-4">
              <div className={`aspect-square ${color.code} shadow-sm rounded-lg`}></div>
              <div>
                <p className="font-bold text-sm">{color.name}</p>
                <p className="text-xs text-gray-400 font-mono uppercase">{color.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-12">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 border-b border-gray-100 pb-4">Typography</h2>
        <div className="space-y-12">
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Heading 1 / Display</p>
            <h1 className="text-6xl font-display font-bold tracking-tighter">Premium Quality. Made for You.</h1>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Heading 2</p>
            <h2 className="text-3xl font-display font-bold">The Best Sellers</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Body Text</p>
              <p className="text-base text-gray-600 leading-relaxed">
                Timeless products crafted with care and designed to elevate your everyday. We believe in quality materials and sustainable practices above all else.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Small Caps</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Explore our new collection today
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="space-y-12">
        <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 border-b border-gray-100 pb-4">Components</h2>
        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary</button>
              <button className="btn-outline">Outline</button>
            </div>
          </div>
          <div className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Input Fields</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Default Input" className="input-field" />
              <div className="relative">
                <input type="text" placeholder="Search..." className="input-field pl-12" />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm italic">Search</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
