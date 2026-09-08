import fs from "fs"
import path from "path"
import type { Artwork } from "./artwork-shared"

export type { Artwork } from "./artwork-shared"
export { DEFAULT_BACKGROUND } from "./artwork-shared"

const BACKGROUNDS_DIR = path.join(process.cwd(), "public/backgrounds")

function publicUrl(filename: string) {
  return `/backgrounds/${filename}`
}

export function getAllArtwork(): Record<string, Artwork> {
  const artwork: Record<string, Artwork> = {}

  if (!fs.existsSync(BACKGROUNDS_DIR)) {
    return artwork
  }

  const files = fs.readdirSync(BACKGROUNDS_DIR)

  for (const file of files) {
    const match = file.match(/^(.+?)-2x\.(jpe?g|png|webp)$/i)
    if (!match) continue
    const slug = match[1]
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
    if (slug.endsWith("-2x") || artwork[slug]) continue
    artwork[slug] = { src: publicUrl(file) }
  }

  return artwork
}

export function getArtworkForSlug(slug: string): Artwork | null {
  return getAllArtwork()[slug] ?? null
}
