"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Footer } from "@/components/Footer"
import { SiteHeader } from "@/components/SiteHeader"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LazyLoadVideo } from "@/components/LazyLoadVideo"
import { CountUp } from "@/components/motion/CountUp"
import { blobAssets } from "@/lib/assets"

export default function Home() {
  const router = useRouter()
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [activeLinkCard, setActiveLinkCard] = useState<string | null>(null)
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<"phantom" | "solflare" | "backpack">("phantom")
  const [solAmount, setSolAmount] = useState(100)

  const walletVideos = {
    phantom: blobAssets.phantomVideo,
    solflare: blobAssets.solflareVideo,
    backpack: blobAssets.backpackVideo,
  }

  const [validatorData, setValidatorData] = useState<{
    activeStake: number
    apy: number
    commission: number
    uptime: number
  }>({
    activeStake: 510181, // Reference values; replaced by live Stakewiz data on mount.
    apy: 8.2,
    commission: 5,
    uptime: 100,
  })
  const [validatorDataStatus, setValidatorDataStatus] = useState<"loading" | "live" | "fallback">("loading")
  const [validatorDataUpdatedAt, setValidatorDataUpdatedAt] = useState<Date | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchValidatorData = async () => {
      try {
        const response = await fetch(
          "https://api.stakewiz.com/validator/Va1idkzkB6LEmVFmxWbWU8Ao9qehC62Tjmf68L3uYKj",
          { signal: controller.signal },
        )
        if (!response.ok) throw new Error(`stakewiz responded ${response.status}`)
        const data = await response.json()

        if (typeof data.activated_stake === "number" && typeof data.total_apy === "number") {
          setValidatorData({
            activeStake: Math.round(data.activated_stake),
            apy: Number.parseFloat(data.total_apy.toFixed(1)),
            commission: typeof data.commission === "number" ? data.commission : 5,
            uptime: typeof data.uptime === "number" ? Number.parseFloat(data.uptime.toFixed(2)) : 100,
          })
          setValidatorDataStatus("live")
          setValidatorDataUpdatedAt(new Date())
        } else {
          setValidatorDataStatus("fallback")
        }
      } catch (error) {
        if ((error as { name?: string }).name === "AbortError") return
        console.error("Failed to fetch validator data from stakewiz:", error)
        setValidatorDataStatus("fallback")
      }
    }

    fetchValidatorData()
    return () => controller.abort()
  }, [])

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US")
  }

  const handleCardTap = (cardId: string) => {
    setActiveCard(activeCard === cardId ? null : cardId)
  }

  const handleOutsideTap = () => {
    setActiveCard(null)
  }

  const handleLinkCardTap = (cardId: string) => {
    setActiveLinkCard(activeLinkCard === cardId ? null : cardId)
  }

  const handleLinkOutsideTap = () => {
    setActiveLinkCard(null)
  }

  const MAX_SOL_INPUT = 10_000_000 // Hard ceiling far beyond any realistic personal delegation

  const handleSolInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, "")
    if (raw === "") {
      setSolAmount(0)
      return
    }
    const parsed = Number.parseFloat(raw)
    if (Number.isNaN(parsed)) {
      // Non-numeric input — restore the DOM to the current valid state so the user sees their typo auto-revert
      e.target.value = formatNumber(solAmount)
      return
    }
    // Clamp to [0, MAX]. Negative inputs snap to 0; excessive inputs snap to ceiling.
    setSolAmount(Math.max(0, Math.min(parsed, MAX_SOL_INPUT)))
  }

  const calculateYearlyRewards = () => {
    return ((solAmount * validatorData.apy) / 100).toFixed(2)
  }

  const validatorDataStatusLabel: Record<typeof validatorDataStatus, string> = {
    live: "Live",
    fallback: "Cached",
    loading: "Syncing",
  }
  const validatorDataStatusSentence: Record<typeof validatorDataStatus, string> = {
    live: "Data refreshed on each visit from ",
    fallback: "Reference values shown; live data temporarily unavailable from ",
    loading: "Fetching current data from ",
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader currentPath="/" />

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-20 md:px-8 lg:px-15">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center space-y-8">
            <div
              data-reveal
              className="flex items-center gap-3"
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <div className="h-20 w-20 rounded-2xl bg-brand-navy sm:h-24 sm:w-24 md:h-28 md:w-28" />
              <div className="h-20 w-20 rounded-2xl bg-brand-cyan sm:h-24 sm:w-24 md:h-28 md:w-28" />
              <div className="h-20 w-20 rounded-2xl bg-brand-orange sm:h-24 sm:w-24 md:h-28 md:w-28" />
            </div>

            <div className="w-full space-y-5 text-center lg:text-left">
              <h1
                data-reveal
                style={{ ["--reveal-delay" as string]: "120ms" }}
                className="whitespace-nowrap text-5xl font-bold leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5rem]"
              >
                validator.com
              </h1>
              <p
                data-reveal
                style={{ ["--reveal-delay" as string]: "260ms" }}
                className="mx-auto max-w-xl text-lg font-medium text-muted-foreground sm:text-xl md:text-2xl lg:mx-0"
              >
                A Solana validator. Operated transparently since 2022.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src={blobAssets.phantomScreenshot}
                alt="validator.com delegation interface inside a Solana mobile wallet"
                width={448}
                height={896}
                sizes="(max-width: 448px) 100vw, 448px"
                className="h-auto w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Editorial stat strip — replaces the three full-bleed stat monoliths and the
          glitter/highlighter tagline. Data wears a suit, not a costume. */}
      <section
        aria-labelledby="stats-heading"
        className="relative bg-background px-4 py-24 md:px-8 md:py-32 lg:px-15"
      >
        <div className="mx-auto max-w-7xl">
          <p
            id="stats-heading"
            className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground"
          >
            The validator, by the numbers
          </p>

          <dl className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-16 xl:grid-cols-4">
            <div>
              <dt className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Active stake
              </dt>
              <dd className="mt-3 flex items-baseline gap-1.5 text-4xl font-bold tabular-nums leading-none text-foreground md:text-5xl lg:text-6xl">
                <CountUp
                  value={validatorData.activeStake}
                  format={(n) => formatNumber(Math.round(n))}
                />
                <span className="text-lg font-medium text-muted-foreground md:text-xl lg:text-2xl">
                  SOL
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Annual yield
              </dt>
              <dd className="mt-3 flex items-baseline gap-1.5 text-4xl font-bold tabular-nums leading-none text-foreground md:text-5xl lg:text-6xl">
                <CountUp value={validatorData.apy} format={(n) => n.toFixed(1)} />
                <span className="text-lg font-medium text-muted-foreground md:text-xl lg:text-2xl">
                  %
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Commission
              </dt>
              <dd className="mt-3 flex items-baseline gap-1.5 text-4xl font-bold tabular-nums leading-none text-foreground md:text-5xl lg:text-6xl">
                <CountUp value={validatorData.commission} format={(n) => Math.round(n).toString()} />
                <span className="text-lg font-medium text-muted-foreground md:text-xl lg:text-2xl">
                  %
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Uptime
              </dt>
              <dd className="mt-3 flex items-baseline gap-1.5 text-4xl font-bold tabular-nums leading-none text-foreground md:text-5xl lg:text-6xl">
                <CountUp value={validatorData.uptime} format={(n) => n.toFixed(1)} />
                <span className="text-lg font-medium text-muted-foreground md:text-xl lg:text-2xl">
                  %
                </span>
              </dd>
            </div>
          </dl>

          <p
            className="mt-16 max-w-prose text-sm text-muted-foreground md:text-base"
            aria-live="polite"
            role="status"
          >
            <span
              className="mr-2 inline-flex items-center gap-1.5 align-middle text-[0.7rem] font-medium uppercase tracking-[0.14em]"
              aria-label={`Data status: ${validatorDataStatus}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  validatorDataStatus === "live"
                    ? "bg-brand-orange"
                    : validatorDataStatus === "fallback"
                      ? "bg-muted-foreground"
                      : "bg-muted-foreground/50 animate-pulse"
                }`}
                aria-hidden="true"
              />
              {validatorDataStatusLabel[validatorDataStatus]}
            </span>
            {validatorDataStatusSentence[validatorDataStatus]}
            <a
              href="https://stakewiz.com/validator/Va1idkzkB6LEmVFmxWbWU8Ao9qehC62Tjmf68L3uYKj"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              stakewiz.com
            </a>
            . Validator operating on Solana since 2022.
          </p>
        </div>
      </section>

      {/* The Team section with Pinterest/bento-style layout */}
      <section
        id="team"
        className="relative flex min-h-screen items-center justify-center bg-background px-6 py-20 md:px-8 lg:px-15"
        onClick={handleOutsideTap}
      >
        <div className="mx-auto w-full max-w-[2188px]">
          <div className="mb-16 max-w-3xl md:mb-20 lg:mb-24">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              The team
            </p>
            <h2 className="mt-3 break-words text-4xl font-bold leading-[1.05] text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
              Built by operators who run Solana every day.
            </h2>
            <p className="mt-6 max-w-prose text-base text-muted-foreground md:text-lg">
              Education, operations, and content. Here to help the ecosystem.
            </p>
          </div>

          {/* Mobile: 2-column Pinterest layout */}
          <div
            className={`group flex flex-row gap-4 overflow-hidden px-4 py-8 sm:hidden ${activeCard ? "[&>*>*]:scale-[0.65]" : ""}`}
          >
            {/* Column 1 - 3 cards */}
            <div className="flex flex-1 flex-col gap-4">
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  if (activeCard === "mobile-hfp") {
                    // Second tap - navigate
                    router.push("/team/hfp")
                  } else {
                    // First tap - show overlay
                    handleCardTap("mobile-hfp")
                  }
                }}
                className={`group/card relative aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-300 origin-center cursor-pointer ${
                  activeCard === "mobile-hfp" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                }`}
              >
                <Image
                  src="/team/HFP-DP.png"
                  alt="Team Member"
                  fill
                  sizes="(max-width: 640px) 33vw, 25vw"
                  className={`object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-hfp" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-hfp" ? "opacity-100" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 py-2 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-hfp" ? "opacity-100" : ""
                  }`}
                >
                  <h3 className="mb-1 text-sm font-bold leading-tight text-white">HFP</h3>
                  <p className="mb-1.5 text-[10px] font-semibold leading-tight text-white/90">Founder</p>
                  <p className="line-clamp-3 text-[8px] leading-snug text-white/80">
                    A 17-year branding leader, HFP identified Bitcoin's potential early and, by 2021, recognized
                    Solana's capacity to deliver real-world decentralization. His strategic direction established
                    validator.com's brand and continues to guide its long-term positioning.
                  </p>
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  if (activeCard === "mobile-sebastian") {
                    // Second tap - navigate
                    router.push("/team/seb")
                  } else {
                    // First tap - show overlay
                    handleCardTap("mobile-sebastian")
                  }
                }}
                className={`group/card relative aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-300 origin-center cursor-pointer ${
                  activeCard === "mobile-sebastian" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                }`}
              >
                <Image
                  src="/team/Seb-DP.png"
                  alt="Team Member"
                  fill
                  sizes="(max-width: 640px) 33vw, 25vw"
                  className={`object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-sebastian" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-sebastian" ? "opacity-100" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 py-2 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-sebastian" ? "opacity-100" : ""
                  }`}
                >
                  <h3 className="mb-1 text-sm font-bold leading-tight text-white">Sebastian Montgomery</h3>
                  <p className="mb-1.5 text-[10px] font-semibold leading-tight text-white/90">General Manager</p>
                  <p className="line-clamp-3 text-[8px] leading-snug text-white/80">
                    Sebastian started the validator in mid-2022 and leads its growth, operations, and content strategy.
                    A prominent voice in the Solana ecosystem, he has produced more than 1,000 educational videos and
                    continues to drive the vision for the next 1,000 — advancing global understanding of decentralized
                    infrastructure and validator.com
                  </p>
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  if (activeCard === "mobile-dan") {
                    // Second tap - navigate
                    router.push("/team/dan")
                  } else {
                    // First tap - show overlay
                    handleCardTap("mobile-dan")
                  }
                }}
                className={`group/card relative aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-300 origin-center cursor-pointer ${
                  activeCard === "mobile-dan" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                }`}
              >
                <Image
                  src="/team/Dan-DP.png"
                  alt="Team Member"
                  fill
                  sizes="(max-width: 640px) 33vw, 25vw"
                  className={`object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-dan" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-dan" ? "opacity-100" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 py-2 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-dan" ? "opacity-100" : ""
                  }`}
                >
                  <h3 className="mb-1 text-sm font-bold leading-tight text-white">Dan Phillips</h3>
                  <p className="mb-1.5 text-[10px] font-semibold leading-tight text-white/90">Business Developer</p>
                  <p className="line-clamp-3 text-[8px] leading-snug text-white/80">
                    Dan is a seasoned professional dedicated to building at the intersection of traditional business and
                    Web3. He holds a Bachelor's degree in Economics and has a strong background in consulting and sales,
                    having worked as an alumnus of industry-leading firms including KPMG, Oracle, and HubSpot.
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2 - 3 cards with staggered top margin */}
            <div className="flex flex-1 flex-col gap-4">
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardTap("mobile-mukul")
                }}
                className={`group/card relative mt-12 aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-300 origin-center ${
                  activeCard === "mobile-mukul" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                }`}
              >
                <Image
                  src="/team/Mukul-DP.png"
                  alt="Team Member"
                  fill
                  sizes="(max-width: 640px) 33vw, 25vw"
                  className={`object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-mukul" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-mukul" ? "opacity-100" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 py-2 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-mukul" ? "opacity-100" : ""
                  }`}
                >
                  <h3 className="mb-1 text-sm font-bold leading-tight text-white">The Intern</h3>
                  <p className="line-clamp-3 text-[8px] leading-snug text-white/80">
                    The intern keeps validator.com plugged into Solana's culture and Crypto Twitter. Mixing research,
                    creativity, and humor, into content you want to keep up to date with.
                  </p>
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardTap("mobile-pedro")
                }}
                className={`group/card relative aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-300 origin-center ${
                  activeCard === "mobile-pedro" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                }`}
              >
                <Image
                  src="/team/pedro.png"
                  alt="Team Member"
                  fill
                  sizes="(max-width: 640px) 33vw, 25vw"
                  className={`object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-pedro" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-pedro" ? "opacity-100" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 py-2 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-pedro" ? "opacity-100" : ""
                  }`}
                >
                  <h3 className="mb-1 text-sm font-bold leading-tight text-white">Pedro</h3>
                  <p className="mb-1.5 text-[10px] font-semibold leading-tight text-white/90">Lead Editor & Artist</p>
                  <p className="line-clamp-3 text-[8px] leading-snug text-white/80">
                    Pedro leads the creative production at validator.com, crafting visually engaging content that
                    informs, inspires, and connects with audiences. His work focuses on expanding the reach of
                    validator.com and driving broader awareness and adoption of the Solana ecosystem through high-impact
                    storytelling and design.
                  </p>
                </div>
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation()
                  handleCardTap("mobile-chris")
                }}
                className={`group/card relative aspect-square overflow-hidden rounded-2xl shadow-xl transition-all duration-300 origin-center ${
                  activeCard === "mobile-chris" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                }`}
              >
                <Image
                  src="/team/Chris-DP.png"
                  alt="Team Member"
                  fill
                  sizes="(max-width: 640px) 33vw, 25vw"
                  className={`object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-chris" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-chris" ? "opacity-100" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center px-2 py-2 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
                    activeCard === "mobile-chris" ? "opacity-100" : ""
                  }`}
                >
                  <h3 className="mb-1 text-sm font-bold leading-tight text-white">Chris</h3>
                  <p className="mb-1.5 text-[10px] font-semibold leading-tight text-white/90">Lead Researcher</p>
                  <p className="line-clamp-2 text-[8px] leading-snug text-white/80">
                    Steers our content research, breaking Solana updates into plain, useful takeaways.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop: 4-column Pinterest layout */}
          <div className="group hidden sm:flex sm:flex-row sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
            {/* Column 1 - 1 card with top margin */}
            <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
              <Link href="/team/hfp" className="cursor-pointer">
                <div className="group/card relative mt-16 aspect-square transform-gpu overflow-hidden rounded-2xl shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/card:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 md:mt-20 lg:mt-24 xl:mt-28 2xl:hover:!scale-[1.35]">
                  <Image
                    src="/team/HFP-DP.png"
                    alt="hfp-dp"
                    fill
                    sizes="25vw"
                    className="object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 md:p-5 lg:p-6">
                    <h3 className="mb-1.5 text-xl font-bold text-white md:text-2xl lg:text-2xl">HFP</h3>
                    <p className="mb-2 text-base font-semibold text-white/90 md:text-lg lg:text-lg">Founder</p>
                    <p className="break-words text-xs leading-snug text-white/80 md:text-sm lg:text-sm">
                      A 17-year branding leader, HFP identified Bitcoin's potential early and, by 2021, recognized
                      Solana's capacity to deliver real-world decentralization. His strategic direction established
                      validator.com's brand and continues to guide its long-term positioning.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Column 2 - 2 cards */}
            <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
              <Link href="/team/seb" className="cursor-pointer">
                <div className="group/card relative aspect-square transform-gpu overflow-hidden rounded-2xl shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/card:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]">
                  <Image
                    src="/team/Seb-DP.png"
                    alt="seb-dp"
                    fill
                    sizes="25vw"
                    className="object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 md:p-5 lg:p-6">
                    <h3 className="mb-1.5 text-xl font-bold text-white md:text-2xl lg:text-2xl">
                      Sebastian Montgomery
                    </h3>
                    <p className="mb-2 text-base font-semibold text-white/90 md:text-lg lg:text-lg">General Manager</p>
                    <p className="break-words text-xs leading-snug text-white/80 md:text-sm lg:text-sm">
                      Sebastian started the validator in mid-2022 and leads its growth, operations, and content
                      strategy. A prominent voice in the Solana ecosystem, he has produced more than 1,000 educational
                      videos and continues to drive the vision for the next 1,000 — advancing global understanding of
                      decentralized infrastructure and validator.com
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/team/dan" className="cursor-pointer">
                <div className="group/card relative aspect-square transform-gpu overflow-hidden rounded-2xl shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/card:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]">
                  <Image
                    src="/team/Dan-DP.png"
                    alt="dan-dp"
                    fill
                    sizes="25vw"
                    className="object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 md:p-5 lg:p-6">
                    <h3 className="mb-1.5 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl">
                      Dan Phillips
                    </h3>
                    <p className="mb-2 text-base font-semibold text-white/90 md:text-lg lg:text-lg">
                      Business Developer
                    </p>
                    <p className="break-words text-xs leading-snug text-white/80 md:text-sm lg:text-sm">
                      Dan is a seasoned professional dedicated to building at the intersection of traditional business
                      and Web3. He holds a Bachelor's degree in Economics and has a strong background in consulting and
                      sales, having worked as an alumnus of industry-leading firms including KPMG, Oracle, and HubSpot.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Column 3 - 2 cards with top margin on first */}
            <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
              <Link href="/team/mukul" className="cursor-pointer">
                <div className="group/card relative mt-12 aspect-square transform-gpu overflow-hidden rounded-2xl shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/card:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 md:mt-16 lg:mt-20 xl:mt-24 2xl:hover:!scale-[1.35]">
                  <Image
                    src="/team/Mukul-DP.png"
                    alt="mukul-dp"
                    fill
                    sizes="25vw"
                    className="object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                  <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 md:p-5 lg:p-6">
                    <h3 className="mb-1.5 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl">
                      The Intern
                    </h3>
                    <p className="break-words text-xs leading-snug text-white/80 md:text-sm lg:text-sm">
                      The intern keeps validator.com plugged into Solana's culture and Crypto Twitter. Mixing research,
                      creativity, and humor, into content you want to keep up to date with.
                    </p>
                  </div>
                </div>
              </Link>
              <Link href="/team/pedro" className="cursor-pointer">
                <div className="group/card relative aspect-square transform-gpu overflow-hidden rounded-2xl shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/card:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]">
                  <Image
                    src="/team/pedro.png"
                    alt="pedro-dp"
                    fill
                    sizes="25vw"
                    className="object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                  <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 md:p-5 lg:p-6">
                    <h3 className="mb-1.5 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl">
                      Pedro
                    </h3>
                    <p className="mb-2 text-base font-semibold text-white/90 md:text-lg lg:text-lg">
                      Lead Editor & Artist
                    </p>
                    <p className="break-words text-xs leading-snug text-white/80 md:text-sm lg:text-sm">
                      Pedro leads the creative production at validator.com, crafting visually engaging content that
                      informs, inspires, and connects with audiences. His work focuses on expanding the reach of
                      validator.com and driving broader awareness and adoption of the Solana ecosystem through
                      high-impact storytelling and design.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Column 4 - 1 card */}
            <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
              <Link href="/team/chris" className="cursor-pointer">
                <div className="group/card relative mt-36 aspect-square transform-gpu overflow-hidden rounded-2xl shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/card:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]">
                  <Image
                    src="/team/Chris-DP.png"
                    alt="chris-dp"
                    fill
                    sizes="25vw"
                    className="object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-surface-dark/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 md:p-5 lg:p-6">
                    <h3 className="mb-1.5 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl">
                      Chris
                    </h3>
                    <p className="mb-2 text-base font-semibold text-white/90 md:text-lg lg:text-lg">Lead Researcher</p>
                    <p className="break-words text-xs leading-snug text-white/80 md:text-sm lg:text-sm">
                      Steers our content research, breaking Solana updates into plain, useful takeaways.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Delegate in one click section */}
      <section
        id="staking"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted px-4 py-20 md:px-8 lg:px-15"
      >
        <div className="relative mx-auto h-full w-full max-w-[2188px] sm:h-screen">
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex flex-col items-center justify-start pt-8 sm:hidden">
            <div className="mb-2 text-center">
              <h2 className="mb-2 whitespace-nowrap text-3xl font-bold text-foreground">Delegate in one click</h2>
            </div>

            {/* Subheading and Dropdown */}
            <div className="text-center">
              <p className="mb-3 break-words text-sm font-medium text-muted-foreground">
                Your coins. Your custody. Your rewards.
              </p>

              <div className="flex justify-center">
                <div className="relative">
                  <Button
                    onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                    className="bg-brand-orange rounded-full px-4 py-3 text-xs font-semibold text-white shadow-lg hover:bg-brand-orange-hover flex items-center gap-2"
                  >
                    {selectedWallet.charAt(0).toUpperCase() + selectedWallet.slice(1)}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isWalletDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {/* Wallet Dropdown Menu */}
                  {isWalletDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-[240px] rounded-2xl bg-card shadow-2xl border border-border overflow-hidden z-50">
                      {/* Phantom */}
                      <button
                        onClick={() => {
                          setSelectedWallet("phantom")
                          setIsWalletDropdownOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-accent transition-colors border-b border-border"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                          <Image
                            src="/images/design-mode/Phantom-Icon_App_60x60.png"
                            alt="Phantom"
                            width={40}
                            height={40}
                            sizes="40px"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span className="text-base font-bold text-gray-900">Phantom</span>
                      </button>

                      {/* Solflare */}
                      <button
                        onClick={() => {
                          setSelectedWallet("solflare")
                          setIsWalletDropdownOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-accent transition-colors border-b border-border"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                          <Image
                            src="/images/design-mode/solflare-icon.svg"
                            alt="Solflare"
                            width={40}
                            height={40}
                            sizes="40px"
                            unoptimized
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="text-base font-bold text-gray-900">Solflare</span>
                      </button>

                      {/* Backpack */}
                      <button
                        onClick={() => {
                          setSelectedWallet("backpack")
                          setIsWalletDropdownOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-accent transition-colors border-b border-border"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                          <Image
                            src="/images/design-mode/backpack-icon.png"
                            alt="Backpack"
                            width={40}
                            height={40}
                            sizes="40px"
                            className="h-full w-full object-contain p-1.5"
                          />
                        </div>
                        <span className="text-base font-bold text-gray-900">Backpack</span>
                      </button>

                      {/* Ledger - commented out for now */}
                      {/* <button
                        onClick={() => setIsWalletDropdownOpen(false)}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-amber-50 transition-colors"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                          <img
                            src="/images/design-mode/led.png"
                            alt="Ledger"
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="text-base font-bold text-gray-900">Ledger</span>
                      </button> */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Device mockup - Centered */}
            <div className="mb-8 flex justify-center">
              <div className="relative h-[280px] w-[150px] rounded-[40px]">
                <LazyLoadVideo
                  src={walletVideos[selectedWallet]}
                  alt={`${selectedWallet} wallet staking interface`}
                  className="h-full w-full"
                  poster="/images/design-mode/5-phantom%201.png"
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout - Absolute Positioning */}
          {/* Device mockup - left side */}
          <div className="hidden sm:block absolute left-[5%] top-1/2 z-10 -translate-y-1/2 sm:left-[8%] md:left-[6%] lg:left-[8%] xl:left-[10%] 2xl:left-[12%]">
            <div className="relative h-[450px] w-[240px] sm:h-[450px] sm:w-[240px] md:h-[550px] md:w-[290px] lg:h-[650px] lg:w-[340px] xl:h-[750px] xl:w-[390px] 2xl:h-[850px] 2xl:w-[440px]">
              <LazyLoadVideo
                src={walletVideos[selectedWallet]}
                alt={`${selectedWallet} wallet staking interface`}
                className="h-full w-full"
                poster="/images/design-mode/5-phantom%201.png"
              />
            </div>
          </div>

          {/* Content - right side */}
          <div className="hidden sm:block absolute right-[5%] z-20 max-w-[320px] sm:right-[8%] sm:top-[22%] sm:max-w-[320px] md:right-[6%] md:top-[22%] md:max-w-[400px] lg:right-[8%] lg:top-[20%] lg:max-w-[480px] xl:right-[10%] xl:top-[18%] xl:max-w-[560px] 2xl:right-[12%] 2xl:top-[20%] 2xl:max-w-[640px]">
            <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
              <div className="flex-1 text-right">
                {/* Heading - stays in white area */}
                <h2 className="mb-2 whitespace-nowrap text-3xl font-bold text-foreground sm:mb-2 sm:text-3xl md:mb-2 md:text-4xl lg:mb-4 lg:text-5xl xl:mb-4 xl:text-6xl 2xl:mb-4 2xl:text-7xl">
                  Delegate in one click
                </h2>

                <p className="mb-3 mt-12 break-words text-sm font-medium text-muted-foreground sm:mb-4 sm:mt-2 sm:text-sm sm:font-bold sm:text-white md:mt-0 md:text-base md:text-white lg:mb-5 lg:mt-2 lg:text-lg lg:text-white xl:mb-2 xl:mt-4 xl:text-xl xl:text-white 2xl:mt-4 2xl:text-2xl 2xl:text-white">
                  Your coins. Your custody. Your rewards.
                </p>

                <div className="flex justify-end">
                  <div className="relative">
                    <Button
                      onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                      className="bg-brand-orange rounded-full px-4 py-3 text-xs font-semibold text-white shadow-lg hover:bg-brand-orange-hover sm:px-4 sm:py-3 sm:text-xs md:px-6 md:py-4 md:text-sm lg:px-8 lg:py-5 lg:text-xl 2xl:px-12 2xl:py-7 2xl:text-xl flex items-center gap-2"
                    >
                      {selectedWallet.charAt(0).toUpperCase() + selectedWallet.slice(1)}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isWalletDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </Button>

                    {/* Wallet Dropdown Menu */}
                    {isWalletDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-[240px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px] rounded-2xl bg-card shadow-2xl border border-border overflow-hidden z-50">
                        {/* Phantom */}
                        <button
                          onClick={() => {
                            setSelectedWallet("phantom")
                            setIsWalletDropdownOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-5 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 hover:bg-accent transition-colors border-b border-border"
                        >
                          <div className="flex h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg overflow-hidden">
                            <Image
                              src="/images/design-mode/Phantom-Icon_App_60x60.png"
                              alt="Phantom"
                              width={48}
                              height={48}
                              sizes="48px"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-base sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                            Phantom
                          </span>
                        </button>

                        {/* Solflare */}
                        <button
                          onClick={() => {
                            setSelectedWallet("solflare")
                            setIsWalletDropdownOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-5 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 hover:bg-accent transition-colors border-b border-border"
                        >
                          <div className="flex h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg overflow-hidden">
                            <Image
                              src="/images/design-mode/solflare-icon.svg"
                              alt="Solflare"
                              width={48}
                              height={48}
                              sizes="48px"
                              unoptimized
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="text-base sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                            Solflare
                          </span>
                        </button>

                        {/* Backpack */}
                        <button
                          onClick={() => {
                            setSelectedWallet("backpack")
                            setIsWalletDropdownOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-5 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 hover:bg-accent transition-colors border-b border-border"
                        >
                          <div className="flex h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg overflow-hidden">
                            <Image
                              src="/images/design-mode/backpack-icon.png"
                              alt="Backpack"
                              width={48}
                              height={48}
                              sizes="48px"
                              className="h-full w-full object-contain p-1.5 sm:p-1.5 md:p-2"
                            />
                          </div>
                          <span className="text-base sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                            Backpack
                          </span>
                        </button>

                        {/* Ledger - commented out for now */}
                        {/* <button
                          onClick={() => setIsWalletDropdownOpen(false)}
                          className="w-full flex items-center gap-3 px-5 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 hover:bg-amber-50 transition-colors"
                        >
                          <div className="flex h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg overflow-hidden">
                            <img
                              src="/images/design-mode/led.png"
                              alt="Ledger"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="text-base sm:text-base md:text-lg lg:text-xl font-bold text-gray-900">
                            Ledger
                          </span>
                        </button>*/}
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Staking calculator — editorial treatment, no orange wrap or nuclear-lime pill */}
      <section
        id="rewards"
        aria-labelledby="calculator-heading"
        className="relative bg-background px-4 py-24 md:px-8 md:py-32 lg:px-15"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Your rewards
          </p>
          <h2
            id="calculator-heading"
            className="mt-3 max-w-3xl break-words text-4xl font-bold leading-[1.05] text-foreground md:text-6xl lg:text-7xl"
          >
            See what staking with us earns you.
          </h2>
          <p className="mt-6 max-w-prose text-base text-muted-foreground md:text-lg">
            Based on the current {validatorData.apy}% APY. Rewards compound every epoch — roughly every two days.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
            <div>
              <label
                htmlFor="sol-amount"
                className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              >
                Your stake
              </label>
              <div className="mt-3 flex items-baseline gap-1.5">
                <input
                  id="sol-amount"
                  type="text"
                  inputMode="decimal"
                  value={formatNumber(solAmount)}
                  onChange={handleSolInputChange}
                  className="w-full min-w-0 max-w-[6ch] border-b-2 border-transparent bg-transparent pb-1 text-4xl font-bold tabular-nums leading-none text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-orange md:text-5xl lg:text-6xl"
                  placeholder="100"
                  aria-label="Amount of SOL to stake"
                />
                <span className="text-xl font-medium text-muted-foreground md:text-2xl lg:text-3xl">
                  SOL
                </span>
              </div>
            </div>

            <div>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Annual yield
              </p>
              <p className="mt-3 flex items-baseline gap-1.5 text-4xl font-bold tabular-nums leading-none text-foreground md:text-5xl lg:text-6xl">
                {validatorData.apy}
                <span className="text-lg font-medium text-muted-foreground md:text-xl lg:text-2xl">
                  %
                </span>
              </p>
            </div>

            <div>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Yearly rewards
              </p>
              <p className="mt-3 flex items-baseline gap-1.5 text-4xl font-bold tabular-nums leading-none text-foreground md:text-5xl lg:text-6xl">
                {calculateYearlyRewards()}
                <span className="text-lg font-medium text-muted-foreground md:text-xl lg:text-2xl">
                  SOL
                </span>
              </p>
            </div>
          </div>

          <p className="mt-16 max-w-prose text-xs text-muted-foreground md:text-sm">
            5% commission on staking rewards. 8% on Jito MEV earnings. No hidden fees.
          </p>
        </div>
      </section>

      {/* Support and FAQ Section */}
      <section id="support" className="relative bg-background">
        {/* FAQ Section */}
        <div className="bg-muted px-4 py-24 md:px-8 md:py-28 lg:px-15">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Questions
            </p>
            <h2 className="mb-12 text-4xl font-bold leading-[1.05] text-foreground md:mb-16 md:text-5xl lg:text-6xl">
              Everything else you might ask.
            </h2>

            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="item-1" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What is staking?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Staking is the process of locking up your SOL tokens to help secure the Solana network and earn
                  rewards in return. When you stake with validator.com, your tokens remain in your wallet while
                  supporting network operations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Does the earned SOL compound?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Yes, your staking rewards automatically compound. The rewards you earn are added to your staked
                  balance, which means you'll earn rewards on your rewards over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="rounded-lg bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Is staking my SOL safe?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Your SOL never leaves your wallet. Delegating assigns voting rights to the validator; the validator
                  cannot move or spend your tokens. Solana also has no slashing, so your stake cannot be penalized
                  away. You can unstake at any time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Why should I stake with validator.com?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  validator.com offers competitive APY rates, reliable uptime, transparent fee structure, and excellent
                  customer support. We're committed to helping the Solana ecosystem grow while maximizing your staking
                  rewards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How long is my SOL locked up for?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Your SOL is not permanently locked. You can unstake at any time, but there is a cooldown period of
                  approximately 2-3 days (one epoch) before your tokens become available for withdrawal.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Where can I see my rewards?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  You can view your staking rewards directly in your wallet or through our dashboard. Rewards are
                  distributed at the end of each epoch (approximately every 2-3 days).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How do I Unstake?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  To unstake, simply use your wallet's unstaking function or our dashboard. After initiating the unstake
                  process, your SOL will be available after the cooldown period of one epoch (2-3 days).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What does rent reserve mean?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Rent reserve is a small amount of SOL (typically 0.00203928 SOL) that must remain in your stake
                  account to keep it active on the Solana blockchain. This amount is returned to you when you close the
                  stake account.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What is MEV?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  MEV (Maximal Extractable Value) refers to additional rewards that validators can earn by optimizing
                  transaction ordering. With JITO MEV, you can earn extra rewards on top of your regular staking
                  rewards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How much MEV do I get?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  MEV rewards vary based on network activity and transaction volume. On average, MEV can add an
                  additional 0.5-2% to your annual staking rewards, though this can fluctuate.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How do I claim MEV?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  MEV rewards are automatically distributed to your wallet along with your regular staking rewards. You
                  don't need to take any additional action to claim them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What on-site security does validator.com use?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  We employ enterprise-grade security measures including encrypted connections, DDoS protection,
                  multi-signature wallets, and regular security audits. Our infrastructure is monitored 24/7 to ensure
                  maximum uptime and security.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Can slashing take my SOL?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  No, Solana does not have slashing. Unlike some other proof-of-stake networks, your staked SOL cannot
                  be taken away as a penalty. Your tokens are always safe in your wallet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-14" className="rounded-lg border border-border bg-card px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How can I download a report of my earnings?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  You can download detailed earnings reports from our dashboard. These reports include all your staking
                  rewards, MEV earnings, and transaction history for tax and record-keeping purposes.
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
