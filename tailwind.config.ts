import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper:    '#fbecd7',
        'paper-2':'#f4e1c4',
        yellow:   '#f4b400',
        amber:    '#d29c1b',
        'blue-lt':'#73abb6',
        blue:     '#4588a2',
        navy:     '#173a48',
        red:      '#d32d08',
        ink:      '#20140a',
      },
      fontFamily: {
        anton: ['var(--font-anton)', 'sans-serif'],
        grotesk: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        vt: ['var(--font-vt323)', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
