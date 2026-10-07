import { useRef, useState, type ReactNode } from "react";

type IconName =
  | "arrow"
  | "back"
  | "battery"
  | "bell"
  | "bluetooth"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "credit"
  | "eye"
  | "help"
  | "home"
  | "lock"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "search"
  | "shield"
  | "signal"
  | "user"
  | "wifi";

function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    back: (
      <>
        <path d="M19 12H5" />
        <path d="m10 17-5-5 5-5" />
      </>
    ),
    battery: (
      <>
        <rect x="3" y="7" width="16" height="10" rx="2" />
        <path d="M21 10v4" />
        <path d="M6 10h9v4H6z" fill="currentColor" stroke="none" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    bluetooth: (
      <>
        <path d="m7 7 10 10-5 4V3l5 4L7 17" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    credit: (
      <>
        <rect x="2.5" y="5" width="19" height="14" rx="3" />
        <path d="M2.5 10h19M7 15h3" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.7 9a2.5 2.5 0 1 1 3.2 2.4c-.9.4-.9 1.1-.9 1.6M12 17h.01" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    phone: (
      <>
        <rect x="7" y="2" width="10" height="20" rx="3" />
        <path d="M11 18h2" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 2 4.5 5v6c0 5 3.2 8.8 7.5 11 4.3-2.2 7.5-6 7.5-11V5L12 2Z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    signal: (
      <>
        <path d="M5 18v-3M9.5 18v-6M14 18V9M18.5 18V5" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    wifi: (
      <>
        <path d="M3 9a14 14 0 0 1 18 0M6 13a9 9 0 0 1 12 0M9.5 17a4 4 0 0 1 5 0" />
        <circle cx="12" cy="20" r=".7" fill="currentColor" stroke="none" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-icons">
        <Icon name="signal" size={16} strokeWidth={2.4} />
        <Icon name="wifi" size={16} strokeWidth={2.2} />
        <Icon name="battery" size={18} strokeWidth={1.9} />
      </div>
    </div>
  );
}

function Frame({
  id,
  number,
  title,
  children,
  nav,
  accent = false,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
  nav?: boolean;
  accent?: boolean;
}) {
  return (
    <section className="frame-wrap" data-frame={id}>
      <div className="frame-label">
        <span>{number}</span>
        {title}
      </div>
      <div className={`screen ${accent ? "screen-accent" : ""}`}>
        <StatusBar />
        <div className="screen-content">{children}</div>
        {nav && <BottomNav />}
      </div>
    </section>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="connector" aria-hidden="true">
      <span>{label}</span>
      <div className="connector-line">
        <i />
      </div>
    </div>
  );
}

function Button({
  children,
  secondary,
  onClick,
  icon,
}: {
  children: ReactNode;
  secondary?: boolean;
  onClick?: () => void;
  icon?: IconName;
}) {
  return (
    <button className={`button ${secondary ? "button-secondary" : ""}`} onClick={onClick}>
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  );
}

function Field({
  label,
  placeholder,
  icon,
  type = "text",
}: {
  label: string;
  placeholder: string;
  icon: IconName;
  type?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <div className="field-box">
        <Icon name={icon} size={19} />
        <input type={type} placeholder={placeholder} />
        {type === "password" && <Icon name="eye" size={18} />}
      </div>
    </label>
  );
}

function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">
        <span className="brand-wave wave-one" />
        <span className="brand-wave wave-two" />
        <span className="brand-dot" />
      </div>
      <span className="brand-name">Mobile Station</span>
    </div>
  );
}

function Header({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <div className="page-header">
      {onBack && (
        <button className="icon-button" aria-label="Go back" onClick={onBack}>
          <Icon name="back" size={21} />
        </button>
      )}
      <div>
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button className="active">
        <Icon name="home" size={20} />
        <span>Home</span>
      </button>
      <button>
        <Icon name="search" size={20} />
        <span>Services</span>
      </button>
      <button>
        <Icon name="bell" size={20} />
        <span>Alerts</span>
      </button>
      <button>
        <Icon name="user" size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}

function Toggle({ active = true }: { active?: boolean }) {
  return (
    <span className={`toggle ${active ? "on" : ""}`}>
      <i />
    </span>
  );
}

function ServiceRow({
  icon,
  title,
  detail,
  tone,
}: {
  icon: IconName;
  title: string;
  detail: string;
  tone?: string;
}) {
  return (
    <button className="service-row">
      <span className={`service-icon ${tone || ""}`}>
        <Icon name={icon} size={20} />
      </span>
      <span className="service-copy">
        <strong>{title}</strong>
        <small>{detail}</small>
      </span>
      <Icon name="chevron" size={18} />
    </button>
  );
}

export default function App() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(false);

  const goTo = (id: string) => {
    const target = canvasRef.current?.querySelector(`[data-frame="${id}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <main className="prototype">
      <header className="canvas-header">
        <div>
          <span className="eyebrow">USER INTERFACE PROTOTYPE</span>
          <h1>Mobile Station</h1>
          <p>Connected services, made convenient.</p>
        </div>
        <div className="canvas-meta">
          <span><i className="live-dot" /> Interactive flow</span>
          <span>8 screens</span>
          <span>Desktop canvas</span>
        </div>
      </header>

      <div className="canvas-scroll" ref={canvasRef}>
        <div className="canvas">
          <Frame id="welcome" number="01" title="Welcome / Login" accent>
            <div className="auth-screen">
              <Brand />
              <div className="auth-intro">
                <span className="pill">STAY CONNECTED</span>
                <h2>Welcome back</h2>
                <p>Access your network and essential services in one place.</p>
              </div>
              <div className="form-stack">
                <Field label="Email or username" placeholder="name@example.com" icon="mail" />
                <Field label="Password" placeholder="Enter your password" icon="lock" type="password" />
                <button className="text-link right" onClick={() => goTo("forgot")}>Forgot password?</button>
                <Button onClick={() => goTo("dashboard")}>Log in</Button>
                <div className="or"><span>or</span></div>
                <Button secondary onClick={() => goTo("account")}>Create account</Button>
              </div>
              <p className="secure-note"><Icon name="shield" size={15} /> Secure access, wherever you are</p>
            </div>
          </Frame>

          <Connector label="Register" />

          <Frame id="account" number="02" title="Create Account">
            <Header title="Create your account" subtitle="Connect in just a few steps" onBack={() => goTo("welcome")} />
            <div className="progress-steps">
              <span className="done">1</span><i /><span>2</span><i /><span>3</span>
            </div>
            <div className="form-stack compact">
              <Field label="Full name" placeholder="Alex Morgan" icon="user" />
              <Field label="Email address" placeholder="alex@example.com" icon="mail" />
              <Field label="Mobile number" placeholder="+1 (555) 000-0000" icon="phone" />
              <Field label="Create password" placeholder="At least 8 characters" icon="lock" type="password" />
              <label className="check-row">
                <input type="checkbox" defaultChecked />
                <span>I agree to the <b>Terms of Service</b> and <b>Privacy Policy</b>.</span>
              </label>
              <Button onClick={() => goTo("dashboard")}>Create account</Button>
            </div>
            <p className="account-note">Already have an account? <button onClick={() => goTo("welcome")}>Log in</button></p>
          </Frame>

          <Connector label="Recovery" />

          <Frame id="forgot" number="03" title="Forgot Password">
            <Header title="Reset password" onBack={() => goTo("welcome")} />
            <div className="recovery-visual">
              <div className="recovery-ring"><Icon name="lock" size={30} /></div>
              <span className="signal-arc arc-one" />
              <span className="signal-arc arc-two" />
            </div>
            <div className="center-copy">
              <h2>Forgot your password?</h2>
              <p>No worries. Enter the email connected to your account and we’ll send you a reset link.</p>
            </div>
            <div className="form-stack recovery-form">
              <Field label="Email address" placeholder="name@example.com" icon="mail" />
              <Button onClick={() => setSaved(true)}>{saved ? "Reset link sent" : "Send reset link"}</Button>
              {saved && <div className="inline-success"><Icon name="check" size={17} /> Check your inbox for next steps.</div>}
              <button className="text-link back-link" onClick={() => goTo("welcome")}><Icon name="back" size={17} /> Back to login</button>
            </div>
            <div className="help-card">
              <Icon name="help" size={20} />
              <span><strong>Need help?</strong><small>Contact Mobile Station support</small></span>
              <Icon name="chevron" size={17} />
            </div>
          </Frame>

          <Connector label="Login" />

          <Frame id="dashboard" number="04" title="Connectivity Dashboard" nav>
            <div className="dashboard-head">
              <div>
                <span className="small-label">GOOD MORNING</span>
                <h2>Hi, Alex</h2>
              </div>
              <button className="avatar-button" aria-label="Open profile">AM<i /></button>
            </div>
            <div className="connection-hero">
              <div className="connection-top">
                <div className="connected-icon"><Icon name="signal" size={28} strokeWidth={2.4} /></div>
                <span className="status-chip"><i /> Connected</span>
              </div>
              <div>
                <span className="network-name">Mobile Station 5G</span>
                <strong>Excellent connection</strong>
              </div>
              <div className="speed-stats">
                <span><small>DOWNLOAD</small><b>128 <i>Mbps</i></b></span>
                <span><small>UPLOAD</small><b>42 <i>Mbps</i></b></span>
                <span><small>LATENCY</small><b>18 <i>ms</i></b></span>
              </div>
            </div>
            <div className="section-title">
              <strong>Connections</strong>
              <button>Manage</button>
            </div>
            <div className="connect-grid">
              <div className="connect-card active">
                <span><Icon name="wifi" size={22} /></span>
                <strong>Wi-Fi</strong>
                <small>Station_Hub</small>
                <Toggle />
              </div>
              <div className="connect-card active">
                <span><Icon name="bluetooth" size={22} /></span>
                <strong>Bluetooth</strong>
                <small>2 devices</small>
                <Toggle />
              </div>
              <div className="connect-card">
                <span><Icon name="signal" size={22} /></span>
                <strong>Mobile data</strong>
                <small>5G · 82%</small>
                <Toggle />
              </div>
              <div className="connect-card">
                <span><Icon name="battery" size={22} /></span>
                <strong>Battery</strong>
                <small>86% · 8h left</small>
                <span className="battery-mini"><i /></span>
              </div>
            </div>
            <button className="quick-service" onClick={() => goTo("search")}>
              <span><Icon name="search" size={21} /></span>
              <span><strong>Find a service</strong><small>Browse help near you</small></span>
              <Icon name="arrow" size={20} />
            </button>
          </Frame>

          <Connector label="Find service" />

          <Frame id="search" number="05" title="Search / Services" nav>
            <Header title="Find a service" subtitle="Fast help, right when you need it" />
            <label className="search-box">
              <Icon name="search" size={20} />
              <input placeholder="Search services, locations..." />
              <button aria-label="Filters"><Icon name="menu" size={19} /></button>
            </label>
            <div className="category-row">
              <button className="selected">All</button>
              <button>Connectivity</button>
              <button>Device</button>
              <button>Account</button>
            </div>
            <div className="location-banner">
              <span><Icon name="map" size={20} /></span>
              <div><strong>Services near you</strong><small>Midtown · Within 3 miles</small></div>
              <button>Change</button>
            </div>
            <div className="section-title service-title">
              <strong>Popular services</strong>
              <span>12 results</span>
            </div>
            <div className="service-list" onClick={() => goTo("details")}>
              <ServiceRow icon="wifi" title="Wi-Fi diagnostics" detail="Remote · 5–10 min" />
              <ServiceRow icon="signal" title="Network signal check" detail="Remote · Instant" tone="lavender" />
              <ServiceRow icon="phone" title="Device setup support" detail="In store · From $19" tone="cyan" />
              <ServiceRow icon="shield" title="Account & SIM security" detail="Remote or in store" tone="green" />
            </div>
            <div className="support-strip">
              <span><Icon name="help" size={22} /></span>
              <div><strong>Can’t find what you need?</strong><small>Chat with a station expert</small></div>
              <Icon name="chevron" size={18} />
            </div>
          </Frame>

          <Connector label="View details" />

          <Frame id="details" number="06" title="Service Details">
            <Header title="Service details" onBack={() => goTo("search")} />
            <div className="detail-hero">
              <div className="detail-icon"><Icon name="wifi" size={34} /></div>
              <span className="status-chip pale"><i /> Available now</span>
              <h2>Wi-Fi diagnostics</h2>
              <p>We’ll test your connection, identify issues and help optimize your home network.</p>
              <div className="rating"><b>4.9</b><span>★★★★★</span><small>248 reviews</small></div>
            </div>
            <div className="detail-facts">
              <div><Icon name="clock" size={21} /><span><small>DURATION</small><strong>5–10 minutes</strong></span></div>
              <div><Icon name="map" size={21} /><span><small>DELIVERY</small><strong>Remote support</strong></span></div>
              <div><Icon name="credit" size={21} /><span><small>PRICE</small><strong>$9.00</strong></span></div>
            </div>
            <div className="included">
              <strong>What’s included</strong>
              {["Full connection health check", "Signal strength analysis", "Personal optimization tips"].map((item) => (
                <span key={item}><i><Icon name="check" size={14} /></i>{item}</span>
              ))}
            </div>
            <div className="expert">
              <div className="expert-avatar">JM<i /></div>
              <span><small>YOUR STATION EXPERT</small><strong>Jordan M.</strong><b>Online now</b></span>
              <button><Icon name="help" size={19} /></button>
            </div>
            <div className="sticky-action">
              <span><small>Total</small><strong>$9.00</strong></span>
              <Button onClick={() => goTo("payment")}>Continue</Button>
            </div>
          </Frame>

          <Connector label="Continue" />

          <Frame id="payment" number="07" title="Confirmation / Payment">
            <Header title="Confirm & pay" subtitle="One last step" onBack={() => goTo("details")} />
            <div className="checkout-step"><span className="complete"><Icon name="check" size={13} /></span><i /><span className="complete"><Icon name="check" size={13} /></span><i /><span>3</span></div>
            <div className="summary-card">
              <div className="summary-title">
                <span><Icon name="wifi" size={23} /></span>
                <div><strong>Wi-Fi diagnostics</strong><small>Remote support session</small></div>
              </div>
              <div className="summary-row"><span><Icon name="calendar" size={18} /> Today</span><b>Immediate start</b></div>
              <div className="summary-row"><span><Icon name="clock" size={18} /> Duration</span><b>5–10 min</b></div>
            </div>
            <div className="section-title payment-heading">
              <strong>Payment method</strong>
              <button>Add new</button>
            </div>
            <button className="payment-card selected">
              <span className="card-brand">VISA</span>
              <span><strong>Visa ending in 4242</strong><small>Expires 09/28</small></span>
              <i><Icon name="check" size={14} /></i>
            </button>
            <button className="payment-card">
              <span className="wallet-mark">G</span>
              <span><strong>Google Pay</strong><small>Fast and secure checkout</small></span>
              <i />
            </button>
            <div className="price-box">
              <span><small>Service fee</small><b>$9.00</b></span>
              <span><small>Tax</small><b>$0.72</b></span>
              <i />
              <span className="total-line"><strong>Total</strong><b>$9.72</b></span>
            </div>
            <div className="payment-action">
              <Button icon="lock" onClick={() => goTo("success")}>Pay $9.72</Button>
              <p><Icon name="shield" size={15} /> Encrypted and secure payment</p>
            </div>
          </Frame>

          <Connector label="Payment success" />

          <Frame id="success" number="08" title="Success">
            <div className="success-screen">
              <Brand />
              <div className="success-visual">
                <span className="success-orbit orbit-one" />
                <span className="success-orbit orbit-two" />
                <div className="success-check"><Icon name="check" size={42} strokeWidth={2.5} /></div>
                <i className="spark s1" /><i className="spark s2" /><i className="spark s3" /><i className="spark s4" />
              </div>
              <div className="center-copy success-copy">
                <span className="pill">BOOKING CONFIRMED</span>
                <h2>You’re all set!</h2>
                <p>Your station expert is ready. Start your Wi-Fi diagnostics whenever you’re ready.</p>
              </div>
              <div className="booking-card">
                <div>
                  <span className="service-icon"><Icon name="wifi" size={20} /></span>
                  <span><strong>Wi-Fi diagnostics</strong><small>Today · Immediate start</small></span>
                </div>
                <div className="booking-id"><span>BOOKING ID</span><b>#MS-24819</b></div>
              </div>
              <div className="success-actions">
                <Button onClick={() => goTo("dashboard")}>Start diagnostics</Button>
                <Button secondary onClick={() => goTo("dashboard")}>Back to home</Button>
              </div>
              <p className="receipt-note"><Icon name="mail" size={16} /> Receipt sent to alex@example.com</p>
            </div>
          </Frame>
        </div>
      </div>
    </main>
  );
}
