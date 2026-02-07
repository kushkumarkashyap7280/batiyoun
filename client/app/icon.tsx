import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'

export const size = {
  width: 192,
  height: 192,
}

export const contentType = 'image/png'
 
export default function Icon() {
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
          borderRadius: '6px',
        }}
      >
        {/* Blue chat bubble */}
        <svg
          width="192"
          height="192"
          viewBox="0 0 192 192"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          {/* Blue chat bubble (left/incoming) */}
          <g>
            <path 
              d="M 40 55 Q 40 40 55 40 L 95 40 Q 110 40 110 55 L 110 85 Q 110 100 95 100 L 60 100 L 45 115 L 55 100 Q 40 100 40 85 Z" 
              fill="url(#blueGrad)"
            />
            <line x1="52" y1="60" x2="98" y2="60" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
            <line x1="52" y1="70" x2="90" y2="70" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
            <line x1="52" y1="80" x2="85" y2="80" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
          </g>
          
          {/* Green chat bubble (right/outgoing) */}
          <g>
            <path 
              d="M 82 95 Q 82 80 97 80 L 137 80 Q 152 80 152 95 L 152 125 Q 152 140 137 140 L 102 140 L 87 155 L 97 140 Q 82 140 82 125 Z" 
              fill="url(#greenGrad)"
            />
            <line x1="94" y1="100" x2="140" y2="100" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
            <line x1="94" y1="110" x2="132" y2="110" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
            <line x1="94" y1="120" x2="127" y2="120" stroke="#ffffff" strokeWidth="2.5" opacity="0.8" strokeLinecap="round"/>
          </g>
          
          {/* Lock/security indicator */}
          <g transform="translate(150, 45)">
            <circle cx="0" cy="0" r="10" fill="#10b981"/>
            <path 
              d="M -2 -2 L 0 1 L 3 -3" 
              stroke="#09090b" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none"
            />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
