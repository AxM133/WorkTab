import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark hover:shadow-glow-primary',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  secondary: 'bg-lavender text-primary hover:bg-lavender-dark',
  soft: 'bg-lavender text-violet hover:bg-lavender-dark',
  dark: 'bg-ink text-white hover:bg-ink/85',
  accent: 'bg-accent text-white hover:bg-accent-dark hover:shadow-glow-accent',
  violet: 'bg-violet text-white hover:bg-violet-dark hover:shadow-glow-violet',
}

const sizes = {
  sm: 'h-8 px-5 text-xs',
  md: 'h-10 px-7 text-sm',
  lg: 'h-14 px-10 text-lg',
}

export function Button({ variant = 'primary', size = 'md', fullWidth, loading, className, children, ...rest }) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,scale] duration-200 active:scale-[0.97]',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    loading && 'pointer-events-none',
    className,
  )

  if (rest.to !== undefined) {
    const { to, ...linkProps } = rest
    return (
      <Link to={to} className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  const { type = 'button', disabled, ...buttonProps } = rest
  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading} {...buttonProps}>
      {loading && <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
      {children}
    </button>
  )
}
