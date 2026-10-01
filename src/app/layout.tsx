import type { Metadata, Viewport } from 'next';
import { Fragment_Mono, Funnel_Display, Inter, Noto_Sans_SC, Noto_Sans_TC } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// Display: Funnel Display, variable wght axis (one file serves the 300 to 500 headings).
const display = Funnel_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Mono ships one weight only; hierarchy comes from size, colour and opacity, never synthetic bold.
const mono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
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
      className={`${display.variable} ${inter.variable} ${mono.variable} ${notoTC.variable} ${notoSC.variable}`}
    >
      <head>
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
      <body>
        <Script id="wlang-init" strategy="beforeInteractive">{langScript}</Script>
        {children}
      </body>
    </html>
  );
}
