import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
  const posts = allPosts.sort((a, b) => a.date > b.date ? -1 : 1)
  return (
    <div className="prose dark:prose-invert">
      {posts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
