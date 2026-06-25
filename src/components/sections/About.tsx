import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  return (
    <section id="about" className="py-24 bg-graphite-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <div className="flex-1 w-full relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-background relative border border-black/5 shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/about-bg.jpg")' }}
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-burgundy/20 rounded-full blur-2xl z-[-1]" />
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-gold/10 rounded-full blur-2xl z-[-1]" />
          </div>

          <div className="flex-1 space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-4">
              <p className="text-gold font-medium uppercase tracking-widest text-sm">История и атмосфера</p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">О Ресторане</h2>
              <div className="w-24 h-1 bg-burgundy mx-auto lg:mx-0 mt-6 rounded-full" />
            </div>
            
            <p className="text-foreground/80 leading-relaxed text-lg font-light pt-2">
              «Старый Пловдив» — это самый большой и уютный ресторан в Красносельском районе Санкт-Петербурга. 
              Мы создали идеальное пространство для вашего отдыха, где каждая деталь продумана с любовью и вниманием к гостям.
            </p>
            
            <ul className="space-y-4 pt-4 text-left">
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-gold font-bold">1</span>
                </div>
                <p className="text-foreground/80"><strong className="text-foreground font-medium">Два просторных этажа</strong> с элегантным интерьером и уютным освещением.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-gold font-bold">2</span>
                </div>
                <p className="text-foreground/80"><strong className="text-foreground font-medium">Вместимость до 500 человек</strong> — идеальный выбор для масштабных мероприятий и свадеб.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <span className="text-gold font-bold">3</span>
                </div>
                <p className="text-foreground/80"><strong className="text-foreground font-medium">Отдельные VIP-залы</strong> для приватных встреч и небольших компаний.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
