import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"

type ContactPlatform = "Twitter" | "Email" | "LinkedIn" | "Reddit"

export interface TeamMemberContact {
  platform: ContactPlatform
  label: string
  href: string
}

export interface TeamMemberBioProps {
  name: string
  role: string
  bio?: string
  image: {
    src: string
    alt: string
  }
  contacts: TeamMemberContact[]
}

const isExternalContact = (platform: ContactPlatform) => platform !== "Email"

export function TeamMemberBio({ name, role, bio, image, contacts }: TeamMemberBioProps) {
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
        <article className="mx-auto max-w-5xl">
          <Link
            href="/#team"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to team
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-20">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:rounded-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="lg:pt-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {role}
              </p>
              <h1 className="mt-3 break-words text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {name}
              </h1>

              {bio && (
                <p className="mt-8 max-w-prose text-base leading-relaxed text-foreground md:text-lg">
                  {bio}
                </p>
              )}

              {contacts.length > 0 && (
                <div className="mt-14">
                  <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    Contact
                  </p>
                  <ul className="mt-4">
                    {contacts.map((contact) => {
                      const external = isExternalContact(contact.platform)
                      return (
                        <li key={contact.href} className="border-t border-border">
                          <a
                            href={contact.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                            className="group flex items-center justify-between py-4 text-foreground transition-colors hover:text-brand-orange"
                          >
                            <span className="text-sm font-medium md:text-base">{contact.label}</span>
                            <span className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-foreground">
                              {contact.platform}
                            </span>
                          </a>
                        </li>
                      )
                    })}
                    <li className="border-t border-border" aria-hidden="true" />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
