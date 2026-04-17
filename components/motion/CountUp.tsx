"use client"

import { useEffect, useRef, useState } from "react"

interface CountUpProps {
  value: number
  durationMs?: number
  format: (n: number) => string
}

export function CountUp({ value, durationMs = 1200, format }: CountUpProps) {
  const [displayed, setDisplayed] = useState(0)
  const containerRef = useRef<HTMLSpanElement>(null)
  const hasEnteredRef = useRef(false)
  const currentRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    currentRef.current = displayed
  }, [displayed])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const animateTo = (to: number) => {
      if (reducedMotion) {
        setDisplayed(to)
        return
      }
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      const from = currentRef.current
      const startTime = performance.now()
      const tick = (now: number) => {
        const elapsed = now - startTime
        const progress = Math.min(elapsed / durationMs, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        setDisplayed(from + (to - from) * eased)
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          rafRef.current = null
          setDisplayed(to)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    if (hasEnteredRef.current) {
      animateTo(value)
      return
    }

    if (reducedMotion) {
      hasEnteredRef.current = true
      setDisplayed(value)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting && !hasEnteredRef.current) {
          hasEnteredRef.current = true
          animateTo(value)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [value, durationMs])

  return <span ref={containerRef}>{format(displayed)}</span>
}
