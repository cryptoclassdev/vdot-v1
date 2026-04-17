import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"

type ContactChannel = "Email" | "Telegram" | "X" | "Discord"

interface ContactEntry {
  channel: ContactChannel
  label: string
  href: string
}

interface ContactGroup {
  eyebrow: string
  title: string
  description?: string
  channels: ContactEntry[]
}

const groups: ContactGroup[] = [
  {
    eyebrow: "Business development",
    title: "Institutional, partnerships, and treasury inquiries",
    description: "Direct line to the business team for delegations, validator partnerships, and operational questions from desks and custodians.",
    channels: [
      { channel: "Email", label: "dan@validator.com", href: "mailto:dan@validator.com" },
    ],
  },
  {
    eyebrow: "General support",
    title: "Everything else",
    description: "Questions about staking, unstaking, MEV, rewards, or the site itself.",
    channels: [
      { channel: "Email", label: "support@validator.com", href: "mailto:support@validator.com" },
      { channel: "X", label: "DM @validator_com", href: "https://twitter.com/validator_com" },
      { channel: "Discord", label: "Open a ticket in Discord", href: "https://discord.com/invite/eCJSb8PspY" },
    ],
  },
  {
    eyebrow: "Sebastian Montgomery",
    title: "General Manager — direct line",
    description: "For media, speaking, or anything that needs a founder-adjacent response.",
    channels: [
      { channel: "Email", label: "seb@validator.com", href: "mailto:seb@validator.com" },
      { channel: "Telegram", label: "@SebMontgomery", href: "https://t.me/SebMontgomery" },
    ],
  },
]

const isExternalChannel = (channel: ContactChannel) => channel !== "Email"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-1">
            <div className="h-6 w-6 rounded bg-brand-navy" />
            <div className="h-6 w-6 rounded bg-brand-cyan" />
            <div className="h-6 w-6 rounded bg-brand-orange" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/#staking"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Stake
            </Link>
            <Link
              href="/#rewards"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Calculator
            </Link>
            <Link
              href="/#team"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Team
            </Link>
            <Link
              href="/blog"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Blog
            </Link>
            <Link
              href="https://docs.validator.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Docs
            </Link>
          </nav>

          <Link
            href="/#staking"
            className="rounded-3xl bg-brand-orange px-6 py-2 font-bold text-white shadow-2xl transition-colors hover:bg-brand-orange-hover"
          >
            Stake Now
          </Link>
        </div>
      </header>

      <main className="px-4 py-16 md:px-8 md:py-24 lg:px-15">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Contact
          </p>
          <h1 className="mt-3 break-words text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            How to reach the team.
          </h1>
          <p className="mt-6 max-w-prose text-base text-muted-foreground md:text-lg">
            Validator.com is operated by a small team. These are the direct channels — pick the one
            that matches why you&rsquo;re writing and we&rsquo;ll get back to you.
          </p>

          <div className="mt-16 space-y-16 md:mt-20 md:space-y-20">
            {groups.map((group) => (
              <section
                key={group.title}
                className="border-t border-border pt-12 md:pt-16"
                aria-labelledby={`group-${group.eyebrow}`}
              >
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {group.eyebrow}
                </p>
                <h2
                  id={`group-${group.eyebrow}`}
                  className="mt-3 text-2xl font-bold leading-tight text-foreground md:text-3xl"
                >
                  {group.title}
                </h2>
                {group.description && (
                  <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
                    {group.description}
                  </p>
                )}

                <ul className="mt-8">
                  {group.channels.map((channel) => {
                    const external = isExternalChannel(channel.channel)
                    return (
                      <li key={channel.href} className="border-t border-border">
                        <a
                          href={channel.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="group flex items-center justify-between py-4 text-foreground transition-colors hover:text-brand-orange"
                        >
                          <span className="text-sm font-medium md:text-base">{channel.label}</span>
                          <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground">
                            {channel.channel}
                          </span>
                        </a>
                      </li>
                    )
                  })}
                  <li className="border-t border-border" aria-hidden="true" />
                </ul>
              </section>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
