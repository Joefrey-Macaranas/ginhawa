'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, HeartHandshake, CheckCircle2, Award, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  onOpenBooking: () => void;
  onViewDevDeck: () => void;
}

export function HeroSection({ onExplore, onOpenBooking, onViewDevDeck }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs text-teal-400 font-medium">
              <span>Verified DOH & TESDA NC II Fleet</span>
              <span aria-hidden="true">·</span>
              <span>Metro Manila & Cavite</span>
              <span aria-hidden="true">·</span>
              <span>1.5% Insured Wellness Fund</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] text-balance">
              True Ginhawa. Traditional Filipino Healing at Your Doorstep.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Experience the profound relief of indigenous Hilot, warm banana leaf diagnosis (Pang-hihila), and targeted physical therapy delivered directly to your home by thoroughly vetted, licensed practitioners.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all shadow-md hover:shadow-teal-500/20 active:scale-[0.98] whitespace-nowrap"
              >
                Schedule In-Home Treatment
              </button>
              <button
                onClick={onExplore}
                className="px-5 py-3 text-sm font-medium text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-all whitespace-nowrap"
              >
                View Services & Fleet
              </button>
              <button
                onClick={onViewDevDeck}
                className="px-4 py-3 text-sm font-mono text-emerald-400 hover:text-emerald-300 hover:bg-slate-900/60 rounded-lg transition-all whitespace-nowrap"
              >
                MacBook Master Plan →
              </button>
            </div>

            {/* Proof Points Strip adjacent to claims */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>NBI & DOH Vetted</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Micro-Insurance Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Zero Double-Booking Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Editorial Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl aspect-[4/3] group">
              <Image
                src="/images/ginhawa_hero_wellness_1793298250127.jpg"
                alt="Ginhawa luxury home spa wellness setup"
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 45vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle floating detail badge adhering to spatial math */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Organic Hilot & Aromatherapy Kit</div>
                  <div className="text-slate-400 text-[11px]">Sanitized linen, virgin coconut oil, warm compress</div>
                </div>
                <div className="text-teal-400 font-semibold font-mono tabular-nums">100% Ready</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
