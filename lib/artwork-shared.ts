export type Artwork = {
  src: string
  src2x?: string
}

export const FALLBACK_ARTWORK: Artwork[] = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
  src: `/sqz/sq${n}.webp`,
}))

export function isFallbackSlug(slug: string) {
  return /^sq[1-7]$/i.test(slug)
}

export function pickFallbackArtwork(seed: string): Artwork {
  let hash = 2166136261
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return FALLBACK_ARTWORK[(hash >>> 0) % FALLBACK_ARTWORK.length]
}

export function pickRandomFallbackArtwork(): Artwork {
  return FALLBACK_ARTWORK[Math.floor(Math.random() * FALLBACK_ARTWORK.length)]
}
