import type { Metadata } from 'next'
import AnalogOverlays from '@/components/AnalogOverlays'
import CamcorderHUD from '@/components/CamcorderHUD'
import PortfolioNav from '@/components/PortfolioNav'
import TapeRack from '@/components/TapeRack'
import Footer from '@/components/Footer'
import ThemeSet from '@/components/ThemeSet'

export const metadata: Metadata = {
  title: 'The Doghouse — The tape rack · Video portfolio',
  description: 'Everything we\'ve pointed a camera at — promos, music videos, documentation, live sets.',
}

export default function PortfolioPage() {
  return (
    <>
      <ThemeSet theme="deep" />
      <AnalogOverlays />
      <CamcorderHUD />
      <PortfolioNav />
      <main id="top">
        <TapeRack />
        <Footer />
      </main>
    </>
  )
}
