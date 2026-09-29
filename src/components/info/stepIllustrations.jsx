/* Плоские иллюстрации шагов для окна «Как это работает» */

const INK = '#2f2e41'
const SKIN = '#f3b6a6'
const GREEN = '#1dbf73'
const LILAC = '#cfcbe9'
const LINE = '#d6d6e3'

// SVG-элементы с CSS-анимацией трансформируются относительно собственного центра
const bob = 'animate-bob [transform-box:fill-box] origin-center'

/** Мужчина в костюме, стоит. (x, y) — точка между ступнями */
function Man({ x, y, holding = false }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="1" rx="22" ry="3.5" fill="#ececf3" />
      <path d="M-10 -62 -12 -5h8l3-44 3 44h8l-1-57z" fill={INK} />
      <path d="M-15 -5h12v5h-14zM3 -5h12l2 5H3z" fill={INK} />
      <path d="M-16 -110q16-7 32 0l-2 50h-28z" fill={INK} />
      <path d="M-5 -113 0 -94l5-19z" fill="#fff" />
      <path d="M-1.5 -108h3l1 14-2.5 3-2.5-3z" fill={GREEN} />
      {holding ? (
        <>
          <path d="M-16 -108-24 -82l16 6 3-6-10-4 4-18z" fill={INK} />
          <path d="M16 -108l8 26-16 6-3-6 10-4-4-18z" fill={INK} />
        </>
      ) : (
        <>
          <path d="M-16 -108-22 -70h6l5-34z" fill={INK} />
          <path d="M16 -108l6 38h-6l-5-34z" fill={INK} />
          <circle cx="-19" cy="-67" r="3.5" fill={SKIN} />
          <circle cx="19" cy="-67" r="3.5" fill={SKIN} />
        </>
      )}
      <rect x="-3.5" y="-118" width="7" height="7" fill={SKIN} />
      <circle cx="0" cy="-126" r="10" fill={SKIN} />
      <path d="M-10.5-127a10.5 10.5 0 0 1 21 0q-5-5-11-4.5-6 .5-10 4.5z" fill={INK} />
    </g>
  )
}

function Leaf({ x, y }) {
  return (
    <path
      transform={`translate(${x} ${y})`}
      d="M0 0c-2-10 3-18 11-21-1 9-4 16-11 21zm0 0c1-6 4-11 9-15"
      fill="#e9e8f2"
      stroke="#cfcde0"
      strokeWidth="1"
    />
  )
}

export function CategoryIllustration(props) {
  const icons = [
    { angle: -90, glyph: <path d="M-3.5-5h5l3 3v7h-8z" fill="#fff" /> },
    {
      angle: -18,
      glyph: <path d="M-5 5 1-1m1-4a3 3 0 1 0 3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />,
    },
    {
      angle: 54,
      glyph: <path d="M-4 4c0-5 3-9 8-9 0 5-4 8-9 8zm-2 2 3-3" stroke="#fff" strokeWidth="1.8" fill="none" />,
    },
    {
      angle: 126,
      glyph: <path d="M-4 5V0m3 5v-8m3 8v-5m3 5v-3" stroke="#fff" strokeWidth="2" strokeLinecap="round" />,
    },
    {
      angle: 198,
      glyph: <path d="M-5-2h9l-3-3m3 8h-9l3 3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
    },
  ]

  return (
    <svg viewBox="0 0 300 180" fill="none" aria-hidden {...props}>
      <circle cx="90" cy="92" r="56" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 5" />
      {icons.map(({ angle, glyph }, index) => {
        const rad = (angle * Math.PI) / 180
        return (
          <g key={angle} transform={`translate(${90 + 56 * Math.cos(rad)} ${92 + 56 * Math.sin(rad)})`}>
            <g className={bob} style={{ animationDelay: `${index * -0.7}s` }}>
              <circle r="13" fill={GREEN} />
              {glyph}
            </g>
          </g>
        )
      })}
      <Man x={232} y={172} />
    </svg>
  )
}

