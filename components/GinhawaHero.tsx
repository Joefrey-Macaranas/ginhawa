'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GinhawaLogo } from './GinhawaLogo';
import { MapPin, Sparkles, Calendar, ArrowRight, ChevronDown } from 'lucide-react';

interface GinhawaHeroProps {
  onSearch: (filters: { location: string; service: string; date: string }) => void;
}

export function GinhawaHero({ onSearch }: GinhawaHeroProps) {
  const [location, setLocation] = useState('BGC Taguig');
  const [service, setService] = useState('Massage Therapy');
  const [date, setDate] = useState('Today');

  const handleSearchClick = () => {
    onSearch({ location, service, date });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#4A0404] via-[#680C0C] to-[#3B0202] text-white pt-8 pb-14 border-b border-amber-900/40">
      {/* Subtle background ambient gold dust / glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Brand Emblem, Headline, Subtitle */}
          <div className="lg:col-span-7 space-y-5">
            {/* Prominent Ginhawa App Gold Emblem */}
            <div className="inline-block">
              <GinhawaLogo variant="gold-dark" size="xl" showSubtitle={true} />
            </div>

            {/* Exact Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-white leading-[1.2] tracking-tight text-balance">
              Professional Care. Natural Healing. A Better You.
            </h1>

            {/* Exact Subtitle */}
            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-xl font-normal">
              Book certified therapists, access wellness services, and take control of your health — anytime, anywhere.
            </p>

            {/* Floating Search Pill Bar (Exact from image) */}
            <div className="pt-2">
              <div className="bg-white rounded-full p-1.5 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-stone-200 border border-stone-200 text-slate-800">
                {/* Select Location */}
                <div className="flex-1 px-3.5 py-2 flex items-center gap-2 relative group cursor-pointer">
                  <MapPin className="w-4 h-4 text-[#B91C1C] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <select
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                      <option value="BGC Taguig">Select Location: BGC Taguig</option>
                      <option value="Makati CBD">Select Location: Makati CBD</option>
                      <option value="Ortigas Center">Select Location: Ortigas / Pasig</option>
                      <option value="Quezon City">Select Location: Quezon City</option>
                      <option value="Alabang Muntinlupa">Select Location: Alabang Muntinlupa</option>
                    </select>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-3" />
                </div>

                {/* Select Service */}
                <div className="flex-1 px-3.5 py-2 flex items-center gap-2 relative group cursor-pointer">
                  <span className="text-[#B91C1C] text-sm shrink-0">💆</span>
                  <div className="flex-1 min-w-0">
                    <select
                      value={service}
                      onChange={e => setService(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                      <option value="Massage Therapy">Select Service: Massage Therapy</option>
                      <option value="Muscle & Joint Care">Select Service: Muscle & Joint Care</option>
                      <option value="Pain Relief">Select Service: Pain Relief</option>
                      <option value="Body Alignment">Select Service: Body Alignment</option>
                      <option value="Rehabilitation">Select Service: Rehabilitation</option>
                      <option value="Home Service">Select Service: Home Service</option>
                    </select>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-3" />
                </div>

                {/* Select Date */}
                <div className="flex-1 px-3.5 py-2 flex items-center gap-2 relative group cursor-pointer">
                  <Calendar className="w-4 h-4 text-[#B91C1C] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <select
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer appearance-none pr-4"
                    >
                      <option value="Today">Select Date: Today</option>
                      <option value="Tomorrow">Select Date: Tomorrow</option>
                      <option value="This Weekend">Select Date: This Weekend</option>
                    </select>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-3" />
                </div>

                {/* Find a Therapist Button (Solid Red Pill) */}
                <div className="p-1 shrink-0">
                  <button
                    onClick={handleSearchClick}
                    className="w-full md:w-auto px-6 py-3 bg-[#A11212] hover:bg-[#850D0D] text-white font-semibold text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98] whitespace-nowrap"
                  >
                    <span>Find a Therapist</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Script "Ginhawa Sa Bawat Katawan" */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 group">
              {/* Authentic crop from the provided reference image */}
              <Image
                src="/assets/crops/hero_massage.jpg"
                alt="Professional massage therapist caring for client with Ginhawa uniform"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 45vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B0202]/80 via-transparent to-transparent pointer-events-none" />

              {/* Floating Golden Script: "Ginhawa Sa Bawat Katawan" */}
              <div className="absolute bottom-4 right-4 text-right pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                <div
                  className="font-serif italic font-normal text-amber-200 text-2xl sm:text-3xl tracking-wide select-none"
                  style={{ fontFamily: 'Georgia, Cambria, serif' }}
                >
                  Ginhawa
                </div>
                <div
                  className="font-serif italic text-amber-300 text-lg sm:text-xl -mt-1 select-none flex items-center justify-end gap-1"
                  style={{ fontFamily: 'Georgia, Cambria, serif' }}
                >
                  <span>Sa Bawat Katawan</span>
                  <span className="text-amber-400 text-xs">♡</span>
                </div>
              </div>

              {/* Therapist badge indicator */}
              <div className="absolute top-3 left-3 bg-[#5C0707]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/40 text-[11px] font-medium text-amber-200 flex items-center gap-1.5 shadow">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Certified Home Care</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
