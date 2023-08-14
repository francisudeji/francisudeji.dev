import Link from "next/link";

interface Post {
  meta: {
    [key: string]: any;
  };
  slug: string;
  content: string;
}

export function Post(post: Post) {
  return (
    <Link
      href={"/blog/" + post.slug}
      passHref
      key={post.slug}
      className="border border-slate-200 rounded-md not-prose p-4"
    >
      <article className="flex flex-col gap-2">
        <div>
          <h3 className="text-lg font-bold">{post.meta.title}</h3>
          <p className="">{post.meta.description}</p>
        </div>
        <div className="my-auto">
          <p className="text-slate-400 text-sm">{post.meta.date}</p>
        </div>
      </article>
    </Link>
  );
}
