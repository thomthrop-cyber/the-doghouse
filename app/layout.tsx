import type { Metadata } from 'next'
import { Anton, Space_Grotesk, Space_Mono, VT323 } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
})
const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Dog House — A label through the lens of a camera',
  description: 'Visual promotion, independent label, and in-house shooting. We market artists through visual promotion, release the music, and shoot it all in-house.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Dog House',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-dir="marigold"
      data-grain="on"
      data-scan="on"
    >
      <body className={`${anton.variable} ${spaceGrotesk.variable} ${spaceMono.variable} ${vt323.variable}`}>
        {children}
        <Script
          src="https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js"
          strategy="afterInteractive"
          type="module"
        />
      </body>
    </html>
  )
}
