import React from 'react'

// ─── Flat-top hexagon vertex string ──────────────────────────────────────────
function hexPts(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

const CANVAS_W = 3120
const CANVAS_H = 1360
const FW = 900
const FH = 506

const FRAMES = [
  { id: 'f1', x: 570, y: 80, label: '01 — Overview' },
  { id: 'f2', x: 1590, y: 80, label: '02 — System Architecture' },
  { id: 'f3', x: 60, y: 730, label: '03 — Analog Circuit-Switched' },
  { id: 'f4', x: 1080, y: 730, label: '04 — Digital Circuit-Switched' },
  { id: 'f5', x: 2100, y: 730, label: '05 — Packet-Switched (UMTS/GPRS)' },
]

// ─── Shared components ────────────────────────────────────────────────────────

function FH_Bar({ title, n }: { title: string; n: number }) {
  return (
    <div style={{
      background: '#1E3A8A', padding: '11px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
    }}>
      <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '-0.01em' }}>
        {title}
      </span>
      <span style={{ fontSize: 9, color: '#93C5FD', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
        FRAME {String(n).padStart(2, '0')} / 05
      </span>
    </div>
  )
}

function FF_Bar({ text, n }: { text: string; n: number }) {
  return (
    <div style={{
      padding: '5px 20px', borderTop: '1px solid #E5E7EB', background: '#F9FAFB',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
    }}>
      <span style={{ fontSize: 9.5, color: '#6B7280', fontFamily: "'Source Sans 3', sans-serif" }}>{text}</span>
      <span style={{ fontSize: 9, color: '#9CA3AF', fontFamily: 'monospace' }}>Frame {String(n).padStart(2, '0')} / 05</span>
    </div>
  )
}

function BaseDefs({ prefix = '' }: { prefix?: string }) {
  const markers = [
    { id: `${prefix}aB`, fill: '#1D4ED8' },
    { id: `${prefix}aP`, fill: '#7C3AED' },
    { id: `${prefix}aG`, fill: '#059669' },
    { id: `${prefix}aT`, fill: '#0D9488' },
    { id: `${prefix}aO`, fill: '#D97706' },
    { id: `${prefix}aR`, fill: '#DC2626' },
  ]
  return (
    <defs>
      {markers.map(({ id, fill }) => (
        <marker key={id} id={id} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={fill} />
        </marker>
      ))}
      <pattern id={`${prefix}grid`} width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M28 0L0 0 0 28" fill="none" stroke="#DDE5F5" strokeWidth="0.5" />
      </pattern>
    </defs>
  )
}

function NBox({ x, y, w, h = 54, label, sub, fill, stroke, tc }: {
  x: number; y: number; w: number; h?: number
  label: string; sub?: string; fill: string; stroke: string; tc: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 1 : h / 2 + 5)}
        textAnchor="middle" fontSize="11.5" fontWeight="700" fill={tc}
        fontFamily="'Instrument Sans', sans-serif">{label}</text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle"
          fontSize="7.5" fill={tc} opacity={0.8} fontFamily="'Source Sans 3', sans-serif">{sub}</text>
      )}
    </g>
  )
}

// ─── Frame 1: Overview ────────────────────────────────────────────────────────

function Frame1() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', fontFamily: "'Source Sans 3', sans-serif", background: '#fff' }}>
      <div style={{ background: '#1E3A8A', padding: '22px 32px 16px', flexShrink: 0 }}>
        <div style={{ fontSize: 9.5, color: '#93C5FD', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
          Mobile Computing Lab · Experiment 01
        </div>
        <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 34, fontWeight: 700, color: '#FFF', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
          Basic Cellular System
        </div>
        <div style={{ fontSize: 12, color: '#93C5FD', marginTop: 6 }}>
          Architecture · Switching Paradigms · Radio Access &amp; Core Network
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#F0F4FF', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderRight: '2px solid #DBEAFE' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
            <div style={{ width: 26, height: 26, borderRadius: 5, background: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: "'Instrument Sans', sans-serif" }}>C</span>
            </div>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 15.5, color: '#1E3A8A' }}>Circuit Switched System</span>
          </div>
          <p style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.7, margin: '0 0 11px' }}>
            A <strong>dedicated end-to-end path</strong> is established and held between caller and receiver before communication begins. The channel remains exclusively reserved, guaranteeing consistent bandwidth even during silence.
          </p>
          <div style={{ fontSize: 11.5, color: '#4B5563', lineHeight: 1.9, marginBottom: 14 }}>
            <div>◆ Fixed, guaranteed bandwidth allocation</div>
            <div>◆ Consistent low latency — ideal for voice</div>
            <div>◆ Used in 1G (AMPS) and 2G (GSM) networks</div>
            <div>◆ Inefficient for bursty or packet data</div>
          </div>
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 5, padding: '7px 12px' }}>
            <div style={{ fontSize: 8.5, color: '#3B82F6', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3, fontWeight: 700 }}>Signal Path</div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#1E40AF' }}>MS → BTS → BSC → MSC → PSTN</div>
          </div>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
            <div style={{ width: 26, height: 26, borderRadius: 5, background: '#6D28D9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, fontFamily: "'Instrument Sans', sans-serif" }}>P</span>
            </div>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 15.5, color: '#4C1D95' }}>Packet Switched System</span>
          </div>
          <p style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.7, margin: '0 0 11px' }}>
            Data is broken into <strong>labeled packets</strong> routed independently through the network. Resources are dynamically shared across users; packets are reassembled at the destination for efficient utilization.
          </p>
          <div style={{ fontSize: 11.5, color: '#4B5563', lineHeight: 1.9, marginBottom: 14 }}>
            <div>◆ Dynamic, shared bandwidth — no dedicated circuit</div>
            <div>◆ High throughput for data applications</div>
            <div>◆ Used in 2.5G (GPRS), 3G (UMTS), 4G (LTE)</div>
            <div>◆ Variable latency depending on network load</div>
          </div>
          <div style={{ background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 5, padding: '7px 12px' }}>
            <div style={{ fontSize: 8.5, color: '#7C3AED', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3, fontWeight: 700 }}>Signal Path</div>
            <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#5B21B6' }}>MS → Node B → RNC → SGSN → GGSN</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '6px 32px', borderTop: '1px solid #BFDBFE', background: '#EFF6FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 10, color: '#6B7280' }}>Basic Cellular System — Theoretical Background</span>
        <span style={{ fontSize: 9, color: '#9CA3AF', fontFamily: 'monospace' }}>Frame 01 / 05</span>
      </div>
    </div>
  )
}

