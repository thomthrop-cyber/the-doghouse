'use client'

import { useState, useEffect } from 'react'

const themes = [
  { value: 'aquatic', label: 'Cream' },
  { value: 'marigold', label: 'Yellow' },
  { value: 'deep', label: 'Abyss' },
]

export default function ThemeSwitcher() {
  const [active, setActive] = useState('marigold')

  const setTheme = (dir: string) => {
    setActive(dir)
    document.documentElement.setAttribute('data-dir', dir)
  }

  return (
    <div className="theme-switcher" aria-label="Colour theme">
      {themes.map((t) => (
        <button
          key={t.value}
          className={`theme-btn${active === t.value ? ' active' : ''}`}
          onClick={() => setTheme(t.value)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
