const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  'aria-hidden': true,
}

export function StarIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z"
      />
    </svg>
  )
}

export function ChevronLeftIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MenuIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function CloseIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ---------- Соцсети ---------- */

export function FacebookIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46H16.6V4.46A21 21 0 0 0 14.3 4.3c-2.28 0-3.8 1.39-3.8 3.93v2.27H8v3h2.5V21h3z"
      />
    </svg>
  )
}

export function TwitterIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M20 7.2c-.58.26-1.2.43-1.85.51a3.2 3.2 0 0 0 1.42-1.78c-.63.37-1.32.64-2.05.78a3.22 3.22 0 0 0-5.49 2.94A9.14 9.14 0 0 1 5.4 6.28a3.22 3.22 0 0 0 1 4.3 3.2 3.2 0 0 1-1.46-.4v.04c0 1.56 1.11 2.86 2.58 3.16a3.2 3.2 0 0 1-1.45.05 3.22 3.22 0 0 0 3 2.24A6.46 6.46 0 0 1 4.3 17c-.3 0-.6-.02-.9-.05a9.1 9.1 0 0 0 4.93 1.45c5.92 0 9.15-4.9 9.15-9.15v-.42c.63-.45 1.17-1.02 1.6-1.66L20 7.2z"
      />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.2" cy="7.8" r="1" fill="currentColor" />
    </svg>
  )
}

export function LinkedinIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M6.94 8.5H4.5V19h2.44V8.5zM5.72 4.5a1.42 1.42 0 1 0 0 2.84 1.42 1.42 0 0 0 0-2.84zM19.5 13.24c0-2.9-1.55-4.93-4.26-4.93-1.3 0-2.17.71-2.53 1.39h-.04V8.5H10.3V19h2.44v-5.2c0-1.37.26-2.7 1.96-2.7 1.67 0 1.7 1.57 1.7 2.79V19h2.44l.01-5.76z"
      />
    </svg>
  )
}

/* ---------- Иконки преимуществ (промо-блок) ---------- */

export function CardPaymentIcon(props) {
  return (
    <svg {...base} viewBox="0 0 40 40" {...props}>
      <rect x="3" y="9" width="30" height="20" rx="3" fill="#3B82F6" />
      <rect x="3" y="13" width="30" height="4" fill="#1E3A8A" />
      <rect x="7" y="21" width="9" height="3" rx="1" fill="#FACC15" />
      <rect x="10" y="14" width="27" height="18" rx="3" fill="#60A5FA" stroke="#fff" strokeWidth="1.5" />
      <rect x="13" y="25" width="7" height="3" rx="1" fill="#FB923C" />
      <circle cx="31" cy="26.5" r="2" fill="#F87171" />
      <circle cx="33" cy="26.5" r="2" fill="#FBBF24" fillOpacity=".9" />
    </svg>
  )
}

export function MoneyIcon(props) {
  return (
    <svg {...base} viewBox="0 0 40 40" {...props}>
      <rect x="3" y="8" width="28" height="17" rx="2" fill="#16A34A" />
      <rect x="6" y="11" width="22" height="11" rx="1.5" stroke="#BBF7D0" strokeWidth="1.2" />
      <text x="17" y="20" fill="#fff" fontSize="8" fontWeight="700" textAnchor="middle" fontFamily="Arial">
        $
      </text>
      <circle cx="27" cy="27" r="7" fill="#F59E0B" />
      <circle cx="27" cy="27" r="4.6" stroke="#FDE68A" strokeWidth="1.4" />
      <circle cx="33" cy="31" r="5" fill="#FBBF24" />
    </svg>
  )
}

export function ClockIcon(props) {
  return (
    <svg {...base} viewBox="0 0 40 40" {...props}>
      <circle cx="20" cy="20" r="15" fill="#FDE7C8" stroke="#F59E0B" strokeWidth="2.4" />
      <circle cx="20" cy="20" r="11" fill="#fff" />
      <path d="M20 12v8l5 3" stroke="#1C1C28" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="20" r="1.6" fill="#F97316" />
    </svg>
  )
}

/* ---------- Интерфейс ЛК и форм ---------- */

const line = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function ChevronDownIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M6 9l6 6 6-6" {...line} />
    </svg>
  )
}

