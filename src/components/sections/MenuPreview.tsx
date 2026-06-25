"use client";

import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { menuData } from '@/data/menu';

export function MenuPreview() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);

  const currentCategory = menuData.find(c => c.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="Наше Меню" 
          subtitle="Европейская и грузинская кухня" 
          className="mb-12"
        />
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {menuData.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.category 
                  ? 'bg-burgundy text-white shadow-lg scale-105' 
                  : 'bg-black/5 text-foreground/80 hover:bg-black/10 hover:text-black border border-black/5'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {currentCategory?.items.map((item, index) => (
            <Card 
              key={index}
              title={item.title}
              description={item.description}
              price={item.price}
              imageSrc={item.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
