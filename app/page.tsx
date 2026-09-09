import { allPosts } from "@/.contentlayer/generated"
import type { Metadata } from "next"
import BackgroundContainer from "./background-container"
import HomePosts from "@/components/home-posts"
import JsonLd from "@/components/json-ld"
import { getArtworkForPost } from "@/lib/artwork"
import { SITE_AUTHOR_JSONLD, SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} · blog` },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
}

export default function Home() {
  const posts = allPosts
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map((post) => ({
      _id: post._id,
      title: post.title,
      date: post.date,
      slug: post.slug,
      category: post.category ?? null,
      archived: Boolean(post.archived),
      artwork: getArtworkForPost(post.slugAsParams),
    }))

  return (
    <>
      <h1 className="sr-only">{SITE_NAME}</h1>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
          author: SITE_AUTHOR_JSONLD,
        }}
      />
      <HomePosts posts={posts} />
      <BackgroundContainer />
    </>
  )
}
