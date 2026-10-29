'use client';

import React from 'react';
import { Sparkles, Terminal, Smartphone, ShieldCheck, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  activeTab: 'platform' | 'mobile' | 'ledger' | 'insurance' | 'devdeck';
  setActiveTab: (tab: 'platform' | 'mobile' | 'ledger' | 'insurance' | 'devdeck') => void;
  onOpenBooking: () => void;
}

export function Navbar({ activeTab, setActiveTab, onOpenBooking }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('platform')}
            className="text-left group focus:outline-none"
          >
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors whitespace-nowrap">
              Ginhawa
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-medium text-teal-400/90 tracking-wide">
              Wellness & Home Care
            </span>
          </button>
        </div>

        {/* Zone 2: Single-line unboxed text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('platform')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'platform' ? 'text-teal-400 font-semibold' : ''
            }`}
          >
            Services & Therapists
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'ledger' ? 'text-teal-400 font-semibold' : ''
            }`}
          >
            Ledger & Splits
          </button>
          <button
            onClick={() => setActiveTab('insurance')}
            className={`transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'insurance' ? 'text-teal-400 font-semibold' : ''
            }`}
          >
            Insurance Fund
          </button>
          <button
            onClick={() => setActiveTab('mobile')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'mobile' ? 'text-teal-400 font-semibold' : ''
            }`}
          >
            <Smartphone className="w-4 h-4 text-slate-400" />
            <span>Mobile App</span>
          </button>
          <button
            onClick={() => setActiveTab('devdeck')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-white ${
              activeTab === 'devdeck' ? 'text-teal-400 font-semibold' : ''
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Master Dev Deck (15 Phases)</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-md transition-all shadow-sm whitespace-nowrap shrink-0 active:scale-[0.98]"
          >
            Book a Session
          </button>
        </div>
      </div>

      {/* Mobile secondary tab strip for compact screens */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 bg-slate-950 text-xs text-slate-300">
        <button
          onClick={() => setActiveTab('platform')}
          className={`py-1 px-2 ${activeTab === 'platform' ? 'text-teal-400 font-semibold' : ''}`}
        >
          Services
        </button>
        <button
          onClick={() => setActiveTab('ledger')}
          className={`py-1 px-2 ${activeTab === 'ledger' ? 'text-teal-400 font-semibold' : ''}`}
        >
          Ledger
        </button>
        <button
          onClick={() => setActiveTab('insurance')}
          className={`py-1 px-2 ${activeTab === 'insurance' ? 'text-teal-400 font-semibold' : ''}`}
        >
          Insurance
        </button>
        <button
          onClick={() => setActiveTab('mobile')}
          className={`py-1 px-2 ${activeTab === 'mobile' ? 'text-teal-400 font-semibold' : ''}`}
        >
          Mobile
        </button>
        <button
          onClick={() => setActiveTab('devdeck')}
          className={`py-1 px-2 font-mono ${activeTab === 'devdeck' ? 'text-emerald-400 font-bold' : ''}`}
        >
          Dev Deck
        </button>
      </div>
    </header>
  );
}
