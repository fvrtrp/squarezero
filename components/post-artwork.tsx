"use client"

import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import ProgressiveImage from "@/components/progressive-image"

type PostArtworkProps = {
  src: string
  src2x?: string
  alt: string
}

export default function PostArtwork({ src, src2x, alt }: PostArtworkProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKey)
      triggerRef.current?.focus()
    }
  }, [open])

  const lightbox =
    mounted &&
    open &&
    createPortal(
      <div
        className="artworkLightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={() => setOpen(false)}
      >
        <h2 id={titleId} className="sr-only">
          {alt}
        </h2>
        <button
          ref={closeRef}
          type="button"
          className="artworkLightboxClose"
          aria-label="Close artwork"
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </button>
        <img
          src={src2x || src}
          alt={alt}
          onClick={(event) => event.stopPropagation()}
        />
      </div>,
      document.body
    )

  return (
    <>
      <div className="postArtwork not-prose">
        <button
          ref={triggerRef}
          type="button"
          className="postArtworkTrigger"
          onClick={() => setOpen(true)}
          aria-label={`View ${alt} full screen`}
        >
          <ProgressiveImage src={src} src2x={src2x} alt={alt} />
        </button>
      </div>
      {lightbox}
    </>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
