'use client';

import React from 'react';
import { Booking, BookingStatus } from '@/lib/types';
import { Navigation, Clock, ShieldAlert, CheckCircle2, User, Phone, MapPin, Play, Check } from 'lucide-react';

interface BookingTrackerProps {
  booking: Booking;
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
  onTriggerEmergency: (booking: Booking) => void;
}

export function BookingTracker({ booking, onUpdateStatus, onTriggerEmergency }: BookingTrackerProps) {
  const steps: { status: BookingStatus; label: string }[] = [
    { status: 'confirmed', label: 'Confirmed' },
    { status: 'en_route', label: 'En Route' },
    { status: 'arrived', label: 'Arrived at Lobby' },
    { status: 'in_session', label: 'In Session' },
    { status: 'completed', label: 'Completed' },
  ];

  const getStepIndex = (status: BookingStatus) => {
    switch (status) {
      case 'requested': return 0;
      case 'confirmed': return 0;
      case 'en_route': return 1;
      case 'arrived': return 2;
      case 'in_session': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(booking.status);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-mono text-teal-400 font-semibold">{booking.id}</span>
            <span aria-hidden="true">·</span>
            <span>{booking.serviceName}</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            Active Care Session Tracker
          </h3>
        </div>

        {/* Emergency Silent Alert Trigger (Phase 10) */}
        <button
          onClick={() => onTriggerEmergency(booking)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 border border-rose-800/80 hover:bg-rose-900/40 rounded-lg transition-colors shrink-0"
        >
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Safety & Panic Alert</span>
        </button>
      </div>

      {/* Progress Timeline */}
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div key={step.status} className="flex flex-col items-center flex-1 relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isCompleted
                      ? 'bg-teal-500 text-slate-950'
                      : isCurrent
                      ? 'bg-teal-400 text-slate-950 ring-4 ring-teal-500/20'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                <span
                  className={`text-[11px] mt-2 font-medium text-center ${
                    isCurrent ? 'text-teal-300 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-800 -z-0">
          <div
            className="h-full bg-teal-500 transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Dispatch Simulation & Therapist Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="space-y-2">
          <div className="text-xs text-slate-400 font-medium">Assigned Professional</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 font-bold">
              {booking.therapistName[0]}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{booking.therapistName}</div>
              <div className="text-xs text-teal-400">DOH Licensed & Insured</div>
            </div>
          </div>
          <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>+63 917 882 1923</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>{booking.durationMinutes} mins scheduled</span>
            </span>
          </div>
        </div>

        <div className="space-y-2 border-t md:border-t-0 md:border-l border-slate-800/80 md:pl-4 pt-2 md:pt-0">
          <div className="text-xs text-slate-400 font-medium">Destination & Gate Access</div>
          <div className="flex items-start gap-1.5 text-xs text-slate-200">
            <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>{booking.address} ({booking.cityArea})</span>
          </div>
          <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/60">
            Note: {booking.notes || 'Standard organic oils and linens prepared.'}
          </div>
        </div>
      </div>

      {/* Action Controls for Demo/Simulation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="text-xs text-slate-400">
          Current State: <span className="text-teal-400 font-mono font-semibold uppercase">{booking.status}</span>
        </div>

        <div className="flex items-center gap-2">
          {booking.status === 'en_route' && (
            <button
              onClick={() => onUpdateStatus(booking.id, 'arrived')}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1"
            >
              <span>Simulate Arrival</span>
            </button>
          )}

          {booking.status === 'arrived' && (
            <button
              onClick={() => onUpdateStatus(booking.id, 'in_session')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Start In-Home Session</span>
            </button>
          )}

          {booking.status === 'in_session' && (
            <button
              onClick={() => onUpdateStatus(booking.id, 'completed')}
              className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Session Completed & Settle</span>
            </button>
          )}

          {booking.status === 'completed' && (
            <div className="flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
              <span>Session Completed & Reconciled to Ledger</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
