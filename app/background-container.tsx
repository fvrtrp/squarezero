"use client"

import ProgressiveImage from "@/components/progressive-image"
import { DEFAULT_BACKGROUND, type Artwork } from "@/lib/artwork-shared"

type BackgroundContainerProps = {
  artwork?: Artwork | null
}

export default function BackgroundContainer({ artwork }: BackgroundContainerProps) {
  const src = artwork?.src ?? DEFAULT_BACKGROUND

  return (
    <div className="backgroundContainer">
      <ProgressiveImage
        src={src}
        src2x={artwork?.src2x}
        alt=""
        role="presentation"
      />
      <div className="backgroundOverlay"></div>
    </div>
  )
}
