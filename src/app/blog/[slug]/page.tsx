// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import langHttp from "highlight.js/lib/languages/http";
import langNginx from "highlight.js/lib/languages/nginx";
import "src/styles/highlight.css";

import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "src/components/container";
import Link from "next/link";
import Image from "next/image";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeHighlight, { languages: { http: langHttp, nginx: langNginx } }],
    ],
  },
};

export function generateStaticParams() {
  const folders = fs.readdirSync(path.join("src/posts"));

  const files = folders.map((folder) => {
    const files = fs.readdirSync(path.join(`src/posts/${folder}`));
    return files.filter((f) => f.endsWith(".mdx"))[0] as string;
  });

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join(`src/posts/${slug}/`, slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = getPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description,
    metadataBase: new URL("https://francisudeji.dev"),
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}

// app/blog/[slug]/page.tsx
export default async function Post({ params }: any) {
  const props = getPost(params);

  return (
    <Container variant="medium">
      <article className="prose prose-slate mx-auto prose-img:w-full prose-img:rounded-md my-6 max-w-full prose-base md:prose-lg prose-lead:text-red-300 prose-table:border prose-table:border-slate-200 prose-td:text-center prose-th:text-center prose-th:pt-3 even:prose-tr:bg-slate-100">
        <Link
          href="/blog"
          className="mt-6 no-underline hover:underline focus:underline"
        >
          ← Back to blog
        </Link>

        <div className="space-y-6 mt-16">
          <span className="text-sm font-light">{props.frontMatter.date}</span>
          <h1>{props.frontMatter.title}</h1>
          <Image
            src={`/images/${props.slug}/cover.avif`}
            alt={props.frontMatter.title}
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
