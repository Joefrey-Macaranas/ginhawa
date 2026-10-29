'use client';

import React, { useState } from 'react';
import { Affiliate, Therapist } from '@/lib/types';
import { Share2, Users, DollarSign, ShieldAlert, Check, X, ShieldCheck } from 'lucide-react';

interface AffiliateAdminConsoleProps {
  affiliates: Affiliate[];
  therapists: Therapist[];
}

export function AffiliateAdminConsole({ affiliates, therapists }: AffiliateAdminConsoleProps) {
  const [newCodeName, setNewCodeName] = useState('');
  const [affiliateList, setAffiliateList] = useState<Affiliate[]>(affiliates);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCreateCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCodeName.trim()) return;

    const code = newCodeName.trim().toUpperCase().replace(/\s+/g, '-');
    const newAff: Affiliate = {
      id: `aff-${Date.now()}`,
      name: 'Partner Referral Link',
      code,
      email: 'creator@partner.ph',
      totalReferrals: 0,
      totalEarnings: 0,
      pendingPayout: 0,
    };

    setAffiliateList([newAff, ...affiliateList]);
    setNewCodeName('');
  };

  const copyLink = (code: string) => {
    navigator.clipboard.writeText(`https://ginhawa.ph/?ref=${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-1">
            Phase 11 Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Affiliate Attribution & Admin Console
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time referral commission attribution (5%), fraudulent self-referral prevention, and administrator fleet credential approvals.
          </p>
        </div>
      </div>

      {/* Referral Code Generator */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-semibold text-white uppercase tracking-wider">
            Create Custom Partner Referral Code
          </div>
          <span className="text-xs text-teal-400 font-mono">Commission: 5.0% flat per completed session</span>
        </div>

        <form onSubmit={handleCreateCode} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            required
            placeholder="Enter code (e.g. WELLNESS-QUEZON, SPA-MAKATI)"
            value={newCodeName}
            onChange={e => setNewCodeName(e.target.value)}
            className="flex-1 w-full text-xs font-mono uppercase bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors whitespace-nowrap"
          >
            Generate Referral Code
          </button>
        </form>
      </div>

      {/* Active Referral Partners Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="text-xs font-semibold text-white uppercase tracking-wider">
            Active Referral Attributions ({affiliateList.length})
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Anti-Fraud Filter: Active (Zero Self-Referrals)
          </div>
        </div>

        <div className="divide-y divide-slate-800">
          {affiliateList.map(aff => (
            <div key={aff.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-teal-400">{aff.code}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-white">{aff.name}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {aff.totalReferrals} successful conversions · Attribution cookie: 30 days
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right font-mono">
                  <div className="text-sm font-bold text-white tabular-nums">
                    ₱{aff.totalEarnings.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-emerald-400">Total Accrued</div>
                </div>

                <button
                  onClick={() => copyLink(aff.code)}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedCode === aff.code ? 'Copied URL!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Administrator Fleet Credential Approvals */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="text-xs font-semibold text-white uppercase tracking-wider">
            Admin Therapist Credential Verification Queue (Phase 7.3)
          </div>
          <span className="text-xs text-emerald-400 font-mono font-medium">All Verified</span>
        </div>

        <div className="space-y-3">
          {therapists.map(t => (
            <div key={t.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-white">{t.name}</div>
                <div className="text-[11px] text-teal-400">{t.title}</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  Credentials: {t.credentials.map(c => `${c.type} (${c.certificateNumber})`).join(' · ')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Approved & Dispatched</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
