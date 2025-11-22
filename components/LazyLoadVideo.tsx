"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface LazyLoadVideoProps {
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
  poster?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export function LazyLoadVideo({
  src,
  alt = "Video",
  className = "",
  style,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: LazyLoadVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(videoElement)
          }
        })
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      },
    )

    observer.observe(videoElement)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (isInView && videoRef.current && src) {
      videoRef.current.src = src
      videoRef.current.load()
    }
  }, [isInView, src])

  const handleLoadedData = () => {
    setIsLoaded(true)
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {!isLoaded && poster && (
        <img src={poster || "/placeholder.svg"} alt={alt} className="absolute inset-0 h-full w-full object-contain" />
      )}
      <video
        ref={videoRef}
        className={`h-full w-full object-contain transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        onLoadedData={handleLoadedData}
        aria-label={alt}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
