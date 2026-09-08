import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { headingfont, bodyfont } from "@/app/fonts";
import Share from '@/utils/share';
import BackgroundContainer from "@/app/background-container";
import ProgressiveImage from "@/components/progressive-image";
import { getArtworkForSlug } from "@/lib/artwork";

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
    description: post.description || `Read ${post.title} on square zero`,
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

  const artwork = getArtworkForSlug(post.slugAsParams);

  return (
    <>
      <article
        className={`max-w-4xl mt-20 pb-60 prose prose-headings:text-bleedred prose-h1:text-xl prose-h1:font-normal prose-a:text-bleedred prose-p:text-base prose-p:font-extralight`}
      >
        <div className={`${bodyfont.className} text-slate-500 text-xs`}>
          {post.date.slice(0, 10)}
        </div>
        <div className="flex items-center">
          <h2 className={`mb-2 mt-1 mr-10 ${headingfont.className} text-bleedred text-5xl`}>
            {post.title}
          </h2>
          <Share />
        </div>
        {artwork && (
          <div className="postArtwork not-prose">
            <ProgressiveImage
              src={artwork.src}
              src2x={artwork.src2x}
              alt=""
            />
          </div>
        )}
        <Mdx code={post.body.code} />
      </article>
      <BackgroundContainer artwork={artwork} />
    </>
  );
}
