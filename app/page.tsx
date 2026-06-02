import AnalogOverlays from '@/components/AnalogOverlays'
import CamcorderHUD from '@/components/CamcorderHUD'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Manifesto from '@/components/Manifesto'
import CameraSection from '@/components/CameraSection'
import Footer from '@/components/Footer'
import GsapInit from '@/components/GsapInit'
import ThemeSet from '@/components/ThemeSet'

export default function Home() {
  return (
    <>
      <ThemeSet theme="marigold" />
      <AnalogOverlays />
      <CamcorderHUD />
      <GsapInit />
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
