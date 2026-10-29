'use client';

import React from 'react';
import { GinhawaHero } from './GinhawaHero';
import { GinhawaCategoryGrid } from './GinhawaCategoryGrid';
import { GinhawaWhyChoose } from './GinhawaWhyChoose';
import { GinhawaHowItWorks } from './GinhawaHowItWorks';
import { GinhawaMobileView } from './GinhawaMobileView';
import { Smartphone, Monitor } from 'lucide-react';

interface GinhawaSplitViewProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenBooking: () => void;
  onSearch: (filters: { location: string; service: string; date: string }) => void;
}

export function GinhawaSplitView({
  selectedCategory,
  onSelectCategory,
  onOpenBooking,
  onSearch,
}: GinhawaSplitViewProps) {
  return (
    <div className="w-full bg-[#180202] py-4">
      <div className="max-w-[1720px] mx-auto px-2 sm:px-6">
        
        {/* Comparison Header Badge */}
        <div className="mb-4 flex items-center justify-between text-xs text-amber-200 bg-[#380202] border border-amber-500/20 px-4 py-2.5 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Dual Frontend Design Engine</span>
            <span className="text-slate-400">·</span>
            <span className="text-amber-300">Live side-by-side comparison matching reference layout</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5 text-amber-400" /> Desktop Web (Left)</span>
            <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-amber-400" /> Native Mobile (Right)</span>
          </div>
        </div>

        {/* 2-Column Responsive Split Canvas */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Left: Desktop Web Layout Container */}
          <div className="xl:col-span-8 rounded-3xl overflow-hidden border-2 border-stone-800 shadow-2xl bg-white">
            <div className="bg-[#2E0202] text-amber-200 px-4 py-1.5 text-[11px] font-mono flex items-center justify-between border-b border-amber-900/30">
              <span>Desktop Viewport (1440px Canvas)</span>
              <span className="text-emerald-400">Responsive Web App</span>
            </div>

            <GinhawaHero onSearch={onSearch} />
            <GinhawaCategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={onSelectCategory}
            />
            <GinhawaWhyChoose onLearnMore={onOpenBooking} />
            <GinhawaHowItWorks onStartBooking={onOpenBooking} />
          </div>

          {/* Right: Native Mobile App View Container */}
          <div className="xl:col-span-4 sticky top-20 flex flex-col items-center">
            <div className="w-full text-center text-xs text-amber-300 font-mono mb-2">
              Native App View (Mobile UI/UX)
            </div>
            <GinhawaMobileView
              onOpenBooking={onOpenBooking}
              onSelectCategory={onSelectCategory}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
