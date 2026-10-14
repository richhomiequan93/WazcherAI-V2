import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';

export const metadata: Metadata = {
  title: 'Citora | A Wazcher product',
  description:
    'Citora, a Wazcher product: the closed-loop GEO platform, onchain with $CIT. See whether ChatGPT, Claude, Gemini and Perplexity mention and cite a brand.',
  alternates: { canonical: '/citora' },
};

export default function Page() {
  return <HomePage />;
}
