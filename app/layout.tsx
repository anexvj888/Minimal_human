import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import MobileNav from '@/components/layouts/mobile-nav'

export const metadata: Metadata = {
  title: 'Minimal Human - Modern Essential Wear',
  description: 'Premium apparel brand focused on modern essential wear. Timeless clothing with comfort, simplicity, and premium quality.',
  generator: 'v0.app',
  keywords: ['minimal', 'fashion', 'apparel', 'clothing', 'essentials'],
  openGraph: {
    title: 'Minimal Human',
    description: 'You are now part of Minimalism.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased bg-white text-black pb-16 md:pb-0">
        {children}
        <MobileNav />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

