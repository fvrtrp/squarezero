export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://squarezero.vercel.app"

export const SITE_NAME = "Square Zero"
export const SITE_AUTHOR = "fevertrip"
export const SITE_AUTHOR_AKA = "suraj"
export const SITE_DESCRIPTION =
  "Short stories, fiction, and personal writing by fevertrip."

export const SITE_AUTHOR_JSONLD = {
  "@type": "Person",
  name: SITE_AUTHOR,
  alternateName: SITE_AUTHOR_AKA,
}

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString()
}

export function excerptFromMarkdown(raw: string, max = 160) {
  const text = raw
    .replace(/[#>*_`~\[\]()]/g, "")
    .replace(/!?\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim()

  if (!text) return SITE_DESCRIPTION
  if (text.length <= max) return text
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`
}

export function postDescription(post: {
  title: string
  description?: string | null
  body?: { raw?: string }
}) {
  if (post.description?.trim()) return post.description.trim()
  if (post.body?.raw) return excerptFromMarkdown(post.body.raw)
  return `Read ${post.title} on ${SITE_NAME}`
}
