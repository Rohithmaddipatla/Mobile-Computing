import { useState, useEffect } from 'react'

// ── Icons (inline SVG) ───────────────────────────────────────────────────────

const IconWifi = ({ strength = 3 }: { strength?: number }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    {strength >= 1 && <path d="M12 18.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill={strength >= 1 ? '#00e5c8' : '#1e2330'} />}
    {strength >= 2 && <path d="M7.76 15.24a6 6 0 0 1 8.48 0" stroke={strength >= 2 ? '#00e5c8' : '#1e2330'} strokeWidth="1.8" strokeLinecap="round" />}
    {strength >= 3 && <path d="M4.93 12.07a10 10 0 0 1 14.14 0" stroke={strength >= 3 ? '#00e5c8' : '#1e2330'} strokeWidth="1.8" strokeLinecap="round" />}
    <path d="M2.1 9.1a14 14 0 0 1 19.8 0" stroke={strength >= 4 ? '#00e5c8' : '#1e2330'} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const IconBluetooth = ({ active }: { active: boolean }) => (
  <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#00e5c8' : '#4a5268'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
  </svg>
)

const IconSignal = ({ bars = 4 }: { bars?: number }) => (
  <svg width="18" height="14" viewBox="0 0 18 14">
    {[0,1,2,3].map(i => (
      <rect key={i} x={i * 4.5} y={14 - (i+1)*3.5} width="3" height={(i+1)*3.5}
        fill={i < bars ? '#00e5c8' : '#1e2330'} rx="0.5" />
    ))}
  </svg>
)

const IconBattery = ({ level }: { level: number }) => (
  <svg width="26" height="14" viewBox="0 0 26 14">
    <rect x="0.5" y="0.5" width="22" height="13" rx="2.5" stroke="#4a5268" strokeWidth="1" fill="none" />
    <rect x="22.5" y="4" width="3" height="6" rx="1.5" fill="#4a5268" />
    <rect x="2" y="2" width={Math.round(18 * level / 100)} height="10" rx="1.5"
      fill={level > 20 ? '#00e5c8' : '#ff4d4d'} />
  </svg>
)

const IconLocation = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8892a4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a5268" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const IconTrain = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="3" width="16" height="13" rx="2" />
    <path d="M4 10h16M12 3v7" />
    <path d="M8 19l-2 2M16 19l2 2M7 19h10" />
  </svg>
)

const IconMap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
)

const IconCloud = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
)

const IconPhone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
  </svg>
)

const IconUsb = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v12M8 6l4-4 4 4" />
    <path d="M7 14a2 2 0 0 0 0 4h10a2 2 0 0 0 0-4H7z" />
    <line x1="10" y1="9" x2="10" y2="14" /><line x1="14" y1="9" x2="14" y2="14" />
  </svg>
)

const IconShare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
)

// ── Data ─────────────────────────────────────────────────────────────────────

const TRANSIT = [
  { line: 'L12', dest: 'Central Hub', mins: 3, platform: 'A' },
  { line: 'B07', dest: 'Airport T2', mins: 11, platform: 'C' },
  { line: 'L12', dest: 'West Station', mins: 18, platform: 'A' },
  { line: 'R03', dest: 'Riverside', mins: 24, platform: 'B' },
]

const NEARBY = [
  { name: 'CityCharge Hub', type: 'Charging', dist: '80m', open: true, img: 'photo-1558618666-fcd25c85cd64' },
  { name: 'Noma Coffee', type: 'Café · WiFi', dist: '120m', open: true, img: 'photo-1495474472287-4d71bcdd2085' },
  { name: 'Capsule Lounge', type: 'Rest · Shower', dist: '200m', open: false, img: 'photo-1566073771259-6a8506099945' },
]

const DEVICES = [
  { name: 'iPhone 15 Pro', type: 'Phone', icon: IconPhone, connected: true, charge: 61 },
  { name: 'Jabra Elite 10', type: 'Earbuds', icon: IconBluetooth, connected: true, charge: 88 },
  { name: 'Portable SSD', type: 'Storage', icon: IconUsb, connected: false, charge: null },
]

// ── Clock hook ────────────────────────────────────────────────────────────────

