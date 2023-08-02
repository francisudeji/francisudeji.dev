// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import langHttp from "highlight.js/lib/languages/http";
import langNginx from "highlight.js/lib/languages/nginx";
import "src/styles/highlight.css";

// import remarkRehype from "remark-rehype";
// import { bundleMDX } from "mdx-bundler";
// import { getMDXComponent } from "mdx-bundler/client";

import { MDXRemote } from "next-mdx-remote/rsc";
import { useMemo } from "react";
import { Container } from "src/components/container";

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeHighlight, { languages: { http: langHttp, nginx: langNginx } }],
    ],
  },
};

export function generateStaticParams() {
  const files = fs.readdirSync(path.join("src/posts"));

  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("src/posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content,
  };
}

export function generateMetadata({ params }: any) {
  const blog = getPost(params);

  return {
    title: blog.frontMatter.title,
    description: blog.frontMatter.description,
  };
}

// app/blog/[slug]/page.tsx
export default async function Post({ params }: any) {
  const props = getPost(params);

  // prose-pre:rounded-none prose-img:w-full sm:prose-pre:rounded-md prose-img:rounded-none sm:prose-img:rounded-md  prose-headings:px-4
  return (
    <article className="prose prose-slate mx-auto prose-img:w-full prose-img:rounded-md mt-20">
      <Container variant="large">
        <time>{props.frontMatter.date}</time>
        <h1 className="">
          {/* {props.frontMatter.title} Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Soluta, magnam? */}
          How to build a full-stack app with Remix, tailwindcss and Prisma
        </h1>
        {/* <h1>{props.frontMatter.title}</h1> */}

        {/* @ts-expect-error Server Component*/}
        <MDXRemote source={props.content} options={options} />
      </Container>
    </article>
  );
}
