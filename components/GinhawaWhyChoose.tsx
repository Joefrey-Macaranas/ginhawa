'use client';

import React from 'react';
import Image from 'next/image';
import {
  VerifiedTherapistsBadge,
  SafeSecureBookingBadge,
  TrustedByClientsBadge,
  HolisticApproachBadge,
} from './GinhawaIcons';

interface GinhawaWhyChooseProps {
  onLearnMore?: () => void;
}

export function GinhawaWhyChoose({ onLearnMore }: GinhawaWhyChooseProps) {
  const trustItems = [
    {
      id: 'verified',
      title: 'Verified Therapists',
      icon: <VerifiedTherapistsBadge className="w-10 h-10" />,
      desc: 'DOH Licensed & TESDA NC II certified practitioners',
    },
    {
      id: 'secure',
      title: 'Safe & Secure Booking',
      icon: <SafeSecureBookingBadge className="w-10 h-10" />,
      desc: 'Transparent pricing & encrypted payments',
    },
    {
      id: 'trusted',
      title: 'Trusted by Clients',
      icon: <TrustedByClientsBadge className="w-10 h-10" />,
      desc: '4.98 average rating across Metro Manila',
    },
    {
      id: 'holistic',
      title: 'Holistic & Natural Approach',
      icon: <HolisticApproachBadge className="w-10 h-10" />,
      desc: 'Ancient Hilot, organic oils, and herbal therapy',
    },
  ];

  return (
    <section className="bg-white text-slate-800 py-16 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Therapist Stretching Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-stone-100 group">
              <Image
                src="/assets/crops/therapist_stretch.jpg"
                alt="Licensed Ginhawa therapist assisting client with therapeutic arm stretch"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 380px"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              
              {/* Corner badge */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold text-[#8A1111] shadow-md border border-stone-200">
                Gentle Rehabilitation & Stretching
              </div>
            </div>
          </div>

          {/* Right Column: Copy & 4 Trust Badges */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Exact Kicker */}
              <div className="text-xs font-bold text-[#B91C1C] uppercase tracking-wider mb-2">
                WHY CHOOSE GINHAWA APP
              </div>

              {/* Exact Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Your Wellness Partner in Every Step
              </h2>

              {/* Exact Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed max-w-xl">
                Ginhawa App connects you with certified and verified therapists for safe, professional, and effective wellness services.
              </p>
            </div>

            {/* 4 Trust Badges in a Row (exact from image) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-200/90">
              {trustItems.map(item => (
                <div key={item.id} className="flex flex-col items-center text-center space-y-2 p-2">
                  <div className="text-[#B91C1C] hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-snug hidden sm:block">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