export function SpecialistIllustration(props) {
  return (
    <svg viewBox="0 0 300 180" fill="none" aria-hidden {...props}>
      <rect x="6" y="6" width="204" height="104" fill="#e9e9ef" />
      <rect x="6" y="6" width="204" height="9" fill={GREEN} />
      <circle cx="12" cy="10.5" r="1.3" fill="#fff" />
      <circle cx="17" cy="10.5" r="1.3" fill="#fff" />
      <circle cx="22" cy="10.5" r="1.3" fill="#fff" />
      <rect x="12" y="20" width="192" height="84" fill="#fff" />
      <circle cx="50" cy="48" r="17" fill={INK} />
      <circle cx="50" cy="43" r="5.5" fill="#fff" />
      <path d="M40 57a10 10 0 0 1 20 0z" fill="#fff" />
      <rect x="32" y="72" width="36" height="3" fill={INK} />
      <rect x="37" y="79" width="26" height="2.5" fill={INK} />
      {[30, 42, 54, 66, 78].map((y, index) => (
        <g key={y} className={bob} style={{ animationDelay: `${index * -0.5}s` }}>
          <rect x="112" y={y} width="3" height="3" fill={index % 2 ? '#c9c9d6' : GREEN} />
          <rect x="122" y={y} width={index % 2 ? 36 : 44} height="3" fill={index % 2 ? '#dcdce6' : GREEN} />
        </g>
      ))}
      <rect x="122" y="36" width="30" height="2" fill="#e5e5ec" />
      <rect x="122" y="60" width="26" height="2" fill="#e5e5ec" />
      <path d="M70 176h160" stroke={LINE} />
      <Leaf x={78} y={176} />
      <Man x={198} y={176} />
    </svg>
  )
}

export function PaymentIllustration(props) {
  return (
    <svg viewBox="0 0 300 180" fill="none" aria-hidden {...props}>
      <path d="M100 100a58 58 0 1 1 55 58" stroke={LINE} strokeWidth="1.5" strokeDasharray="4 5" />
      <g transform="translate(0 4)">
        {[0, 7, 14].map((offset) => (
          <ellipse key={offset} cx="60" cy={166 - offset} rx="25" ry="6" fill={offset % 14 ? '#3d3c52' : INK} />
        ))}
        <rect x="35" y="138" width="50" height="22" fill={INK} />
        <ellipse cx="60" cy="138" rx="25" ry="6" fill="#3d3c52" />
      </g>
      <g className={bob}>
        <circle cx="60" cy="112" r="22" fill={INK} />
        <text x="60" y="121" textAnchor="middle" fontSize="24" fontFamily="Arial" fill={GREEN}>
          $
        </text>
      </g>
      <Man x={168} y={172} holding />
      <g className={bob} style={{ animationDelay: '-1.2s' }}>
        <rect x="130" y="86" width="78" height="46" rx="5" fill={LILAC} />
        <rect x="186" y="116" width="14" height="9" rx="1.5" fill="#fff" />
        <path d="M142 110h10" stroke="#9c97c6" strokeWidth="2" />
      </g>
      <path d="M0 176h300" stroke={INK} strokeWidth="1" />
      <Leaf x={236} y={176} />
    </svg>
  )
}

export function WorkIllustration(props) {
  return (
    <svg viewBox="0 0 300 180" fill="none" aria-hidden {...props}>
      <path
        d="M36 44c10-38 70-40 124-30 40 7 94 2 118 36 22 32 4 78 18 108H0c10-34 22-70 36-114z"
        fill={GREEN}
        opacity=".1"
        className="animate-bob [transform-box:fill-box] origin-center [animation-duration:6s]"
      />
      {/* девушка */}
      <path d="M150 12c-24 0-36 22-32 48 3 20-8 40 4 58h58c10-20-4-36 0-58 4-26-6-48-30-48z" fill="#454463" />
      <path d="M140 60c0-14 6-24 16-24s16 10 16 24-7 24-16 24-16-10-16-24z" fill={SKIN} />
      <path d="M140 52c2-16 26-22 34-4-12-2-22-2-34 4z" fill="#454463" />
      <path d="M128 150c-4-40 8-62 28-62s32 22 28 62z" fill={GREEN} />
      <path d="M146 92l10 16 10-16z" fill="#fff" />
      <path d="M130 120c-6 12-2 20 10 22l24 2 2-8-22-6 4-18z" fill={GREEN} />
      <circle cx="132" cy="84" r="5" fill={SKIN} />
      <path d="M134 86l-2 30" stroke={GREEN} strokeWidth="8" strokeLinecap="round" />
      {/* стол и ноутбук */}
      <path d="M50 150h244l-6 12H44z" fill={INK} />
      <path d="M200 106l52-6-8 48h-56z" fill={INK} className={bob} />
      <circle cx="222" cy="126" r="2" fill="#6b6a86" />
      <path d="M170 150h84" stroke="#454463" strokeWidth="3" />
      {/* растения */}
      <rect x="62" y="132" width="18" height="18" fill={GREEN} />
      <path d="M71 132V96" stroke={GREEN} strokeWidth="2" />
      {[100, 110, 120].map((cy, index) => (
        <ellipse key={cy} cx={index % 2 ? 76 : 66} cy={cy} rx="6" ry="4" fill={GREEN} className={bob} />
      ))}
      <rect x="92" y="136" width="12" height="14" fill={INK} />
      <path d="M98 136v-18m0 6-7-5m7 1 7-5" stroke={GREEN} strokeWidth="2" />
    </svg>
  )
}
