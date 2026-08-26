import type {Metadata} from 'next';
import {Geist, Geist_Mono, Newsreader} from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Emmanuel Alabi — Portfolio',
  description: 'Minimal portfolio and writing by Emmanuel Alabi (Thursday), Thai-Nigerian full-stack developer based in Rwanda.',
  openGraph: {
    title: 'Emmanuel Alabi — Portfolio',
    description: 'Minimal portfolio and writing by Emmanuel Alabi (Thursday).',
    type: 'website',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="5a665f32-69be-40cf-abea-7923b603a548"
        />
      </head>
      <body
        className="font-sans antialiased selection:bg-neutral-800 selection:text-neutral-100 dark:selection:bg-neutral-200 dark:selection:text-neutral-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

