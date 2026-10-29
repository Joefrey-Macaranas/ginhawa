'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { WellnessService } from '@/lib/types';
import { Clock, Check, AlertTriangle, ArrowRight } from 'lucide-react';

interface ServiceCatalogProps {
  services: WellnessService[];
  onSelectService: (service: WellnessService) => void;
}

export function ServiceCatalog({ services, onSelectService }: ServiceCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'Hilot Traditional', label: 'Hilot Traditional' },
    { id: 'Therapeutic Massage', label: 'Therapeutic Massage' },
    { id: 'Specialty Care', label: 'Specialty Care' },
    { id: 'Body Rituals', label: 'Body Rituals' },
  ];

  const filtered = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-14 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-1">
            Care Catalog
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Restorative Therapies & Home Rituals
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Each session includes sanitized linens, organic coconut & herbal oils, and thorough pre-service contraindication checks.
          </p>
        </div>

        {/* Interactive Filter Tabs / Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto max-w-full">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === c.id
                  ? 'bg-teal-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(service => (
          <div
            key={service.id}
            className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden flex flex-col hover:border-slate-700 transition-all group"
          >
            {/* Card Image Thumbnail */}
            <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
              <Image
                src={service.imageUrl}
                alt={service.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 text-xs text-slate-300 font-medium bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded">
                {service.category}
              </div>

              <div className="absolute bottom-3 right-3 text-xs font-mono font-semibold text-teal-300 bg-slate-950/90 backdrop-blur-sm px-2.5 py-1 rounded tabular-nums">
                ₱{service.basePrice.toLocaleString('en-PH')} PHP
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>{service.durationMinutes} mins</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>In-Home Service</span>
                </div>

                <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-teal-300 transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Benefits */}
                <div className="mt-3 space-y-1.5">
                  {service.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Contraindication quiet notice */}
                <div className="mt-3 text-[11px] text-amber-400/90 flex items-center gap-1.5 bg-amber-950/30 border border-amber-900/30 p-2 rounded">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Caution: {service.contraindications.join(', ')}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectService(service)}
                className="w-full mt-2 py-2.5 px-4 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99]"
              >
                <span>Select & Book Therapist</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
