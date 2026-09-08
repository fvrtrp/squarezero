import { allPosts } from "@/.contentlayer/generated"
import BackgroundContainer from "./background-container"
import HomePosts from "@/components/home-posts"
import { getAllArtwork } from "@/lib/artwork"

export default function Home() {
  const artwork = getAllArtwork()
  const posts = allPosts
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map((post) => ({
      _id: post._id,
      title: post.title,
      date: post.date,
      slug: post.slug,
      category: post.category ?? null,
      archived: Boolean(post.archived),
      artwork: artwork[post.slugAsParams] ?? null,
    }))

  return (
    <>
      <HomePosts posts={posts} />
      <BackgroundContainer />
    </>
  )
}