// ─── Frame 2: Basic Cellular System Architecture ──────────────────────────────

function Frame2() {
  const hexR = 50
  const hexCy = 115
  const hexBotY = hexCy + hexR * Math.sin(Math.PI / 3)
  const cells = [
    { cx: 175, label: 'Cell 1' },
    { cx: 450, label: 'Cell 2' },
    { cx: 725, label: 'Cell 3' },
  ]
  const bsc = { x: 375, y: 228, w: 150, h: 40 }
  const msc = { x: 355, y: 303, w: 190, h: 40 }
  const pstn = { x: 308, y: 379, w: 284, h: 40 }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <FH_Bar title="Components of a Basic Cellular System" n={2} />
      <svg width="900" style={{ flex: 1, display: 'block' }} viewBox="0 0 900 440" preserveAspectRatio="xMidYMid meet">
        <BaseDefs prefix="f2" />
        <rect width="900" height="440" fill="url(#f2grid)" />

        {/* BSS boundary (cells + BSC) */}
        <rect x="48" y="38" width="820" height="235" rx="7" fill="none"
          stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="9 4" opacity="0.45" />
        <text x="60" y="54" fontSize="9" fontWeight="700" fill="#3B82F6"
          fontFamily="'Source Sans 3', sans-serif" opacity="0.85">BSS — Base Station Subsystem</text>

        {/* NSS boundary (MSC) */}
        <rect x="238" y="295" width="424" height="58" rx="7" fill="none"
          stroke="#7C3AED" strokeWidth="1.2" strokeDasharray="9 4" opacity="0.45" />
        <text x="250" y="310" fontSize="9" fontWeight="700" fill="#7C3AED"
          fontFamily="'Source Sans 3', sans-serif" opacity="0.85">NSS — Network Switching Subsystem</text>

        {/* Cells */}
        {cells.map(({ cx, label }) => (
          <g key={cx}>
            <polygon points={hexPts(cx, hexCy, hexR)}
              fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="7 3" />
            <text x={cx} y={hexCy - hexR * Math.sin(Math.PI / 3) - 6}
              textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1E40AF"
              fontFamily="'Source Sans 3', sans-serif">{label}</text>
            {/* BTS Tower */}
            <line x1={cx} y1={hexCy - 22} x2={cx} y2={hexCy + 10} stroke="#1D4ED8" strokeWidth="2" />
            <line x1={cx - 13} y1={hexCy - 8} x2={cx + 13} y2={hexCy - 8} stroke="#1D4ED8" strokeWidth="1.5" />
            <line x1={cx - 8} y1={hexCy - 16} x2={cx + 8} y2={hexCy - 16} stroke="#1D4ED8" strokeWidth="1.5" />
            <rect x={cx - 18} y={hexCy + 12} width="36" height="16" rx="2" fill="#1D4ED8" />
            <text x={cx} y={hexCy + 23} textAnchor="middle" fontSize="8.5" fill="white"
              fontFamily="'Source Sans 3', sans-serif" fontWeight="700">BTS</text>
            {/* MS icons inside hex */}
            <rect x={cx - 27} y={hexCy + 32} width="21" height="13" rx="2"
              fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
            <text x={cx - 16.5} y={hexCy + 42} textAnchor="middle" fontSize="7" fill="#1E40AF"
              fontFamily="'Source Sans 3', sans-serif" fontWeight="600">MS</text>
            <rect x={cx + 6} y={hexCy + 32} width="21" height="13" rx="2"
              fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
            <text x={cx + 16.5} y={hexCy + 42} textAnchor="middle" fontSize="7" fill="#1E40AF"
              fontFamily="'Source Sans 3', sans-serif" fontWeight="600">MS</text>
            {/* Radio links */}
            <line x1={cx - 16} y1={hexCy + 34} x2={cx - 2} y2={hexCy + 14}
              stroke="#93C5FD" strokeWidth="1" strokeDasharray="2.5 2" />
            <line x1={cx + 16} y1={hexCy + 34} x2={cx + 2} y2={hexCy + 14}
              stroke="#93C5FD" strokeWidth="1" strokeDasharray="2.5 2" />
          </g>
        ))}

        {/* BSC */}
        <rect x={bsc.x} y={bsc.y} width={bsc.w} height={bsc.h} rx="4"
          fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="1.5" />
        <text x={bsc.x + bsc.w / 2} y={bsc.y + 15} textAnchor="middle"
          fontSize="12" fontWeight="700" fill="#1E3A8A" fontFamily="'Instrument Sans', sans-serif">BSC</text>
        <text x={bsc.x + bsc.w / 2} y={bsc.y + 29} textAnchor="middle"
          fontSize="8" fill="#1E40AF" fontFamily="'Source Sans 3', sans-serif">Base Station Controller</text>

        {/* MSC */}
        <rect x={msc.x} y={msc.y} width={msc.w} height={msc.h} rx="4"
          fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
        <text x={msc.x + msc.w / 2} y={msc.y + 15} textAnchor="middle"
          fontSize="12" fontWeight="700" fill="#4C1D95" fontFamily="'Instrument Sans', sans-serif">MSC</text>
        <text x={msc.x + msc.w / 2} y={msc.y + 29} textAnchor="middle"
          fontSize="8" fill="#6D28D9" fontFamily="'Source Sans 3', sans-serif">Mobile Switching Center</text>

        {/* PSTN */}
        <rect x={pstn.x} y={pstn.y} width={pstn.w} height={pstn.h} rx="4"
          fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" />
        <text x={pstn.x + pstn.w / 2} y={pstn.y + 16} textAnchor="middle"
          fontSize="12" fontWeight="700" fill="#065F46" fontFamily="'Instrument Sans', sans-serif">PSTN / Wired Network</text>
        <text x={pstn.x + pstn.w / 2} y={pstn.y + 30} textAnchor="middle"
          fontSize="8" fill="#059669" fontFamily="'Source Sans 3', sans-serif">Public Switched Telephone Network</text>

        {/* Cell 1 → BSC left */}
        <path d={`M175 ${hexBotY + 3} C175 200 315 ${bsc.y + 20} ${bsc.x} ${bsc.y + 20}`}
          fill="none" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#f2aB)" />
        {/* Cell 2 → BSC top */}
        <line x1="450" y1={hexBotY + 3} x2="450" y2={bsc.y}
          stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#f2aB)" />
        {/* Cell 3 → BSC right */}
        <path d={`M725 ${hexBotY + 3} C725 200 585 ${bsc.y + 20} ${bsc.x + bsc.w} ${bsc.y + 20}`}
          fill="none" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#f2aB)" />
        {/* BSC → MSC */}
        <line x1="450" y1={bsc.y + bsc.h} x2="450" y2={msc.y}
          stroke="#7C3AED" strokeWidth="1.5" markerEnd="url(#f2aP)" />
        {/* MSC → PSTN */}
        <line x1="450" y1={msc.y + msc.h} x2="450" y2={pstn.y}
          stroke="#059669" strokeWidth="1.5" markerEnd="url(#f2aG)" />

        {/* Legend */}
        <rect x="12" y="285" width="198" height="112" rx="5" fill="white" stroke="#E5E7EB" strokeWidth="1" opacity="0.96" />
        <text x="22" y="301" fontSize="8.5" fontWeight="700" fill="#374151"
          fontFamily="'Source Sans 3', sans-serif" letterSpacing="0.1em">LEGEND</text>
        <polygon points={hexPts(26, 320, 9)} fill="#EFF6FF" stroke="#93C5FD" strokeWidth="1" strokeDasharray="4 2" />
        <text x="42" y="323" fontSize="8" fill="#374151" fontFamily="'Source Sans 3', sans-serif">Hexagonal Cell</text>
        <line x1="19" y1="341" x2="19" y2="352" stroke="#1D4ED8" strokeWidth="2" />
        <line x1="15" y1="345" x2="23" y2="345" stroke="#1D4ED8" strokeWidth="1.5" />
        <text x="42" y="352" fontSize="8" fill="#374151" fontFamily="'Source Sans 3', sans-serif">BTS — Base Transceiver Station</text>
        <rect x="15" y="360" width="12" height="8" rx="1" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" />
        <text x="42" y="368" fontSize="8" fill="#374151" fontFamily="'Source Sans 3', sans-serif">MS — Mobile Station</text>
        <line x1="15" y1="380" x2="29" y2="380" stroke="#1D4ED8" strokeWidth="1.5" markerEnd="url(#f2aB)" />
        <text x="42" y="383" fontSize="8" fill="#374151" fontFamily="'Source Sans 3', sans-serif">Communication Link</text>
      </svg>
      <FF_Bar text="GSM Network Architecture — Basic Cellular System Components" n={2} />
    </div>
  )
}

