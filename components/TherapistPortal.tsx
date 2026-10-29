'use client';

import React, { useState } from 'react';
import { Therapist, Booking } from '@/lib/types';
import { ShieldCheck, Clock, DollarSign, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';

interface TherapistPortalProps {
  therapist: Therapist;
  activeBookings: Booking[];
  onCompleteBooking: (bookingId: string) => void;
}

export function TherapistPortal({ therapist, activeBookings, onCompleteBooking }: TherapistPortalProps) {
  const [payoutRequested, setPayoutRequested] = useState(false);
  const totalEarnings = 18450.75;
  const pendingPayout = 3716.75;

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 3000);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-1">
            Phase 7 Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Therapist Operations & Fleet Hub
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Live operations portal for certified practitioners. Manage service shifts, live dispatches, government credentials, and instant GCash/Maya settlements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRequestPayout}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
          >
            <DollarSign className="w-4 h-4" />
            <span>{payoutRequested ? 'Disbursement Queued!' : 'Instant GCash Payout'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Available Payout Balance</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            ₱{pendingPayout.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400">Net after 15% platform fee & 1.5% insurance</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Completed Sessions (YTD)</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {therapist.completedSessions}
          </div>
          <div className="text-[11px] text-teal-400">{therapist.rating.toFixed(2)} ★ Overall Rating</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Accreditation Standing</div>
          <div className="text-base font-bold font-mono text-teal-300">
            DOH LMT & TESDA NC II
          </div>
          <div className="text-[11px] text-emerald-400">All 3 Credentials Current & Active</div>
        </div>
      </div>

      {/* Verified Credentials Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="text-xs font-semibold text-white uppercase tracking-wider">
            Verified Government Credentials & Clearances
          </div>
          <span className="text-xs text-emerald-400 font-mono font-medium">100% Verified</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {therapist.credentials.map(c => (
            <div key={c.id} className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>{c.type}</span>
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                  {c.verificationStatus}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">{c.certificateNumber}</div>
              <div className="text-[11px] text-slate-500">Valid until: {c.expiryDate}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Dispatches */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="text-xs font-semibold text-white uppercase tracking-wider pb-2 border-b border-slate-800">
          Assigned Dispatch Appointments ({activeBookings.length})
        </div>

        {activeBookings.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No active dispatches at this time.
          </div>
        ) : (
          <div className="space-y-3">
            {activeBookings.map(b => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-400">{b.id}</span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs font-semibold text-white">{b.serviceName}</span>
                    <span className="text-[10px] uppercase font-bold text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                      {b.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Client: {b.customerName} ({b.customerPhone}) · Slot: {b.scheduledTime}
                  </div>
                  <div className="text-xs text-slate-400">
                    Address: {b.address} ({b.cityArea})
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold font-mono text-emerald-400 tabular-nums">
                      +₱{b.pricing.therapistPayout.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-slate-400">Net Take-home</div>
                  </div>

                  {b.status === 'in_session' && (
                    <button
                      onClick={() => onCompleteBooking(b.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Complete & Settle
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
