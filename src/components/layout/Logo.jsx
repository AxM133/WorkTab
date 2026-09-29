import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/cn'

export function Logo({ className }) {
  return (
    <Link to={ROUTES.home} className={cn('flex items-center gap-1.5', className)} aria-label="WorkTap — на главную">
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-[13px] font-extrabold tracking-tight text-white md:size-9">
        WT
      </span>
      <span className="text-2xl font-bold tracking-tight md:text-[28px]">worktap</span>
    </Link>
  )
}
