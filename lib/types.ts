export type Role = 'customer' | 'therapist' | 'affiliate' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatarUrl?: string;
  verified: boolean;
}

export interface WellnessService {
  id: string;
  name: string;
  category: 'Hilot Traditional' | 'Therapeutic Massage' | 'Specialty Care' | 'Body Rituals';
  description: string;
  durationMinutes: number;
  basePrice: number; // in PHP
  benefits: string[];
  contraindications: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface TherapistCredential {
  id: string;
  type: 'TESDA NC II Massage' | 'DOH Licensed MT' | 'NBI Police Clearance' | 'Health Certificate';
  certificateNumber: string;
  issuedDate: string;
  expiryDate: string;
  verificationStatus: 'verified' | 'pending_review' | 'rejected';
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  rating: number;
  completedSessions: number;
  serviceAreas: string[];
  specialties: string[];
  credentials: TherapistCredential[];
  bio: string;
  availableDays: string[];
  availableHours: string;
  status: 'active' | 'in_session' | 'off_duty';
}

export type BookingStatus = 
  | 'requested'
  | 'confirmed'
  | 'en_route'
  | 'arrived'
  | 'in_session'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  therapistId: string;
  therapistName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  cityArea: string;
  scheduledTime: string;
  durationMinutes: number;
  status: BookingStatus;
  notes?: string;
  consentAgreed: boolean;
  paymentStatus: 'pending' | 'captured' | 'refunded';
  paymentMethod: 'GCash' | 'Maya' | 'CreditCard' | 'CashAfterSession';
  pricing: {
    basePrice: number;
    platformFee: number; // 15%
    insuranceFundContribution: number; // 1.5%
    affiliateCommission: number; // 5% if attributed
    therapistPayout: number;
    totalAmount: number;
  };
  referralCode?: string;
  createdAt: string;
}

export interface LedgerEntry {
  id: string;
  bookingId: string;
  timestamp: string;
  description: string;
  account: string;
  debit: number;
  credit: number;
  reconciled: boolean;
}

export interface InsuranceClaim {
  id: string;
  bookingId: string;
  claimantName: string;
  claimantRole: 'therapist' | 'customer';
  type: 'Travel Accidental Injury' | 'Equipment Loss' | 'Session Liability' | 'Medical First Aid';
  description: string;
  amountRequested: number;
  status: 'under_review' | 'approved' | 'settled' | 'declined';
  filedAt: string;
}

export interface IncidentReport {
  id: string;
  bookingId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'Safety & Harassment' | 'Medical Contraindication' | 'Late Arrival' | 'Property Issue';
  reporterRole: Role;
  reporterName: string;
  details: string;
  status: 'open' | 'investigating' | 'resolved';
  timestamp: string;
}

export interface Affiliate {
  id: string;
  name: string;
  code: string;
  email: string;
  totalReferrals: number;
  totalEarnings: number;
  pendingPayout: number;
}

export type PhaseStatus = 'NOT STARTED' | 'IN PROGRESS' | 'VERIFIED' | 'BLOCKED';

export interface PhaseTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface WorkflowPhase {
  phaseNumber: number;
  title: string;
  status: PhaseStatus;
  objective: string;
  tasks: PhaseTask[];
  commands: string[];
  tests: string[];
  evidence: string;
  securityReview: string;
  exitCriteria: string;
  lastRunTimestamp?: string;
}
