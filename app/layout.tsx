import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { CustomCursor } from '@/components/CustomCursor';
import { TimeOfDayTint } from '@/components/TimeOfDayTint';
import { MikeChatWidget } from '@/components/mike/MikeChatWidget';
import { MikeAvatarStyles } from '@/components/mike/MikeAvatar';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sitiostudio.com'),
  title: {
    default: 'sitio studio — beautiful websites for ambitious local businesses',
    template: '%s · sitio studio',
  },
  description:
    'A Copenhagen-based boutique studio delivering bespoke websites for local businesses in 7 days. Danish design sensibility, honest pricing, no templates.',
  openGraph: {
    title: 'sitio studio',
    description:
      'Beautiful websites for ambitious local businesses, delivered in 7 days.',
    url: 'https://sitiostudio.com',
    siteName: 'sitio studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sitio studio',
    description:
      'Beautiful websites for ambitious local businesses, delivered in 7 days.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <TimeOfDayTint />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CustomCursor />
        <MikeAvatarStyles />
        <MikeChatWidget
          surface="sitiostudio_com"
          variant="sitiostudio"
          apiBase="https://app.sitiostudio.com"
        />
      </body>
    </html>
  );
}
