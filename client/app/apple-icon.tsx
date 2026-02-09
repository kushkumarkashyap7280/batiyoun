import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const size = {
  width: 180,
  height: 180,
}
 
export const contentType = 'image/png'
 
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          borderRadius: '40px',
        }}
      >
        {/* Chat bubbles icon */}
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mainBubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="30%" stopColor="#16a34a" stopOpacity="1" />
              <stop offset="70%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="letterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.15"/>
            </filter>
          </defs>
          
          {/* Main speech bubble with modern rounded design */}
          <path 
            d="M 30 45 Q 20 45 20 55 L 20 105 Q 20 115 30 115 L 90 115 L 120 140 L 100 115 L 130 115 Q 140 115 145 110 Q 150 105 150 95 L 150 55 Q 150 45 140 45 Z" 
            fill="url(#mainBubbleGrad)"
            filter="url(#shadow)"
          />
          
          {/* Bold "B" letterform - perfectly sized and positioned */}
          <g>
            <path 
              d="M 55 65 L 55 95 L 75 95 Q 85 95 90 90 Q 95 85 95 77.5 Q 95 70 90 67.5 Q 95 65 95 57.5 Q 95 50 90 47.5 Q 85 45 75 45 L 55 45 Z M 65 55 L 75 55 Q 80 55 80 57.5 Q 80 60 75 60 L 65 60 Z M 65 75 L 75 75 Q 82 75 82 80 Q 82 85 75 85 L 65 85 Z" 
              fill="url(#letterGrad)"
            />
            
            {/* Letter highlight for depth */}
            <path 
              d="M 65 55 L 75 55 Q 78 55 78 57 L 78 58 Q 76 60 75 60 L 65 60 Z" 
              fill="#ffffff" 
              opacity="0.4"
            />
          </g>
          
          {/* Security/online indicator */}
          <circle 
            cx="135" 
            cy="35" 
            r="12" 
            fill="url(#accentGrad)" 
            stroke="#ffffff" 
            strokeWidth="2"
          />
          
          {/* Inner indicator dot */}
          <circle 
            cx="135" 
            cy="35" 
            r="6" 
            fill="#ffffff" 
            opacity="0.9"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
