import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { headingfont, bodyfont } from "@/app/fonts";
import Share from "@/utils/share";
import BackgroundContainer from "@/app/background-container";
import PostArtwork from "@/components/post-artwork";
import JsonLd from "@/components/json-ld";
import { getArtworkForPost } from "@/lib/artwork";
import { SITE_AUTHOR, SITE_AUTHOR_AKA, SITE_AUTHOR_JSONLD, SITE_NAME, absoluteUrl, postDescription } from "@/lib/site";

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

  const artwork = getArtworkForPost(post.slugAsParams);
  const description = postDescription(post);
  const url = absoluteUrl(post.slug);
  const image = artwork ? absoluteUrl(artwork.src) : undefined;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description,
      siteName: SITE_NAME,
      publishedTime: new Date(post.date).toISOString(),
      authors: [SITE_AUTHOR, SITE_AUTHOR_AKA],
      images: image ? [image] : [],
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: image ? [image] : [],
    },
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

  const artwork = getArtworkForPost(post.slugAsParams);
  const description = postDescription(post);
  const published = post.date.slice(0, 10);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description,
          datePublished: post.date,
          author: SITE_AUTHOR_JSONLD,
          mainEntityOfPage: absoluteUrl(post.slug),
          image: absoluteUrl(artwork.src),
        }}
      />
      <article className="max-w-4xl mt-20 pb-60">
        <time
          dateTime={post.date}
          className={`${bodyfont.className} text-slate-500 text-xs`}
        >
          {published}
        </time>
        <div className="flex items-center">
          <h1 className={`mb-2 mt-1 mr-10 ${headingfont.className} text-bleedred text-5xl`}>
            {post.title}
          </h1>
          <Share />
        </div>
        <PostArtwork
          src={artwork.src}
          src2x={artwork.src2x}
          alt={post.title}
        />
        <div className="prose prose-headings:text-bleedred prose-h1:text-xl prose-h1:font-normal prose-a:text-bleedred prose-p:text-base prose-p:font-extralight">
          <Mdx code={post.body.code} />
        </div>
      </article>
      <BackgroundContainer artwork={artwork} />
    </>
  );
}
