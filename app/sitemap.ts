import { MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"
import { SITE_URL, absoluteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: absoluteUrl(post.slug),
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: post.archived ? 0.4 : 0.7,
  }))

  const latest = allPosts.reduce((newest, post) => {
    return post.date > newest ? post.date : newest
  }, allPosts[0]?.date ?? new Date().toISOString())

  return [
    {
      url: SITE_URL,
      lastModified: latest,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...posts,
  ]
}
