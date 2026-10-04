import type { Metadata } from 'next';
import { DataroomPage } from '@/components/SubPages';

// Unlisted: not linked from the nav, footer, sitemap or llms.txt, and kept out of search results.
export const metadata: Metadata = {
  title: 'Data room | Citora, a Wazcher product',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function Page() {
  return <DataroomPage />;
}
