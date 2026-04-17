import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"

export default function SecurityPage() {
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
            Security
          </p>
          <h1 className="mt-3 break-words text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Where validator.com runs, and how we keep it running.
          </h1>
          <p className="mt-6 max-w-prose text-base text-muted-foreground md:text-lg">
            Validator infrastructure lives in two physically secured data centres in different
            regions, with automatic failover. Here is who operates each site and what they guarantee.
          </p>

          <section className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Primary · Oslo, Norway
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
              ServeTheWorld
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
              Our primary validator partner. Our hardware is hosted in their high-security data centre
              in Oslo under Norwegian jurisdiction.
            </p>

            <dl className="mt-8 grid gap-y-5">
              <div className="border-t border-border pt-5">
                <dt className="text-sm font-semibold text-foreground md:text-base">
                  24/7 staffed access control
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  Security personnel on site around the clock.
                </dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt className="text-sm font-semibold text-foreground md:text-base">
                  Biometric facial recognition entry
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  Combined with secured entry perimeters across the facility.
                </dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt className="text-sm font-semibold text-foreground md:text-base">
                  Redundant power and environmental controls
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  Dual power feeds, UPS plus generator backup, fire suppression, and HVAC.
                </dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt className="text-sm font-semibold text-foreground md:text-base">
                  Controlled physical access under Norwegian law
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  Strong location security and data-protection standards.
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
            <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Failover · Singapore
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Latitude.sh
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground md:text-lg">
              Secondary hardware hosted with Latitude.sh in Singapore. Provides global redundancy and
              fail-over capacity if the Oslo site is affected.
            </p>

            <dl className="mt-8 grid gap-y-5">
              <div className="border-t border-border pt-5">
                <dt className="text-sm font-semibold text-foreground md:text-base">
                  Globally distributed data-centre network
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  Including the Singapore presence, for rapid deployment and high reliability.
                </dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt className="text-sm font-semibold text-foreground md:text-base">
                  Information security governance
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  Their &ldquo;Security at Latitude.sh&rdquo; policy covers confidentiality,
                  integrity, and availability for staff, partners, and hardware.
                </dd>
              </div>
              <div className="border-t border-border pt-5">
                <dt className="text-sm font-semibold text-foreground md:text-base">
                  Infrastructure built for secure workloads
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground md:text-base">
                  Private networking, DDoS protection, and network isolation support.
                </dd>
              </div>
            </dl>
          </section>

          <p className="mt-20 max-w-prose border-t border-border pt-8 text-sm text-muted-foreground md:text-base">
            Questions about our operational security?{" "}
            <Link
              href="/contact"
              className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Contact the team
            </Link>
            .
          </p>
        </article>
      </main>

      <Footer />
    </div>
  )
}