function useClock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return time
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const time = useClock()
  const [activeTab, setActiveTab] = useState<'connect' | 'transit' | 'nearby' | 'devices'>('connect')
  const [wifi, setWifi] = useState(true)
  const [cellular, setCellular] = useState(true)
  const [hotspot, setHotspot] = useState(false)
  const [bluetooth, setBluetooth] = useState(true)
  const [nfc, setNfc] = useState(true)
  const [vpn, setVpn] = useState(false)

  const pad = (n: number) => String(n).padStart(2, '0')
  const timeStr = `${pad(time.getHours())}:${pad(time.getMinutes())}`
  const dateStr = time.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <div className="min-h-screen flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(145deg, #0a0c10 60%, #0d1018 100%)' }}>

      {/* Phone shell */}
      <div className="relative w-[390px] rounded-[44px] overflow-hidden shadow-2xl"
        style={{
          background: '#0a0c10',
          boxShadow: '0 0 0 1px #1e2330, 0 40px 80px rgba(0,0,0,0.8), 0 0 60px rgba(0,229,200,0.03)',
          minHeight: 780,
        }}>

        {/* Dynamic island */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          <div className="rounded-full" style={{ width: 120, height: 34, background: '#000', border: '1px solid #1e2330' }}>
            <div className="h-full flex items-center justify-center gap-2">
              {cellular && <span className="animate-blink"><IconSignal bars={4} /></span>}
              {wifi && <IconWifi strength={3} />}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-16 pb-2">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#e8ecf4', fontWeight: 500 }}>{timeStr}</span>
          <div className="flex items-center gap-2">
            <IconSignal bars={4} />
            <IconWifi strength={3} />
            <IconBattery level={61} />
          </div>
        </div>

        {/* Hero / Location header */}
        <div className="px-6 pt-4 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#00e5c8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Mobile Station
              </p>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, lineHeight: 1.1, color: '#e8ecf4' }}>
                Connected<br /><em>& Ready.</em>
              </h1>
            </div>
            <div className="text-right">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8892a4' }}>{dateStr}</p>
              <div className="flex items-center gap-1 justify-end mt-1">
                <IconLocation />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8892a4' }}>Midtown Platform 2</span>
              </div>
            </div>
          </div>

          {/* Network quality bar */}
          <div className="mt-4 rounded-xl p-3 flex items-center gap-3"
            style={{ background: '#111318', border: '1px solid #1e2330' }}>
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,229,200,0.1)' }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#00e5c8' }} />
              </div>
              <div className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ border: '1px solid rgba(0,229,200,0.4)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: '#e8ecf4' }}>Excellent connectivity</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8892a4' }}>5G · 287 Mbps · 12ms ping</p>
            </div>
            <div className="flex-shrink-0">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 500, color: '#00e5c8' }}>97</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268' }}>/100</span>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="px-6 mb-4">
          <div className="flex rounded-xl overflow-hidden" style={{ background: '#111318', border: '1px solid #1e2330' }}>
            {(['connect', 'transit', 'nearby', 'devices'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex-1 py-2 text-center transition-all"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  fontWeight: activeTab === tab ? 600 : 400,
                  color: activeTab === tab ? '#00e5c8' : '#4a5268',
                  background: activeTab === tab ? 'rgba(0,229,200,0.08)' : 'transparent',
                  boxShadow: activeTab === tab ? 'inset 0 -2px 0 #00e5c8' : 'none',
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Panel content */}
        <div className="px-6 pb-8 animate-slide-up" key={activeTab}>

          {/* CONNECT TAB */}
          {activeTab === 'connect' && (
            <div className="space-y-3">
              {[
                { label: 'Wi-Fi', sub: 'Transit_5G_Plus', state: wifi, set: setWifi, accent: '#00e5c8' },
                { label: 'Cellular', sub: '5G · Carrier Pro', state: cellular, set: setCellular, accent: '#00e5c8' },
                { label: 'Hotspot', sub: hotspot ? 'Broadcasting · 2 devices' : 'Off', state: hotspot, set: setHotspot, accent: '#f5a623' },
                { label: 'Bluetooth', sub: bluetooth ? '2 devices paired' : 'Off', state: bluetooth, set: setBluetooth, accent: '#00e5c8' },
                { label: 'NFC', sub: nfc ? 'Ready to tap' : 'Off', state: nfc, set: setNfc, accent: '#00e5c8' },
                { label: 'VPN', sub: vpn ? 'Tunnel active' : 'Off', state: vpn, set: setVpn, accent: '#f5a623' },
              ].map(({ label, sub, state, set, accent }) => (
                <div key={label} className="flex items-center justify-between rounded-2xl px-4 py-3.5"
                  style={{ background: '#111318', border: `1px solid ${state ? 'rgba(0,229,200,0.12)' : '#1e2330'}` }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: state ? '#e8ecf4' : '#4a5268' }}>{label}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: state ? '#8892a4' : '#2a303e', marginTop: 2 }}>{sub}</p>
                  </div>
                  <button onClick={() => set(!state)}
                    className="relative flex-shrink-0 transition-all"
                    style={{
                      width: 44, height: 24, borderRadius: 12,
                      background: state ? accent : '#1e2330',
                      border: 'none', cursor: 'pointer',
                      boxShadow: state ? `0 0 12px ${accent}44` : 'none',
                      transition: 'all 0.25s',
                    }}>
                    <div style={{
                      position: 'absolute', top: 3, left: state ? 23 : 3,
                      width: 18, height: 18, borderRadius: '50%',
                      background: state ? '#0a0c10' : '#4a5268',
                      transition: 'left 0.25s',
                    }} />
                  </button>
                </div>
              ))}

              {/* Data usage */}
              <div className="rounded-2xl p-4 mt-2" style={{ background: '#111318', border: '1px solid #1e2330' }}>
                <div className="flex justify-between items-center mb-3">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: '#e8ecf4' }}>Data Usage</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268' }}>Sep cycle</p>
                </div>
                {[
                  { label: 'Streaming', gb: 4.2, total: 10, color: '#00e5c8' },
                  { label: 'Navigation', gb: 1.1, total: 10, color: '#f5a623' },
                  { label: 'Downloads', gb: 2.7, total: 10, color: '#8892a4' },
                ].map(({ label, gb, total, color }) => (
                  <div key={label} className="mb-2.5">
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#8892a4' }}>{label}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color }}>{gb} GB</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: 4, background: '#1e2330' }}>
                      <div style={{ width: `${(gb / total) * 100}%`, height: '100%', background: color, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TRANSIT TAB */}
          {activeTab === 'transit' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-1">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Departures · Live</p>
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full animate-blink" style={{ background: '#00e5c8' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#00e5c8' }}>Live</span>
                </span>
              </div>

              {TRANSIT.map((t, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
                  style={{ background: '#111318', border: '1px solid #1e2330', animationDelay: `${i * 60}ms` }}>
                  <div className="flex-shrink-0 flex items-center justify-center rounded-lg"
                    style={{ width: 36, height: 36, background: i === 0 ? 'rgba(0,229,200,0.12)' : '#181c23' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, color: i === 0 ? '#00e5c8' : '#4a5268' }}>{t.line}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: '#e8ecf4' }}>{t.dest}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268' }}>Platform {t.platform}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 500, color: i === 0 ? '#00e5c8' : '#8892a4', lineHeight: 1 }}>{t.mins}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4a5268' }}>min</p>
                  </div>
                </div>
              ))}

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[
                  { icon: IconTrain, label: 'Buy Ticket' },
                  { icon: IconMap, label: 'Route Map' },
                  { icon: IconShare, label: 'Share ETA' },
                ].map(({ icon: Icon, label }) => (
                  <button key={label}
                    className="rounded-2xl py-4 flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
                    style={{ background: '#111318', border: '1px solid #1e2330', cursor: 'pointer' }}>
                    <span style={{ color: '#00e5c8' }}><Icon /></span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#8892a4' }}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* NEARBY TAB */}
          {activeTab === 'nearby' && (
            <div className="space-y-3">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Within 250m</p>

              {NEARBY.map((place, i) => (
                <div key={i} className="rounded-2xl overflow-hidden"
                  style={{ border: '1px solid #1e2330' }}>
                  <div className="relative h-32 bg-gray-900">
                    <img
                      src={`https://images.unsplash.com/${place.img}?w=400&h=128&fit=crop&auto=format`}
                      alt={place.name}
                      className="w-full h-full object-cover"
                      style={{ opacity: place.open ? 0.75 : 0.35 }}
                    />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, #111318 0%, transparent 60%)' }} />
                    <div className="absolute top-2.5 right-2.5">
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 9,
                        padding: '2px 8px', borderRadius: 20,
                        background: place.open ? 'rgba(0,229,200,0.15)' : 'rgba(255,77,77,0.15)',
                        color: place.open ? '#00e5c8' : '#ff4d4d',
                        border: `1px solid ${place.open ? 'rgba(0,229,200,0.3)' : 'rgba(255,77,77,0.3)'}`,
                      }}>{place.open ? 'Open' : 'Closed'}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between" style={{ background: '#111318' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: '#e8ecf4' }}>{place.name}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268', marginTop: 2 }}>{place.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#8892a4' }}>{place.dist}</span>
                      <IconArrow />
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick services */}
              <div className="rounded-2xl p-4" style={{ background: '#111318', border: '1px solid #1e2330' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, color: '#e8ecf4', marginBottom: 12 }}>Station Services</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Free WiFi', detail: 'Transit_5G_Plus', icon: '📶' },
                    { label: 'Charging Pods', detail: '6 of 8 free', icon: '⚡' },
                    { label: 'Luggage Lock', detail: 'Locker A-12', icon: '🔒' },
                    { label: 'Info Desk', detail: 'Open till 22:00', icon: 'ℹ️' },
                  ].map(({ label, detail, icon }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: '#181c23' }}>
                      <p style={{ fontSize: 16, marginBottom: 4 }}>{icon}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 500, color: '#e8ecf4' }}>{label}</p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4a5268', marginTop: 2 }}>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DEVICES TAB */}
          {activeTab === 'devices' && (
            <div className="space-y-3">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Paired Devices</p>

              {DEVICES.map((d, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl px-4 py-3.5"
                  style={{ background: '#111318', border: `1px solid ${d.connected ? 'rgba(0,229,200,0.12)' : '#1e2330'}` }}>
                  <div className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{ width: 44, height: 44, background: d.connected ? 'rgba(0,229,200,0.08)' : '#181c23' }}>
                    <span style={{ color: d.connected ? '#00e5c8' : '#2a303e' }}>
                      <d.icon active={d.connected} />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: d.connected ? '#e8ecf4' : '#4a5268' }}>{d.name}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268', marginTop: 2 }}>{d.type}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {d.connected && d.charge !== null ? (
                      <>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#00e5c8', fontWeight: 500 }}>{d.charge}%</p>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#4a5268' }}>battery</p>
                      </>
                    ) : (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#2a303e' }}>offline</span>
                    )}
                  </div>
                </div>
              ))}

              {/* Hotspot quick panel */}
              <div className="rounded-2xl p-4" style={{ background: '#111318', border: '1px solid #1e2330' }}>
                <div className="flex items-center justify-between mb-3">
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: '#e8ecf4' }}>Personal Hotspot</p>
                  <button onClick={() => setHotspot(!hotspot)}
                    style={{
                      width: 44, height: 24, borderRadius: 12,
                      background: hotspot ? '#f5a623' : '#1e2330',
                      border: 'none', cursor: 'pointer', position: 'relative',
                      boxShadow: hotspot ? '0 0 12px rgba(245,166,35,0.4)' : 'none',
                      transition: 'all 0.25s',
                    }}>
                    <div style={{
                      position: 'absolute', top: 3, left: hotspot ? 23 : 3,
                      width: 18, height: 18, borderRadius: '50%',
                      background: hotspot ? '#0a0c10' : '#4a5268',
                      transition: 'left 0.25s',
                    }} />
                  </button>
                </div>
                {hotspot ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268' }}>Network</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8892a4' }}>MobileStation_Pro</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268' }}>Connected</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#f5a623' }}>2 devices</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#4a5268' }}>Shared today</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#8892a4' }}>1.4 GB</span>
                    </div>
                  </div>
                ) : (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#2a303e' }}>Enable to share your connection</p>
                )}
              </div>

              {/* Add device */}
              <button className="w-full rounded-2xl py-3.5 flex items-center justify-center gap-2 transition-opacity hover:opacity-70"
                style={{ background: 'transparent', border: '1px dashed #1e2330', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4a5268' }}>+ Add device</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom nav hint */}
        <div className="flex justify-center pb-6">
          <div className="w-28 h-1 rounded-full" style={{ background: '#1e2330' }} />
        </div>
      </div>
    </div>
  )
}
