'use client';

import React from 'react';
import {
  MassageTherapyIcon,
  MuscleJointCareIcon,
  PainReliefIcon,
  BodyAlignmentIcon,
  RehabilitationIcon,
  WellnessProgramsIcon,
  OnlineConsultationIcon,
  HomeServiceIcon,
} from './GinhawaIcons';

interface GinhawaCategoryGridProps {
  selectedCategory?: string;
  onSelectCategory: (categoryName: string) => void;
}

export function GinhawaCategoryGrid({
  selectedCategory,
  onSelectCategory,
}: GinhawaCategoryGridProps) {
  const categories = [
    { id: 'massage', name: 'Massage Therapy', icon: <MassageTherapyIcon className="w-8 h-8 text-amber-300" /> },
    { id: 'muscle', name: 'Muscle & Joint Care', icon: <MuscleJointCareIcon className="w-8 h-8 text-amber-300" /> },
    { id: 'pain', name: 'Pain Relief', icon: <PainReliefIcon className="w-8 h-8 text-amber-300" /> },
    { id: 'alignment', name: 'Body Alignment', icon: <BodyAlignmentIcon className="w-8 h-8 text-amber-300" /> },
    { id: 'rehab', name: 'Rehabilitation', icon: <RehabilitationIcon className="w-8 h-8 text-amber-300" /> },
    { id: 'wellness', name: 'Wellness Programs', icon: <WellnessProgramsIcon className="w-8 h-8 text-amber-300" /> },
    { id: 'consultation', name: 'Online Consultation', icon: <OnlineConsultationIcon className="w-8 h-8 text-amber-300" /> },
    { id: 'home', name: 'Home Service', icon: <HomeServiceIcon className="w-8 h-8 text-amber-300" /> },
  ];

  return (
    <section className="bg-gradient-to-b from-[#3B0202] to-[#2E0202] py-6 border-b border-amber-950/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`p-3 sm:p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all group ${
                  isSelected
                    ? 'bg-[#8F1111] ring-2 ring-amber-400 shadow-lg scale-[1.03]'
                    : 'bg-[#520707] hover:bg-[#6E0A0A] border border-amber-500/20 hover:border-amber-400/50 shadow-md active:scale-95'
                }`}
              >
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#6B0D0D] to-[#3B0202] flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform shadow-inner mb-2">
                  {cat.icon}
                </div>

                {/* Category Label */}
                <span className="text-[11px] sm:text-xs font-medium text-white/95 group-hover:text-amber-200 leading-tight">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
