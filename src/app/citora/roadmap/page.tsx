import type { Metadata } from 'next';
import { RoadmapPage } from '@/components/SubPages';

export const metadata: Metadata = {
  title: 'Roadmap | Citora, a Wazcher product',
  description: 'From GEO platform to token economy: Citora live, ads in ChatGPT through Citora, then $CIT.',
};

export default function Page() {
  return <RoadmapPage />;
}
