import type { Metadata } from 'next';
import { FaqPage } from '@/components/SubPages';

export const metadata: Metadata = {
  title: 'FAQ | Citora, a Wazcher product',
  description: 'Questions investors ask about Wazcher, Citora, GEO, ads in ChatGPT and $CIT.',
};

export default function Page() {
  return <FaqPage />;
}
