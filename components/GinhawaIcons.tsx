'use client';

import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

// 1. Massage Therapy Icon (hands pressing back)
export function MassageTherapyIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Back curve */}
      <path d="M 12 36 C 18 38 30 38 36 36 C 38 28 38 20 36 12 C 30 10 18 10 12 12" stroke="currentColor" opacity="0.4" />
      {/* Left hand */}
      <path d="M 10 24 C 14 22 18 24 22 26 C 24 27 22 30 18 29 C 14 28 10 30 8 28 C 7 26 8 25 10 24 Z" stroke="#FDE047" fill="#FDE047" fillOpacity="0.15" />
      {/* Right hand */}
      <path d="M 38 24 C 34 22 30 24 26 26 C 24 27 26 30 30 29 C 34 28 38 30 40 28 C 41 26 40 25 38 24 Z" stroke="#FDE047" fill="#FDE047" fillOpacity="0.15" />
      {/* Gentle energy waves */}
      <path d="M 24 16 C 24 18 24 20 24 22" stroke="#FBBF24" />
      <path d="M 21 18 C 21 20 21 21 21 22" stroke="#FBBF24" />
      <path d="M 27 18 C 27 20 27 21 27 22" stroke="#FBBF24" />
    </svg>
  );
}

// 2. Muscle & Joint Care Icon (Spinal vertebrae & joint nodes)
export function MuscleJointCareIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Vertebrae column */}
      <circle cx="24" cy="10" r="3.5" stroke="#FDE047" fill="#FDE047" fillOpacity="0.2" />
      <line x1="24" y1="13.5" x2="24" y2="18" stroke="#FDE047" />
      <rect x="18" y="18" width="12" height="5" rx="2.5" stroke="#FDE047" fill="#FDE047" fillOpacity="0.2" />
      <line x1="24" y1="23" x2="24" y2="26" stroke="#FDE047" />
      <rect x="16" y="26" width="16" height="5" rx="2.5" stroke="#FDE047" fill="#FDE047" fillOpacity="0.2" />
      <line x1="24" y1="31" x2="24" y2="34" stroke="#FDE047" />
      <rect x="18" y="34" width="12" height="5" rx="2.5" stroke="#FDE047" fill="#FDE047" fillOpacity="0.2" />
      {/* Lateral nerve / joint arcs */}
      <path d="M 14 20 C 10 24 10 30 14 34" stroke="currentColor" opacity="0.6" />
      <path d="M 34 20 C 38 24 38 30 34 34" stroke="currentColor" opacity="0.6" />
    </svg>
  );
}

// 3. Pain Relief Icon (Torso with radiating relief waves)
export function PainReliefIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Human silhouette */}
      <circle cx="24" cy="11" r="4" stroke="currentColor" />
      <path d="M 15 38 C 15 28 17 21 24 21 C 31 21 33 28 33 38" stroke="currentColor" />
      {/* Radiating target / relief pulse */}
      <circle cx="24" cy="27" r="3" fill="#EF4444" stroke="#FDE047" strokeWidth="1.5" />
      <path d="M 19 24 C 18 26 18 28 19 30" stroke="#FDE047" />
      <path d="M 29 24 C 30 26 30 28 29 30" stroke="#FDE047" />
      <path d="M 16 22 C 14 25 14 29 16 32" stroke="#FBBF24" />
      <path d="M 32 22 C 34 25 34 29 32 32" stroke="#FBBF24" />
    </svg>
  );
}

// 4. Body Alignment Icon (Posture alignment plumb axis)
export function BodyAlignmentIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {/* Plumb center alignment axis */}
      <line x1="24" y1="4" x2="24" y2="44" stroke="#FDE047" strokeDasharray="3 2" />
      {/* Head */}
      <circle cx="24" cy="12" r="4" stroke="currentColor" />
      {/* Shoulders */}
      <line x1="14" y1="20" x2="34" y2="20" stroke="currentColor" />
      {/* Torso */}
      <path d="M 20 20 L 20 32 L 18 42" stroke="currentColor" />
      <path d="M 28 20 L 28 32 L 30 42" stroke="currentColor" />
      {/* Center alignment nodes */}
      <circle cx="24" cy="20" r="2" fill="#FDE047" />
      <circle cx="24" cy="32" r="2" fill="#FDE047" />
    </svg>
  );
}

