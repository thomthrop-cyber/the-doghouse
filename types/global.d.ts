import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type ModelViewerProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string
  alt?: string
  'camera-controls'?: boolean
  'auto-rotate'?: boolean
  'touch-action'?: string
  'auto-rotate-delay'?: string | number
  'rotation-per-second'?: string
  'interaction-prompt'?: string
  'shadow-intensity'?: string | number
  exposure?: string | number
  'disable-zoom'?: boolean
  'environment-image'?: string
  poster?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': ModelViewerProps
    }
  }
}
