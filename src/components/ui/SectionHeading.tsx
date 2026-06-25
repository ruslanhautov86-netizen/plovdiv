import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center space-y-4 ${className}`}>
      {subtitle && <p className="text-gold font-medium uppercase tracking-widest text-sm">{subtitle}</p>}
      <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">{title}</h2>
      <div className="w-24 h-1 bg-burgundy mx-auto mt-6 rounded-full" />
    </div>
  );
}
