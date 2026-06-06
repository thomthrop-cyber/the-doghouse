import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  const data = readFileSync(join(process.cwd(), 'public/logos/doghouse.png'))
  const src = `data:image/png;base64,${data.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#ffffff',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '28px',
        }}
      >
        <img src={src} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    ),
    { ...size }
  )
}
