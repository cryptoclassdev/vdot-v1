"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Twitter } from "lucide-react"

export default function HFPPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="h-5 w-5 rounded bg-brand-navy" />
            <div className="h-5 w-5 rounded bg-brand-cyan" />
            <div className="h-5 w-5 rounded bg-brand-orange" />
          </Link>

          <Button
            variant="outline"
            className="rounded-3xl bg-transparent text-sm font-bold"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-6 lg:py-8">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-6 overflow-hidden rounded-3xl bg-white shadow-2xl lg:grid-cols-2 lg:gap-0">
            <div className="relative aspect-square overflow-hidden lg:aspect-auto">
              <img src="/images/design-mode/hfp-pfp.png" alt="HFP" className="h-full w-full object-cover" />
            </div>

            <div className="flex flex-col justify-center p-6 lg:p-8 xl:p-10">
              <h1 className="mb-1 text-3xl font-bold text-foreground lg:text-4xl">HFP</h1>
              <p className="mb-6 text-lg font-semibold text-muted-foreground lg:text-xl">Founder</p>

              {/* Contact information */}
              <div className="space-y-3">
                <h2 className="mb-3 text-xl font-bold text-foreground">Contact</h2>

                <a
                  href="https://x.com/degenHFP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                >
                  <Twitter className="h-5 w-5 text-brand-cyan" />
                  <span className="font-medium text-foreground">@degenHFP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
