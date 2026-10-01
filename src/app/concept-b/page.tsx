import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Wazcher | Hero concept B',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function ConceptB() {
  return <HomePage concept="b" />;
}
