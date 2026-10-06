import { useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────

type ComponentId = 'ms' | 'cell' | 'bts' | 'bsc' | 'msc' | 'hlr' | 'vlr' | 'pstn';

interface NetworkComponent {
  id: ComponentId;
  abbr: string;
  name: string;
  section: string;
  sectionColor: string;
  icon: React.FC<{ className?: string }>;
  description: string;
  details: string[];
  interfaces: string[];
  color: string; // tailwind bg
  accent: string; // border/icon color
}

// ── Icons ──────────────────────────────────────────────────────────────────

const MobileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    <line x1="9" y1="6" x2="15" y2="6" />
  </svg>
);

const TowerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 3,19 21,19" />
    <line x1="12" y1="10" x2="12" y2="19" />
    <line x1="8.5" y1="15" x2="15.5" y2="15" />
    <path d="M6.5 6.5 Q12 4 17.5 6.5" strokeDasharray="2 1" />
    <path d="M4.5 4 Q12 1 19.5 4" strokeDasharray="2 1" />
  </svg>
);

const HexIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" />
    <polygon points="12,7 16.33,9.5 16.33,14.5 12,17 7.67,14.5 7.67,9.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const ControllerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="6" y1="12" x2="10" y2="12" />
    <circle cx="16" cy="11" r="1" fill="currentColor" />
    <circle cx="19" cy="13" r="1" fill="currentColor" />
    <line x1="12" y1="9" x2="12" y2="15" strokeDasharray="2 1.5" />
  </svg>
);

const SwitchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 8 L12 12 L17 8" />
    <path d="M7 16 L12 12 L17 16" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <line x1="3" y1="12" x2="7" y2="12" />
    <line x1="17" y1="12" x2="21" y2="12" />
  </svg>
);

const DatabaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <line x1="12" y1="8" x2="12" y2="11" strokeDasharray="1.5 1.5" />
  </svg>
);

const VisitorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M17 17 L21 21" strokeWidth="2" />
    <circle cx="18.5" cy="15.5" r="2.5" />
  </svg>
);

const PhoneNetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18C0 1.1.9.01 2 .01h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" transform="translate(1,1) scale(0.9)" />
    <circle cx="18" cy="6" r="3" />
    <line x1="18" y1="3" x2="18" y2="1" />
    <line x1="21" y1="6" x2="23" y2="6" />
    <line x1="15" y1="6" x2="13" y2="6" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────

