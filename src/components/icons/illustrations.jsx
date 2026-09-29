/* Линейные иллюстрации для блока «Как решать задачи» и модалки «Как это работает» */

const stroke = {
  stroke: '#1C1C28',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function ChooseServiceIllustration(props) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden {...props}>
      <path d="M26 22a14 14 0 0 1 28 0v10c0 3-2 5-5 6H31c-3-1-5-3-5-6V22z" fill="#1C1C28" />
      <circle cx="40" cy="26" r="10" fill="#FFD1A9" {...stroke} />
      <path d="M36 28c2 2 6 2 8 0" {...stroke} />
      <path d="M22 60V52c0-6 6-10 18-10s18 4 18 10v8" fill="#FF9B45" {...stroke} />
      <rect x="18" y="54" width="44" height="14" rx="2" fill="#fff" {...stroke} />
      <circle cx="40" cy="61" r="2" fill="#FF9B45" />
      <path d="M10 70h60" {...stroke} />
    </svg>
  )
}

export function PaymentIllustration(props) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden {...props}>
      <rect x="28" y="10" width="42" height="24" rx="2" fill="#1DBF73" {...stroke} />
      <circle cx="49" cy="22" r="6" fill="#fff" {...stroke} />
      <path d="M49 19v6M47 20.5c0-1 4-1.5 4 0s-4 1.5-4 3 4 1 4 0" stroke="#1C1C28" strokeWidth="1.2" />
      <path d="M8 14l14 2 8 8-4 6-10-4" fill="#fff" {...stroke} />
      <path d="M8 14v12l8 2" {...stroke} />
      <rect x="4" y="12" width="6" height="18" fill="#FFD1A9" {...stroke} />
      <path d="M30 58c6-2 10-2 16 0l14-6c3-1 6 2 3 5L46 68H18" fill="#fff" {...stroke} />
      <path d="M18 50h12c3 0 4 4 0 5h-8" {...stroke} />
      <rect x="8" y="48" width="10" height="22" fill="#FF9B45" {...stroke} />
    </svg>
  )
}

export function ResultIllustration(props) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden {...props}>
      <rect x="22" y="6" width="36" height="46" rx="2" fill="#FF9B45" {...stroke} />
      <rect x="26" y="10" width="28" height="38" fill="#FFD1A9" {...stroke} />
      <path d="M31 18h18M31 24h18M31 30h18M31 36h12" {...stroke} />
      <path d="M8 40h64v30H8z" fill="#fff" {...stroke} />
      <path d="M8 40l8-8h48l8 8" fill="#fff" {...stroke} />
      <rect x="30" y="48" width="20" height="8" rx="2" fill="#1DBF73" {...stroke} />
      <path d="M14 62h52" {...stroke} />
    </svg>
  )
}
