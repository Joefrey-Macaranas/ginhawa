'use client';

import React, { useState } from 'react';
import { InsuranceClaim } from '@/lib/types';
import { ShieldCheck, HeartHandshake, AlertTriangle, FileText, CheckCircle2, Plus } from 'lucide-react';

interface InsuranceFundViewProps {
  fundBalance: number;
  totalClaimsSettled: number;
}

export function InsuranceFundView({ fundBalance, totalClaimsSettled }: InsuranceFundViewProps) {
  const [claims, setClaims] = useState<InsuranceClaim[]>([
    {
      id: 'CLM-2026-001',
      bookingId: 'BKG-2026-0792',
      claimantName: 'Elena Cruz, NC II',
      claimantRole: 'therapist',
      type: 'Travel Accidental Injury',
      description: 'Minor ankle sprain while boarding transit during rainstorm en route to Makati CBD appointment. Covered emergency clinic consult and pain medication.',
      amountRequested: 3500,
      status: 'settled',
      filedAt: '2026-10-24T09:12:00Z',
    },
    {
      id: 'CLM-2026-002',
      bookingId: 'BKG-2026-0805',
      claimantName: 'Marcus Lim',
      claimantRole: 'customer',
      type: 'Equipment Loss',
      description: 'Accidental spill of heated herbal massage oil onto nightstand edge; replacement voucher issued.',
      amountRequested: 1800,
      status: 'settled',
      filedAt: '2026-10-27T16:40:00Z',
    },
  ]);

  const [isFilingClaim, setIsFilingClaim] = useState(false);
  const [claimantName, setClaimantName] = useState('');
  const [claimType, setClaimType] = useState<InsuranceClaim['type']>('Travel Accidental Injury');
  const [amount, setAmount] = useState('2500');
  const [description, setDescription] = useState('');

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimantName || !description) return;

    const newClaim: InsuranceClaim = {
      id: `CLM-2026-${(claims.length + 1).toString().padStart(3, '0')}`,
      bookingId: `BKG-2026-${Math.floor(Math.random() * 800 + 100)}`,
      claimantName,
      claimantRole: 'therapist',
      type: claimType,
      description,
      amountRequested: parseFloat(amount) || 2000,
      status: 'under_review',
      filedAt: new Date().toISOString(),
    };

    setClaims([newClaim, ...claims]);
    setIsFilingClaim(false);
    setClaimantName('');
    setDescription('');
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-1">
            Phase 9 Compliance
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Ginhawa Mutual Insurance Fund
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Every booking automatically allocates <span className="text-teal-300 font-semibold">1.5% micro-contribution</span> into a statutory mutual reserve providing therapist road accidental protection, client property safety, and session medical security.
          </p>
        </div>

        <button
          onClick={() => setIsFilingClaim(true)}
          className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all shadow-sm flex items-center gap-1.5 whitespace-nowrap self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Mutual Claim</span>
        </button>
      </div>

      {/* Fund Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Reserve Balance (Account 2030)</div>
          <div className="text-2xl font-bold font-mono text-teal-300 tabular-nums">
            ₱{fundBalance.toLocaleString('en-PH', { minimumFractionDigits: 2 })} PHP
          </div>
          <div className="text-[11px] text-emerald-400">100% Reconciled to General Ledger</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Statutory Master Policy</div>
          <div className="text-base font-bold font-mono text-white">
            GM-2026-PH-MUTUAL
          </div>
          <div className="text-[11px] text-slate-400">Underwritten by Micro-Mutual Syndicate</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Solvency Reserve Ratio</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            284%
          </div>
          <div className="text-[11px] text-slate-400">Exceeds 150% statutory threshold</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="text-xs text-slate-400">Total Settled Claims (YTD)</div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            ₱{totalClaimsSettled.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-teal-400">Average resolution: 4.2 hours</div>
        </div>
      </div>

      {/* Claim Filing Modal */}
      {isFilingClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">File Ginhawa Insurance Fund Claim</h3>
            <form onSubmit={handleCreateClaim} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Claimant Name</label>
                <input
                  type="text"
                  required
                  value={claimantName}
                  onChange={e => setClaimantName(e.target.value)}
                  placeholder="e.g. Maria Santos, LMT"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Claim Category</label>
                <select
                  value={claimType}
                  onChange={e => setClaimType(e.target.value as any)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                >
                  <option value="Travel Accidental Injury">Travel Accidental Injury</option>
                  <option value="Equipment Loss">Equipment Loss</option>
                  <option value="Session Liability">Session Liability</option>
                  <option value="Medical First Aid">Medical First Aid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Expenses (₱)</label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Incident Summary</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Provide date, circumstance, and attached clinic invoice summary"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFilingClaim(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg"
                >
                  Submit for Board Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Claims Records */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="text-xs font-semibold text-white uppercase tracking-wider">
            Adjudicated Claims & Settlements ({claims.length})
          </div>
          <div className="text-xs text-teal-400 font-mono">
            Zero Phantom Claims Policy Enforced
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {claims.map(claim => (
            <div key={claim.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-400">{claim.id}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-white">{claim.claimantName}</span>
                  <span className="text-[11px] text-slate-500 font-mono">({claim.claimantRole})</span>
                </div>
                <div className="text-xs font-medium text-slate-200">
                  {claim.type}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                  {claim.description}
                </p>
                <div className="text-[11px] text-slate-500 font-mono">
                  Linked Booking: {claim.bookingId} · Filed: {new Date(claim.filedAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0">
                <div className="text-base font-bold font-mono text-white tabular-nums">
                  ₱{claim.amountRequested.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </div>
                <span className={`text-[11px] px-2.5 py-0.5 rounded font-medium ${
                  claim.status === 'settled'
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                    : 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                }`}>
                  {claim.status === 'settled' ? 'Claim Settled & Disbursed' : 'Under Board Review'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
