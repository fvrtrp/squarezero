"use client"

import { ImgHTMLAttributes, useCallback, useEffect, useRef, useState } from "react"

type ProgressiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
  src2x?: string
}

export default function ProgressiveImage({
  src,
  src2x,
  alt,
  onLoad,
  ...rest
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)
  const upgraded = useRef(false)

  useEffect(() => {
    setCurrentSrc(src)
    upgraded.current = false
  }, [src, src2x])

  const maybeUpgrade = useCallback(() => {
    const el = imgRef.current
    if (!src2x || upgraded.current || !el || !el.naturalWidth) return

    const needed = el.getBoundingClientRect().width * (window.devicePixelRatio || 1)
    if (needed <= el.naturalWidth) return

    upgraded.current = true
    const preload = new window.Image()
    preload.src = src2x
    preload.onload = () => setCurrentSrc(src2x)
  }, [src2x])

  return (
    <img
      ref={imgRef}
      src={currentSrc}
      alt={alt ?? ""}
      decoding="async"
      onLoad={(event) => {
        if (currentSrc === src) maybeUpgrade()
        onLoad?.(event)
      }}
      {...rest}
    />
  )
}
