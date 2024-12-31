"use client";

import { Button } from '../Button/Button';

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
}

export function Hero({ 
  title = "Welcome", 
  description = "Start your journey with us", 
  ctaText = "Get Started" 
}: HeroProps) {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
        {description}
      </p>
      <Button size="large">{ctaText}</Button>
    </div>
  );
}