// 5. Rehabilitation Icon (Active motion figure)
export function RehabilitationIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="28" cy="10" r="3.5" stroke="#FDE047" fill="#FDE047" fillOpacity="0.2" />
      <path d="M 20 22 L 26 18 L 32 22 L 38 18" stroke="currentColor" />
      <path d="M 26 18 L 24 28 L 18 34 L 14 42" stroke="currentColor" />
      <path d="M 24 28 L 32 34 L 34 42" stroke="#FDE047" />
      {/* Progress motion curve */}
      <path d="M 10 30 C 10 18 20 8 36 8" stroke="#FBBF24" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

// 6. Wellness Programs Icon (Blooming Lotus)
export function WellnessProgramsIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Central petal */}
      <path d="M 24 10 C 21 18 21 26 24 34 C 27 26 27 18 24 10 Z" fill="#FDE047" fillOpacity="0.3" stroke="#FDE047" strokeWidth="2" />
      {/* Left petal */}
      <path d="M 24 34 C 18 32 12 24 14 17 C 18 19 22 25 24 34 Z" fill="#FDE047" fillOpacity="0.15" stroke="#FDE047" strokeWidth="2" />
      {/* Right petal */}
      <path d="M 24 34 C 30 32 36 24 34 17 C 30 19 26 25 24 34 Z" fill="#FDE047" fillOpacity="0.15" stroke="#FDE047" strokeWidth="2" />
      {/* Outer base leaves */}
      <path d="M 12 30 C 6 30 6 34 10 36 C 18 38 30 38 38 36 C 42 34 42 30 36 30" stroke="currentColor" />
    </svg>
  );
}

// 7. Online Consultation Icon (Laptop with video / doctor badge)
export function OnlineConsultationIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="10" y="12" width="28" height="20" rx="3" stroke="currentColor" />
      <path d="M 6 36 L 42 36" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="20" r="3" stroke="#FDE047" fill="#FDE047" fillOpacity="0.3" />
      <path d="M 18 27 C 18 24 20 24 24 24 C 28 24 30 24 30 27" stroke="#FDE047" />
      <circle cx="24" cy="15" r="0.75" fill="#EF4444" />
    </svg>
  );
}

// 8. Home Service Icon (House with heart emblem)
export function HomeServiceIcon({ className = 'w-7 h-7' }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 8 22 L 24 8 L 40 22" stroke="currentColor" />
      <path d="M 12 19 L 12 38 C 12 39 13 40 14 40 L 34 40 C 35 40 36 39 36 38 L 36 19" stroke="currentColor" />
      {/* Heart at center */}
      <path
        d="M 24 25 C 24 25 21 21 19 23 C 17 25 18 28 24 33 C 30 28 31 25 29 23 C 27 21 24 25 24 25 Z"
        fill="#FDE047"
        stroke="#FDE047"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Trust Badge 1: Verified Therapists (Shield with check)
export function VerifiedTherapistsBadge({ className = 'w-8 h-8' }: IconProps) {
  return (
    <div className={`p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-[#B91C1C] flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    </div>
  );
}

// Trust Badge 2: Safe & Secure Booking (Medal ribbon rosette)
export function SafeSecureBookingBadge({ className = 'w-8 h-8' }: IconProps) {
  return (
    <div className={`p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-[#B91C1C] flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" />
        <polyline points="9 19 12 17 15 19 14 13 10 13" />
      </svg>
    </div>
  );
}

// Trust Badge 3: Trusted by Clients (Heart with hands)
export function TrustedByClientsBadge({ className = 'w-8 h-8' }: IconProps) {
  return (
    <div className={`p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-[#B91C1C] flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </div>
  );
}

// Trust Badge 4: Holistic & Natural Approach (Herbal leaf / mortar)
export function HolisticApproachBadge({ className = 'w-8 h-8' }: IconProps) {
  return (
    <div className={`p-2 rounded-xl bg-red-950/40 border border-red-500/20 text-[#B91C1C] flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7Z" />
        <path d="M11 13v7" />
        <path d="M14 9a5 5 0 0 1 4 4" />
      </svg>
    </div>
  );
}
