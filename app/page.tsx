import AnalogOverlays from '@/components/AnalogOverlays'
import CamcorderHUD from '@/components/CamcorderHUD'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Manifesto from '@/components/Manifesto'
import CameraSection from '@/components/CameraSection'
import Footer from '@/components/Footer'
import GsapInit from '@/components/GsapInit'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Home() {
  return (
    <>
      {/* Fixed analog FX overlays */}
      <AnalogOverlays />

      {/* Fixed camcorder HUD */}
      <CamcorderHUD />

      {/* Theme switcher */}
      <ThemeSwitcher />

      {/* GSAP global setup */}
      <GsapInit />

      {/* Sticky nav */}
      <Nav />

      <main id="top">
        <Hero />
        <Manifesto />
        <CameraSection />
        <Footer />
      </main>
    </>
  )
}
