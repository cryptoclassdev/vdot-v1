import Link from "next/link"

type NavItem = {
  label: string
  href: string
  external?: boolean
}

const navItems: NavItem[] = [
  { label: "Stake", href: "/#staking" },
  { label: "Calculator", href: "/#rewards" },
  { label: "Team", href: "/#team" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "https://docs.validator.com/", external: true },
]

const navLinkBase =
  "rounded-sm text-base font-medium text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"

const navLinkActive = "underline decoration-brand-orange decoration-2 underline-offset-8"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

interface SiteHeaderProps {
  /** Route path for current-page highlighting. Blog detail routes should pass "/blog". */
  currentPath?: string
}

export function SiteHeader({ currentPath }: SiteHeaderProps = {}) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="flex items-center justify-between px-4 py-4 lg:px-8">
        <Link
          href="/"
          aria-label="validator.com home"
          className={`flex items-center gap-1 rounded-sm ${focusRing}`}
        >
          <div className="h-6 w-6 rounded bg-brand-navy" />
          <div className="h-6 w-6 rounded bg-brand-cyan" />
          <div className="h-6 w-6 rounded bg-brand-orange" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isCurrent = currentPath === item.href || (item.href === "/blog" && !!currentPath?.startsWith("/blog"))
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-current={isCurrent ? "page" : undefined}
                className={`${navLinkBase} ${isCurrent ? navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/#staking"
          className={`rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange-hover md:text-base ${focusRing}`}
        >
          Stake Now
        </Link>
      </div>
    </header>
  )
}
