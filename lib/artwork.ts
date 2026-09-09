import fs from "fs"
import path from "path"
import { isFallbackSlug, pickFallbackArtwork, type Artwork } from "./artwork-shared"

export type { Artwork } from "./artwork-shared"
export {
  FALLBACK_ARTWORK,
  isFallbackSlug,
  pickFallbackArtwork,
  pickRandomFallbackArtwork,
} from "./artwork-shared"

const ARTWORK_DIR = path.join(process.cwd(), "public/sqz")

function publicUrl(filename: string) {
  return `/sqz/${filename}`
}

let artworkCache: Record<string, Artwork> | null = null

export function getAllArtwork(): Record<string, Artwork> {
  if (artworkCache && process.env.NODE_ENV === "production") return artworkCache

  const artwork: Record<string, Artwork> = {}

  if (!fs.existsSync(ARTWORK_DIR)) {
    artworkCache = artwork
    return artwork
  }

  const files = fs.readdirSync(ARTWORK_DIR)

  for (const file of files) {
    const match = file.match(/^(.+?)_2x\.(jpe?g|png|webp)$/i)
    if (!match) continue
    const slug = match[1]
    if (isFallbackSlug(slug)) continue
    const ext = match[2]
    const oneX = files.find(
      (candidate) => candidate.toLowerCase() === `${slug}.${ext}`.toLowerCase()
    )
    if (!oneX) continue
    artwork[slug] = {
      src: publicUrl(oneX),
      src2x: publicUrl(file),
    }
  }

  for (const file of files) {
    const match = file.match(/^(.+?)\.(jpe?g|png|webp)$/i)
    if (!match) continue
    const slug = match[1]
    if (slug.toLowerCase().endsWith("_2x") || isFallbackSlug(slug) || artwork[slug]) continue
    artwork[slug] = { src: publicUrl(file) }
  }

  artworkCache = artwork
  return artwork
}

export function getArtworkForSlug(slug: string): Artwork | null {
  return getAllArtwork()[slug] ?? null
}

export function getArtworkForPost(slug: string): Artwork {
  return getArtworkForSlug(slug) ?? pickFallbackArtwork(slug)
}
