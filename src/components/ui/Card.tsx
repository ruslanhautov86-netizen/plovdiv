"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  price?: string;
  className?: string;
}

export function Card({ imageSrc, title, description, price, className = '' }: CardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`bg-graphite-light overflow-hidden rounded-lg border border-white/5 group ${className}`}
    >
      <div className="relative h-64 overflow-hidden">
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {price && (
          <div className="absolute top-4 right-4 bg-burgundy text-white px-4 py-2 font-bold rounded-sm shadow-lg">
            {price}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-heading font-bold mb-2 text-gold">{title}</h3>
        <p className="text-foreground/70 mb-4">{description}</p>
      </div>
    </motion.div>
  );
}
