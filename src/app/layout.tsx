import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from './_components/layout/navbar';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/components/ui/sonner';
import { WagmiProvider } from './_contexts/wagmi';
import { SessionProvider } from './_providers/session-provider';
import { ChainProvider } from './_contexts/chain/provider';
import { CDPHooksProvider } from './_contexts/cdp';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'x40tube',
  description:
    'x40tube is video platform where you can watch and upload videos',
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <Analytics />
        <SessionProvider>
          <ChainProvider>
            <CDPHooksProvider>
              <WagmiProvider>
                <Navbar />
                {children}
              </WagmiProvider>
            </CDPHooksProvider>
          </ChainProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
