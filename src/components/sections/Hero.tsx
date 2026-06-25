"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("/hero-bg.jpg")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8 flex flex-col items-center text-center mt-16">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="text-gold font-medium uppercase tracking-[0.3em] text-sm md:text-base mb-6 block">
            Добро пожаловать
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tight leading-[1.1]">
            СТАРЫЙ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-hover">
              ПЛОВДИВ
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-light">
            Самый большой ресторан Красносельского района. Идеальное место для вашего отдыха, 
            шумных вечеринок, свадебных банкетов и концертов.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Button variant="primary" size="lg" className="w-full sm:w-auto text-lg px-8">
            Забронировать стол
          </Button>
          <a href="#menu" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full text-lg px-8">
              Посмотреть меню
            </Button>
          </a>
        </motion.div>
        
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-foreground/50">Вниз</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-gold/80 to-transparent"
        />
      </motion.div>
    </section>
  );
}
