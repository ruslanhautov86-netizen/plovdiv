import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-graphite-light border-t border-white/10 pt-16 pb-8" id="contacts">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* About Column */}
          <div className="space-y-4">
            <img src="/logo.svg" alt="Старый Пловдив" className="h-20 w-auto mb-6" />
            <p className="text-foreground/70 text-sm leading-relaxed">
              Самый большой ресторан Красносельского района. Идеальное место для отдыха, шумных вечеринок, свадебных банкетов и концертов.
            </p>
          </div>

          {/* Contacts Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-bold text-white mb-6">Контакты</h4>
            <div className="flex items-start gap-3 text-foreground/70 text-sm">
              <MapPin className="text-gold shrink-0 mt-1" size={18} />
              <p>пр. Ветеранов, 140Б<br/>Санкт-Петербург</p>
            </div>
            <div className="flex items-center gap-3 text-foreground/70 text-sm">
              <Phone className="text-gold shrink-0" size={18} />
              <a href="tel:+78127358543" className="hover:text-gold transition-colors">+7 (812) 735-85-43</a>
            </div>
          </div>

          {/* Hours Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-bold text-white mb-6">Режим работы</h4>
            <div className="flex items-start gap-3 text-foreground/70 text-sm">
              <Clock className="text-gold shrink-0 mt-1" size={18} />
              <div>
                <p className="mb-2"><strong className="text-white">Вс - Чт:</strong> 12:00 - 23:00</p>
                <p><strong className="text-white">Пт - Сб:</strong> 12:00 - 02:00</p>
              </div>
            </div>
          </div>

          {/* Socials / Map Placeholder Column */}
          <div className="space-y-4">
            <h4 className="text-lg font-heading font-bold text-white mb-6">Мы на карте</h4>
            <div className="w-full h-32 bg-background rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group">
              <span className="text-sm text-foreground/50 z-10 transition-transform group-hover:scale-105">Загрузка карты...</span>
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="pt-4">
              <a href="#" className="text-gold hover:text-gold-hover text-sm font-medium uppercase tracking-wider transition-colors inline-block">
                Мы ВКонтакте &rarr;
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-foreground/50">
          <p>&copy; {new Date().getFullYear()} Ресторан «Старый Пловдив». Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
