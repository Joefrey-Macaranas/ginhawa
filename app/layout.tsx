import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ginhawa — Autonomous Development & On-Demand Wellness Platform',
  description: 'Enterprise on-demand wellness platform with verified therapists, double-entry financial ledger, Ginhawa insurance fund, native mobile simulator, and full 15-phase autonomous engineering workflow.',
  openGraph: {
    title: 'Ginhawa — Autonomous Development & On-Demand Wellness Platform',
    description: 'Enterprise on-demand wellness platform with verified therapists, double-entry financial ledger, Ginhawa insurance fund, native mobile simulator, and full 15-phase autonomous engineering workflow.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ginhawa — Autonomous Development & On-Demand Wellness Platform',
    description: 'Enterprise on-demand wellness platform with verified therapists, double-entry financial ledger, Ginhawa insurance fund, native mobile simulator, and full 15-phase autonomous engineering workflow.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-teal-500/20 selection:text-teal-300" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
