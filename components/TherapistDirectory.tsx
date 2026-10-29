'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Therapist } from '@/lib/types';
import { Star, ShieldCheck, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

interface TherapistDirectoryProps {
  therapists: Therapist[];
  onSelectTherapist: (therapist: Therapist) => void;
}

export function TherapistDirectory({ therapists, onSelectTherapist }: TherapistDirectoryProps) {
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const areas = ['all', 'BGC Taguig', 'Makati CBD', 'Ortigas Center', 'Quezon City', 'Alabang Muntinlupa'];

  const filtered = selectedArea === 'all'
    ? therapists
    : therapists.filter(t => t.serviceAreas.some(a => a.toLowerCase().includes(selectedArea.toLowerCase())));

  return (
    <section id="therapists" className="py-14 max-w-7xl mx-auto px-6 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-1">
            Certified Practitioners
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Accredited Hilot Healers & Therapists
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            100% credentialed with DOH licenses, TESDA NC II certificates, and national police clearances.
          </p>
        </div>

        {/* Location selector */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto max-w-full">
          {areas.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedArea === area
                  ? 'bg-slate-800 text-teal-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {area === 'all' ? 'All Metro Manila' : area}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map(therapist => (
          <div
            key={therapist.id}
            className="rounded-xl border border-slate-800 bg-slate-900/90 p-5 flex flex-col justify-between hover:border-slate-700 transition-all space-y-4"
          >
            <div>
              {/* Header profile */}
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-teal-500/30 shrink-0 bg-slate-950">
                  <Image
                    src={therapist.avatarUrl}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-white tracking-tight truncate">
                    {therapist.name}
                  </h3>
                  <div className="text-xs text-teal-400 font-medium truncate">
                    {therapist.title}
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-amber-400 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span className="tabular-nums">{therapist.rating.toFixed(2)}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{therapist.completedSessions} sessions</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
                {therapist.bio}
              </p>

              {/* Verified Credentials */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Verified Government Accreditation
                </div>
                {therapist.credentials.map(c => (
                  <div key={c.id} className="flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{c.type}</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{c.certificateNumber}</span>
                  </div>
                ))}
              </div>

              {/* Coverage areas */}
              <div className="mt-3 flex items-start gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span className="truncate">{therapist.serviceAreas.join(', ')}</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => onSelectTherapist(therapist)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 hover:text-teal-300 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book with {therapist.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
