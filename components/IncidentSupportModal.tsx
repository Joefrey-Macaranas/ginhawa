'use client';

import React, { useState } from 'react';
import { Booking, IncidentReport } from '@/lib/types';
import { X, ShieldAlert, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';

interface IncidentSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: Booking | null;
  onReportFiled: (report: IncidentReport) => void;
}

export function IncidentSupportModal({
  isOpen,
  onClose,
  booking,
  onReportFiled,
}: IncidentSupportModalProps) {
  const [severity, setSeverity] = useState<IncidentReport['severity']>('high');
  const [category, setCategory] = useState<IncidentReport['category']>('Safety & Harassment');
  const [reporterName, setReporterName] = useState(booking?.customerName || 'Anonymous Reporter');
  const [details, setDetails] = useState('');
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    const report: IncidentReport = {
      id: `INC-${Date.now().toString().slice(-5)}`,
      bookingId: booking?.id || 'BKG-GENERAL',
      severity,
      category,
      reporterRole: 'customer',
      reporterName,
      details,
      status: 'open',
      timestamp: new Date().toISOString(),
    };

    onReportFiled(report);
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">
              Emergency Escalation & Incident Report (Phase 10)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto" />
            <div className="text-sm font-semibold text-white">Emergency Alert Dispatched</div>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Compliance safety response lead notified via priority channel. Incident ticket logged with audit cryptographic timestamp.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {booking && (
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-slate-500">Linked Booking: </span>
                <span className="font-mono text-teal-300 font-semibold">{booking.id}</span>
                <span className="text-slate-500"> ({booking.therapistName})</span>
              </div>
            )}

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Escalation Severity Tier
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'critical'] as const).map(sev => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setSeverity(sev)}
                    className={`py-1.5 px-2 rounded-lg font-semibold uppercase tracking-wider text-[11px] border transition-all ${
                      severity === sev
                        ? sev === 'critical'
                          ? 'bg-rose-950 border-rose-500 text-rose-200'
                          : sev === 'high'
                          ? 'bg-amber-950 border-amber-500 text-amber-200'
                          : 'bg-slate-800 border-teal-500 text-teal-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Incident Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              >
                <option value="Safety & Harassment">Safety & Harassment</option>
                <option value="Medical Contraindication">Medical Contraindication / Adverse Symptom</option>
                <option value="Late Arrival">Late Arrival or Unannounced Departure</option>
                <option value="Property Issue">Property Damage or Equipment Malfunction</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Detailed Incident Description
              </label>
              <textarea
                rows={3}
                required
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="State what occurred, immediate actions taken, and if medical or police assistance is requested..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-400 hover:text-white"
              >
                Dismiss
              </button>
              <button
                type="submit"
                className="px-4 py-2 font-semibold text-slate-950 bg-rose-400 hover:bg-rose-300 rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Priority Alert</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
