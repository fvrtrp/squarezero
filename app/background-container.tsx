"use client"

import { useEffect, useRef, useState } from "react"
import ProgressiveImage from "@/components/progressive-image"
import {
  pickRandomFallbackArtwork,
  type Artwork,
} from "@/lib/artwork-shared"

type BackgroundContainerProps = {
  artwork?: Artwork | null
}

export default function BackgroundContainer({ artwork }: BackgroundContainerProps) {
  const [fallback, setFallback] = useState<Artwork | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const resolved = artwork ?? fallback

  useEffect(() => {
    if (artwork) return
    setFallback(pickRandomFallbackArtwork())
  }, [artwork])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0

    const update = () => {
      frame = 0
      if (motion.matches) {
        el.style.setProperty("--bg-shift", "0px")
        return
      }

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      const progress = Math.min(1, window.scrollY / maxScroll)
      const travel = el.clientHeight * 0.42
      el.style.setProperty("--bg-shift", `${(-progress * travel).toFixed(1)}px`)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    motion.addEventListener("change", update)
    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      motion.removeEventListener("change", update)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [resolved])

  return (
    <div className="backgroundContainer" ref={containerRef}>
      {resolved && (
        <ProgressiveImage
          src={resolved.src}
          src2x={resolved.src2x}
          alt=""
          role="presentation"
        />
      )}
      <div className="backgroundOverlay"></div>
    </div>
  )
}
