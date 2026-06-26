"use client";

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionHeading } from '../ui/SectionHeading';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Promotion = {
  id: string;
  title: string;
  description: string;
  image_url: string;
};

export function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    async function fetchPromotions() {
      const { data } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
        
      if (data) {
        setPromotions(data);
      }
      setLoading(false);
    }
    fetchPromotions();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        </div>
      </section>
    );
  }

  if (promotions.length === 0) return null; // Don't show the section if no promotions exist

  return (
    <section className="py-24 bg-graphite border-t border-black/5 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="Специальные предложения" 
          subtitle="Акции и события" 
          className="mb-12"
        />

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4 touch-pan-y">
              {promotions.map((promo) => (
                <div key={promo.id} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                  <div className="bg-background rounded-2xl overflow-hidden shadow-xl border border-black/5 h-full flex flex-col group relative">
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img 
                        src={promo.image_url} 
                        alt={promo.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-8 flex flex-col flex-grow relative z-20 bg-background">
                      <h3 className="text-xl font-bold font-heading mb-3 text-foreground">{promo.title}</h3>
                      <p className="text-foreground/70 text-sm leading-relaxed mb-6 flex-grow">
                        {promo.description}
                      </p>
                      <button className="text-gold font-bold text-sm uppercase tracking-wider hover:text-gold-hover transition-colors self-start mt-auto flex items-center gap-2">
                        Узнать подробнее
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons (visible only if there are more than 1 item) */}
          {promotions.length > 1 && (
            <>
              <button 
                onClick={scrollPrev}
                className="absolute top-1/2 -left-4 lg:-left-12 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-black/5 flex items-center justify-center text-foreground hover:text-gold hover:scale-110 transition-all z-30"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={scrollNext}
                className="absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-black/5 flex items-center justify-center text-foreground hover:text-gold hover:scale-110 transition-all z-30"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
