"use client";

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { supabase } from '@/lib/supabase';
import { menuData as fallbackData } from '@/data/menu';

type MenuItem = {
  title: string;
  price: string;
  description: string;
  imageSrc: string;
};

type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export function MenuPreview() {
  const [data, setData] = useState<MenuCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const { data: cats, error: catError } = await supabase
          .from('menu_categories')
          .select('*')
          .order('sort_order', { ascending: true });
          
        if (catError) throw catError;

        const { data: items, error: itemError } = await supabase
          .from('menu_items')
          .select('*')
          .order('sort_order', { ascending: true });

        if (itemError) throw itemError;

        if (cats && cats.length > 0 && items) {
          const formattedData = cats.map(cat => {
            const catItems = items.filter(item => item.category_id === cat.id);
            return {
              category: cat.name,
              items: catItems.map(item => ({
                title: item.title,
                price: item.price,
                description: item.description || '',
                imageSrc: item.image_url || '/placeholder.jpg'
              }))
            };
          });
          
          const filledData = formattedData.filter(d => d.items.length > 0);
          
          if (filledData.length > 0) {
            setData(filledData);
            setActiveCategory(filledData[0].category);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
      
      setData(fallbackData);
      setActiveCategory(fallbackData[0].category);
      setLoading(false);
    }

    loadMenu();
  }, []);

  const currentCategory = data.find(c => c.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="Наше Меню" 
          subtitle="Европейская и грузинская кухня" 
          className="mb-12"
        />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {data.map((cat, index) => (
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
          </>
        )}
      </div>
    </section>
  );
}
