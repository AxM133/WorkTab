import { useState } from 'react'
import { cn } from '@/lib/cn'

export function SearchBar({
  placeholder = 'Что нужно сделать?',
  buttonLabel = 'Найти',
  defaultValue = '',
  onSearch,
  className,
}) {
  const [query, setQuery] = useState(defaultValue)

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch?.(query.trim())
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        'flex h-14 w-full items-center rounded-full bg-lavender ring-primary/25 transition-[background-color,box-shadow] duration-300 focus-within:bg-white focus-within:shadow-soft focus-within:ring-2',
        className,
      )}
    >
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-full min-w-0 flex-1 bg-transparent pl-5 text-sm text-ink outline-none placeholder:text-muted md:pl-6"
      />
      <button
        type="submit"
        className="h-full shrink-0 rounded-full bg-accent px-7 text-sm font-semibold text-white transition-[background-color,box-shadow,scale] duration-200 hover:bg-accent-dark hover:shadow-glow-accent active:scale-95 md:px-10"
      >
        {buttonLabel}
      </button>
    </form>
  )
}
