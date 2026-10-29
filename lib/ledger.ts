import { Booking, LedgerEntry } from './types';

export const INITIAL_LEDGER_ENTRIES: LedgerEntry[] = [
  // Booking 0814
  {
    id: 'LED-001',
    bookingId: 'BKG-2026-0814',
    timestamp: '2026-10-29T13:45:00Z',
    description: 'Customer payment received via GCash',
    account: '1010 - Customer Cash Clearing',
    debit: 1650.00,
    credit: 0.00,
    reconciled: true,
  },
  {
    id: 'LED-002',
    bookingId: 'BKG-2026-0814',
    timestamp: '2026-10-29T13:45:00Z',
    description: 'Therapist net payout liability (Maria Santos, LMT)',
    account: '2010 - Therapist Payout Payable',
    debit: 0.00,
    credit: 1295.25,
    reconciled: true,
  },
  {
    id: 'LED-003',
    bookingId: 'BKG-2026-0814',
    timestamp: '2026-10-29T13:45:00Z',
    description: 'Ginhawa Insurance Fund 1.5% micro-contribution',
    account: '2030 - Ginhawa Insurance Fund Reserve',
    debit: 0.00,
    credit: 24.75,
    reconciled: true,
  },
  {
    id: 'LED-004',
    bookingId: 'BKG-2026-0814',
    timestamp: '2026-10-29T13:45:00Z',
    description: 'Affiliate referral commission (GINHAWA-BGC)',
    account: '2020 - Affiliate Commission Payable',
    debit: 0.00,
    credit: 82.50,
    reconciled: true,
  },
  {
    id: 'LED-005',
    bookingId: 'BKG-2026-0814',
    timestamp: '2026-10-29T13:45:00Z',
    description: 'Ginhawa platform operational fee',
    account: '4010 - Platform Commission Revenue',
    debit: 0.00,
    credit: 247.50,
    reconciled: true,
  },
  // Booking 0815
  {
    id: 'LED-006',
    bookingId: 'BKG-2026-0815',
    timestamp: '2026-10-29T14:10:00Z',
    description: 'Customer payment received via Maya',
    account: '1010 - Customer Cash Clearing',
    debit: 1450.00,
    credit: 0.00,
    reconciled: true,
  },
  {
    id: 'LED-007',
    bookingId: 'BKG-2026-0815',
    timestamp: '2026-10-29T14:10:00Z',
    description: 'Therapist net payout liability (Rafael Dizon, PT)',
    account: '2010 - Therapist Payout Payable',
    debit: 0.00,
    credit: 1210.75,
    reconciled: true,
  },
  {
    id: 'LED-008',
    bookingId: 'BKG-2026-0815',
    timestamp: '2026-10-29T14:10:00Z',
    description: 'Ginhawa Insurance Fund 1.5% micro-contribution',
    account: '2030 - Ginhawa Insurance Fund Reserve',
    debit: 0.00,
    credit: 21.75,
    reconciled: true,
  },
  {
    id: 'LED-009',
    bookingId: 'BKG-2026-0815',
    timestamp: '2026-10-29T14:10:00Z',
    description: 'Ginhawa platform operational fee',
    account: '4010 - Platform Commission Revenue',
    debit: 0.00,
    credit: 217.50,
    reconciled: true,
  },
];

export function createBookingJournalEntries(booking: Booking): LedgerEntry[] {
  const ts = new Date().toISOString();
  const entries: LedgerEntry[] = [];
  const idPrefix = `LED-${Date.now().toString().slice(-6)}`;

  // 1. Debit Cash Clearing (Asset increases)
  entries.push({
    id: `${idPrefix}-1`,
    bookingId: booking.id,
    timestamp: ts,
    description: `Customer payment: ${booking.serviceName} via ${booking.paymentMethod}`,
    account: '1010 - Customer Cash Clearing',
    debit: Number(booking.pricing.totalAmount.toFixed(2)),
    credit: 0.00,
    reconciled: true,
  });

  // 2. Credit Therapist Payout Payable (Liability)
  entries.push({
    id: `${idPrefix}-2`,
    bookingId: booking.id,
    timestamp: ts,
    description: `Therapist earnings payable (${booking.therapistName})`,
    account: '2010 - Therapist Payout Payable',
    debit: 0.00,
    credit: Number(booking.pricing.therapistPayout.toFixed(2)),
    reconciled: true,
  });

  // 3. Credit Ginhawa Insurance Fund (Liability/Restricted Reserve)
  entries.push({
    id: `${idPrefix}-3`,
    bookingId: booking.id,
    timestamp: ts,
    description: `Ginhawa Insurance Fund 1.5% micro-contribution`,
    account: '2030 - Ginhawa Insurance Fund Reserve',
    debit: 0.00,
    credit: Number(booking.pricing.insuranceFundContribution.toFixed(2)),
    reconciled: true,
  });

  // 4. Credit Affiliate Commission Payable (if applicable)
  if (booking.pricing.affiliateCommission > 0) {
    entries.push({
      id: `${idPrefix}-4`,
      bookingId: booking.id,
      timestamp: ts,
      description: `Affiliate referral attribution (${booking.referralCode})`,
      account: '2020 - Affiliate Commission Payable',
      debit: 0.00,
      credit: Number(booking.pricing.affiliateCommission.toFixed(2)),
      reconciled: true,
    });
  }

  // 5. Credit Platform Revenue (Revenue increases)
  entries.push({
    id: `${idPrefix}-5`,
    bookingId: booking.id,
    timestamp: ts,
    description: `Platform operational margin`,
    account: '4010 - Platform Commission Revenue',
    debit: 0.00,
    credit: Number(booking.pricing.platformFee.toFixed(2)),
    reconciled: true,
  });

  return entries;
}

export function verifyLedgerBalance(entries: LedgerEntry[]) {
  const totalDebits = entries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredits = entries.reduce((sum, e) => sum + e.credit, 0);
  const discrepancy = Math.abs(totalDebits - totalCredits);
  return {
    totalDebits: Number(totalDebits.toFixed(2)),
    totalCredits: Number(totalCredits.toFixed(2)),
    discrepancy: Number(discrepancy.toFixed(2)),
    isBalanced: discrepancy < 0.01,
  };
}

export function getAccountBalances(entries: LedgerEntry[]) {
  const map: Record<string, { debit: number; credit: number; balance: number }> = {};
  for (const entry of entries) {
    if (!map[entry.account]) {
      map[entry.account] = { debit: 0, credit: 0, balance: 0 };
    }
    map[entry.account].debit += entry.debit;
    map[entry.account].credit += entry.credit;
    // For Assets (1xxx) Debit - Credit, for Liabilities (2xxx) / Revenues (4xxx) Credit - Debit
    const isAssetOrExpense = entry.account.startsWith('1') || entry.account.startsWith('5');
    if (isAssetOrExpense) {
      map[entry.account].balance += entry.debit - entry.credit;
    } else {
      map[entry.account].balance += entry.credit - entry.debit;
    }
  }
  return map;
}
