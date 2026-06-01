'use client'

import { useEffect } from 'react'

export default function GsapInit() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // ── Nav slide-down on load ────────────────────────────────────────
      gsap.fromTo(
        '.nav',
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.05, ease: 'power3.out' }
      )

      // ── HUD corners animate in ────────────────────────────────────────
      gsap.fromTo(
        '.hud .corner',
        { opacity: 0, scale: 0.7 },
        { opacity: 0.92, scale: 1, duration: 0.5, stagger: 0.08, delay: 0.6, ease: 'back.out(1.4)' }
      )
      gsap.fromTo(
        '.hud .rec, .hud .tc, .hud .stamp, .hud .batt',
        { opacity: 0 },
        { opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.9, ease: 'power2.out' }
      )

      // ── Hero entrance (once, on load) ─────────────────────────────────
      const heroTl = gsap.timeline({ delay: 0.15 })
      heroTl
        .fromTo(
          '.hero .eyebrow',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
        )
        .fromTo(
          '.hero h1',
          { opacity: 0, x: -64, skewX: -4 },
          { opacity: 1, x: 0, skewX: 0, duration: 0.95, ease: 'power4.out' },
          '-=0.35'
        )
        .fromTo(
          '.hero-sub',
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          '.scroll-cue',
          { opacity: 0, x: -22 },
          { opacity: 0.8, x: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )

      // Mark hero reveal elements as done so CSS doesn't fight GSAP
      document.querySelectorAll('.hero [data-reveal]').forEach((el) => el.classList.add('in'))

      // ── Periodic glitch burst on hero heading ─────────────────────────
      const scheduleHeroGlitch = () => {
        gsap.delayedCall(3.5 + Math.random() * 5.5, () => {
          const h1 = document.querySelector('.hero h1')
          if (!h1) return
          gsap.timeline({ onComplete: scheduleHeroGlitch })
            .to(h1, { x: 7,  duration: 0.04, ease: 'none' })
            .to(h1, { x: -5, duration: 0.04, ease: 'none' })
            .to(h1, { x: 3,  duration: 0.04, ease: 'none' })
            .to(h1, { x: 0,  duration: 0.07, ease: 'power2.out' })
        })
      }
      scheduleHeroGlitch()

      // ── Periodic glitch burst on footer wordmark ──────────────────────
      const scheduleFooterGlitch = () => {
        gsap.delayedCall(4 + Math.random() * 8, () => {
          const word = document.querySelector('.foot-word')
          if (!word) return
          gsap.timeline({ onComplete: scheduleFooterGlitch })
            .to(word, { x: 9,  duration: 0.05, ease: 'none' })
            .to(word, { x: -6, duration: 0.05, ease: 'none' })
            .to(word, { x: 2,  duration: 0.04, ease: 'none' })
            .to(word, { x: 0,  duration: 0.08, ease: 'power2.out' })
        })
      }
      scheduleFooterGlitch()

      // ── Scroll reveals — fade-up ──────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal]:not([data-reveal="wipe"])')
        .forEach((el) => {
          if (el.closest('.hero')) return
          const rd = parseFloat(getComputedStyle(el).getPropertyValue('--rd') || '0') / 1000

          gsap.fromTo(
            el,
            { opacity: 0, y: 34 },
            {
              opacity: 1, y: 0,
              duration: 0.75,
              ease: 'power3.out',
              delay: rd,
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
                onEnter: () => el.classList.add('in'),
              },
            }
          )
        })

      // ── Scroll reveals — wipe slide-in ────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal="wipe"]')
        .forEach((el) => {
          if (el.closest('.hero')) return
          const rd = parseFloat(getComputedStyle(el).getPropertyValue('--rd') || '0') / 1000

          gsap.fromTo(
            el,
            { opacity: 0, x: -56 },
            {
              opacity: 1, x: 0,
              duration: 0.88,
              ease: 'power4.out',
              delay: rd,
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
                onEnter: () => el.classList.add('in'),
              },
            }
          )
        })

      // ── Camera stage scale-in ─────────────────────────────────────────
      const camStage = document.getElementById('camStage')
      if (camStage) {
        gsap.fromTo(
          camStage,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: camStage, start: 'top 82%', once: true },
          }
        )
      }

      // ── Footer wordmark clip-path wipe ────────────────────────────────
      const footWord = document.querySelector<HTMLElement>('.foot-word')
      if (footWord) {
        gsap.set(footWord, { opacity: 1 })
        gsap.fromTo(
          footWord,
          { clipPath: 'inset(0 100% 0 0)', x: -24 },
          {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: { trigger: footWord, start: 'top 90%', once: true },
          }
        )
      }

      // ── Subtle vignette breathing ─────────────────────────────────────
      gsap.to('.fx-vig', {
        opacity: 0.78,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
        gsap.killTweensOf('*')
      }
    }

    init()
    return () => cleanup?.()
  }, [])

  return null
}
