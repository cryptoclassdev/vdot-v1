"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Twitter } from "lucide-react"

export default function DanPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-3 lg:px-8">
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
              <img src="/images/design-mode/dan-pfp.png" alt="Dan Phillips" className="h-full w-full object-cover" />
            </div>

            <div className="flex flex-col justify-center p-6 lg:p-8 xl:p-10">
              <h1 className="mb-1 text-3xl font-bold text-foreground lg:text-4xl">Dan Phillips</h1>
              <p className="mb-6 text-lg font-semibold text-muted-foreground lg:text-xl">Business Developer</p>

              <div className="space-y-3">
                <h2 className="mb-3 text-xl font-bold text-foreground">Contact</h2>

                <a
                  href="mailto:dan@validator.com"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                >
                  <Mail className="h-5 w-5 text-brand-orange" />
                  <span className="font-medium text-foreground">dan@validator.com</span>
                </a>

                <a
                  href="https://x.com/L_Earnings"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                >
                  <Twitter className="h-5 w-5 text-brand-cyan" />
                  <span className="font-medium text-foreground">@L_Earnings</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/ddphillipsptuk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                >
                  <svg className="h-5 w-5 text-brand-navy" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="font-medium text-foreground">LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