// ─── Frame 3: Analog Circuit-Switched System ──────────────────────────────────

function Frame3() {
  const ny = 108
  const nh = 72
  const nodes = [
    { x: 130, w: 140, label: 'Mobile Unit', sub: 'Subscriber Handset' },
    { x: 382, w: 136, label: 'Cell Site', sub: 'BTS / Antenna Tower' },
    { x: 630, w: 140, label: 'MTSO', sub: 'Mobile Tel. Switching Office' },
  ]

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <FH_Bar title="Analog Circuit-Switched System (1G)" n={3} />
      <svg width="900" style={{ flex: 1, display: 'block' }} viewBox="0 0 900 440">
        <BaseDefs prefix="f3" />
        <rect width="900" height="440" fill="url(#f3grid)" />

        {/* Node boxes */}
        <NBox {...nodes[0]} y={ny} h={nh} fill="#EFF6FF" stroke="#1D4ED8" tc="#1E3A8A" />
        <NBox {...nodes[1]} y={ny} h={nh} fill="#DBEAFE" stroke="#1D4ED8" tc="#1E3A8A" />
        <NBox {...nodes[2]} y={ny} h={nh} fill="#EDE9FE" stroke="#7C3AED" tc="#4C1D95" />

        {/* Radio arcs (wireless link, centered at left edge of Cell Site) */}
        {[30, 50, 68].map((r, i) => {
          const csLeft = nodes[1].x
          const cy2 = ny + nh / 2
          const sx = csLeft + r * Math.cos((2 * Math.PI) / 3)
          const sy1 = cy2 + r * Math.sin((2 * Math.PI) / 3)
          const sy2 = cy2 - r * Math.sin((2 * Math.PI) / 3)
          return (
            <path key={r}
              d={`M${sx.toFixed(1)} ${sy1.toFixed(1)} A${r} ${r} 0 0 1 ${sx.toFixed(1)} ${sy2.toFixed(1)}`}
              fill="none" stroke="#93C5FD" strokeWidth={1.5 - i * 0.3}
              strokeDasharray={i === 0 ? 'none' : '5 3'} opacity={0.85 - i * 0.15} />
          )
        })}

        {/* Air interface arrow (dashed) */}
        <line x1={nodes[0].x + nodes[0].w} y1={ny + nh / 2}
          x2={nodes[1].x - 8} y2={ny + nh / 2}
          stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="7 4"
          markerEnd="url(#f3aB)" />

        {/* Wired arrow */}
        <line x1={nodes[1].x + nodes[1].w} y1={ny + nh / 2}
          x2={nodes[2].x - 8} y2={ny + nh / 2}
          stroke="#7C3AED" strokeWidth="1.5" markerEnd="url(#f3aP)" />

        {/* Interface labels */}
        <text x={(nodes[0].x + nodes[0].w + nodes[1].x) / 2} y={ny + nh / 2 - 10}
          textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#1D4ED8"
          fontFamily="'Source Sans 3', sans-serif">Air Interface (Um)</text>
        <text x={(nodes[0].x + nodes[0].w + nodes[1].x) / 2} y={ny + nh / 2 + 20}
          textAnchor="middle" fontSize="7.5" fill="#3B82F6"
          fontFamily="'Source Sans 3', sans-serif">Wireless / Analog FM</text>

        <text x={(nodes[1].x + nodes[1].w + nodes[2].x) / 2} y={ny + nh / 2 - 10}
          textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#7C3AED"
          fontFamily="'Source Sans 3', sans-serif">Backhaul Link</text>
        <text x={(nodes[1].x + nodes[1].w + nodes[2].x) / 2} y={ny + nh / 2 + 20}
          textAnchor="middle" fontSize="7.5" fill="#7C3AED"
          fontFamily="'Source Sans 3', sans-serif">Wired / T1 Trunk</text>

        {/* Separator */}
        <line x1="40" y1="215" x2="860" y2="215" stroke="#E0E7FF" strokeWidth="1" />

        {/* Component description cards */}
        {[
          {
            x: 40, title: 'Mobile Unit',
            lines: ['Subscriber handset or vehicle-mounted', 'radio transceiver. Communicates with', 'the nearest Cell Site via analog FM', 'radio signal over the air interface.'],
            color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE',
          },
          {
            x: 330, title: 'Cell Site (BTS)',
            lines: ['Fixed base station with antenna tower.', 'Covers a geographic cell area and', 'relays voice calls between Mobile Units', 'and the MTSO via wired backhaul lines.'],
            color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE',
          },
          {
            x: 620, title: 'MTSO',
            lines: ['Mobile Telephone Switching Office.', 'Central intelligence of the system.', 'Routes calls between cells and to', 'the PSTN / Public Telephone Network.'],
            color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE',
          },
        ].map(({ x, title, lines, color, bg, border }) => (
          <g key={x}>
            <rect x={x} y={228} width={245} height={115} rx="5" fill={bg} stroke={border} strokeWidth="1" />
            <text x={x + 12} y={246} fontSize="10" fontWeight="700" fill={color}
              fontFamily="'Instrument Sans', sans-serif">{title}</text>
            {lines.map((l, i) => (
              <text key={i} x={x + 12} y={262 + i * 14} fontSize="9" fill="#374151"
                fontFamily="'Source Sans 3', sans-serif">{l}</text>
            ))}
          </g>
        ))}

        {/* System note */}
        <rect x="40" y="360" width="820" height="56" rx="5" fill="#FEF9C3" stroke="#FDE047" strokeWidth="1" />
        <text x="54" y="378" fontSize="9.5" fontWeight="700" fill="#713F12"
          fontFamily="'Instrument Sans', sans-serif">System Note — 1G Analog Architecture</text>
        <text x="54" y="394" fontSize="9" fill="#713F12"
          fontFamily="'Source Sans 3', sans-serif">
          Voice is transmitted as a continuous analog FM signal. The MTSO controls handoffs as subscribers move between cells. No data services; voice only.
        </text>
        <text x="54" y="408" fontSize="9" fill="#713F12"
          fontFamily="'Source Sans 3', sans-serif">
          Example standard: AMPS (Advanced Mobile Phone System), introduced 1983.
        </text>
      </svg>
      <FF_Bar text="1G Analog Cellular — Circuit Switched Voice System" n={3} />
    </div>
  )
}

