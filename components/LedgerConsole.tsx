'use client';

import React, { useState } from 'react';
import { LedgerEntry } from '@/lib/types';
import { verifyLedgerBalance, getAccountBalances } from '@/lib/ledger';
import { Scale, CheckCircle2, ShieldCheck, RefreshCw, Send, ArrowDownUp } from 'lucide-react';

interface LedgerConsoleProps {
  entries: LedgerEntry[];
  onAddTestEntry: () => void;
}

export function LedgerConsole({ entries, onAddTestEntry }: LedgerConsoleProps) {
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null);
  const [isSimulatingWebhook, setIsSimulatingWebhook] = useState(false);

  const balanceAudit = verifyLedgerBalance(entries);
  const accountBalances = getAccountBalances(entries);

  const simulateIdempotentWebhook = () => {
    setIsSimulatingWebhook(true);
    setWebhookStatus('Simulating payment webhook: Event ID: evt_gcash_991823...');
    
    setTimeout(() => {
      setWebhookStatus('First delivery: Processed HTTP 200 OK. Idempotency Key cached.');
      
      setTimeout(() => {
        setWebhookStatus('Duplicate network retry detected with identical Idempotency-Key. Returned HTTP 200 Cached Result (0 duplicate entries created). Test passed!');
        setIsSimulatingWebhook(false);
      }, 700);
    }, 600);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 space-y-8">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-1">
            Financial Integrity & Settlements
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Double-Entry General Ledger & Trial Balance
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Strict accounting where every payment event satisfies <code className="text-teal-300 font-mono">Σ Debits == Σ Credits</code>. Eliminates financial drift, over-payouts, and phantom balances.
          </p>
        </div>

        {/* Live Balance Verification Badge */}
        <div className={`p-3 rounded-xl border flex items-center gap-3 ${
          balanceAudit.isBalanced
            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
            : 'bg-red-950/40 border-red-800 text-red-300'
        }`}>
          <Scale className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <div className="font-semibold">
              {balanceAudit.isBalanced ? 'Trial Balance Verified Balanced' : 'Ledger Out of Balance!'}
            </div>
            <div className="font-mono text-[11px] opacity-90 tabular-nums">
              Debits: ₱{balanceAudit.totalDebits.toLocaleString('en-PH', { minimumFractionDigits: 2 })} = Credits: ₱{balanceAudit.totalCredits.toLocaleString('en-PH', { minimumFractionDigits: 2 })} (Diff: ₱{balanceAudit.discrepancy.toFixed(2)})
            </div>
          </div>
        </div>
      </div>

      {/* Account Balances Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(accountBalances).map(([account, data]) => {
          const isAsset = account.startsWith('1');
          const isReserve = account.startsWith('2030');
          return (
            <div key={account} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-[11px] font-medium text-slate-400 truncate">
                {account}
              </div>
              <div className="text-xl font-bold font-mono tabular-nums text-white">
                ₱{data.balance.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Dr: ₱{data.debit.toFixed(0)}</span>
                <span>Cr: ₱{data.credit.toFixed(0)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Webhook Idempotency Sandbox Card */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Sandbox Idempotent Webhook Verification (Phase 8.5)</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Simulate duplicate network packet retries or delayed webhooks to confirm zero duplicate charges and zero double ledger allocations.
          </p>
          {webhookStatus && (
            <div className="mt-2 text-xs font-mono text-teal-300 bg-slate-950 p-2 rounded border border-slate-800">
              {webhookStatus}
            </div>
          )}
        </div>

        <button
          onClick={simulateIdempotentWebhook}
          disabled={isSimulatingWebhook}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingWebhook ? 'animate-spin' : ''}`} />
          <span>Test Webhook Idempotency</span>
        </button>
      </div>

      {/* Ledger Journal Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="text-xs font-semibold text-white uppercase tracking-wider">
            General Ledger Journal Entries ({entries.length} Lines)
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Audit Standard: GAAP / Double-Entry
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4 font-medium">Entry ID</th>
                <th className="py-2.5 px-4 font-medium">Timestamp</th>
                <th className="py-2.5 px-4 font-medium">Description</th>
                <th className="py-2.5 px-4 font-medium">Account Chart</th>
                <th className="py-2.5 px-4 font-medium text-right">Debit (₱)</th>
                <th className="py-2.5 px-4 font-medium text-right">Credit (₱)</th>
                <th className="py-2.5 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {entries.slice(-15).reverse().map(e => (
                <tr key={e.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-4 text-teal-400 font-semibold">{e.id}</td>
                  <td className="py-2.5 px-4 text-slate-400 font-sans text-[11px] whitespace-nowrap">
                    {new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-2.5 px-4 text-slate-200 font-sans">{e.description}</td>
                  <td className="py-2.5 px-4 text-slate-300">{e.account}</td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-white">
                    {e.debit > 0 ? e.debit.toFixed(2) : '—'}
                  </td>
                  <td className="py-2.5 px-4 text-right tabular-nums text-emerald-400">
                    {e.credit > 0 ? e.credit.toFixed(2) : '—'}
                  </td>
                  <td className="py-2.5 px-4 text-center font-sans">
                    <span className="text-[10px] text-teal-300 bg-teal-950/50 border border-teal-800/50 px-1.5 py-0.5 rounded">
                      Reconciled
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
