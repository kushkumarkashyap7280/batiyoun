export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/svg+xml';

export default function Icon() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#16a34a"/>
      <stop offset="100%" stop-color="#22c55e"/>
    </linearGradient>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f0fdf4"/>
    </linearGradient>
  </defs>
  
  <!-- Modern speech bubble with tail -->
  <path d="M 8 6 Q 4 6 4 10 L 4 18 Q 4 22 8 22 L 16 22 L 24 28 L 18 22 Q 24 22 28 22 Q 28 18 28 14 L 28 10 Q 28 6 24 6 Z" fill="url(#mainGrad)"/>
  
  <!-- Clean "B" letterform -->
  <path d="M 10 12 L 10 20 L 14 20 Q 16 20 17 19 Q 18 18 18 16.5 Q 18 15 17 14.5 Q 18 14 18 12.5 Q 18 11 17 10.5 Q 16 10 14 10 L 10 10 Z M 12 12 L 14 12 Q 15 12 15 12.5 Q 15 13 14 13 L 12 13 Z M 12 15 L 14 15 Q 15.5 15 15.5 16 Q 15.5 17 14 17 L 12 17 Z" fill="url(#textGrad)"/>
  
  <!-- Security indicator -->
  <circle cx="24" cy="8" r="3" fill="#fbbf24" stroke="#ffffff" stroke-width="0.5"/>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
