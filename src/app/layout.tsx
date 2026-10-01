import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

// CJK faces are not preloaded; unicode-range slices load only the glyphs a page uses.
const notoTC = Noto_Sans_TC({
  weight: ['400', '500'],
  variable: '--font-tc',
  display: 'swap',
  preload: false,
});

const notoSC = Noto_Sans_SC({
  weight: ['400', '500'],
  variable: '--font-sc',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: 'Wazcher | Citora and $CIT',
  description:
    'Wazcher × Citora: the closed-loop GEO platform, onchain with $CIT. Citora shows whether ChatGPT, Claude, Gemini and Perplexity mention and cite a brand, and places its ads in ChatGPT. Every action on Citora will settle in $CIT.',
  openGraph: {
    title: 'Wazcher | Citora and $CIT',
    description:
      'Wazcher brings Citora onchain. Citora gets brands mentioned and cited by ChatGPT, Claude, Gemini and Perplexity and places their ads in ChatGPT. $CIT is pre-launch.',
    url: 'https://wazcher.com',
    siteName: 'Wazcher',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0d',
  colorScheme: 'dark',
};

// Applies the saved locale to <html lang> before first paint so the CJK typography rules match.
const langScript = `try{var l=localStorage.getItem('wlang');if(l==='zh')l='zh-TW';if(l==='zh-TW'||l==='zh-CN')document.documentElement.lang=l}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${inter.variable} ${mono.variable} ${notoTC.variable} ${notoSC.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Wazcher',
              url: 'https://wazcher.com',
              email: 'service@wazcher.com',
              sameAs: ['https://x.com/Citora_ai', 'https://www.linkedin.com/company/citora-ai/'],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
