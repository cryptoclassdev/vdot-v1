"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Search, Users, Handshake, Shield, Calculator, ChevronDown } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LazyLoadVideo } from "@/components/LazyLoadVideo"

export default function Home() {
  const router = useRouter()
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [activeLinkCard, setActiveLinkCard] = useState<string | null>(null)
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<"phantom" | "solflare" | "backpack">("phantom")
  const [solAmount, setSolAmount] = useState(100)

  const walletVideos = {
    phantom: "https://res.cloudinary.com/di6zkr8of/video/upload/v1763801836/phantom-video_pbwzom.mp4",
    solflare: "https://res.cloudinary.com/di6zkr8of/video/upload/v1763801829/solflare-video_wlhnsu.mp4",
    backpack: "https://res.cloudinary.com/di6zkr8of/video/upload/v1763801833/backpack-video_isfydc.mp4",
  }

  const [validatorData, setValidatorData] = useState<{
    activeStake: number
    apy: number
  }>({
    activeStake: 510181, // Fallback value
    apy: 8.2, // Fallback value
  })

  useEffect(() => {
    const fetchValidatorData = async () => {
      try {
        const response = await fetch("https://api.stakewiz.com/validator/Va1idkzkB6LEmVFmxWbWU8Ao9qehC62Tjmf68L3uYKj")
        const data = await response.json()

        if (data.activated_stake && data.total_apy) {
          setValidatorData({
            activeStake: Math.round(data.activated_stake),
            apy: Number.parseFloat(data.total_apy.toFixed(1)),
          })
        }
      } catch (error) {
        console.error("Failed to fetch validator data:", error)
        // Keep fallback values on error
      }
    }

    fetchValidatorData()
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

  const handleSolInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "") // Remove commas for parsing
    const numValue = Number.parseFloat(value)

    if (!isNaN(numValue) && numValue >= 0) {
      setSolAmount(numValue)
    } else if (value === "") {
      setSolAmount(0)
    }
  }

  const calculateYearlyRewards = () => {
    return ((solAmount * validatorData.apy) / 100).toFixed(2)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-border bg-background">
        <div className="flex items-center justify-between px-4 py-4 lg:px-8">
          {/* Logo - Using semantic brand color tokens */}
          <Link href="/" className="flex items-center gap-1">
            <span className="relative inline-block">
              <div className="h-6 w-6 rounded bg-brand-navy" />
            </span>
            <div className="h-6 w-6 rounded bg-brand-cyan" />
            <div className="h-6 w-6 rounded bg-brand-orange" />
          </Link>

          {/* Navigation Links - Using semantic text colors */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#link-hub"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Link Hub
            </Link>
            <Link
              href="#rewards"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Rewards
            </Link>
            <Link
              href="#staking"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Tutorials
            </Link>
            <Link
              href="#team"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              About
            </Link>
            <Link
              href="https://cryptoclass.mintlify.app/"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Support
            </Link>
            <Link
              href="/blog"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Blog
            </Link>
          </nav>

          {/* CTA Button - Using brand orange token */}
          <Link
            href="#staking"
            onClick={(e) => {
              e.preventDefault()
              const stakingSection = document.getElementById("staking")
              if (stakingSection) {
                stakingSection.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <Button className="bg-brand-orange rounded-3xl font-bold shadow-2xl text-white hover:bg-brand-orange-hover">
              Stake Now
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-20 md:px-8 lg:px-15">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Brand elements and text */}
          <div className="flex flex-col items-center space-y-8">
            {/* Three colored squares logo */}
            <div className="flex items-center gap-3">
              <span className="relative inline-block">
                <div className="h-20 w-20 rounded-2xl bg-brand-navy sm:h-24 sm:w-24 md:h-28 md:w-28" />
              </span>
              <div className="h-20 w-20 rounded-2xl bg-brand-cyan sm:h-24 sm:w-24 md:h-28 md:w-28" />
              <div className="h-20 w-20 rounded-2xl bg-brand-orange sm:h-24 sm:w-24 md:h-28 md:w-28" />
            </div>

            {/* Heading and tagline */}
            <div className="w-full space-y-4 text-center">
              <h1 className="break-words text-5xl font-bold leading-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
                validator.com
              </h1>
              <p className="break-words text-xl font-medium text-foreground sm:text-2xl md:text-3xl">
                Earn staking rewards with your feet up.
              </p>
            </div>
          </div>

          {/* Right side - Staking interface mockup */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <img
                src="https://res.cloudinary.com/di6zkr8of/image/upload/v1763991463/phantom-ss_jmysyq.png"
                alt="Staking interface showing validator.com with 889,067 SOL and 6.95% APY"
                className="h-auto w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tagline Section - "A brand that rewards you while keeping Solana Strong" */}
      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-20 md:px-8 lg:px-15">
        <div className="mx-auto w-full max-w-[2188px]">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {/* Navy vertical bar on the left */}
            <div className="h-[300px] w-2 flex-shrink-0 rounded-full bg-brand-navy md:h-[400px] md:w-3 lg:h-[500px] lg:w-4 xl:h-[600px] xl:w-5 2xl:h-[700px] 2xl:w-6" />

            {/* Text content */}
            <div className="flex-1 min-w-0">
              {/* "A brand that ..." with orange underline */}
              <div className="mb-4 inline-block sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
                <p className="break-words text-xl font-bold text-foreground sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                  A brand that ...
                </p>
                <div className="mt-2 h-1 w-full rounded-full bg-brand-orange md:h-1.5 lg:h-2 xl:h-2.5 2xl:h-3" />
              </div>

              {/* Main tagline with "strong" highlighted */}
              <div className="relative">
                <h2 className="break-words text-lg font-bold leading-tight text-foreground sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl">
                  rewards you while keeping Solana{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-brand-cyan px-1.5 py-0.5 text-white sm:px-2 sm:py-0.5 md:px-3 md:py-1 lg:px-4 lg:py-1.5 xl:px-5 xl:py-2 2xl:px-6 2xl:py-3">
                      Strong
                    </span>
                    <img
                      src="/images/design-mode/blue-glitter.png"
                      alt=""
                      className="absolute -right-4 -top-8 h-8 w-auto rotate-[24.89deg] sm:-right-6 sm:-top-10 sm:h-10 md:-right-10 md:-top-16 md:h-14 lg:-right-14 lg:-top-20 lg:h-18 xl:-right-16 xl:-top-24 xl:h-20 2xl:-right-20 2xl:-top-32 2xl:h-28"
                      aria-hidden="true"
                    />
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-20 md:px-8 lg:px-15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center">
          <div className="relative mb-4 w-full">
            <div className="mx-auto flex w-full max-w-[320px] flex-col items-center justify-center rounded-3xl bg-brand-orange px-6 py-10 text-center sm:h-[420px] sm:w-[680px] sm:max-w-none md:h-[540px] md:w-[860px] lg:h-[714px] lg:w-[1153px]">
              <p className="mb-4 break-words text-2xl font-semibold leading-tight text-white sm:text-3xl md:mb-5 md:text-4xl lg:mb-6 lg:text-5xl">
                Established in
              </p>
              <h2 className="break-words text-7xl font-bold leading-none text-white sm:text-8xl md:text-9xl">2022</h2>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="h-[28px] w-[246px] rounded-full bg-brand-cyan sm:h-[32px] sm:w-[492px] md:h-[36px] md:w-[644px] lg:h-[43px] lg:w-[922px]" />
            <div className="h-[28px] w-[212px] rounded-full bg-brand-navy sm:h-[32px] sm:w-[423px] md:h-[36px] md:w-[554px] lg:h-[43px] lg:w-[922px]" />
          </div>
        </div>
      </section>

      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-20 md:px-8 lg:px-15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center">
          <div className="mb-4 flex w-full flex-col items-center gap-4">
            <div className="h-[28px] w-[246px] rounded-full bg-brand-orange sm:h-[32px] sm:w-[492px] md:h-[36px] md:w-[644px] lg:h-[42px] lg:w-[922px]" />
          </div>

          <div className="relative mb-4 w-full">
            <div className="mx-auto flex w-full max-w-[320px] flex-col items-center justify-center rounded-3xl bg-brand-cyan px-6 py-10 text-center sm:h-[420px] sm:w-[680px] sm:max-w-none md:h-[540px] md:w-[860px] lg:h-[714px] lg:w-[1153px]">
              <p className="mb-4 break-words text-2xl font-semibold leading-tight text-white sm:text-3xl md:mb-5 md:text-4xl lg:mb-6 lg:text-5xl">
                Current Staked SOL
              </p>
              <h2 className="break-words text-7xl font-bold leading-none text-white sm:text-8xl md:text-9xl">
                {formatNumber(validatorData.activeStake)}
              </h2>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <div className="h-[28px] w-[246px] rounded-full bg-brand-navy sm:h-[32px] sm:w-[492px] md:h-[36px] md:w-[644px] lg:h-[43px] lg:w-[922px]" />
          </div>
        </div>
      </section>

      {/* Annual Percentage Yield Section */}
      <section className="relative flex min-h-screen items-center justify-center bg-background px-4 py-20 md:px-8 lg:px-15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center">
          <div className="mb-4 flex w-full flex-col items-center gap-4">
            <div className="h-[28px] w-[212px] rounded-full bg-brand-orange sm:h-[32px] sm:w-[423px] md:h-[36px] md:w-[554px] lg:h-[43px] lg:w-[922px]" />
            <div className="h-[28px] w-[246px] rounded-full bg-brand-cyan sm:h-[32px] sm:w-[492px] md:h-[36px] md:w-[644px] lg:h-[43px] lg:w-[922px]" />
          </div>

          <div className="relative mb-8 w-full">
            <div className="mx-auto flex w-full max-w-[320px] flex-col items-center justify-center rounded-3xl bg-brand-navy px-6 py-10 text-center sm:h-[420px] sm:w-[680px] sm:max-w-none md:h-[540px] md:w-[860px] lg:h-[714px] lg:w-[1153px]">
              <p className="mb-4 break-words text-2xl font-semibold leading-tight text-white sm:text-3xl md:mb-5 md:text-4xl lg:mb-6 lg:text-5xl">
                Annual Percentage Yield
              </p>
              <h2 className="break-words text-6xl font-bold leading-none text-white sm:text-7xl md:text-8xl lg:text-9xl">
                {validatorData.apy}% APY
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* The Team section with Pinterest/bento-style layout */}
      <section
        id="team"
        className="relative flex min-h-screen items-center justify-center bg-background px-6 py-20 md:px-8 lg:px-15"
        onClick={handleOutsideTap}
      >
        <div className="mx-auto w-full max-w-[2188px]">
          {/* Section Header with orange vertical bar */}
          <div className="mb-12 flex items-start gap-4 md:mb-16 lg:mb-20">
            <div className="h-[60px] w-1 flex-shrink-0 rounded-full bg-brand-orange md:h-[100px] md:w-[12px] xl:h-[140px] xl:w-[16px] 2xl:h-[177px] 2xl:w-[21px]" />
            <div>
              <h2 className="mb-2 break-words text-4xl font-bold text-foreground md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                The Team
              </h2>
              <p className="break-words text-base font-medium text-muted-foreground md:text-lg xl:text-xl 2xl:text-2xl">
                Here to educate and help the ecosystem.
              </p>
            </div>
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
                <img
                  src="/team/HFP-DP.png"
                  alt="Team Member"
                  className={`h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-hfp" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
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
                <img
                  src="/team/Seb-DP.png"
                  alt="Team Member"
                  className={`h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-sebastian" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
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
                <img
                  src="/team/Dan-DP.png"
                  alt="Team Member"
                  className={`h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-dan" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
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
                <img
                  src="/team/Mukul-DP.png"
                  alt="Team Member"
                  className={`h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-mukul" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
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
                <img
                  src="/team/pedro.png"
                  alt="Team Member"
                  className={`h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-pedro" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
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
                <img
                  src="/team/Chris-DP.png"
                  alt="Team Member"
                  className={`h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm ${
                    activeCard === "mobile-chris" ? "blur-sm" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100 ${
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
                  <img
                    src="/team/HFP-DP.png"
                    alt="hfp-dp"
                    className="h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
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
                  <img
                    src="/team/Seb-DP.png"
                    alt="seb-dp"
                    className="h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
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
                  <img
                    src="/team/Dan-DP.png"
                    alt="dan-dp"
                    className="h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
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
                  <img
                    src="/team/Mukul-DP.png"
                    alt="mukul-dp"
                    className="h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
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
                  <img
                    src="/team/pedro.png"
                    alt="pedro-dp"
                    className="h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
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
                  <img
                    src="/team/Chris-DP.png"
                    alt="chris-dp"
                    className="h-full w-full object-cover transition-all duration-300 group-hover/card:blur-sm"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />
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

      {/* Link Hub section with scattered cards layout */}
      <section
        id="link-hub"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-20 md:px-8 lg:px-15"
        onClick={handleLinkOutsideTap}
      >
        <div className="mx-auto w-full max-w-[2188px]">
          <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
            {/* Left side - Heading with orange vertical bar */}
            <div className="z-20 flex items-start gap-4 lg:flex-1">
              <div className="h-[60px] w-1 flex-shrink-0 rounded-full bg-brand-orange md:h-[100px] md:w-[12px] xl:h-[140px] xl:w-[16px] 2xl:h-[177px] 2xl:w-[21px]" />
              <div>
                <h2 className="mb-2 break-words text-4xl font-bold text-foreground md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                  Link Hub
                </h2>
                <p className="break-words text-base font-medium text-muted-foreground md:text-lg xl:text-xl 2xl:text-2xl">
                  Find what you want faster.
                </p>
              </div>
            </div>

            {/* Right side - Scattered cards using flexbox columns */}
            <div className="lg:w-[calc((100%-64px)*2/3)]">
              {/* Mobile: 2-column grid with tap support */}
              <div
                className={`grid grid-cols-2 gap-4 overflow-hidden px-4 py-8 sm:hidden ${activeLinkCard ? "[&>*]:scale-[0.65]" : ""}`}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-security") {
                      // Second tap - navigate
                      router.push("/security")
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-security")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-lime-500 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-security" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <Shield
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-security" ? "blur-sm" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-security" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-security" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">Security</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">
                      Enterprise-grade security measures
                    </p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-twitter") {
                      // Second tap - navigate to external link
                      window.open("https://x.com/validator_com", "_blank", "noopener,noreferrer")
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-twitter")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-gray-800 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-twitter" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <svg
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-twitter" ? "blur-sm" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.244H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-twitter" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-twitter" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">Twitter</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">Follow us for latest updates</p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-search") {
                      // Second tap - navigate to staking section
                      const stakingSection = document.getElementById("staking")
                      if (stakingSection) {
                        stakingSection.scrollIntoView({ behavior: "smooth" })
                      }
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-search")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-pink-500 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-search" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <Search
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-search" ? "blur-sm" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-search" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-search" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">Tutorials</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">How to stake?</p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-discord") {
                      // Second tap - navigate to Discord
                      window.open("https://discord.com/invite/eCJSb8PspY", "_blank", "noopener,noreferrer")
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-discord")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-purple-600 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-discord" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <svg
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-discord" ? "blur-sm" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.993a.077.077 0 0 1-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 0-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 0-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-discord" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-discord" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">Discord</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">Chat with our community</p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-community") {
                      const teamSection = document.getElementById("team")
                      if (teamSection) {
                        teamSection.scrollIntoView({ behavior: "smooth" })
                      }
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-community")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-green-500 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-community" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <Users
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-community" ? "blur-sm" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-community" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-community" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">The Team</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">People who make things work.</p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-partnerships") {
                      // Second tap - navigate to Partnerships page
                      window.open("https://cryptoclass.mintlify.app/", "_blank", "noopener,noreferrer")
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-partnerships")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-blue-500 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-partnerships" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <Handshake
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-partnerships" ? "blur-sm" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-partnerships" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-partnerships" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">Support</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">
                      Read our documentation to know more.
                    </p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-vault") {
                      window.open(
                        "https://cryptoclass.mintlify.app/staking/introduction#why-stake-with-validator-com%3F",
                        "_blank",
                        "noopener,noreferrer",
                      )
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-vault")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-amber-500 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-vault" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <svg
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-vault" ? "blur-sm" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="6" width="18" height="14" rx="2" />
                    <circle cx="12" cy="13" r="3" />
                    <path d="M12 13v3" strokeLinecap="round" />
                  </svg>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-vault" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-vault" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">Vault</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">Secure storage for your assets</p>
                  </div>
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (activeLinkCard === "mobile-youtube") {
                      window.open("https://www.youtube.com/@validatorcom", "_blank", "noopener,noreferrer")
                    } else {
                      // First tap - show overlay
                      handleLinkCardTap("mobile-youtube")
                    }
                  }}
                  className={`group/linkcard relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-red-600 shadow-lg transition-all duration-300 origin-center ${
                    activeLinkCard === "mobile-youtube" ? "!scale-[1.1] !shadow-2xl !z-10" : ""
                  }`}
                >
                  <svg
                    className={`h-12 w-12 text-white transition-all duration-300 ${
                      activeLinkCard === "mobile-youtube" ? "blur-sm" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-youtube" ? "opacity-100" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-3 py-3 text-center opacity-0 transition-opacity duration-300 ${
                      activeLinkCard === "mobile-youtube" ? "opacity-100" : ""
                    }`}
                  >
                    <h3 className="mb-1 text-sm font-bold text-white break-words">YouTube</h3>
                    <p className="text-[9px] leading-tight text-white/80 break-words">Watch tutorials and updates</p>
                  </div>
                </div>
              </div>

              {/* Tablet and Desktop: Flexbox columns with scattered layout and hover effects */}
              <div className="group hidden sm:flex sm:flex-row sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
                {/* Column 1 - Pink Search card with top margin */}
                <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
                  <Link
                    href="#staking"
                    aria-label="Search"
                    className="group/linkcard relative mt-16 flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-pink-500 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 md:mt-20 lg:mt-24 xl:mt-28 2xl:hover:!scale-[1.35]"
                  >
                    <Search className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20" />
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        Tutorial
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Learn to stake with your preferred wallet
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Column 2 - Green Users and Blue Handshake */}
                <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
                  <Link
                    href="#team"
                    aria-label="the-team"
                    className="group/linkcard relative flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-green-500 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]"
                  >
                    <Users className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20" />
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        The Team
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        People who make things work
                      </p>
                    </div>
                  </Link>
                  <a
                    href="https://cryptoclass.mintlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Partnerships"
                    className="group/linkcard relative flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-blue-500 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]"
                  >
                    <Handshake className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20" />
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        Support
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Find answers to all your questions
                      </p>
                    </div>
                  </a>
                </div>

                {/* Column 3 - Orange Vault and Lime Shield with top margin on vault */}
                <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
                  <a
                    href="https://www.youtube.com/watch?v=4qxw1_2s6SY"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Vault"
                    className="group/linkcard relative mt-12 flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-amber-500 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 md:mt-16 lg:mt-20 xl:mt-24 2xl:hover:!scale-[1.35]"
                  >
                    <svg
                      className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="6" width="18" height="14" rx="2" />
                      <circle cx="12" cy="13" r="3" />
                      <path d="M12 13v3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        Validator
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Learn how it works
                      </p>
                    </div>
                  </a>
                  <Link
                    href="/security"
                    aria-label="Security"
                    className="group/linkcard relative flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-lime-500 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]"
                  >
                    <Shield className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20" />
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        Security
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Enterprise-grade security measures
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Column 4 - Red YouTube and Orange Calculator */}
                <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
                  <Link
                    href="https://www.youtube.com/@validatorcom"
                    aria-label="YouTube"
                    className="group/linkcard relative flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-red-600 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]"
                  >
                    <svg
                      className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        YouTube
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Watch tutorials and updates
                      </p>
                    </div>
                  </Link>
                  <Link
                    href="#rewards"
                    aria-label="Calculator"
                    className="group/linkcard relative flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-brand-orange shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]"
                  >
                    <Calculator className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20" />
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        Calculator
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Calculate your staking rewards
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Column 5 - Dark X/Twitter and Purple Discord with small top margin on X */}
                <div className="flex flex-1 flex-col gap-6 md:gap-7 lg:gap-8 xl:gap-9 2xl:gap-10">
                  <a
                    href="https://x.com/validator_com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter/X"
                    className="group/linkcard relative mt-6 flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-gray-800 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 md:mt-8 lg:mt-10 xl:mt-12 2xl:hover:!scale-[1.35]"
                  >
                    <svg
                      className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.244H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        Twitter
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Follow us for latest updates
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://discord.com/invite/eCJSb8PspY"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Discord"
                    className="group/linkcard relative flex aspect-square transform-gpu items-center justify-center overflow-hidden rounded-2xl bg-purple-600 shadow-xl transition-all duration-300 will-change-transform group-has-[.group\/linkcard:hover]:scale-75 hover:!scale-[1.3] hover:shadow-2xl hover:z-10 2xl:hover:!scale-[1.35]"
                  >
                    <svg
                      className="h-12 w-12 text-white transition-all duration-300 group-hover/linkcard:blur-sm md:h-16 md:w-16 lg:h-20 lg:w-20"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.993a.077.077 0 0 1-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 0-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 0-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    <div className="absolute inset-0 rounded-2xl bg-black/70 opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100" />
                    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center px-4 py-4 text-center opacity-0 transition-opacity duration-300 group-hover/linkcard:opacity-100 md:px-6 md:py-6 xl:px-8 xl:py-8 2xl:px-10 2xl:py-10">
                      <h3 className="mb-2 text-xl font-bold text-white md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl break-words">
                        Discord
                      </h3>
                      <p className="text-xs text-white/80 md:text-sm lg:text-base xl:text-xs 2xl:text-sm break-words">
                        Chat with our community
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stake in 30 SECONDS section */}
      <section
        id="staking"
        className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 md:px-8 lg:px-15"
        style={{
          background: "linear-gradient(180deg, #FFF 31.18%, rgba(0, 0, 0, 0.00) 31.24%), #28C2EC",
        }}
      >
        <div className="relative mx-auto h-full w-full max-w-[2188px] sm:h-screen">
          {/* Mobile Layout - Vertical Stack */}
          <div className="flex flex-col items-center justify-start pt-8 sm:hidden">
            {/* Heading - In white area */}
            <div className="mb-2 flex items-start gap-2">
              <div className="flex-1 text-center">
                <h2 className="mb-2 whitespace-nowrap text-3xl font-bold text-foreground">Stake in 30 SECONDS</h2>
              </div>
              <div className="h-[40px] w-0.5 flex-shrink-0 rounded-full bg-brand-orange" />
            </div>

            {/* Subheading and Dropdown - In cyan area */}
            <div className="text-center">
              <p className="mb-3 break-words text-sm font-medium text-muted-foreground">
                Your coins. Your custody. Your rewards.
              </p>

              <div className="flex justify-center">
                <div className="relative">
                  <Button
                    onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                    className="bg-[#DBFF70] rounded-full px-4 py-3 text-xs font-bold text-gray-900 shadow-lg hover:bg-[#c9ed5f] flex items-center gap-2"
                  >
                    {selectedWallet.charAt(0).toUpperCase() + selectedWallet.slice(1)}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isWalletDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {/* Wallet Dropdown Menu */}
                  {isWalletDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-[240px] rounded-2xl bg-white shadow-2xl border-2 border-gray-100 overflow-hidden z-50">
                      {/* Phantom */}
                      <button
                        onClick={() => {
                          setSelectedWallet("phantom")
                          setIsWalletDropdownOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-purple-50 transition-colors border-b border-gray-100"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                          <img
                            src="/images/design-mode/Phantom-Icon_App_60x60.png"
                            alt="Phantom"
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
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-orange-50 transition-colors border-b border-gray-100"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                          <img
                            src="/images/design-mode/solflare-icon.svg"
                            alt="Solflare"
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
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 transition-colors border-b border-gray-100"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                          <img
                            src="/images/design-mode/backpack-icon.png"
                            alt="Backpack"
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
                  Stake in 30 SECONDS
                </h2>

                <p className="mb-3 mt-12 break-words text-sm font-medium text-muted-foreground sm:mb-4 sm:mt-2 sm:text-sm sm:font-bold sm:text-white md:mt-0 md:text-base md:text-white lg:mb-5 lg:mt-2 lg:text-lg lg:text-white xl:mb-2 xl:mt-4 xl:text-xl xl:text-white 2xl:mt-4 2xl:text-2xl 2xl:text-white">
                  Your coins. Your custody. Your rewards.
                </p>

                <div className="flex justify-end">
                  <div className="relative">
                    <Button
                      onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                      className="bg-[#DBFF70] rounded-full px-4 py-3 text-xs font-bold text-gray-900 shadow-lg hover:bg-[#c9ed5f] sm:px-4 sm:py-3 sm:text-xs md:px-6 md:py-4 md:text-sm lg:px-8 lg:py-5 lg:text-xl 2xl:px-12 2xl:py-7 2xl:text-xl flex items-center gap-2"
                    >
                      {selectedWallet.charAt(0).toUpperCase() + selectedWallet.slice(1)}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isWalletDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </Button>

                    {/* Wallet Dropdown Menu */}
                    {isWalletDropdownOpen && (
                      <div className="absolute right-0 top-full mt-2 w-[240px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] 2xl:w-[400px] rounded-2xl bg-white shadow-2xl border-2 border-gray-100 overflow-hidden z-50">
                        {/* Phantom */}
                        <button
                          onClick={() => {
                            setSelectedWallet("phantom")
                            setIsWalletDropdownOpen(false)
                          }}
                          className="w-full flex items-center gap-3 px-5 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 hover:bg-purple-50 transition-colors border-b border-gray-100"
                        >
                          <div className="flex h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg overflow-hidden">
                            <img
                              src="/images/design-mode/Phantom-Icon_App_60x60.png"
                              alt="Phantom"
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
                          className="w-full flex items-center gap-3 px-5 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 hover:bg-orange-50 transition-colors border-b border-gray-100"
                        >
                          <div className="flex h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg overflow-hidden">
                            <img
                              src="/images/design-mode/solflare-icon.svg"
                              alt="Solflare"
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
                          className="w-full flex items-center gap-3 px-5 py-4 sm:px-5 sm:py-4 md:px-6 md:py-5 hover:bg-red-50 transition-colors border-b border-gray-100"
                        >
                          <div className="flex h-10 w-10 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-lg overflow-hidden">
                            <img
                              src="/images/design-mode/backpack-icon.png"
                              alt="Backpack"
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

              <div className="h-[50px] w-1 flex-shrink-0 rounded-full bg-brand-orange sm:h-[80px] sm:w-2 md:h-[80px] md:w-[10px] lg:h-[100px] lg:w-[12px] xl:h-[120px] xl:w-[14px] 2xl:h-[140px] 2xl:w-[16px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Calculate Staking Rewards section */}
      <section
        id="rewards"
        className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-20 md:px-8 lg:px-15"
      >
        <div className="mb-12 text-center md:mb-16">
          <h2 className="break-words text-4xl font-bold text-foreground md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
            Calculate Staking Rewards
          </h2>
        </div>

        {/* Orange background calculator section */}
        <div className="relative w-full rounded-3xl bg-brand-orange px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24 xl:px-16 xl:py-28 2xl:px-20 2xl:py-32">
          <div className="mb-12 text-center md:mb-16">
            <p className="break-words text-lg font-semibold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
              This calculation is based on the current ~ {validatorData.apy}% APY.
            </p>
          </div>

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-6 sm:gap-8 lg:flex-row lg:gap-8 xl:gap-9 2xl:gap-10">
            <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl sm:max-w-sm sm:p-8 md:p-10 lg:w-[400px] lg:max-w-none lg:p-8 xl:w-[480px] xl:p-10 2xl:w-[800px] 2xl:p-14">
              <p className="mb-6 break-words text-center text-2xl font-bold text-foreground sm:text-3xl md:mb-8 md:text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                Your
              </p>
              <div className="mb-6 rounded-2xl bg-brand-navy px-6 py-8 sm:px-8 sm:py-10 md:mb-8 md:px-10 md:py-12 lg:px-6 lg:py-8 xl:mb-9 xl:px-8 xl:py-10 2xl:mb-10 2xl:px-12 2xl:py-14">
                <input
                  type="text"
                  value={formatNumber(solAmount)}
                  onChange={handleSolInputChange}
                  className="w-full min-w-60 bg-transparent text-center text-5xl font-bold text-white outline-none placeholder:text-white/50 sm:text-6xl md:text-7xl lg:min-w-20 lg:text-5xl xl:text-5xl 2xl:text-5xl"
                  placeholder="100"
                />
              </div>
              <p className="break-words text-center text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl">
                SOL
              </p>
            </div>

            {/* Multiplication symbol */}
            <div className="flex items-center justify-center lg:px-2 xl:px-3 2xl:px-4">
              <span className="text-5xl font-bold text-brand-navy sm:text-6xl md:text-7xl lg:text-8xl xl:text-7xl 2xl:text-10xl">
                ×
              </span>
            </div>

            <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl sm:max-w-sm sm:p-8 md:p-10 lg:w-[400px] lg:max-w-none lg:p-8 xl:w-[480px] xl:p-10 2xl:w-[800px] 2xl:p-14">
              <div className="flex h-full flex-col items-center justify-center py-6 sm:py-8 md:py-10 xl:py-8 2xl:py-16">
                <p className="mb-2 break-words text-center text-xl font-semibold text-foreground sm:text-2xl md:mb-3 md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl">
                  the current
                </p>
                <div className="rounded-xl bg-brand-cyan px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-7 lg:py-3.5 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4">
                  <p className="whitespace-nowrap text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                    {validatorData.apy}% APY
                  </p>
                </div>
              </div>
            </div>

            {/* Equals symbol */}
            <div className="flex items-center justify-center lg:px-2 xl:px-3 2xl:px-4">
              <span className="text-5xl font-bold text-brand-navy sm:text-6xl md:text-7xl lg:text-8xl xl:text-7xl 2xl:text-10xl">
                =
              </span>
            </div>

            <div className="w-full max-w-xs rounded-2xl bg-white p-6 shadow-xl sm:max-w-sm sm:p-8 md:p-10 lg:w-[400px] lg:max-w-none lg:p-8 xl:w-[480px] xl:p-10 2xl:w-[800px] 2xl:p-14">
              <div className="flex h-full flex-col items-center justify-center py-6 sm:py-8 md:py-10 xl:py-8 2xl:py-16">
                <div className="mb-3 rounded-xl bg-[#DBFF70] px-4 py-2 sm:px-5 sm:py-2.5 md:mb-5 md:px-6 md:py-3 lg:px-7 lg:py-3.5 xl:px-6 xl:py-3 2xl:px-8 2xl:py-4">
                  <p className="whitespace-nowrap text-center text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                    {calculateYearlyRewards()} SOL
                  </p>
                </div>
                <p className="break-words text-center text-xl font-semibold text-foreground sm:text-2xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl">
                  yearly rewards
                </p>
              </div>
            </div>
          </div>

          {/* *5% on staking rewards, 8% on JITO MEV earnings. */}
          <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white/90 sm:bottom-3 sm:left-auto sm:right-6 sm:text-left sm:text-sm md:bottom-4 md:right-8 lg:bottom-6 lg:right-12 lg:text-base xl:bottom-8 xl:right-16 2xl:bottom-10 2xl:right-20 2xl:text-lg">
            *5% on staking rewards, 8% on JITO MEV earnings.
          </p>
        </div>
      </section>

      {/* Support and FAQ Section */}
      <section id="support" className="relative bg-background">
        {/* FAQ Section */}
        <div className="bg-gray-50 px-4 py-16 md:px-8 md:py-20 lg:px-15">
          <div className="mx-auto max-w-5xl">
            <h3 className="mb-8 text-3xl font-bold text-foreground md:mb-12 md:text-4xl lg:text-5xl">FAQ</h3>

            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="item-1" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What is staking?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Staking is the process of locking up your SOL tokens to help secure the Solana network and earn
                  rewards in return. When you stake with validator.com, your tokens remain in your wallet while
                  supporting network operations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Does the earned SOL compound?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Yes, your staking rewards automatically compound. The rewards you earn are added to your staked
                  balance, which means you'll earn rewards on your rewards over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Is it safe to Stake my SOL?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Yes, staking with validator.com is safe. Your SOL never leaves your wallet, and you maintain full
                  custody of your tokens. We use enterprise-grade security measures and have a proven track record of
                  reliable validator operations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Why should I stake with validator.com?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  validator.com offers competitive APY rates, reliable uptime, transparent fee structure, and excellent
                  customer support. We're committed to helping the Solana ecosystem grow while maximizing your staking
                  rewards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How long is my SOL locked up for?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Your SOL is not permanently locked. You can unstake at any time, but there is a cooldown period of
                  approximately 2-3 days (one epoch) before your tokens become available for withdrawal.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Where can I see my rewards?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  You can view your staking rewards directly in your wallet or through our dashboard. Rewards are
                  distributed at the end of each epoch (approximately every 2-3 days).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How do I Unstake?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  To unstake, simply use your wallet's unstaking function or our dashboard. After initiating the unstake
                  process, your SOL will be available after the cooldown period of one epoch (2-3 days).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What does rent reserve mean?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  Rent reserve is a small amount of SOL (typically 0.00203928 SOL) that must remain in your stake
                  account to keep it active on the Solana blockchain. This amount is returned to you when you close the
                  stake account.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What is MEV?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  MEV (Maximal Extractable Value) refers to additional rewards that validators can earn by optimizing
                  transaction ordering. With JITO MEV, you can earn extra rewards on top of your regular staking
                  rewards.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How much MEV do I get?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  MEV rewards vary based on network activity and transaction volume. On average, MEV can add an
                  additional 0.5-2% to your annual staking rewards, though this can fluctuate.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How do I claim MEV?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  MEV rewards are automatically distributed to your wallet along with your regular staking rewards. You
                  don't need to take any additional action to claim them.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  What on-site security does validator.com use?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  We employ enterprise-grade security measures including encrypted connections, DDoS protection,
                  multi-signature wallets, and regular security audits. Our infrastructure is monitored 24/7 to ensure
                  maximum uptime and security.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  Can slashing take my SOL?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  No, Solana does not have slashing. Unlike some other proof-of-stake networks, your staked SOL cannot
                  be taken away as a penalty. Your tokens are always safe in your wallet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-14" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How can I download a report of my earnings?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  You can download detailed earnings reports from our dashboard. These reports include all your staking
                  rewards, MEV earnings, and transaction history for tax and record-keeping purposes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-15" className="rounded-lg bg-white px-6 py-2">
                <AccordionTrigger className="text-left text-base font-bold text-foreground md:text-lg">
                  How do I claim MEV?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground md:text-base">
                  MEV rewards are automatically distributed to your wallet along with your regular staking rewards. You
                  don't need to take any additional action to claim them.
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
