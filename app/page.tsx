'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ServiceCatalog } from '@/components/ServiceCatalog';
import { TherapistDirectory } from '@/components/TherapistDirectory';
import { BookingModal } from '@/components/BookingModal';
import { BookingTracker } from '@/components/BookingTracker';
import { LedgerConsole } from '@/components/LedgerConsole';
import { InsuranceFundView } from '@/components/InsuranceFundView';
import { IncidentSupportModal } from '@/components/IncidentSupportModal';
import { MobileSimulator } from '@/components/MobileSimulator';
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
import { ShieldCheck, HeartHandshake, PhoneCall } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'platform' | 'mobile' | 'ledger' | 'insurance' | 'devdeck'>('platform');
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
    // 1. Add booking
    setBookings(prev => [newBooking, ...prev]);

    // 2. Generate balanced double-entry ledger entries (Σ Dr == Σ Cr)
    const newJournalEntries = createBookingJournalEntries(newBooking);
    setLedgerEntries(prev => [...prev, ...newJournalEntries]);

    // 3. Close modal & navigate to active session view
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

  const handleIncidentFiled = (report: IncidentReport) => {
    // console log incident for audit
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/20 selection:text-teal-300">
      {/* 3-Zone Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBooking={() => {
          setSelectedService(null);
          setSelectedTherapist(null);
          setBookingModalOpen(true);
        }}
      />

      <main className="flex-1">
        {activeTab === 'platform' && (
          <>
            <HeroSection
              onExplore={() => {
                const el = document.getElementById('services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBooking={() => {
                setSelectedService(null);
                setSelectedTherapist(null);
                setBookingModalOpen(true);
              }}
              onViewDevDeck={() => setActiveTab('devdeck')}
            />

            {/* Active Session Tracker if there's an ongoing booking */}
            {bookings.length > 0 && (
              <div className="max-w-7xl mx-auto px-6 pt-10">
                <BookingTracker
                  booking={bookings[0]}
                  onUpdateStatus={handleUpdateStatus}
                  onTriggerEmergency={handleOpenEmergency}
                />
              </div>
            )}

            {/* Service Catalog */}
            <ServiceCatalog
              services={services}
              onSelectService={service => {
                setSelectedService(service);
                setSelectedTherapist(null);
                setBookingModalOpen(true);
              }}
            />

            {/* Therapist Directory */}
            <TherapistDirectory
              therapists={therapists}
              onSelectTherapist={therapist => {
                setSelectedTherapist(therapist);
                setSelectedService(null);
                setBookingModalOpen(true);
              }}
            />

            {/* Operations & Affiliate Quick Section Switchers */}
            <div className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    Therapist Fleets & Dispatch (Phase 7)
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Practitioner Operations & Shifts
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Access therapist shift scheduler, government credential review, and instant GCash/Maya earnings disbursement.
                  </p>
                  <button
                    onClick={() => setActiveTab('ledger')}
                    className="mt-2 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors"
                  >
                    View Operations & Balances →
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    Ginhawa Insurance Fund (Phase 9)
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    1.5% Micro-Contribution Reserve
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Statutory accident & liability protection underwritten by Master Policy GM-2026-PH. Reconciled directly to Account 2030 in the general ledger.
                  </p>
                  <button
                    onClick={() => setActiveTab('insurance')}
                    className="mt-2 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors"
                  >
                    Inspect Reserve & Submit Claim →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'mobile' && (
          <MobileSimulator
            services={services}
            therapists={therapists}
            bookings={bookings}
            onQuickBook={() => {
              setSelectedService(null);
              setSelectedTherapist(null);
              setBookingModalOpen(true);
            }}
          />
        )}

        {activeTab === 'ledger' && (
          <>
            <LedgerConsole
              entries={ledgerEntries}
              onAddTestEntry={() => {}}
            />
            <TherapistPortal
              therapist={therapists[0]}
              activeBookings={bookings.filter(b => b.status !== 'completed')}
              onCompleteBooking={id => handleUpdateStatus(id, 'completed')}
            />
          </>
        )}

        {activeTab === 'insurance' && (
          <>
            <InsuranceFundView
              fundBalance={fundBalance}
              totalClaimsSettled={5300}
            />
            <AffiliateAdminConsole
              affiliates={INITIAL_AFFILIATES}
              therapists={therapists}
            />
          </>
        )}

        {activeTab === 'devdeck' && (
          <DevWorkflowDeck
            phases={phases}
            onToggleTask={handleToggleTask}
            ledgerEntries={ledgerEntries}
            bookings={bookings}
          />
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

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-300">Ginhawa</span>
            <span aria-hidden="true">·</span>
            <span>Autonomous Wellness & Physical Care Platform</span>
            <span aria-hidden="true">·</span>
            <span className="text-teal-400 font-mono">Metro Manila Fleet Active</span>
          </div>
          <div>
            Master Plan: MacBook Setup to Production Launch · 15 Phases Verified
          </div>
        </div>
      </footer>
    </div>
  );
}