const components: NetworkComponent[] = [
  {
    id: 'ms',
    abbr: 'MS',
    name: 'Mobile Station',
    section: 'Mobile Station',
    sectionColor: '#2563eb',
    icon: MobileIcon,
    description: 'The end-user device — a handset, modem, or data terminal — that communicates wirelessly with the cellular network through the air interface.',
    details: [
      'Mobile Equipment (ME): the physical handset hardware including RF transceiver, processor, display, and battery.',
      'SIM Card (Subscriber Identity Module): a removable smart card storing IMSI, authentication keys (Ki), and subscriber profile data.',
      'Air Interface (Um): the radio link between MS and BTS operating on assigned frequency channels (FDMA/TDMA in GSM).',
      'Supports voice calls, SMS, and data services (GPRS/EDGE upgrades).',
      'Identified globally by IMSI (International Mobile Subscriber Identity) and IMEI (International Mobile Equipment Identity).',
    ],
    interfaces: ['Um — Air Interface to BTS', 'SIM/ME — Internal card interface'],
    color: 'bg-blue-50',
    accent: '#2563eb',
  },
  {
    id: 'cell',
    abbr: 'CELL',
    name: 'Cell',
    section: 'Mobile Station',
    sectionColor: '#2563eb',
    icon: HexIcon,
    description: 'A geographic coverage area served by one BTS antenna. Cells tile together like a honeycomb to give continuous, nationwide radio coverage.',
    details: [
      'Macro cells: large outdoor areas, typically 1–35 km radius, mounted on towers or rooftops.',
      'Micro cells: urban street-level coverage, 200 m–2 km, for high-density zones.',
      'Pico / Femto cells: indoor enterprise and residential coverage, meters to tens of meters.',
      'Cell ID (CGI): globally unique identifier combining MCC + MNC + LAC + CI.',
      'Frequency reuse pattern: adjacent cells use different frequencies to avoid co-channel interference.',
      'Handover: MS seamlessly moves between cells as signal strength drops below threshold.',
    ],
    interfaces: ['Radio boundary to neighboring cells', 'Logical mapping to one BTS sector'],
    color: 'bg-blue-50',
    accent: '#1d4ed8',
  },
  {
    id: 'bts',
    abbr: 'BTS',
    name: 'Base Transceiver Station',
    section: 'Radio Access Network',
    sectionColor: '#0369a1',
    icon: TowerIcon,
    description: 'The radio tower hardware that transmits and receives over the air interface, bridging MS wireless signals into the fixed wired network.',
    details: [
      'Houses the radio transceivers (TRX), antennas, power amplifiers, and baseband processing units.',
      'Manages the Um (air) interface: channel coding, encryption, frequency hopping.',
      'Supports multiple TRXs to serve several simultaneous calls within one cell sector.',
      'Performs timing advance measurement to correct for propagation delay from distant MSs.',
      'Directional antennas divide a cell into sectors (typically 3×120° per site) to increase capacity.',
      'Connects to BSC via the Abis interface — typically E1/T1 or fiber.',
    ],
    interfaces: ['Um — Air Interface to MS', 'Abis — to BSC'],
    color: 'bg-sky-50',
    accent: '#0369a1',
  },
  {
    id: 'bsc',
    abbr: 'BSC',
    name: 'Base Station Controller',
    section: 'Radio Access Network',
    sectionColor: '#0369a1',
    icon: ControllerIcon,
    description: 'The intelligent controller that manages a cluster of BTSs, handling radio resource allocation, handovers, and power control within the RAN.',
    details: [
      'Controls 10–100+ BTSs, allocating and releasing radio channels on demand.',
      'Manages intra-BSC handovers autonomously without involving the MSC.',
      'Applies power control algorithms to minimize interference and extend battery life.',
      'Transcoding and Rate Adaption Unit (TRAU) converts 13 kbps compressed voice to 64 kbps PCM for the A interface.',
      'Paging coordination: distributes page messages to all BTSs in a Location Area.',
      'Connects upward to MSC via the A interface (SS7 signaling + bearer circuits).',
    ],
    interfaces: ['Abis — from BTS cluster', 'A — to MSC'],
    color: 'bg-sky-50',
    accent: '#0284c7',
  },
  {
    id: 'msc',
    abbr: 'MSC',
    name: 'Mobile Switching Center',
    section: 'Network Switching Subsystem',
    sectionColor: '#6d28d9',
    icon: SwitchIcon,
    description: 'The telephony switch at the heart of the GSM core network, routing calls and coordinating mobility management, authentication, and roaming.',
    details: [
      'Routes voice/data calls between MSs and to/from external networks (PSTN, ISDN).',
      'Handles Location Update: updates HLR/VLR when a subscriber enters a new Location Area.',
      'Manages authentication: requests triplets (RAND, SRES, Kc) from HLR/AuC to verify identity.',
      'Call setup: allocates circuits, coordinates BSC channel assignment, and bridges the call.',
      'Gateway MSC (GMSC) acts as the entry point for calls arriving from PSTN — queries HLR to route to the visited MSC.',
      'Interfaces with VLR (co-located or remote) to hold data on currently visiting subscribers.',
    ],
    interfaces: ['A — from BSC', 'B — to VLR', 'C/D — to HLR', 'E — to adjacent MSCs', 'PSTN — via GMSC'],
    color: 'bg-violet-50',
    accent: '#6d28d9',
  },
  {
    id: 'hlr',
    abbr: 'HLR',
    name: 'Home Location Register',
    section: 'Network Switching Subsystem',
    sectionColor: '#6d28d9',
    icon: DatabaseIcon,
    description: 'The central subscriber database for a mobile network operator, storing permanent subscriber profiles and the current location of every subscriber.',
    details: [
      'Permanent store for IMSI, MSISDN (phone number), service subscriptions, and GPRS profiles.',
      'Authentication Centre (AuC) co-located: stores Ki keys and generates authentication triplets.',
      'Tracks the current VLR address for each subscriber — used to route incoming calls.',
      'Sends subscriber data (via Insert Subscriber Data) to VLR when a user registers in a new area.',
      'Cancels old VLR registration when a subscriber moves to a new network area.',
      'One HLR per operator (or a few distributed for resilience) serves millions of subscribers.',
    ],
    interfaces: ['C — to GMSC', 'D — to VLR', 'AuC — internal authentication'],
    color: 'bg-violet-50',
    accent: '#7c3aed',
  },
  {
    id: 'vlr',
    abbr: 'VLR',
    name: 'Visitor Location Register',
    section: 'Network Switching Subsystem',
    sectionColor: '#6d28d9',
    icon: VisitorIcon,
    description: "A temporary local database co-located with the MSC that caches subscriber data for all mobile users currently present in that MSC's service area.",
    details: [
      'Stores a subset of HLR data: IMSI, TMSI, current Location Area, and service profile.',
      'TMSI (Temporary Mobile Subscriber Identity) replaces IMSI over the air for privacy.',
      'Eliminates repeated long-distance HLR queries by caching data locally at the MSC.',
      'Assigns TMSI and updates it periodically to prevent subscriber tracking.',
      'When a subscriber leaves the area, the VLR entry is deleted and HLR is notified.',
      'Typically implemented as software within the MSC node itself.',
    ],
    interfaces: ['B — to MSC', 'D — to HLR (for data fetch)', 'G — to other VLRs (TMSI resolution)'],
    color: 'bg-violet-50',
    accent: '#8b5cf6',
  },
  {
    id: 'pstn',
    abbr: 'PSTN',
    name: 'Public Switched Telephone Network',
    section: 'External Network',
    sectionColor: '#0f766e',
    icon: PhoneNetIcon,
    description: 'The global circuit-switched telephone infrastructure connecting cellular subscribers to landlines, businesses, and international destinations.',
    details: [
      'Legacy TDM (Time Division Multiplexed) circuit-switched backbone connecting telephone exchanges worldwide.',
      'Interface to GSM via the Gateway MSC (GMSC) using ISUP (ISDN User Part) signaling over SS7.',
      'Incoming calls from PSTN hit GMSC → HLR query for roaming number (MSRN) → forwarded to serving MSC.',
      'Outgoing calls from MS are routed by MSC to PSTN via E1/T1 or SIP trunks.',
      'ISDN (Integrated Services Digital Network) — digital evolution of PSTN for data + voice.',
      'Modern networks replace TDM with IP/MPLS interconnect but maintain PSTN numbering (E.164).',
    ],
    interfaces: ['GMSC — from/to cellular core', 'E1/T1 / SIP trunks', 'International gateway exchanges'],
    color: 'bg-teal-50',
    accent: '#0f766e',
  },
];

