import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { prata, spacemono, robotomono } from "@/app/fonts";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article
      className={`py-6 prose prose-headings:text-hackergreen prose-h1:text-xl prose-h1:font-normal ${robotomono.className} prose-a:text-hackergreen`}
    >
      <div className={`${spacemono.className} text-slate-500 text-xs`}>
        {post.date.slice(0, 10)}
      </div>
      <h2 className={`mb-2 mt-1 ${prata.className} text-hackergreen text-3xl`}>
        {post.title}
      </h2>
      {post.description && (
        <p className={`text-xl mt-0 ${spacemono.className}`}>
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  );
}
