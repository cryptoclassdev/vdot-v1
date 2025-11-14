"use client"

import { ArrowLeft, Shield, Server, Lock } from "lucide-react"
import { Footer } from "@/components/Footer"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
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
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-10 w-10 text-[#1E3A5F] md:h-12 md:w-12 lg:h-14 lg:w-14" />
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl xl:text-6xl">
              What on-site security does validator.com use?
            </h1>
          </div>
        </div>
      </section>

      {/* Security Sections */}
      <section className="px-4 pb-16 md:px-8 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-8 md:space-y-12">
          {/* ServeTheWorld - Oslo, Norway */}
          <div className="rounded-2xl border-2 border-[#1E3A5F] bg-white p-6 shadow-lg md:p-8 lg:p-10">
            <div className="mb-6 flex items-start gap-4">
              <Server className="mt-1 h-8 w-8 flex-shrink-0 text-[#1E3A5F] md:h-10 md:w-10" />
              <div>
                <h2 className="mb-2 text-2xl font-bold text-[#1E3A5F] md:text-3xl lg:text-4xl">
                  ServeTheWorld - Oslo, Norway
                </h2>
                <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                  We use ServeTheWorld as our primary validator partner, with our hardware hosted in their high-security
                  data centre in Oslo, Norway.
                </p>
              </div>
            </div>

            <div className="space-y-3 pl-0 md:pl-14">
              <h3 className="mb-4 text-lg font-semibold text-[#1E3A5F] md:text-xl">They provide:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-5 w-5 flex-shrink-0 text-[#1E3A5F]" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    24/7 staffed access control and on-site security personnel
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-5 w-5 flex-shrink-0 text-[#1E3A5F]" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    Biometric access (facial recognition) plus secured entry perimeters
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-5 w-5 flex-shrink-0 text-[#1E3A5F]" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    Redundant power (dual feeds, UPS & generator backup) and environmental controls (fire suppression,
                    HVAC)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-5 w-5 flex-shrink-0 text-[#1E3A5F]" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    Controlled physical access and strong location security under Norwegian law
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Latitude.sh - Singapore */}
          <div className="rounded-2xl border-2 border-[#00BCD4] bg-white p-6 shadow-lg md:p-8 lg:p-10">
            <div className="mb-6 flex items-start gap-4">
              <Server className="mt-1 h-8 w-8 flex-shrink-0 text-[#00BCD4] md:h-10 md:w-10" />
              <div>
                <h2 className="mb-2 text-2xl font-bold text-[#00BCD4] md:text-3xl lg:text-4xl">
                  Latitude.sh - Singapore
                </h2>
                <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                  As a backup we also host hardware with Latitude.sh in Singapore, ensuring global redundancy and
                  fail-over capability.
                </p>
              </div>
            </div>

            <div className="space-y-3 pl-0 md:pl-14">
              <h3 className="mb-4 text-lg font-semibold text-[#00BCD4] md:text-xl">The Latitude.sh site offers:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-5 w-5 flex-shrink-0 text-[#00BCD4]" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    A globally distributed data-centre network (including Singapore) allowing rapid deployment and high
                    reliability
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-5 w-5 flex-shrink-0 text-[#00BCD4]" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    Strong physical security policies — their "Security at Latitude.sh" documentation outlines robust
                    information security governance (confidentiality, integrity, availability) for staff, partners, and
                    hardware
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="mt-1 h-5 w-5 flex-shrink-0 text-[#00BCD4]" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg">
                    Infrastructure built for secure workloads: private networking options, DDoS protection and network
                    isolation support
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
