import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import langHttp from "highlight.js/lib/languages/http";
import langNginx from "highlight.js/lib/languages/nginx";
import "src/styles/highlight.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "src/components/container";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getBlogPost, getBlogPostFiles } from "src/utils/blog";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeHighlight, { languages: { http: langHttp, nginx: langNginx } }],
    ],
  },
};

export function generateStaticParams() {
  const files = getBlogPostFiles();

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getBlogPost(params);

  const urlSearchParams = new URLSearchParams({
    date: post.meta.date,
    title: post.meta.title,
    slug: post.slug,
  }).toString();

  return {
    title: post.meta.title,
    description: post.meta.description,
    metadataBase: new URL("https://francisudeji.dev"),
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    themeColor: "#0f172a",
    twitter: {
      title: post.meta.title,
      description: "francisudeji.dev",
      card: "summary_large_image",
      creator: "@francisudeji",
      site: "@francisudeji",
      images: [
        {
          url: `/api/og?${urlSearchParams}`,
          width: 2400,
          height: 1256,
          alt: post.meta.title,
        },
      ],
    },
    openGraph: {
      title: post.meta.title,
      description: "francisudeji.dev",
      url: `https://francisudeji.dev/blog/${post.slug}`,
      siteName: "francisudeji.dev",
      images: [
        {
          url: `/api/og?${urlSearchParams}`,
          width: 2400,
          height: 1256,
          alt: post.meta.title,
        },
      ],
      type: "website",
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const props = getBlogPost(params);

  return (
    <Container variant="medium">
      <article className="prose prose-slate mx-auto prose-img:w-full prose-img:rounded-md my-6 max-w-full prose-base md:prose-lg prose-lead:text-red-300 prose-table:border prose-table:border-slate-200 prose-td:text-center prose-th:text-center prose-th:pt-3 even:prose-tr:bg-slate-100">
        <Link
          href="/blog"
          className="flex items-center mt-6 no-underline hover:underline focus:underline"
        >
          ← Back to blog
        </Link>

        <div className="space-y-6 mt-16">
          <span className="text-sm font-light">{props.meta.date}</span>
          <h1>{props.meta.title}</h1>
          <Image
            src={`/images/${props.slug}/cover.avif`}
            alt={props.meta.title}
            width={1024}
            height={1024}
            quality={100}
          />
        </div>
        {/* @ts-expect-error Server Component*/}
        <MDXRemote source={props.content} options={options} />
      </article>
    </Container>
  );
}
