import type { Metadata } from 'next'
import Threadify from "../utils/threadify";
import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import { prata, spacemono } from "./fonts";

export const metadata: Metadata = {
  title: 'Blog - Square zero',
  description: "Fiction, ballads, blog",
}

export default function Home() {
  const posts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return (
    <div className="prose dark:prose-invert">
      <Threadify text={'◼'} color="red" />
      <header className="text-6xl text-bleedred">Square Zero</header>
      {posts.map((post) => (
        <article key={post._id} className="my-8">
          <div className={`${spacemono.className} text-slate-500 text-xs`}>
            {post.date.slice(0, 10)}
          </div>
          <Link href={post.slug}>
            <h2 className={`${prata.className} text-bleedred text-3xl`}>
              {post.title}
            </h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  );
}
