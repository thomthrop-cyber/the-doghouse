'use client'

import { useEffect } from 'react'

export default function ThemeSet({ theme }: { theme: 'marigold' | 'aquatic' | 'deep' }) {
  useEffect(() => {
    document.documentElement.setAttribute('data-dir', theme)
  }, [theme])

  return null
}
