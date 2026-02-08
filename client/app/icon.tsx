export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/svg+xml'

export default function Icon() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#09090b"/>
  <path d="M 6 9 Q 6 6 9 6 L 17 6 Q 20 6 20 9 L 20 15 Q 20 18 17 18 L 10 18 L 7 21 L 9 18 Q 6 18 6 15 Z" fill="#3b82f6"/>
  <path d="M 12 14 Q 12 11 15 11 L 23 11 Q 26 11 26 14 L 26 20 Q 26 23 23 23 L 16 23 L 13 26 L 15 23 Q 12 23 12 20 Z" fill="#10b981"/>
</svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
