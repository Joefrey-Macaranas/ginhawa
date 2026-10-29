'use client';

import React, { useState } from 'react';
import { WellnessService, Therapist, Booking } from '@/lib/types';
import { X, ShieldCheck, HeartHandshake, AlertCircle, CheckCircle, Lock } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: WellnessService[];
  therapists: Therapist[];
  preSelectedService?: WellnessService | null;
  preSelectedTherapist?: Therapist | null;
  onConfirmBooking: (booking: Booking) => void;
  existingBookings: Booking[];
}

export function BookingModal({
  isOpen,
  onClose,
  services,
  therapists,
  preSelectedService,
  preSelectedTherapist,
  onConfirmBooking,
  existingBookings,
}: BookingModalProps) {
  const [serviceId, setServiceId] = useState<string>(preSelectedService?.id || services[0].id);
  const [therapistId, setTherapistId] = useState<string>(preSelectedTherapist?.id || therapists[0].id);
  const [scheduledTime, setScheduledTime] = useState<string>('Today at 4:30 PM');
  const [customerName, setCustomerName] = useState<string>('Patricia Morales');
  const [customerPhone, setCustomerPhone] = useState<string>('+63 917 882 1923');
  const [address, setAddress] = useState<string>('Unit 18B, One Serendra, 26th St, BGC');
  const [cityArea, setCityArea] = useState<string>('BGC Taguig');
  const [referralCode, setReferralCode] = useState<string>('GINHAWA-BGC');
  const [consentAgreed, setConsentAgreed] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'GCash' | 'Maya' | 'CreditCard'>('GCash');
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentService = services.find(s => s.id === serviceId) || services[0];
  const currentTherapist = therapists.find(t => t.id === therapistId) || therapists[0];

  // Financial calculations
  const basePrice = currentService.basePrice;
  const platformFee = Number((basePrice * 0.15).toFixed(2));
  const insuranceFundContribution = Number((basePrice * 0.015).toFixed(2));
  const affiliateCommission = referralCode.trim() ? Number((basePrice * 0.05).toFixed(2)) : 0;
  const therapistPayout = Number((basePrice - platformFee - insuranceFundContribution - affiliateCommission).toFixed(2));
  const totalAmount = basePrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    if (!consentAgreed) {
      setConflictError('Please review and check the health contraindication consent before proceeding.');
      return;
    }

    setIsSubmitting(true);

    // Concurrency double-booking simulation guard
    setTimeout(() => {
      const isSlotConflict = existingBookings.some(
        b => b.therapistId === therapistId && b.scheduledTime === scheduledTime && b.status !== 'cancelled'
      );

      if (isSlotConflict) {
        setConflictError(`Concurrency Conflict (HTTP 409): ${currentTherapist.name} already has a confirmed booking for ${scheduledTime}. Please select another time slot or therapist.`);
        setIsSubmitting(false);
        return;
      }

      const newBooking: Booking = {
        id: `BKG-${Date.now().toString().slice(-4)}`,
        serviceId: currentService.id,
        serviceName: currentService.name,
        therapistId: currentTherapist.id,
        therapistName: currentTherapist.name,
        customerId: 'cust-current',
        customerName,
        customerPhone,
        address,
        cityArea,
        scheduledTime,
        durationMinutes: currentService.durationMinutes,
        status: 'en_route',
        notes: 'Please bring warm banana leaves and organic lemongrass oil.',
        consentAgreed: true,
        paymentStatus: 'captured',
        paymentMethod,
        pricing: {
          basePrice,
          platformFee,
          insuranceFundContribution,
          affiliateCommission,
          therapistPayout,
          totalAmount,
        },
        referralCode: referralCode || undefined,
        createdAt: new Date().toISOString(),
      };

      setIsSubmitting(false);
      onConfirmBooking(newBooking);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Schedule In-Home Treatment
            </h3>
            <div className="text-xs text-slate-400">
              Verified licensed therapist dispatch with Ginhawa Insurance Fund protection
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {conflictError && (
            <div className="p-3 text-xs bg-red-950/60 border border-red-800 text-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{conflictError}</span>
            </div>
          )}

          {/* Service & Therapist Select */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Treatment Modality
              </label>
              <select
                value={serviceId}
                onChange={e => setServiceId(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.durationMinutes}m - ₱{s.basePrice})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Assigned Therapist
              </label>
              <select
                value={therapistId}
                onChange={e => setTherapistId(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
              >
                {therapists.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.rating.toFixed(2)} ★ · {t.title})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Schedule Time & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Date & Schedule Slot
              </label>
              <select
                value={scheduledTime}
                onChange={e => setScheduledTime(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
              >
                <option value="Today at 4:30 PM">Today at 4:30 PM</option>
                <option value="Today at 6:00 PM">Today at 6:00 PM</option>
                <option value="Today at 7:30 PM">Today at 7:30 PM</option>
                <option value="Tomorrow at 10:00 AM">Tomorrow at 10:00 AM</option>
                <option value="Tomorrow at 2:00 PM">Tomorrow at 2:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Service Zone (Metro Manila)
              </label>
              <select
                value={cityArea}
                onChange={e => setCityArea(e.target.value)}
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
              >
                <option value="BGC Taguig">BGC Taguig</option>
                <option value="Makati CBD">Makati CBD</option>
                <option value="Ortigas Center">Ortigas Center / Pasig</option>
                <option value="Quezon City">Quezon City</option>
                <option value="Alabang Muntinlupa">Alabang Muntinlupa</option>
              </select>
            </div>
          </div>

          {/* Address & Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Client Name & Phone (+63)
              </label>
              <div className="space-y-1.5">
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
                <input
                  type="text"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="+63 9XX XXX XXXX"
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Complete Destination Address
              </label>
              <textarea
                rows={3}
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Unit / Floor, Building, Street, Gate pass details"
                className="w-full text-xs bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-teal-400 resize-none"
              />
            </div>
          </div>

          {/* Transparent Financial Split & Ledger Preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 pb-1 border-b border-slate-800/80">
              <span>Transparent Double-Entry Financial Split</span>
              <span className="text-[11px] font-mono text-teal-400">Account 1010 Clearing</span>
            </div>

            <div className="space-y-1 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Base Service Price ({currentService.durationMinutes} mins):</span>
                <span className="font-mono text-white tabular-nums">₱{basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Therapist Net Take-Home (83.5%):</span>
                <span className="font-mono tabular-nums">₱{therapistPayout.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-teal-300">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Ginhawa Insurance Fund (1.5% micro-reserve):</span>
                </span>
                <span className="font-mono tabular-nums">₱{insuranceFundContribution.toFixed(2)}</span>
              </div>
              {affiliateCommission > 0 && (
                <div className="flex justify-between text-indigo-300">
                  <span>Affiliate Referral Bonus (5% - {referralCode}):</span>
                  <span className="font-mono tabular-nums">₱{affiliateCommission.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Platform Operations Margin (15%):</span>
                <span className="font-mono tabular-nums">₱{platformFee.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-sm font-bold text-white">
              <span>Total Payable Amount</span>
              <span className="font-mono text-teal-300 tabular-nums">₱{totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })} PHP</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Instant Payment Method (Sandbox / Live)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['GCash', 'Maya', 'CreditCard'] as const).map(method => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                    paymentMethod === method
                      ? 'bg-teal-950/40 border-teal-500 text-teal-300 font-semibold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {method === 'CreditCard' ? 'Card / Bank' : method}
                </button>
              ))}
            </div>
          </div>

          {/* Health Consent Checkbox (Phase 10 Safety & Consent) */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-2.5">
            <input
              type="checkbox"
              id="consent"
              checked={consentAgreed}
              onChange={e => setConsentAgreed(e.target.checked)}
              className="mt-0.5 rounded border-slate-700 text-teal-500 focus:ring-teal-400 bg-slate-900"
            />
            <label htmlFor="consent" className="text-xs text-slate-300 leading-snug cursor-pointer">
              <span className="font-semibold text-white">Pre-Session Health & Safety Consent: </span>
              I confirm I have no unhealed bone fractures, open skin lesions, or high-risk contraindications for this treatment. I accept the Ginhawa Terms of Service and understand a 1.5% micro-contribution is automatically dedicated to the Ginhawa Therapist & Client Mutual Insurance Fund.
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Locking Slot...' : `Confirm & Authorize ₱${totalAmount.toFixed(2)}`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
