import { Link } from 'react-router-dom'
import { InfoLink } from '@/components/info/InfoLink'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from '@/components/icons'
import { Container } from '@/components/ui'
import { FOOTER_COLUMNS } from '@/constants/navigation'

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com', Icon: FacebookIcon },
  { label: 'Twitter', href: 'https://twitter.com', Icon: TwitterIcon },
  { label: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: LinkedinIcon },
]

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-lavender pt-12 pb-8 md:pt-16">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-base font-bold md:text-lg">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {/* пункты «О проекте» открывают информационные окна поверх страницы */}
                    {link.info ? (
                      <InfoLink
                        doc={link.info}
                        className="inline-block text-xs text-body transition-[color,translate] duration-200 hover:translate-x-1 hover:text-primary"
                      >
                        {link.label}
                      </InfoLink>
                    ) : (
                      <Link
                        to={link.to}
                        className="inline-block text-xs text-body transition-[color,translate] duration-200 hover:translate-x-1 hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-5 text-base font-bold md:text-lg">Follow</h3>
            <ul className="flex flex-wrap gap-4">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full bg-ink text-white transition-[background-color,translate,box-shadow] duration-300 ease-spring hover:-translate-y-1 hover:bg-primary hover:shadow-glow-primary"
                  >
                    <Icon className="size-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 text-center text-xs text-ink md:mt-16">
          Copyright @ {CURRENT_YEAR} &nbsp;|&nbsp; WorkTap – Worktap.KZ. All Rights Reserved
        </p>
      </Container>
    </footer>
  )
}
