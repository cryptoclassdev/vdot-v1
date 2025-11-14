"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export default function MukulPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-border bg-background">
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="relative inline-block">
              <div className="h-5 w-5 rounded bg-brand-navy" />
            </span>
            <div className="h-5 w-5 rounded bg-brand-cyan" />
            <div className="h-5 w-5 rounded bg-brand-orange" />
          </Link>

          <Button
            variant="outline"
            className="rounded-3xl font-bold bg-transparent text-sm py-2"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
      </header>

      <section className="flex h-[calc(100vh-60px)] items-center justify-center px-4">
        <div className="mx-auto w-full max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Team member photo */}
            <div className="aspect-square w-full max-w-md mx-auto overflow-hidden rounded-3xl shadow-2xl">
              <img src="/team/Mukul-DP.png" alt="The Intern" className="h-full w-full object-cover" />
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-4xl font-bold text-foreground lg:text-5xl">The Intern</h1>
              <p className="mb-6 text-xl font-semibold text-muted-foreground lg:text-2xl">Content Creator</p>
              <p className="mb-6 text-base text-foreground">
                The intern keeps validator.com plugged into Solana's culture and Crypto Twitter. Mixing research,
                creativity, and humor, into content you want to keep up to date with.
              </p>

              {/* Contact information */}
              <div className="space-y-3">
                <h2 className="mb-3 text-xl font-bold text-foreground">Contact</h2>

                <a
                  href="https://www.reddit.com/user/The-Intern-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                >
                  <MessageSquare className="h-5 w-5 text-brand-cyan" />
                  <span className="font-medium text-foreground">u/The-Intern-</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