// ── Section definitions ───────────────────────────────────────────────────

const sections = [
  { label: 'Mobile Station', ids: ['ms', 'cell'] as ComponentId[], color: '#dbeafe', border: '#93c5fd', text: '#1e40af' },
  { label: 'Radio Access Network', ids: ['bts', 'bsc'] as ComponentId[], color: '#e0f2fe', border: '#7dd3fc', text: '#0369a1' },
  { label: 'Network Switching Subsystem', ids: ['msc', 'hlr', 'vlr'] as ComponentId[], color: '#ede9fe', border: '#c4b5fd', text: '#5b21b6' },
  { label: 'External Network', ids: ['pstn'] as ComponentId[], color: '#ccfbf1', border: '#5eead4', text: '#0f766e' },
];

// ── Detail Panel ──────────────────────────────────────────────────────────

function DetailPanel({ comp, onClose }: { comp: NetworkComponent; onClose: () => void }) {
  const Icon = comp.icon;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(4px)' }}>
      <div
        className="slide-up bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar"
        style={{ border: `2px solid ${comp.accent}22` }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white rounded-t-2xl px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${comp.accent}18`, color: comp.accent }}>
                <Icon className="w-8 h-8" />
              </div>
              <div>
                <div className="mono text-xs font-medium tracking-widest uppercase mb-0.5"
                  style={{ color: comp.accent }}>{comp.abbr}</div>
                <h2 className="text-xl font-bold text-slate-900 leading-tight">{comp.name}</h2>
                <div className="text-xs text-slate-400 font-medium mt-0.5">{comp.section}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors flex-shrink-0 mt-1"
              style={{ color: '#64748b' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Description */}
          <p className="text-slate-600 leading-relaxed text-sm">{comp.description}</p>

          {/* Key Points */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: comp.accent }}>Technical Details</h3>
            <ul className="space-y-2.5">
              {comp.details.map((d, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="mono text-xs font-medium w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${comp.accent}14`, color: comp.accent }}>
                    {i + 1}
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interfaces */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-3"
              style={{ color: comp.accent }}>Network Interfaces</h3>
            <div className="flex flex-wrap gap-2">
              {comp.interfaces.map((iface, i) => (
                <span key={i} className="mono text-xs px-2.5 py-1 rounded-md font-medium"
                  style={{ background: `${comp.accent}12`, color: comp.accent, border: `1px solid ${comp.accent}28` }}>
                  {iface}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: comp.accent, color: '#fff' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Arrow connector ───────────────────────────────────────────────────────

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-1 relative z-10 flex-shrink-0">
      <svg width="48" height="20" viewBox="0 0 48 20" className="overflow-visible">
        <line x1="2" y1="10" x2="42" y2="10"
          stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 3"
          className="flow-line" />
        <polygon points="42,6 48,10 42,14" fill="#3b82f6" />
        <circle cx="4" cy="10" r="2.5" fill="#3b82f6" className="signal-pulse" />
      </svg>
      {label && (
        <span className="mono text-[9px] text-blue-400 font-medium tracking-wider mt-0.5 whitespace-nowrap">{label}</span>
      )}
    </div>
  );
}

// ── Component Card ────────────────────────────────────────────────────────

function NodeCard({ comp, onClick, active }: { comp: NetworkComponent; onClick: () => void; active: boolean }) {
  const Icon = comp.icon;
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
        hover:scale-105 hover:shadow-lg active:scale-[0.97] group
        ${active ? 'glow-active scale-105 shadow-lg' : 'shadow-sm hover:shadow-md'}
      `}
      style={{
        background: active ? `${comp.accent}10` : '#fff',
        borderColor: active ? comp.accent : `${comp.accent}40`,
        minWidth: 88,
      }}
      title={`Click to learn about ${comp.name}`}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
        style={{ background: `${comp.accent}15`, color: comp.accent }}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-center">
        <div className="mono text-[11px] font-bold tracking-wider" style={{ color: comp.accent }}>{comp.abbr}</div>
        <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 max-w-[80px]">{comp.name}</div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[9px]" style={{ color: comp.accent }}>Details</span>
        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-2.5 h-2.5" style={{ color: comp.accent }}>
          <path d="M2 6h8M7 3l3 3-3 3" />
        </svg>
      </div>
    </button>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState<ComponentId | null>(null);

  const handleClick = (id: ComponentId) => {
    setActive(id === active ? null : id);
  };

  const activeComp = components.find(c => c.id === active);

  // Arrow labels between components
  const arrows = [
    { label: 'Um' },
    { label: '' },
    { label: 'Abis' },
    { label: 'A' },
    { label: 'B/D' },
    { label: '' },
    { label: 'ISUP/SS7' },
  ];

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 50%, #f5f3ff 100%)' }}>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center">
          <div className="mono text-xs font-medium tracking-widest text-blue-400 uppercase mb-2">
            Mobile Computing Laboratory
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            Basic Cellular System
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Architecture of a GSM cellular network showing signal flow from mobile device to public telephone network.
            Click any component to explore its function and interfaces.
          </p>
        </div>
      </div>

      {/* Main diagram */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 overflow-x-auto no-scrollbar">

          {/* Section labels row */}
          <div className="flex items-stretch gap-0 mb-4 min-w-max mx-auto" style={{ width: 'fit-content' }}>
            {sections.map((sec, si) => {
              const nodeCount = sec.ids.length;
              const arrowsBefore = sec.ids.length > 1 ? 1 : 0;
              // Width approximation: each card ~108px, arrow ~64px
              const cardW = 108;
              const arrowW = 64;
              const secW = nodeCount * cardW + arrowsBefore * arrowW + (si > 0 ? arrowW : 0);

              return (
                <div key={sec.label} className="flex flex-col">
                  <div
                    className="rounded-t-xl px-3 py-1.5 text-center"
                    style={{
                      background: sec.color,
                      border: `1px solid ${sec.border}`,
                      borderBottom: 'none',
                      minWidth: secW,
                    }}
                  >
                    <span className="text-xs font-semibold tracking-wide" style={{ color: sec.text }}>
                      {sec.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nodes row */}
          <div className="flex items-center min-w-max mx-auto" style={{ width: 'fit-content' }}>
            {components.map((comp, idx) => {
              const isLast = idx === components.length - 1;
              const prevComp = idx > 0 ? components[idx - 1] : null;
              const crossSection = prevComp && prevComp.section !== comp.section;
              const sameSection = prevComp && !crossSection;

              return (
                <div key={comp.id} className="flex items-center">
                  {/* Arrow before this node (skip first) */}
                  {idx > 0 && (
                    <Arrow label={arrows[idx - 1]?.label} />
                  )}

                  {/* Node card */}
                  <NodeCard
                    comp={comp}
                    onClick={() => handleClick(comp.id)}
                    active={active === comp.id}
                  />
                </div>
              );
            })}
          </div>

          {/* Section bottom borders */}
          <div className="flex gap-0 mt-4 min-w-max mx-auto" style={{ width: 'fit-content' }}>
            {sections.map((sec) => {
              const nodeCount = sec.ids.length;
              const arrowsBefore = sec.ids.length > 1 ? 1 : 0;
              const cardW = 108;
              const arrowW = 64;
              // account for the inter-section arrow that was drawn inside prev section or at boundary
              const secW = nodeCount * cardW + arrowsBefore * arrowW + arrowW;

              return (
                <div key={sec.label}
                  className="h-2 rounded-b-xl"
                  style={{
                    background: sec.color,
                    border: `1px solid ${sec.border}`,
                    borderTop: 'none',
                    minWidth: secW,
                  }}
                />
              );
            })}
          </div>

        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <svg width="32" height="12" viewBox="0 0 32 12">
              <line x1="2" y1="6" x2="26" y2="6" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="4 2" />
              <polygon points="26,3 31,6 26,9" fill="#3b82f6" />
            </svg>
            <span>Signal / data flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-300" />
            <span>Mobile Station</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-sky-100 border border-sky-300" />
            <span>Radio Access Network</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-violet-100 border border-violet-300" />
            <span>Network Switching Subsystem</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-teal-100 border border-teal-300" />
            <span>External Network</span>
          </div>
        </div>

        {/* Quick-reference grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {components.map(comp => {
            const Icon = comp.icon;
            return (
              <button
                key={comp.id}
                onClick={() => handleClick(comp.id)}
                className="flex items-center gap-3 bg-white rounded-xl p-3 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all text-left active:scale-[0.98]"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${comp.accent}14`, color: comp.accent }}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="mono text-[10px] font-bold tracking-wider" style={{ color: comp.accent }}>{comp.abbr}</div>
                  <div className="text-[11px] text-slate-600 font-medium truncate">{comp.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="mono text-[10px] text-slate-300 tracking-widest uppercase">
            GSM Architecture Reference · Mobile Computing Lab Record
          </p>
        </div>
      </div>

      {/* Detail Panel */}
      {activeComp && (
        <DetailPanel comp={activeComp} onClose={() => setActive(null)} />
      )}
    </div>
  );
}
