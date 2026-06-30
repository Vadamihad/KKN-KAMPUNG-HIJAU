import React, { useEffect, useRef, useState } from 'react';
import * as Icons from 'lucide-react';
import { StatItem } from '../types';

interface StatCounterProps {
  item: StatItem;
  key?: string;
}

export default function StatCounter({ item }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // Dynamically resolve the lucide icon
  const IconComponent = (Icons as any)[item.iconName] || Icons.HelpCircle;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let start = 0;
          const end = item.value;
          const duration = 1500; // 1.5 seconds animation
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * end);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [item.value, hasAnimated]);

  return (
    <div
      id={item.id}
      ref={elementRef}
      className="bg-white rounded-2xl border border-border-soft p-6 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:border-brand-primary"
    >
      <div className={`p-4 rounded-xl border mb-4 ${item.colorClass}`}>
        <IconComponent className="w-8 h-8 stroke-[2]" />
      </div>
      
      <div className="flex items-baseline justify-center">
        <span className="font-display font-extrabold text-4xl text-brand-deep tracking-tight">
          {count}
        </span>
        <span className="font-display font-bold text-lg text-brand-primary ml-1">
          {item.suffix}
        </span>
      </div>
      
      <p className="text-neutral-muted text-sm font-semibold mt-2">
        {item.label}
      </p>

      {/* Aesthetic accent progress-like bar */}
      <div className="w-16 h-1.5 rounded-full bg-bg-light mt-4 overflow-hidden">
        <div 
          className={`h-full ${item.accentClass} transition-all duration-[1.5s] ease-out`}
          style={{ width: hasAnimated ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}
