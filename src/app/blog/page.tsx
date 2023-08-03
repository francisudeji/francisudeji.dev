import { Inter } from "@next/font/google";

import { Metadata } from "next";

import dayjs from "dayjs";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import { Container } from "src/components/container";

export const metadata: Metadata = {
  title: "Francis Udeji - Blog",
  description: "francisudeji.dev",
  viewport: "width=device-width, initial-scale=1",
  icons: "/favicon.ico",
};

const inter = Inter({ subsets: ["latin"] });

export default function Blog() {
  // 1) Set blogs directory
  const blogDir = "src/posts";

  // 2) Find all files in the blog directory
  const folders = fs.readdirSync(path.join(blogDir));

  const files = folders.map((folder) => {
    const files = fs.readdirSync(path.join(`src/posts/${folder}`));
    return files.find((f) => f.endsWith(".mdx")) as string;
  });

  // 3) For each blog found
  const blogs = files
    .map((filename) => {
      // 4) Read the content of that blog
      const fileContent = fs.readFileSync(
        path.join(`${blogDir}/${filename.split(".")[0]}`, filename),
        "utf-8"
      );

      // 5) Extract the metadata from the blog's content
      const { data: frontMatter } = matter(fileContent);

      // 6) Return the metadata and page slug
      return {
        meta: frontMatter,
        slug: filename.replace(".mdx", ""),
      };
    })
    .sort((a, b) => {
      if (new Date(a.meta.date) > new Date(b.meta.date)) {
        return -1;
      }

      return 1;
    });

  return (
    <main className="flex flex-col mt-16" style={inter.style}>
      <Container variant="large">
        <section className="">
          <div className="flex ">
            <h1 className="font-bold leading-tight tracking-normal text-3xl md:text-4xl lg:text-5xl">
              Latest Blog Posts
            </h1>
          </div>

          <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-12">
            {blogs.map((blog) => (
              <Link
                href={"/blog/" + blog.slug}
                passHref
                key={blog.slug}
                className="border border-slate-200 rounded-md p-2"
              >
                <div className="py-2 flex flex-col gap-2">
                  <div>
                    <h3 className="text-lg font-bold">{blog.meta.title}</h3>
                    <p className="text-gray-400">{blog.meta.description}</p>
                  </div>
                  <div className="my-auto text-gray-400">
                    <p>{blog.meta.date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
