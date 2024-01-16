import type { Metadata } from 'next'
import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import { headingfont, bodyfont } from "./fonts";
import BackgroundContainer from './background-container'

export const metadata: Metadata = {
  title: 'Blog - Square zero',
  description: "Fiction, ballads, blog",
}

export default function Home() {
  const posts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="mt-20">
      {posts.map((post) => (
        <article key={post._id} className="py-5 articlePreview">
          <div className="articleSeparator articleAfter"></div>
          <div className={`text-slate-500 text-xs`}>
            {post.date.slice(0, 10)}
          </div>
          <Link href={post.slug}>
            <h2 className={`${headingfont.className} text-bleedred text-3xl`}>
              {post.title}
            </h2>
            {post.description && <p>{post.description}</p>}
          </Link>
        </article>
      ))}
      <BackgroundContainer />
    </div>
  );
}
