export default function ClassroomNetwork() {
  return (
    <svg viewBox="0 0 800 500" style={{width:'100%',maxWidth:'800px',margin:'1.5rem auto',display:'block'}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cn-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0fdfa" />
          <stop offset="100%" stopColor="#eff6ff" />
        </linearGradient>
        <filter id="cn-glow-m"><feGaussianBlur stdDeviation="4" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <filter id="cn-glow-c"><feGaussianBlur stdDeviation="4" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        <marker id="cn-arrow" viewBox="0 0 10 8" refX="9" refY="4" markerWidth="8" markerHeight="6" orient="auto">
          <path d="M0,0 L10,4 L0,8 z" fill="#4ECDC4" opacity="0.5" />
        </marker>
        <marker id="cn-arrow-c" viewBox="0 0 10 8" refX="9" refY="4" markerWidth="8" markerHeight="6" orient="auto">
          <path d="M0,0 L10,4 L0,8 z" fill="#FF6B6B" opacity="0.6" />
        </marker>
      </defs>

      {/* Background */}
      <rect width="800" height="500" rx="16" fill="url(#cn-bg)" />

      {/* LAN Zone border */}
      <rect x="35" y="48" width="730" height="420" rx="14" fill="none" stroke="#4ECDC4" strokeWidth="2.5" strokeDasharray="12,6" opacity="0.15" />
      <rect x="42" y="39" width="310" height="20" rx="4" fill="#f0fdfa" />
      <text x="52" y="53" fontSize="11" fontWeight="bold" fill="#4ECDC4" opacity="0.7">학교 LAN — 같은 공유기에 연결된 모든 기기</text>

      {/* === ROUTER === */}
      <circle cx="400" cy="120" r="52" fill="white" stroke="#4ECDC4" strokeWidth="3" />
      <text x="400" y="112" textAnchor="middle" fontSize="32" dominantBaseline="middle">📡</text>
      <text x="400" y="150" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0d3d38">학교 공유기</text>
      <text x="400" y="166" textAnchor="middle" fontSize="9" fill="#64748b">SSID: School_WiFi · 192.168.1.1</text>
      <rect x="378" y="174" width="44" height="18" rx="9" fill="#4ECDC4" />
      <text x="400" y="186" textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">AP</text>

      {/* Wi-Fi signal arcs */}
      <path d="M368,75 A32,32 0 0,1 432,75" fill="none" stroke="#4ECDC4" strokeWidth="2" opacity="0.12" />
      <path d="M356,62 A44,44 0 0,1 444,62" fill="none" stroke="#4ECDC4" strokeWidth="1.5" opacity="0.08" />
      <path d="M344,50 A56,56 0 0,1 456,50" fill="none" stroke="#4ECDC4" strokeWidth="1" opacity="0.05" />

      {/* === CONNECTION LINES (animated marching dashes) === */}
      {/* Router → 전자칠판 */}
      <line x1="365" y1="160" x2="115" y2="325" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="8,5" opacity="0.2" markerEnd="url(#cn-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.8s" repeatCount="indefinite" />
      </line>
      {/* Router → 노트북 */}
      <line x1="385" y1="168" x2="255" y2="340" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="8,5" opacity="0.2" markerEnd="url(#cn-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.8s" repeatCount="indefinite" />
      </line>
      {/* Router → Pico (highlighted) */}
      <line x1="400" y1="192" x2="400" y2="290" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="8,5" opacity="0.35" markerEnd="url(#cn-arrow-c)">
        <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.2s" repeatCount="indefinite" />
      </line>
      {/* Router → 스마트폰 */}
      <line x1="415" y1="168" x2="545" y2="340" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="8,5" opacity="0.2" markerEnd="url(#cn-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.8s" repeatCount="indefinite" />
      </line>
      {/* Router → 프린터 */}
      <line x1="435" y1="160" x2="685" y2="325" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="8,5" opacity="0.2" markerEnd="url(#cn-arrow)">
        <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.8s" repeatCount="indefinite" />
      </line>

      {/* === ANIMATED DATA DOTS === */}
      <circle r="5" fill="#4ECDC4" filter="url(#cn-glow-m)">
        <animateMotion dur="2.4s" repeatCount="indefinite" path="M365,160 L115,325" />
        <animate attributeName="r" values="3;6;3" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />
      </circle>
      <circle r="5" fill="#4ECDC4" filter="url(#cn-glow-m)">
        <animateMotion dur="2.1s" repeatCount="indefinite" path="M385,168 L255,340" begin="0.4s" />
        <animate attributeName="r" values="3;6;3" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />
      </circle>
      <circle r="6" fill="#FF6B6B" filter="url(#cn-glow-c)">
        <animateMotion dur="1.4s" repeatCount="indefinite" path="M400,192 L400,290" begin="0.2s" />
        <animate attributeName="r" values="4;8;4" dur="0.7s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="0.7s" repeatCount="indefinite" />
      </circle>
      <circle r="5" fill="#4ECDC4" filter="url(#cn-glow-m)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M415,168 L545,340" begin="0.7s" />
        <animate attributeName="r" values="3;6;3" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />
      </circle>
      <circle r="5" fill="#4ECDC4" filter="url(#cn-glow-m)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M435,160 L685,325" begin="1.0s" />
        <animate attributeName="r" values="3;6;3" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />
      </circle>

      {/* Return dots (browser → router = GET /data) */}
      <circle r="4" fill="#FFE66D" opacity="0.8">
        <animateMotion dur="2.1s" repeatCount="indefinite" path="M255,340 L385,168" begin="1.2s" />
        <animate attributeName="r" values="2;5;2" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle r="4" fill="#FFE66D" opacity="0.8">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M545,340 L415,168" begin="1.6s" />
        <animate attributeName="r" values="2;5;2" dur="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0.2;0.8" dur="0.8s" repeatCount="indefinite" />
      </circle>

      {/* === DEVICE NODES === */}
      <circle cx="115" cy="350" r="42" fill="white" stroke="#4ECDC4" strokeWidth="2" />
      <text x="115" y="342" textAnchor="middle" fontSize="28">📺</text>
      <text x="115" y="372" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">전자칠판</text>
      <text x="115" y="408" textAnchor="middle" fontSize="8" fill="#64748b">192.168.1.10</text>
      <rect x="93" y="388" width="44" height="14" rx="7" fill="#3b82f6" />
      <text x="115" y="398" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">STA</text>

      <circle cx="255" cy="368" r="42" fill="white" stroke="#4ECDC4" strokeWidth="2" />
      <text x="255" y="360" textAnchor="middle" fontSize="28">💻</text>
      <text x="255" y="390" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">노트북</text>
      <text x="255" y="426" textAnchor="middle" fontSize="8" fill="#64748b">192.168.1.20</text>
      <rect x="233" y="406" width="44" height="14" rx="7" fill="#3b82f6" />
      <text x="255" y="416" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">STA</text>

      {/* Pico (highlighted center) */}
      <circle cx="400" cy="320" r="48" fill="#FFF5F5" stroke="#FF6B6B" strokeWidth="3" />
      <text x="400" y="308" textAnchor="middle" fontSize="28">🔧</text>
      <text x="400" y="332" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#FF6B6B">Pico 2 WH</text>
      <text x="400" y="346" textAnchor="middle" fontSize="8" fill="#FF6B6B">192.168.1.100</text>
      <rect x="364" y="356" width="72" height="16" rx="8" fill="#FF6B6B" />
      <text x="400" y="367" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white">STA + 웹서버</text>

      {/* Pico ↔ 센서 (wired) */}
      <line x1="400" y1="370" x2="400" y2="430" stroke="#FFE66D" strokeWidth="2.5" opacity="0.5" />
      <circle cx="400" cy="448" r="28" fill="white" stroke="#FFE66D" strokeWidth="2" />
      <text x="400" y="445" textAnchor="middle" fontSize="20">🌡️</text>
      <text x="400" y="468" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#92400e">센서 (전선)</text>
      <circle r="4" fill="#FFE66D">
        <animateMotion dur="1s" repeatCount="indefinite" path="M400,448 L400,370" />
        <animate attributeName="r" values="3;5;3" dur="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" />
      </circle>

      <circle cx="545" cy="368" r="42" fill="white" stroke="#4ECDC4" strokeWidth="2" />
      <text x="545" y="360" textAnchor="middle" fontSize="28">📱</text>
      <text x="545" y="390" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">스마트폰</text>
      <text x="545" y="426" textAnchor="middle" fontSize="8" fill="#64748b">192.168.1.30</text>
      <rect x="523" y="406" width="44" height="14" rx="7" fill="#3b82f6" />
      <text x="545" y="416" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">STA</text>

      <circle cx="685" cy="350" r="42" fill="white" stroke="#4ECDC4" strokeWidth="2" />
      <text x="685" y="342" textAnchor="middle" fontSize="28">🖨️</text>
      <text x="685" y="372" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e293b">프린터</text>
      <text x="685" y="408" textAnchor="middle" fontSize="8" fill="#64748b">192.168.1.50</text>
      <rect x="663" y="388" width="44" height="14" rx="7" fill="#3b82f6" />
      <text x="685" y="398" textAnchor="middle" fontSize="7" fontWeight="bold" fill="white">STA</text>

      {/* === FLOW LABELS === */}
      <text x="290" y="235" fontSize="8" fill="#4ECDC4" fontWeight="bold" opacity="0.6" transform="rotate(-30,290,235)">HTML/JSON</text>
      <text x="495" y="235" fontSize="8" fill="#4ECDC4" fontWeight="bold" opacity="0.6" transform="rotate(30,495,235)">HTML/JSON</text>
      <text x="415" y="250" fontSize="8" fill="#FF6B6B" fontWeight="bold" opacity="0.7">Wi-Fi</text>

      {/* === LEGEND === */}
      <rect x="600" y="10" width="185" height="65" rx="8" fill="white" fillOpacity="0.85" stroke="#e2e8f0" strokeWidth="1" />
      <line x1="615" y1="28" x2="650" y2="28" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" />
      <text x="655" y="31" fontSize="9" fill="#64748b">Wi-Fi (무선)</text>
      <line x1="615" y1="45" x2="650" y2="45" stroke="#FFE66D" strokeWidth="2.5" opacity="0.5" />
      <text x="655" y="48" fontSize="9" fill="#64748b">전선 (유선)</text>
      <circle cx="625" cy="60" r="4" fill="#4ECDC4">
        <animate attributeName="r" values="3;5;3" dur="0.9s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.3;1" dur="0.9s" repeatCount="indefinite" />
      </circle>
      <text x="655" y="63" fontSize="9" fill="#64748b">데이터 흐름</text>
    </svg>
  );
}