export function ChevronRightIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M9 6l6 6-6 6" {...line} />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" {...line} strokeWidth="2.6" />
    </svg>
  )
}

export function PlusIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M12 5v14M5 12h14" {...line} strokeWidth="2.6" />
    </svg>
  )
}

export function BellIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 2.5a6 6 0 0 0-6 6v3.6l-1.6 3.2A1 1 0 0 0 5.3 17h13.4a1 1 0 0 0 .9-1.7L18 12.1V8.5a6 6 0 0 0-6-6zM9.5 18.5a2.5 2.5 0 0 0 5 0h-5z"
      />
    </svg>
  )
}

export function ChatIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 3C6.8 3 2.7 6.6 2.7 11c0 2.3 1.1 4.3 2.9 5.8L5 20.6a.6.6 0 0 0 .9.6l3.7-2A10.8 10.8 0 0 0 12 19c5.2 0 9.3-3.6 9.3-8S17.2 3 12 3z"
      />
      <circle cx="8" cy="11" r="1.2" fill="#fff" />
      <circle cx="12" cy="11" r="1.2" fill="#fff" />
      <circle cx="16" cy="11" r="1.2" fill="#fff" />
    </svg>
  )
}

export function SettingsIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M10.3 2h3.4l.5 2.6c.6.2 1.2.5 1.7.9l2.5-.9 1.7 3-2 1.7a7 7 0 0 1 0 1.9l2 1.7-1.7 3-2.5-.9c-.5.4-1.1.7-1.7.9l-.5 2.6h-3.4l-.5-2.6a7 7 0 0 1-1.7-.9l-2.5.9-1.7-3 2-1.7a7 7 0 0 1 0-1.9l-2-1.7 1.7-3 2.5.9c.5-.4 1.1-.7 1.7-.9L10.3 2zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        transform="translate(0 1.5) scale(1 .9)"
      />
    </svg>
  )
}

export function GlobeIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="9" {...line} />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" {...line} />
    </svg>
  )
}

export function TimeIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" />
      <path d="M12 7v5l3 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function EducationIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" {...line} />
    </svg>
  )
}

export function TranslateIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M4 5h9M8.5 3v2M11 5c-1 4-3.5 7-7 9M6.5 9c1.2 2 3 3.6 5 4.5M13 21l4-9 4 9M14.5 18h5" {...line} />
    </svg>
  )
}

export function DocumentIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z" {...line} />
      <path d="M14 3v5h5M9 13h6M9 17h6" {...line} />
    </svg>
  )
}

export function BriefcaseIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" {...line} />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18" {...line} />
    </svg>
  )
}

export function UserIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="8" r="4" {...line} />
      <path d="M4 20.5c1.3-3.8 4.3-5.5 8-5.5s6.7 1.7 8 5.5" {...line} />
    </svg>
  )
}

export function BagIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M5 8h14l-1 12H6L5 8z" {...line} />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" {...line} />
    </svg>
  )
}

export function ListIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" {...line} strokeWidth="2.4" />
    </svg>
  )
}

export function LogoutIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10" {...line} />
    </svg>
  )
}

export function EyeIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" {...line} />
      <circle cx="12" cy="12" r="3" {...line} />
    </svg>
  )
}

export function EyeOffIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path
        d="M10.6 5.1A9.7 9.7 0 0 1 12 5c6 0 9.5 7 9.5 7a17 17 0 0 1-2.4 3.3M6.6 6.6C3.9 8.4 2.5 12 2.5 12s3.5 7 9.5 7c1.8 0 3.3-.6 4.6-1.4M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"
        {...line}
      />
    </svg>
  )
}

export function CameraIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" {...line} />
      <circle cx="12" cy="13" r="3.5" {...line} />
    </svg>
  )
}

export function TrashIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" {...line} />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" {...line} />
      <path d="M4 7l8 6 8-6" {...line} />
    </svg>
  )
}

export function GoogleIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"
      />
      <path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9L6.4 14z" />
      <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6C7.2 7.8 9.4 6 12 6z" />
    </svg>
  )
}

export function DownloadIcon(props) {
  return (
    <svg {...base} viewBox="0 0 24 24" {...props}>
      <path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="currentColor" />
      <path d="M12 9v7m-3-3l3 3 3-3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
