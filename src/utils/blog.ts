import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PATH_TO_POSTS = "src/posts";

export function getBlogPostFiles() {
  const folders = fs.readdirSync(path.join(PATH_TO_POSTS));

  const files = folders.map((folder) => {
    const files = fs.readdirSync(path.join(`${PATH_TO_POSTS}/${folder}`));
    return files.filter((f) => f.endsWith(".mdx"))[0] as string;
  });

  return files;
}

export function getBlogPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join(`${PATH_TO_POSTS}/${slug}/`, slug + ".mdx"),
    "utf-8"
  );

  const { data: meta, content } = matter(markdownFile);

  return {
    meta,
    slug,
    content,
  };
}

export function getBlogPosts() {
  const files = getBlogPostFiles();

  const posts = files
    .map((filename) => {
      const slug = filename.split(".")[0];

      return getBlogPost({ slug });
    })
    .sort((a, b) => {
      if (new Date(a.meta.date) > new Date(b.meta.date)) {
        return -1;
      }

      return 1;
    });

  return posts;
}
