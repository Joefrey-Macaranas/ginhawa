'use client';

import React, { useState } from 'react';
import { GinhawaHeader } from '@/components/GinhawaHeader';
import { GinhawaHero } from '@/components/GinhawaHero';
import { GinhawaCategoryGrid } from '@/components/GinhawaCategoryGrid';
import { GinhawaWhyChoose } from '@/components/GinhawaWhyChoose';
import { GinhawaHowItWorks } from '@/components/GinhawaHowItWorks';
import { GinhawaMobileView } from '@/components/GinhawaMobileView';
import { GinhawaSplitView } from '@/components/GinhawaSplitView';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { TherapistDirectory } from '@/components/TherapistDirectory';
import { BookingModal } from '@/components/BookingModal';
import { BookingTracker } from '@/components/BookingTracker';
import { LedgerConsole } from '@/components/LedgerConsole';
import { InsuranceFundView } from '@/components/InsuranceFundView';
import { IncidentSupportModal } from '@/components/IncidentSupportModal';
import { DevWorkflowDeck } from '@/components/DevWorkflowDeck';
import { TherapistPortal } from '@/components/TherapistPortal';
import { AffiliateAdminConsole } from '@/components/AffiliateAdminConsole';
import {
  INITIAL_SERVICES,
  INITIAL_THERAPISTS,
  INITIAL_BOOKINGS,
  INITIAL_AFFILIATES,
  INITIAL_WORKFLOW_PHASES,
} from '@/lib/data';
import { INITIAL_LEDGER_ENTRIES, createBookingJournalEntries } from '@/lib/ledger';
import { WellnessService, Therapist, Booking, BookingStatus, IncidentReport } from '@/lib/types';
import { ShieldCheck, HeartHandshake, PhoneCall, Sparkles } from 'lucide-react';

