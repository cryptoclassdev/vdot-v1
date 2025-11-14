"use client"
import { Mail, Twitter, MessageCircle, Send, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Back to Home Button */}
      <div className="px-4 py-6 md:px-8 lg:px-16">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-[#FF6B35] md:text-base"
        >
          <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          Back
        </button>
      </div>

      {/* Hero Section */}
      <section className="px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
            Contact Information
          </h1>
        </div>
      </section>

      {/* Contact Sections */}
      <section className="px-4 pb-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-8 md:space-y-12">
          {/* Business Development & Institutional Inquiries */}
          <div className="rounded-2xl border-2 border-[#1E3A5F] bg-white p-6 shadow-lg md:p-8 lg:p-10">
            <h2 className="mb-4 text-2xl font-bold text-[#1E3A5F] md:text-3xl lg:text-4xl">
              Business Development & Institutional Inquiries
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-base font-medium text-gray-700 md:text-lg">Email:</span>
              <a
                href="mailto:dan@validator.com"
                className="inline-flex items-center gap-2 text-base font-bold text-[#FF6B35] transition-colors hover:text-[#e55a2a] md:text-lg"
              >
                <Mail className="h-5 w-5" />
                dan@validator.com
              </a>
            </div>
          </div>

          {/* General Support */}
          <div className="rounded-2xl border-2 border-[#00BCD4] bg-white p-6 shadow-lg md:p-8 lg:p-10">
            <h2 className="mb-4 text-2xl font-bold text-[#00BCD4] md:text-3xl lg:text-4xl">General Support</h2>
            <div className="space-y-4">
              {/* Email */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-base font-medium text-gray-700 md:text-lg">Email:</span>
                <a
                  href="mailto:support@validator.com"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#00BCD4] transition-colors hover:text-[#00a5bb] md:text-lg"
                >
                  <Mail className="h-5 w-5" />
                  support@validator.com
                </a>
              </div>

              {/* DM us on X */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="https://twitter.com/validator_com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#00BCD4] transition-colors hover:text-[#00a5bb] md:text-lg"
                >
                  <Twitter className="h-5 w-5" />
                  DM us on X
                </a>
              </div>

              {/* Open a ticket in our Discord */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="https://discord.com/invite/eCJSb8PspY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#00BCD4] transition-colors hover:text-[#00a5bb] md:text-lg"
                >
                  <MessageCircle className="h-5 w-5" />
                  Open a ticket in our Discord
                </a>
              </div>
            </div>
          </div>

          {/* Sebastian Montgomery */}
          <div className="rounded-2xl border-2 border-[#FF6B35] bg-white p-6 shadow-lg md:p-8 lg:p-10">
            <h2 className="mb-4 text-2xl font-bold text-[#FF6B35] md:text-3xl lg:text-4xl">Sebastian Montgomery</h2>
            <div className="space-y-4">
              {/* Telegram */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-base font-medium text-gray-700 md:text-lg">Telegram:</span>
                <a
                  href="https://t.me/SebMontgomery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#FF6B35] transition-colors hover:text-[#e55a2a] md:text-lg"
                >
                  <Send className="h-5 w-5" />
                  @SebMontgomery
                </a>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <span className="text-base font-medium text-gray-700 md:text-lg">Email:</span>
                <a
                  href="mailto:seb@validator.com"
                  className="inline-flex items-center gap-2 text-base font-bold text-[#FF6B35] transition-colors hover:text-[#e55a2a] md:text-lg"
                >
                  <Mail className="h-5 w-5" />
                  seb@validator.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
