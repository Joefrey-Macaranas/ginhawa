'use client';

import React from 'react';
import { GinhawaLogo } from './GinhawaLogo';
import { Search, Smartphone, Monitor, Columns, Terminal } from 'lucide-react';

interface GinhawaHeaderProps {
  viewMode: 'desktop' | 'mobile' | 'split' | 'devdeck';
  setViewMode: (mode: 'desktop' | 'mobile' | 'split' | 'devdeck') => void;
  onOpenBooking: () => void;
}

export function GinhawaHeader({ viewMode, setViewMode, onOpenBooking }: GinhawaHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF9] border-b border-stone-200/90 shadow-sm">
      {/* Top Viewport Mode Switcher Banner (allows switching between exact Desktop, Native Mobile, Side-by-Side, and Dev Deck) */}
      <div className="bg-[#450707] text-white px-4 py-1.5 text-xs flex items-center justify-between border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold tracking-wide text-amber-200">Ginhawa UI/UX Viewport Engine</span>
          <span className="hidden sm:inline text-slate-300">· Pixel-perfect implementation from reference design</span>
        </div>

        <div className="flex items-center gap-1 bg-[#2E0404] p-0.5 rounded-lg border border-amber-500/30">
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              viewMode === 'split' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
            title="Display side-by-side matching the exact sample image"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Side-by-Side View</span>
          </button>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              viewMode === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
            title="Native Mobile App View"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Native App View</span>
          </button>
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              viewMode === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
            title="Desktop Web App View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Web View</span>
          </button>
          <button
            onClick={() => setViewMode('devdeck')}
            className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
              viewMode === 'devdeck' ? 'bg-emerald-500 text-slate-950 font-bold shadow' : 'text-slate-300 hover:text-white'
            }`}
            title="15-Phase Autonomous Dev Workflow"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Master Dev Plan</span>
          </button>
        </div>
      </div>

      {/* Primary Brand Navigation (Exact from image) */}
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-6">
        {/* Brand Wordmark with gold icon */}
        <div className="shrink-0 cursor-pointer" onClick={() => setViewMode('desktop')}>
          <GinhawaLogo variant="gold-crimson" size="md" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-slate-700">
          <a href="#home" className="text-[#8A1111] font-semibold hover:text-[#B91C1C] transition-colors">
            Home
          </a>
          <a href="#services" className="hover:text-[#8A1111] transition-colors">
            Services
          </a>
          <a href="#therapists" className="hover:text-[#8A1111] transition-colors">
            Therapists
          </a>
          <a href="#how-it-works" className="hover:text-[#8A1111] transition-colors">
            How It Works
          </a>
          <a href="#safety" className="hover:text-[#8A1111] transition-colors">
            Safety & Compliance
          </a>
          <a href="#about" className="hover:text-[#8A1111] transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-[#8A1111] transition-colors">
            Contact
          </a>
        </nav>

        {/* Right Actions: Search, Login, Sign Up button */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenBooking}
            className="p-1.5 text-slate-600 hover:text-[#8A1111] rounded-full transition-colors"
            title="Search Therapists & Services"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBooking}
            className="hidden sm:inline-block text-[13px] font-medium text-slate-700 hover:text-[#8A1111] transition-colors"
          >
            Login
          </button>

          <button
            onClick={onOpenBooking}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#991B1B] hover:bg-[#7F1D1D] active:scale-[0.98] rounded-full shadow-sm transition-all whitespace-nowrap"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
