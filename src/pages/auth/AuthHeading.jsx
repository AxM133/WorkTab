export function AuthHeading({ title, subtitle }) {
  return (
    <div className="mb-8 animate-fade-up">
      <h1 className="text-2xl leading-tight font-bold md:text-[32px]">{title}</h1>
      {subtitle && <p className="mt-3 text-sm text-body md:text-base">{subtitle}</p>}
    </div>
  )
}
