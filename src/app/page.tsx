import { Inter } from "@next/font/google";

import { Metadata } from "next";

import { Container } from "src/components/Container";
import { Post } from "src/components/Post";
import { getBlogPosts } from "src/utils/blog";

export const metadata: Metadata = {
  title: "Francis Udeji",
  description: "francisudeji.dev",
  viewport: "width=device-width, initial-scale=1",
  icons: "/favicon.ico",
};

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const posts = getBlogPosts();

  return (
    <div className="flex flex-col mt-16" style={inter.style}>
      <Container variant="large">
        <div className="prose prose-slate max-w-full mx-auto prose-a:no-underline hover:prose-a:underline">
          <section className="">
            <div className="text-center">
              <h1 className="font-bold leading-tight tracking-normal text-4xl">
                Hi, I&apos;m Francis Udeji
              </h1>
              <p>I&apos;m a front-end software engineer</p>
              <p>
                I enjoy writing articles about what I&apos;m learning and
                building on the web
              </p>
            </div>
          </section>

          <section>
            <div className="flex ">
              <h2 className="text-3xl font-bold">Latest posts</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-12">
              {posts.map((post) => (
                <Post key={post.slug} {...post} />
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
