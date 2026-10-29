'use client';

import React, { useState } from 'react';
import { WellnessService, Therapist, Booking } from '@/lib/types';
import { Smartphone, Bell, Wifi, WifiOff, Battery, Compass, Calendar, MessageSquare, User, Sparkles, MapPin, Star, ShieldCheck } from 'lucide-react';

interface MobileSimulatorProps {
  services: WellnessService[];
  therapists: Therapist[];
  bookings: Booking[];
  onQuickBook: () => void;
}

export function MobileSimulator({
  services,
  therapists,
  bookings,
  onQuickBook,
}: MobileSimulatorProps) {
  const [deviceModel, setDeviceModel] = useState<'ios' | 'android'>('ios');
  const [isOffline, setIsOffline] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [mobileTab, setMobileTab] = useState<'explore' | 'bookings' | 'profile'>('explore');

  const activeBooking = bookings[0];

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs font-semibold text-teal-400 tracking-wider uppercase mb-1">
            Phase 12 Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Native Mobile App Experience (iOS & Android)
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Test touch targets (≥44px), simulated APNS/FCM push notifications, and offline network state resiliency.
          </p>
        </div>

        {/* Simulator Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setDeviceModel('ios')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                deviceModel === 'ios'
                  ? 'bg-slate-800 text-teal-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              iPhone 16 Pro (iOS)
            </button>
            <button
              onClick={() => setDeviceModel('android')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                deviceModel === 'android'
                  ? 'bg-slate-800 text-teal-300 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pixel 9 (Android)
            </button>
          </div>

          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              isOffline
                ? 'bg-amber-950 border-amber-600 text-amber-200'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isOffline ? 'Offline Mode' : 'Online'}</span>
          </button>
        </div>
      </div>

      {/* Simulator Device Frame Container */}
      <div className="flex justify-center items-center py-4">
        <div
          className={`relative w-full max-w-[390px] h-[780px] bg-slate-950 rounded-[48px] border-[10px] ${
            deviceModel === 'ios' ? 'border-slate-800 shadow-[0_0_50px_rgba(20,184,166,0.15)]' : 'border-zinc-800 rounded-[40px]'
          } flex flex-col overflow-hidden select-none`}
        >
          {/* Dynamic Island / Punch Hole */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
            {deviceModel === 'ios' ? (
              <div className="w-28 h-7 bg-black rounded-full flex items-center justify-between px-3 text-[10px] text-white">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                <div className="w-2 h-2 rounded-full bg-teal-500/70" />
              </div>
            ) : (
              <div className="w-4 h-4 bg-black rounded-full mt-1 border border-zinc-900" />
            )}
          </div>

          {/* Status Bar */}
          <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              {isOffline ? (
                <WifiOff className="w-3 h-3 text-amber-400" />
              ) : (
                <Wifi className="w-3 h-3 text-slate-300" />
              )}
              <Battery className="w-3.5 h-3.5 text-slate-300" />
            </div>
          </div>

          {/* Simulated Push Notification Banner */}
          {showNotification && (
            <div className="mx-3 mt-1 p-3 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-xl backdrop-blur-md z-30 flex items-start gap-2.5 animate-in slide-in-from-top-4">
              <div className="p-1.5 bg-teal-400/20 text-teal-300 rounded-lg shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="text-teal-400 font-semibold">Ginhawa Dispatch</span>
                  <span>Just now</span>
                </div>
                <div className="text-xs font-semibold text-white mt-0.5 truncate">
                  Therapist En Route to BGC
                </div>
                <div className="text-[11px] text-slate-300">
                  Maria Santos, LMT is 6 minutes away. Sanitize area ready.
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                ×
              </button>
            </div>
          )}

          {/* Offline Banner Indicator */}
          {isOffline && (
            <div className="mx-3 mt-1 p-2 rounded-lg bg-amber-950/80 border border-amber-800 text-[11px] text-amber-200 text-center font-medium z-20">
              Offline Cache Active. Read-only session mode enabled.
            </div>
          )}

          {/* Mobile Screen Body */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {mobileTab === 'explore' && (
              <div className="space-y-4">
                {/* Header Welcome */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-[11px] text-slate-400">Kumusta, Patricia</div>
                    <div className="text-base font-bold text-white tracking-tight">Discover Healing</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs font-bold">
                    PM
                  </div>
                </div>

                {/* Quick Booking CTA card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-900/40 via-slate-900 to-slate-950 border border-teal-500/30 space-y-2">
                  <div className="text-[11px] text-teal-400 font-semibold uppercase">Instant Care Dispatch</div>
                  <div className="text-sm font-bold text-white">Need Relief Today?</div>
                  <p className="text-xs text-slate-300 leading-snug">
                    Traditional Hilot & warm herbal leaves delivered within 45 mins.
                  </p>
                  <button
                    onClick={onQuickBook}
                    className="w-full mt-2 py-2 px-3 bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold rounded-xl transition-all shadow"
                  >
                    Book Now (From ₱1,200)
                  </button>
                </div>

                {/* Popular Services list */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Signature Services
                  </div>
                  {services.slice(0, 3).map(service => (
                    <div
                      key={service.id}
                      onClick={onQuickBook}
                      className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 active:scale-[0.98] transition-transform cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{service.name}</div>
                        <div className="text-[11px] text-slate-400">{service.durationMinutes} mins · {service.category}</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-teal-300 shrink-0 tabular-nums">
                        ₱{service.basePrice}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verified Therapists near you */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Nearby Practitioners
                  </div>
                  {therapists.map(t => (
                    <div key={t.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 font-bold shrink-0">
                        {t.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{t.name}</div>
                        <div className="text-[11px] text-teal-400 truncate">{t.title}</div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{t.rating.toFixed(2)}</span>
                          <span>·</span>
                          <span>{t.serviceAreas[0]}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileTab === 'bookings' && (
              <div className="space-y-4 pt-1">
                <div className="text-base font-bold text-white tracking-tight">Your Care Sessions</div>
                {activeBooking ? (
                  <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-teal-400 font-semibold">{activeBooking.id}</span>
                      <span className="text-[10px] uppercase font-bold text-teal-300 bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                        {activeBooking.status}
                      </span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white">{activeBooking.serviceName}</div>
                      <div className="text-xs text-slate-400">{activeBooking.therapistName}</div>
                    </div>

                    <div className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-400" />
                      <span className="truncate">{activeBooking.address}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Insurance Fund:</span>
                      <span className="text-teal-300 font-semibold">100% Protected</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-xs text-slate-400">
                    No active sessions found.
                  </div>
                )}
              </div>
            )}

            {mobileTab === 'profile' && (
              <div className="space-y-4 pt-1">
                <div className="text-base font-bold text-white tracking-tight">Client Account</div>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold text-sm">
                      PM
                    </div>
                    <div>
                      <div className="font-semibold text-white">Patricia Morales</div>
                      <div className="text-slate-400">+63 917 882 1923</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2 text-slate-300">
                    <div className="flex items-center justify-between">
                      <span>Health Intake Consent:</span>
                      <span className="text-emerald-400 font-semibold">Verified Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Default Zone:</span>
                      <span>BGC Taguig</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Referral Affiliate:</span>
                      <span className="font-mono text-teal-300">GINHAWA-BGC</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <div className="border-t border-slate-800 bg-slate-950 px-6 py-2.5 flex items-center justify-between text-slate-400 z-20">
            <button
              onClick={() => setMobileTab('explore')}
              className={`flex flex-col items-center gap-1 text-[10px] ${
                mobileTab === 'explore' ? 'text-teal-400 font-semibold' : 'hover:text-white'
              }`}
            >
              <Compass className="w-5 h-5" />
              <span>Explore</span>
            </button>
            <button
              onClick={() => setMobileTab('bookings')}
              className={`flex flex-col items-center gap-1 text-[10px] ${
                mobileTab === 'bookings' ? 'text-teal-400 font-semibold' : 'hover:text-white'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Sessions</span>
            </button>
            <button
              onClick={() => setMobileTab('profile')}
              className={`flex flex-col items-center gap-1 text-[10px] ${
                mobileTab === 'profile' ? 'text-teal-400 font-semibold' : 'hover:text-white'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
          </div>

          {/* Home Indicator Bar */}
          <div className="pb-2 pt-1 flex justify-center bg-slate-950">
            <div className="w-32 h-1 bg-slate-700 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