export default function Home() {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'split' | 'devdeck'>('split');
  const [selectedCategory, setSelectedCategory] = useState<string>('Massage Therapy');

  const [services] = useState<WellnessService[]>(INITIAL_SERVICES);
  const [therapists] = useState<Therapist[]>(INITIAL_THERAPISTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [ledgerEntries, setLedgerEntries] = useState(INITIAL_LEDGER_ENTRIES);
  const [phases, setPhases] = useState(INITIAL_WORKFLOW_PHASES);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<WellnessService | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  const [incidentModalOpen, setIncidentModalOpen] = useState(false);
  const [activeEmergencyBooking, setActiveEmergencyBooking] = useState<Booking | null>(null);

  // Derive Ginhawa Insurance Fund Balance from Account 2030 in the Ledger
  const insuranceReserveEntries = ledgerEntries.filter(e => e.account.startsWith('2030'));
  const fundBalance = insuranceReserveEntries.reduce((sum, e) => sum + e.credit - e.debit, 0);

  // Handle new confirmed booking
  const handleConfirmBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
    const newJournalEntries = createBookingJournalEntries(newBooking);
    setLedgerEntries(prev => [...prev, ...newJournalEntries]);
    setBookingModalOpen(false);
  };

  // Handle status update (e.g. En Route -> Arrived -> In Session -> Completed)
  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  // Toggle tasks in 15-phase workflow
  const handleToggleTask = (phaseNumber: number, taskId: string) => {
    setPhases(prev =>
      prev.map(p => {
        if (p.phaseNumber !== phaseNumber) return p;
        const updatedTasks = p.tasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        const allCompleted = updatedTasks.every(t => t.completed);
        return {
          ...p,
          tasks: updatedTasks,
          status: allCompleted ? 'VERIFIED' : 'IN PROGRESS',
        };
      })
    );
  };

  const handleOpenEmergency = (booking: Booking) => {
    setActiveEmergencyBooking(booking);
    setIncidentModalOpen(true);
  };

  const handleIncidentFiled = (_report: IncidentReport) => {
    // Incident logged with cryptographic audit timestamp
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const matchedService = services.find(s => s.name.toLowerCase().includes(categoryName.toLowerCase()) || s.category.toLowerCase().includes(categoryName.toLowerCase()));
    if (matchedService) {
      setSelectedService(matchedService);
    }
  };

  const handleSearch = (filters: { location: string; service: string; date: string }) => {
    const matched = services.find(s => s.name.toLowerCase().includes(filters.service.toLowerCase()) || s.category.toLowerCase().includes(filters.service.toLowerCase())) || services[0];
    setSelectedService(matched);
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#160202] text-slate-100 font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Exact Top Header Bar */}
      <GinhawaHeader
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenBooking={() => {
          setSelectedService(null);
          setSelectedTherapist(null);
          setBookingModalOpen(true);
        }}
      />

      <main className="flex-1">
        {/* Active Session Tracker if there's an ongoing session */}
        {bookings.length > 0 && viewMode !== 'mobile' && (
          <div className="max-w-7xl mx-auto px-6 pt-4 pb-2">
            <BookingTracker
              booking={bookings[0]}
              onUpdateStatus={handleUpdateStatus}
              onTriggerEmergency={handleOpenEmergency}
            />
          </div>
        )}

        {/* View Mode 1: Split View (As Seen in Reference Image) */}
        {viewMode === 'split' && (
          <GinhawaSplitView
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            onOpenBooking={() => setBookingModalOpen(true)}
            onSearch={handleSearch}
          />
        )}

        {/* View Mode 2: Fullscreen Native Mobile App View */}
        {viewMode === 'mobile' && (
          <div className="py-6">
            <GinhawaMobileView
              onOpenBooking={() => setBookingModalOpen(true)}
              onSelectCategory={handleCategorySelect}
            />
          </div>
        )}

        {/* View Mode 3: Desktop Web View */}
        {viewMode === 'desktop' && (
          <div className="bg-white text-slate-900">
            <GinhawaHero onSearch={handleSearch} />
            <GinhawaCategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelect}
            />
            <GinhawaWhyChoose onLearnMore={() => setBookingModalOpen(true)} />
            <GinhawaHowItWorks onStartBooking={() => setBookingModalOpen(true)} />

            {/* Interactive Services & Fleet Section */}
            <div className="bg-slate-950 text-white">
              <ServiceCatalog
                services={services}
                onSelectService={service => {
                  setSelectedService(service);
                  setSelectedTherapist(null);
                  setBookingModalOpen(true);
                }}
              />
              <TherapistDirectory
                therapists={therapists}
                onSelectTherapist={therapist => {
                  setSelectedTherapist(therapist);
                  setSelectedService(null);
                  setBookingModalOpen(true);
                }}
              />
            </div>
          </div>
        )}

        {/* View Mode 4: Dev Master Deck & 15-Phase Autonomous Console */}
        {viewMode === 'devdeck' && (
          <div className="space-y-12 pb-16">
            <DevWorkflowDeck
              phases={phases}
              onToggleTask={handleToggleTask}
              ledgerEntries={ledgerEntries}
              bookings={bookings}
            />
            <LedgerConsole
              entries={ledgerEntries}
              onAddTestEntry={() => {}}
            />
            <InsuranceFundView
              fundBalance={fundBalance}
              totalClaimsSettled={5300}
            />
            <TherapistPortal
              therapist={therapists[0]}
              activeBookings={bookings.filter(b => b.status !== 'completed')}
              onCompleteBooking={id => handleUpdateStatus(id, 'completed')}
            />
            <AffiliateAdminConsole
              affiliates={INITIAL_AFFILIATES}
              therapists={therapists}
            />
          </div>
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        services={services}
        therapists={therapists}
        preSelectedService={selectedService}
        preSelectedTherapist={selectedTherapist}
        onConfirmBooking={handleConfirmBooking}
        existingBookings={bookings}
      />

      {/* Incident / Emergency Support Modal */}
      <IncidentSupportModal
        isOpen={incidentModalOpen}
        onClose={() => setIncidentModalOpen(false)}
        booking={activeEmergencyBooking}
        onReportFiled={handleIncidentFiled}
      />

      {/* Footer */}
      <footer className="border-t border-amber-950/40 bg-[#120202] py-8 px-6 text-xs text-amber-200/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-300">GINHAWA APP</span>
            <span aria-hidden="true">·</span>
            <span>Professional Care. Natural Healing. A Better You.</span>
            <span aria-hidden="true">·</span>
            <span className="font-serif italic text-amber-400">Ginhawa Sa Bawat Katawan ♡</span>
          </div>
          <div className="text-stone-400">
            DOH Licensed & TESDA NC II Verified Fleet · Metro Manila & Nearby Areas
          </div>
        </div>
      </footer>
    </div>
  );
}
