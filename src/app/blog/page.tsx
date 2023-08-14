import { Inter } from "@next/font/google";

import { Metadata } from "next";

import Link from "next/link";
import { Container } from "src/components/container";
import { getBlogPosts } from "src/utils/blog";

export const metadata: Metadata = {
  title: "Blog | francisudeji.dev",
  description: "francisudeji.dev",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  icons: "/favicon.ico",
};

const inter = Inter({ subsets: ["latin"] });

export default function Blog() {
  const posts = getBlogPosts();

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
            {posts.map((post) => (
              <Link
                href={"/blog/" + post.slug}
                passHref
                key={post.slug}
                className="border border-slate-200 rounded-md p-2"
              >
                <div className="py-2 flex flex-col gap-2">
                  <div>
                    <h3 className="text-lg font-bold">{post.meta.title}</h3>
                    <p className="text-gray-400">{post.meta.description}</p>
                  </div>
                  <div className="my-auto text-gray-400">
                    <p>{post.meta.date}</p>
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
