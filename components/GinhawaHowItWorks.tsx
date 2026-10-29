'use client';

import React from 'react';
import { UserPlus, Search, CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';
import { WellnessProgramsIcon } from './GinhawaIcons';

interface GinhawaHowItWorksProps {
  onStartBooking: () => void;
}

export function GinhawaHowItWorks({ onStartBooking }: GinhawaHowItWorksProps) {
  const steps = [
    {
      num: 1,
      title: 'Create an Account',
      desc: 'Sign up as a client or therapist.',
      icon: <UserPlus className="w-5 h-5 text-amber-300" />,
    },
    {
      num: 2,
      title: 'Choose a Service',
      desc: 'Browse and select your preferred wellness service.',
      icon: <Search className="w-5 h-5 text-amber-300" />,
    },
    {
      num: 3,
      title: 'Book & Confirm',
      desc: 'Pick date, time and location.',
      icon: <CalendarCheck className="w-5 h-5 text-amber-300" />,
    },
    {
      num: 4,
      title: 'Receive Treatment',
      desc: 'Get professional care and feel the ginhawa.',
      icon: <WellnessProgramsIcon className="w-5 h-5 text-amber-300" />,
    },
  ];

  return (
    <section id="how-it-works" className="bg-gradient-to-r from-[#3B0202] via-[#520707] to-[#3B0202] text-white py-16 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
              HOW GINHAWA APP WORKS
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Simple. Fast. Convenient.
            </h2>
          </div>

          <button
            onClick={onStartBooking}
            className="px-5 py-2.5 text-xs font-medium text-amber-200 hover:text-white border border-amber-400/40 hover:border-amber-300 rounded-full transition-all flex items-center gap-2 self-start sm:self-auto hover:bg-white/5 active:scale-95"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Numbered Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(step => (
            <div
              key={step.num}
              className="relative p-5 rounded-2xl bg-[#450707]/60 border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Number Badge (1, 2, 3, 4) in red circle */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center shadow-md ring-2 ring-amber-400/30">
                    {step.num}
                  </div>
                  <div className="p-2 rounded-xl bg-[#5C0A0A] border border-amber-500/20 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-amber-100/75 mt-1.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step indicator footer */}
              <div className="mt-4 pt-3 border-t border-amber-500/10 flex items-center justify-between text-[10px] text-amber-400/60 font-mono">
                <span>Step 0{step.num}</span>
                <span>Ready</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
