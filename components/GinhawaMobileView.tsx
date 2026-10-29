'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GinhawaLogo } from './GinhawaLogo';
import {
  MassageTherapyIcon,
  MuscleJointCareIcon,
  PainReliefIcon,
  BodyAlignmentIcon,
  RehabilitationIcon,
  WellnessProgramsIcon,
  OnlineConsultationIcon,
  HomeServiceIcon,
  VerifiedTherapistsBadge,
  SafeSecureBookingBadge,
  TrustedByClientsBadge,
  HolisticApproachBadge,
} from './GinhawaIcons';
import {
  MapPin,
  Calendar,
  ArrowRight,
  ChevronDown,
  Menu,
  Wifi,
  Battery,
  Home,
  Compass,
  CalendarDays,
  User,
  X,
} from 'lucide-react';

interface GinhawaMobileViewProps {
  onOpenBooking: () => void;
  onSelectCategory?: (category: string) => void;
}

export function GinhawaMobileView({ onOpenBooking, onSelectCategory }: GinhawaMobileViewProps) {
  const [location, setLocation] = useState('BGC Taguig');
  const [service, setService] = useState('Massage Therapy');
  const [date, setDate] = useState('Today');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'services' | 'bookings' | 'profile'>('home');

  const categories = [
    { id: 'massage', name: 'Massage Therapy', icon: <MassageTherapyIcon className="w-5 h-5 text-amber-300" /> },
    { id: 'muscle', name: 'Muscle & Joint Care', icon: <MuscleJointCareIcon className="w-5 h-5 text-amber-300" /> },
    { id: 'pain', name: 'Pain Relief', icon: <PainReliefIcon className="w-5 h-5 text-amber-300" /> },
    { id: 'alignment', name: 'Body Alignment', icon: <BodyAlignmentIcon className="w-5 h-5 text-amber-300" /> },
    { id: 'rehab', name: 'Rehabilitation', icon: <RehabilitationIcon className="w-5 h-5 text-amber-300" /> },
    { id: 'wellness', name: 'Wellness Programs', icon: <WellnessProgramsIcon className="w-5 h-5 text-amber-300" /> },
    { id: 'consultation', name: 'Online Consultation', icon: <OnlineConsultationIcon className="w-5 h-5 text-amber-300" /> },
    { id: 'home', name: 'Home Service', icon: <HomeServiceIcon className="w-5 h-5 text-amber-300" /> },
  ];

  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) {
      onSelectCategory(catName);
    }
    onOpenBooking();
  };

  return (
    <div className="w-full flex justify-center py-6 px-2 sm:px-4 bg-[#1A0303] min-h-screen">
      {/* Smartphone Device Shell (Exact match of mobile phone on right of image) */}
      <div className="relative w-full max-w-[410px] bg-white rounded-[46px] border-[10px] border-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden select-none">
        
        {/* Dynamic Island / Punch Hole Notch */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5">
          <div className="w-2 h-2 rounded-full bg-slate-900" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/70" />
        </div>

        {/* Device Status Bar */}
        <div className="pt-2 px-6 pb-1 bg-[#FAFAF9] flex items-center justify-between text-[11px] font-semibold text-slate-800 z-30">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] tracking-tight">5G</span>
            <Wifi className="w-3 h-3 text-slate-800" />
            <Battery className="w-3.5 h-3.5 text-slate-800" />
          </div>
        </div>

        {/* App Top Bar (Exact logo on left + hamburger on right) */}
        <div className="px-4 py-2.5 bg-[#FAFAF9] border-b border-stone-200 flex items-center justify-between z-30">
          <GinhawaLogo variant="gold-crimson" size="sm" showSubtitle={true} />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-800 hover:text-[#991B1B] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="absolute inset-x-0 top-[88px] bottom-[56px] z-50 bg-[#3B0202]/95 backdrop-blur-md p-6 text-white space-y-4 animate-in fade-in duration-200">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              Menu Navigation
            </div>
            <div className="space-y-3 text-sm font-semibold">
              <div onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-500/20 text-amber-200">Home</div>
              <div onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }} className="py-2 border-b border-amber-500/20">Services & Therapists</div>
              <div onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-500/20">How It Works</div>
              <div onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-500/20">Safety & Compliance</div>
              <div onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-500/20">About Us</div>
              <div onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-amber-500/20">Contact</div>
            </div>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full mt-4 py-3 bg-[#B91C1C] text-white font-bold text-xs rounded-full shadow"
            >
              Book In-Home Therapist
            </button>
          </div>
        )}

        {/* Scrollable Mobile Body */}
        <div className="flex-1 overflow-y-auto bg-stone-50 pb-6">
          
          {/* Mobile Hero Banner Image (Woman receiving massage) */}
          <div className="relative w-full h-44 bg-[#4A0404] overflow-hidden">
            <Image
              src="/assets/crops/hero_massage.jpg"
              alt="Ginhawa home massage therapy"
              fill
              priority
              className="object-cover"
              sizes="390px"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A0404] via-transparent to-transparent pointer-events-none" />
            
            {/* Golden script corner flourish */}
            <div className="absolute bottom-2 right-3 text-right">
              <span className="font-serif italic text-amber-300 text-sm drop-shadow">Ginhawa Sa Bawat Katawan ♡</span>
            </div>
          </div>

          {/* Crimson Card with Headline, Subtitle, and Vertical Search Selectors */}
          <div className="bg-gradient-to-b from-[#4A0404] via-[#630B0B] to-[#450707] text-white p-4 space-y-3.5 border-b border-amber-900/40">
            {/* Exact Headline */}
            <h2 className="text-lg font-serif font-bold text-white leading-tight">
              Professional Care. Natural Healing. A Better You.
            </h2>

            {/* Exact Subtitle */}
            <p className="text-[11px] text-amber-100/90 leading-snug">
              Book certified therapists, access wellness services, and take control of your health — anytime, anywhere.
            </p>

            {/* Vertical Stacked Search Inputs (Exact from image) */}
            <div className="space-y-2 pt-1">
              {/* Select Location */}
              <div className="bg-white rounded-xl px-3 py-2 flex items-center justify-between border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <MapPin className="w-4 h-4 text-[#B91C1C] shrink-0" />
                  <select
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="BGC Taguig">Select Location</option>
                    <option value="BGC Taguig">BGC Taguig</option>
                    <option value="Makati CBD">Makati CBD</option>
                    <option value="Ortigas Center">Ortigas Center</option>
                    <option value="Quezon City">Quezon City</option>
                    <option value="Alabang Muntinlupa">Alabang Muntinlupa</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Select Service */}
              <div className="bg-white rounded-xl px-3 py-2 flex items-center justify-between border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-[#B91C1C] text-sm shrink-0">💆</span>
                  <select
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="Massage Therapy">Select Service</option>
                    <option value="Massage Therapy">Massage Therapy</option>
                    <option value="Muscle & Joint Care">Muscle & Joint Care</option>
                    <option value="Pain Relief">Pain Relief</option>
                    <option value="Body Alignment">Body Alignment</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                    <option value="Home Service">Home Service</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Select Date */}
              <div className="bg-white rounded-xl px-3 py-2 flex items-center justify-between border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Calendar className="w-4 h-4 text-[#B91C1C] shrink-0" />
                  <select
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer appearance-none"
                  >
                    <option value="Today">Select Date</option>
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend">This Weekend</option>
                  </select>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Find a Therapist → (Wide Red Pill Button) */}
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 bg-[#A11212] hover:bg-[#850D0D] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                <span>Find a Therapist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4x2 Category Grid (Exact match of mobile phone layout) */}
          <div className="p-3 bg-white border-b border-stone-200">
            <div className="grid grid-cols-4 gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="p-1.5 rounded-xl bg-[#520707] hover:bg-[#6E0A0A] border border-amber-500/20 flex flex-col items-center text-center group active:scale-95 transition-all shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-b from-[#6B0D0D] to-[#3B0202] flex items-center justify-center border border-amber-500/30 group-hover:scale-105 transition-transform mb-1 shadow-inner">
                    {cat.icon}
                  </div>
                  <span className="text-[9px] font-medium text-white group-hover:text-amber-200 leading-tight">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile "WHY CHOOSE GINHAWA APP" Section */}
          <div className="p-4 bg-white space-y-3">
            <div className="text-[10px] font-bold text-[#B91C1C] uppercase tracking-wider">
              WHY CHOOSE GINHAWA APP
            </div>
            <h3 className="text-base font-serif font-bold text-slate-900 leading-snug">
              Your Wellness Partner in Every Step
            </h3>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Ginhawa App connects you with certified and verified therapists for safe, professional, and effective wellness services.
            </p>

            {/* 4 Trust Badges in a 4-column row (exact match) */}
            <div className="grid grid-cols-4 gap-2 pt-2 border-t border-stone-200">
              <div className="flex flex-col items-center text-center">
                <VerifiedTherapistsBadge className="w-8 h-8" />
                <span className="text-[9px] font-bold text-slate-800 mt-1 leading-tight">Verified Therapists</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <SafeSecureBookingBadge className="w-8 h-8" />
                <span className="text-[9px] font-bold text-slate-800 mt-1 leading-tight">Safe & Secure Booking</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <TrustedByClientsBadge className="w-8 h-8" />
                <span className="text-[9px] font-bold text-slate-800 mt-1 leading-tight">Trusted by Clients</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <HolisticApproachBadge className="w-8 h-8" />
                <span className="text-[9px] font-bold text-slate-800 mt-1 leading-tight">Holistic & Natural</span>
              </div>
            </div>
          </div>

          {/* Quick Care Booking CTA Banner */}
          <div className="m-3 p-4 rounded-2xl bg-gradient-to-r from-[#4A0404] to-[#680C0C] text-white flex items-center justify-between gap-3 shadow-lg border border-amber-500/30">
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-300">On-Demand Dispatch</div>
              <div className="text-xs font-bold">Relief in 45 Minutes</div>
              <div className="text-[10px] text-amber-100">DOH & TESDA certified fleet</div>
            </div>
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg whitespace-nowrap shadow"
            >
              Book Now
            </button>
          </div>

        </div>

        {/* Native Mobile Bottom Navigation Bar */}
        <div className="border-t border-stone-200 bg-[#FAFAF9] px-4 py-2 flex items-center justify-around text-slate-500 z-30">
          <button
            onClick={() => setActiveBottomTab('home')}
            className={`flex flex-col items-center gap-0.5 text-[10px] ${
              activeBottomTab === 'home' ? 'text-[#8A1111] font-bold' : 'hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => { setActiveBottomTab('services'); onOpenBooking(); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] ${
              activeBottomTab === 'services' ? 'text-[#8A1111] font-bold' : 'hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Services</span>
          </button>
          <button
            onClick={() => { setActiveBottomTab('bookings'); onOpenBooking(); }}
            className={`flex flex-col items-center gap-0.5 text-[10px] ${
              activeBottomTab === 'bookings' ? 'text-[#8A1111] font-bold' : 'hover:text-slate-900'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span>Bookings</span>
          </button>
          <button
            onClick={() => setActiveBottomTab('profile')}
            className={`flex flex-col items-center gap-0.5 text-[10px] ${
              activeBottomTab === 'profile' ? 'text-[#8A1111] font-bold' : 'hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Account</span>
          </button>
        </div>

        {/* Smartphone Home Indicator Bar */}
        <div className="pb-1.5 pt-1 flex justify-center bg-[#FAFAF9]">
          <div className="w-28 h-1 bg-slate-800 rounded-full" />
        </div>
      </div>
    </div>
  );
}