// ─── Frame 4: Digital Circuit-Switched System ─────────────────────────────────

function Frame4() {
  const ny = 108
  const nh = 65
  const nw = 108
  const gap = 62
  const total = 4 * nw + 3 * gap
  const sx = (900 - total) / 2
  const nodes = [
    { x: sx, label: 'Mobile Station', sub: 'MS' },
    { x: sx + nw + gap, label: 'BTS', sub: 'Base Transceiver Station' },
    { x: sx + 2 * (nw + gap), label: 'BSC', sub: 'Base Station Controller' },
    { x: sx + 3 * (nw + gap), label: 'Switching SS', sub: 'MSC / VLR / HLR' },
  ]
  const colors = [
    { fill: '#EFF6FF', stroke: '#1D4ED8', tc: '#1E3A8A' },
    { fill: '#DBEAFE', stroke: '#1D4ED8', tc: '#1E3A8A' },
    { fill: '#DBEAFE', stroke: '#1D4ED8', tc: '#1E3A8A' },
    { fill: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
  ]
  const arrowColors = ['#1D4ED8', '#1D4ED8', '#7C3AED']
  const arrowIds = ['f4aB', 'f4aB', 'f4aP']
  const ifaceLabels = [
    { top: 'Um Interface', bot: 'Wireless / Radio' },
    { top: 'Abis Interface', bot: 'BTS ↔ BSC' },
    { top: 'A Interface', bot: 'BSC ↔ MSC' },
  ]
  const subsystems = [
    { label: 'Radio Subsystem (RSS)', x: sx - 10, w: nw + 10, color: '#1D4ED8' },
    { label: 'Base Station Subsystem (BSS)', x: sx + nw + gap - 10, w: 2 * nw + gap + 20, color: '#1D4ED8' },
    { label: 'Switching Subsystem (SS)', x: sx + 3 * (nw + gap) - 10, w: nw + 10, color: '#7C3AED' },
  ]

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <FH_Bar title="Digital Circuit-Switched System (2G / GSM)" n={4} />
      <svg width="900" style={{ flex: 1, display: 'block' }} viewBox="0 0 900 440">
        <BaseDefs prefix="f4" />
        <rect width="900" height="440" fill="url(#f4grid)" />

        {/* Subsystem brackets */}
        {subsystems.map(({ label, x, w, color }) => (
          <g key={label}>
            <rect x={x} y={ny - 30} width={w} height={nh + 36} rx="4"
              fill="none" stroke={color} strokeWidth="1" strokeDasharray="7 3" opacity="0.35" />
            <text x={x + w / 2} y={ny - 18} textAnchor="middle" fontSize="8" fontWeight="600"
              fill={color} fontFamily="'Source Sans 3', sans-serif" opacity="0.9">{label}</text>
          </g>
        ))}

        {/* Node boxes */}
        {nodes.map(({ x, label, sub }, i) => (
          <NBox key={i} x={x} y={ny} w={nw} h={nh}
            label={label} sub={sub}
            fill={colors[i].fill} stroke={colors[i].stroke} tc={colors[i].tc} />
        ))}

        {/* Arrows + interface labels */}
        {nodes.slice(0, -1).map(({ x }, i) => {
          const x1 = x + nw
          const x2 = nodes[i + 1].x - 8
          const cy2 = ny + nh / 2
          return (
            <g key={i}>
              <line x1={x1} y1={cy2} x2={x2} y2={cy2}
                stroke={arrowColors[i]} strokeWidth="1.5" markerEnd={`url(#${arrowIds[i]})`} />
              <text x={(x1 + x2 + 8) / 2} y={cy2 - 9} textAnchor="middle" fontSize="8" fontWeight="600"
                fill={arrowColors[i]} fontFamily="'Source Sans 3', sans-serif">{ifaceLabels[i].top}</text>
              <text x={(x1 + x2 + 8) / 2} y={cy2 + 18} textAnchor="middle" fontSize="7.5"
                fill={arrowColors[i]} fontFamily="'Source Sans 3', sans-serif" opacity="0.8">{ifaceLabels[i].bot}</text>
            </g>
          )
        })}

        {/* Separator */}
        <line x1="40" y1="210" x2="860" y2="210" stroke="#E0E7FF" strokeWidth="1" />

        {/* Description cards */}
        {[
          { x: 40, w: 185, title: 'Mobile Station (MS)', lines: ['Subscriber terminal (handset,', 'laptop with SIM). Contains Mobile', 'Equipment (ME) and SIM card', 'for authentication.'], color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
          { x: 238, w: 185, title: 'BTS', lines: ['Base Transceiver Station.', 'Handles radio transmission and', 'reception with MS. One BTS per', 'cell sector. Controlled by BSC.'], color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
          { x: 436, w: 185, title: 'BSC', lines: ['Base Station Controller.', 'Manages radio resources for', 'multiple BTS. Handles handover,', 'channel allocation, power control.'], color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
          { x: 634, w: 214, title: 'Switching Subsystem', lines: ['MSC: Mobile Switching Center', 'routes calls between BSC & PSTN.', 'HLR: Home subscriber database.', 'VLR: Visitor location register.'], color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
        ].map(({ x, w, title, lines, color, bg, border }) => (
          <g key={x}>
            <rect x={x} y={222} width={w} height={118} rx="5" fill={bg} stroke={border} strokeWidth="1" />
            <text x={x + 10} y={240} fontSize="9.5" fontWeight="700" fill={color}
              fontFamily="'Instrument Sans', sans-serif">{title}</text>
            {lines.map((l, i) => (
              <text key={i} x={x + 10} y={256 + i * 14} fontSize="8.5" fill="#374151"
                fontFamily="'Source Sans 3', sans-serif">{l}</text>
            ))}
          </g>
        ))}

        {/* Note bar */}
        <rect x="40" y="356" width="820" height="58" rx="5" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
        <text x="54" y="374" fontSize="9.5" fontWeight="700" fill="#14532D"
          fontFamily="'Instrument Sans', sans-serif">System Note — 2G Digital GSM Architecture</text>
        <text x="54" y="390" fontSize="9" fill="#14532D" fontFamily="'Source Sans 3', sans-serif">
          Uses TDMA (Time Division Multiple Access) over digital radio. Supports voice calls and SMS.
        </text>
        <text x="54" y="404" fontSize="9" fill="#14532D" fontFamily="'Source Sans 3', sans-serif">
          Circuit-switched bearer: 64 kbps per voice channel. A dedicated circuit is held for call duration.
        </text>
      </svg>
      <FF_Bar text="GSM Digital Architecture — Circuit-Switched Voice &amp; Data" n={4} />
    </div>
  )
}

// ─── Frame 5: Packet-Switched System (UMTS/GPRS) ─────────────────────────────

function Frame5() {
  const ny = 100
  const nh = 60
  const nw = 88
  const gap = 52
  const total = 5 * nw + 4 * gap
  const sx = (900 - total) / 2
  const nodes = [
    { label: 'MS', sub: 'Mobile Station' },
    { label: 'Node B', sub: 'Radio Base Station' },
    { label: 'RNC', sub: 'Radio Network Ctrl.' },
    { label: 'SGSN', sub: 'Serving GPRS SN' },
    { label: 'GGSN', sub: 'Gateway GPRS SN' },
  ]
  const xpos = nodes.map((_, i) => sx + i * (nw + gap))
  const colors = [
    { fill: '#EFF6FF', stroke: '#1D4ED8', tc: '#1E3A8A' },
    { fill: '#CCFBF1', stroke: '#0D9488', tc: '#134E4A' },
    { fill: '#CCFBF1', stroke: '#0D9488', tc: '#134E4A' },
    { fill: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { fill: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
  ]
  const arrowColors = ['#1D4ED8', '#0D9488', '#0D9488', '#7C3AED']
  const arrowIds = ['f5aB', 'f5aT', 'f5aT', 'f5aP']
  const ifaceLabels = ['Uu', 'Iub', 'Iu-PS', 'Gn']

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <FH_Bar title="Packet-Switched System — UMTS / GPRS Core (3G)" n={5} />
      <svg width="900" style={{ flex: 1, display: 'block' }} viewBox="0 0 900 440">
        <BaseDefs prefix="f5" />
        <rect width="900" height="440" fill="url(#f5grid)" />

        {/* Domain labels */}
        <rect x={sx - 12} y={ny - 35} width={3 * nw + 2 * gap + 24} height={nh + 41} rx="5"
          fill="none" stroke="#0D9488" strokeWidth="1.2" strokeDasharray="8 3" opacity="0.4" />
        <text x={sx + (3 * nw + 2 * gap) / 2} y={ny - 22} textAnchor="middle"
          fontSize="8.5" fontWeight="700" fill="#0D9488" fontFamily="'Source Sans 3', sans-serif" opacity="0.9">
          UTRAN — Radio Access Network
        </text>

        <rect x={xpos[3] - 12} y={ny - 35} width={2 * nw + gap + 24} height={nh + 41} rx="5"
          fill="none" stroke="#7C3AED" strokeWidth="1.2" strokeDasharray="8 3" opacity="0.4" />
        <text x={xpos[3] + (nw + gap + nw) / 2} y={ny - 22} textAnchor="middle"
          fontSize="8.5" fontWeight="700" fill="#7C3AED" fontFamily="'Source Sans 3', sans-serif" opacity="0.9">
          GPRS Core Network (CN)
        </text>

        {/* Node boxes */}
        {nodes.map(({ label, sub }, i) => (
          <NBox key={i} x={xpos[i]} y={ny} w={nw} h={nh}
            label={label} sub={sub}
            fill={colors[i].fill} stroke={colors[i].stroke} tc={colors[i].tc} />
        ))}

        {/* Arrows */}
        {xpos.slice(0, -1).map((x, i) => {
          const x1 = x + nw
          const x2 = xpos[i + 1] - 8
          const cy2 = ny + nh / 2
          return (
            <g key={i}>
              <line x1={x1} y1={cy2} x2={x2} y2={cy2}
                stroke={arrowColors[i]} strokeWidth="1.5" markerEnd={`url(#${arrowIds[i]})`} />
              <text x={(x1 + x2 + 8) / 2} y={cy2 - 7} textAnchor="middle"
                fontSize="8" fontWeight="600" fill={arrowColors[i]}
                fontFamily="'Source Sans 3', sans-serif">{ifaceLabels[i]}</text>
            </g>
          )
        })}

        {/* GGSN → Internet */}
        <line x1={xpos[4] + nw} y1={ny + nh / 2} x2={xpos[4] + nw + 64} y2={ny + nh / 2}
          stroke="#7C3AED" strokeWidth="1.5" markerEnd="url(#f5aP)" />
        <rect x={xpos[4] + nw + 68} y={ny + 5} width={80} height={nh - 10} rx="5"
          fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
        <text x={xpos[4] + nw + 108} y={ny + nh / 2 - 2} textAnchor="middle"
          fontSize="9.5" fontWeight="700" fill="#065F46" fontFamily="'Instrument Sans', sans-serif">PDN</text>
        <text x={xpos[4] + nw + 108} y={ny + nh / 2 + 11} textAnchor="middle"
          fontSize="7" fill="#059669" fontFamily="'Source Sans 3', sans-serif">Internet</text>

        {/* Separator */}
        <line x1="40" y1="198" x2="860" y2="198" stroke="#E0E7FF" strokeWidth="1" />

        {/* Description cards */}
        {[
          { x: 35, w: 145, title: 'MS', lines: ['Mobile Station.', 'UE with SIM &', 'GPRS modem.', 'Originates data.'], color: '#1D4ED8', bg: '#EFF6FF', border: '#BFDBFE' },
          { x: 188, w: 155, title: 'Node B', lines: ['3G equivalent of BTS.', 'Physical radio unit.', 'Handles WCDMA air', 'interface with MS.'], color: '#0D9488', bg: '#CCFBF1', border: '#5EEAD4' },
          { x: 351, w: 158, title: 'RNC', lines: ['Radio Network Ctrl.', 'Manages Node Bs.', 'Handles soft handover,', 'radio resource mgmt.'], color: '#0D9488', bg: '#CCFBF1', border: '#5EEAD4' },
          { x: 517, w: 160, title: 'SGSN', lines: ['Serving GPRS SN.', 'Routes packets within', 'RAN. Tracks subscriber', 'location, authentication.'], color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
          { x: 685, w: 163, title: 'GGSN', lines: ['Gateway GPRS SN.', 'Connects UMTS core', 'to external PDN /','Internet. IP gateway.'], color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
        ].map(({ x, w, title, lines, color, bg, border }) => (
          <g key={x}>
            <rect x={x} y={210} width={w} height={110} rx="5" fill={bg} stroke={border} strokeWidth="1" />
            <text x={x + 10} y={228} fontSize="10" fontWeight="700" fill={color}
              fontFamily="'Instrument Sans', sans-serif">{title}</text>
            {lines.map((l, i) => (
              <text key={i} x={x + 10} y={243 + i * 13.5} fontSize="8.5" fill="#374151"
                fontFamily="'Source Sans 3', sans-serif">{l}</text>
            ))}
          </g>
        ))}

        {/* Bottom notes */}
        <rect x="35" y="335" width="830" height="80" rx="5" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
        <text x="48" y="353" fontSize="9.5" fontWeight="700" fill="#4C1D95"
          fontFamily="'Instrument Sans', sans-serif">System Note — 3G Packet-Switched UMTS/GPRS</text>
        <text x="48" y="369" fontSize="9" fill="#4C1D95" fontFamily="'Source Sans 3', sans-serif">
          UMTS uses WCDMA (Wideband CDMA) air interface. Data packets are routed via SGSN and GGSN through the packet core.
        </text>
        <text x="48" y="384" fontSize="9" fill="#4C1D95" fontFamily="'Source Sans 3', sans-serif">
          Voice remains circuit-switched (via MSC); data is fully packet-switched. Peak throughput: ~2 Mbps (HSPA).
        </text>
        <text x="48" y="399" fontSize="9" fill="#4C1D95" fontFamily="'Source Sans 3', sans-serif">
          Uu interface: MS ↔ Node B (radio).  Iub: Node B ↔ RNC.  Iu-PS: RNC ↔ SGSN.  Gi: GGSN ↔ PDN (Internet).
        </text>
      </svg>
      <FF_Bar text="UMTS/GPRS Packet Core — Packet-Switched Data Network" n={5} />
    </div>
  )
}

// ─── App: Canvas ──────────────────────────────────────────────────────────────

const FRAME_COMPONENTS: Record<string, React.FC> = {
  f1: Frame1, f2: Frame2, f3: Frame3, f4: Frame4, f5: Frame5,
}

export default function App() {
  // Proto connector paths between frames
  const f1 = FRAMES[0], f2 = FRAMES[1], f3 = FRAMES[2], f4 = FRAMES[3], f5 = FRAMES[4]
  const midY1 = f1.y + FH / 2
  const midY2 = f3.y + FH / 2

  const connectors = [
    // F1 → F2 (horizontal)
    { d: `M${f1.x + FW} ${midY1} L${f2.x} ${midY1}`, label: '' },
    // F2 → F3 (diagonal curve downward)
    {
      d: `M${f2.x + FW / 2} ${f2.y + FH} C${f2.x + FW / 2} ${f2.y + FH + 80} ${f3.x + FW / 2} ${f3.y - 80} ${f3.x + FW / 2} ${f3.y}`,
      label: '',
    },
    // F3 → F4 (horizontal)
    { d: `M${f3.x + FW} ${midY2} L${f4.x} ${midY2}`, label: '' },
    // F4 → F5 (horizontal)
    { d: `M${f4.x + FW} ${midY2} L${f5.x} ${midY2}`, label: '' },
  ]

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', fontFamily: "'Source Sans 3', sans-serif" }}>
      {/* Toolbar */}
      <div style={{
        height: 42, background: '#242424', borderBottom: '1px solid #383838',
        display: 'flex', alignItems: 'center', padding: '0 18px', gap: 14, flexShrink: 0, zIndex: 50,
      }}>
        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#A855F7', flexShrink: 0 }} />
        <span style={{ color: '#E5E7EB', fontSize: 12.5, fontWeight: 600, fontFamily: "'Instrument Sans', sans-serif", letterSpacing: '-0.01em' }}>
          Basic Cellular System — Lab Presentation Board
        </span>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {['Overview', 'Architecture', 'Analog CS', 'Digital CS', 'Packet SW'].map((lbl, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#A855F7' }} />
              <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'monospace' }}>{`0${i + 1}`}</span>
              <span style={{ fontSize: 10, color: '#6B7280' }}>{lbl}</span>
            </div>
          ))}
          <span style={{ fontSize: 9.5, color: '#4B5563', fontFamily: 'monospace', marginLeft: 8 }}>5 frames · prototype flow</span>
        </div>
      </div>

      {/* Scrollable canvas */}
      <div style={{ flex: 1, overflow: 'auto', background: '#1A1A1A', position: 'relative' }}>
        {/* Dot grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #2E2E2E 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }} />

        {/* Canvas content */}
        <div style={{ position: 'relative', width: CANVAS_W, height: CANVAS_H }}>

          {/* Prototype connector arrows */}
          <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
            width={CANVAS_W} height={CANVAS_H}>
            <defs>
              <marker id="proto-arr" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
                <polygon points="0 0, 10 4, 0 8" fill="#A855F7" />
              </marker>
            </defs>
            {connectors.map(({ d }, i) => (
              <path key={i} d={d} fill="none"
                stroke="#A855F7" strokeWidth="2" strokeDasharray="10 5"
                markerEnd="url(#proto-arr)" opacity={0.7} />
            ))}
            {/* Connector node dots */}
            {[
              [f1.x + FW, midY1],
              [f2.x + FW / 2, f2.y + FH],
              [f3.x + FW, midY2],
              [f4.x + FW, midY2],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={5} fill="#A855F7" opacity={0.8} />
            ))}
          </svg>

          {/* Frames */}
          {FRAMES.map(({ id, x, y, label }) => {
            const FrameComp = FRAME_COMPONENTS[id]
            return (
              <div key={id} style={{ position: 'absolute', left: x, top: y, zIndex: 2 }}>
                <div style={{
                  fontSize: 10.5, color: '#9CA3AF', marginBottom: 7,
                  fontFamily: 'monospace', letterSpacing: '0.05em',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#9CA3AF' }} />
                  Frame {label}
                </div>
                <div style={{
                  width: FW, height: FH, background: '#FFFFFF',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.3)',
                  overflow: 'hidden', position: 'relative',
                  outline: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <FrameComp />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
