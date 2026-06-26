"use client";

import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { supabase } from '@/lib/supabase';
import { Calendar } from 'lucide-react';

type AppEvent = {
  id: string;
  title: string;
  event_date: string;
  description: string;
  image_url: string;
};

export function Events() {
  const [events, setEvents] = useState<AppEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setEvents(data);
      setLoading(false);
    }
    loadEvents();
  }, []);

  return (
    <section id="events" className="py-24 bg-graphite-light border-t border-black/5">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading 
          title="Афиша и Банкеты" 
          subtitle="Живая музыка и праздники" 
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Events Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-heading font-bold text-foreground mb-4">Ближайшие события</h3>
            
            {loading ? (
              <div className="flex justify-center py-10">
                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold"></div>
              </div>
            ) : events.length > 0 ? (
              <div className="space-y-6">
                {events.map((evt) => (
                  <div key={evt.id} className="bg-background rounded-lg p-6 border border-black/5 shadow-xl relative overflow-hidden group flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                    
                    {evt.image_url && (
                      <div className="shrink-0 w-full sm:w-32 h-32 rounded-md overflow-hidden">
                        <img src={evt.image_url} alt={evt.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 text-gold font-bold mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{evt.event_date}</span>
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-2">{evt.title}</h4>
                      {evt.description && (
                        <p className="text-foreground/70 text-sm leading-relaxed">{evt.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  В ресторане «Старый Пловдив» регулярно проходят выступления кавер-групп, 
                  популярных артистов и звезд 90-х. Живая музыка, танцы и невероятная атмосфера праздника ждут вас каждые выходные!
                </p>
                <div className="bg-background rounded-lg p-6 border border-black/5 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gold" />
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gold font-bold text-lg">Пятница и Суббота</span>
                    <span className="bg-black/10 text-foreground px-3 py-1 rounded-full text-xs uppercase tracking-wider">Живой звук</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Танцевальные вечера и Дискотека</h4>
                  <p className="text-foreground/60 text-sm">Бронируйте столы заранее!</p>
                </div>
              </div>
            )}
            
          </div>

          {/* Banquet Form */}
          <div className="bg-background rounded-xl p-8 lg:p-10 border border-black/5 shadow-2xl relative h-fit">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/10 rounded-full blur-2xl z-0" />
            <div className="relative z-10">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">Организация банкета</h3>
              <p className="text-foreground/60 text-sm mb-6">Оставьте заявку, и наш менеджер свяжется с вами для обсуждения деталей вашего праздника.</p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Ваше имя" 
                    className="bg-black/5 border border-black/10 rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input 
                    type="tel" 
                    placeholder="Номер телефона" 
                    className="bg-black/5 border border-black/10 rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Формат (Свадьба, Юбилей...)" 
                    className="bg-black/5 border border-black/10 rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input 
                    type="text" 
                    placeholder="Количество гостей" 
                    className="bg-black/5 border border-black/10 rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <Button variant="primary" className="w-full mt-2 h-12 text-lg">Отправить заявку</Button>
                <p className="text-xs text-center text-foreground/40 mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
