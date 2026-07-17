import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function WritingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);

  return (
    <div className="mx-auto w-full max-w-[800px] px-6 md:px-10">
      {/* Back navigation */}
      <div className="pt-10 md:pt-14">
        <Link
          href="/writing"
          className="group inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-[#F73914]"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          <span>Back to Writing</span>
        </Link>
      </div>

      {/* Article header */}
      <header className="mt-12 border-b border-black/10 pb-10">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-black/40">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.content.length} min read</span>
        </div>

        {/* Title */}
        <h1 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight md:text-6xl">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="mt-6 text-lg leading-relaxed text-black/70 md:text-xl">
          {post.excerpt}
        </p>

        {/* Decorative line */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1 w-12 rounded-full bg-[#F73914]" />
          <div className="h-px flex-1 bg-black/10" />
        </div>
      </header>

      {/* Article content */}
      <article className="mt-12 pb-20">
        <div className="space-y-6">
          {post.content.map((para, i) => (
            <p
              key={i}
              className="text-base leading-[1.8] text-black/80 md:text-lg"
            >
              {/* Drop cap for first paragraph */}
              {i === 0 ? (
                <>
                  <span className="float-left mr-3 font-display text-6xl leading-[0.8] text-[#F73914]">
                    {para.charAt(0)}
                  </span>
                  {para.slice(1)}
                </>
              ) : (
                para
              )}
            </p>
          ))}
        </div>

        {/* End mark */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-[#F73914]" />
            <div className="h-1.5 w-1.5 rounded-full bg-black/40" />
            <div className="h-1.5 w-1.5 rounded-full bg-black/20" />
          </div>
        </div>
      </article>

      {/* Navigation to next/prev */}
      <div className="border-t border-black/10 pb-20 pt-10">
        <div className="grid grid-cols-2 gap-6">
          {postIndex > 0 && (
            <Link
              href={`/writing/${blogPosts[postIndex - 1].slug}`}
              className="group rounded-xl border border-black/10 bg-white p-5 transition-all hover:border-[#F73914]/40 hover:shadow-sm"
            >
              <p className="text-xs text-black/40">Previous</p>
              <p className="mt-2 font-medium transition-colors group-hover:text-[#F73914]">
                {blogPosts[postIndex - 1].title}
              </p>
            </Link>
          )}

          {postIndex < blogPosts.length - 1 && (
            <Link
              href={`/writing/${blogPosts[postIndex + 1].slug}`}
              className="group rounded-xl border border-black/10 bg-white p-5 text-right transition-all hover:border-[#F73914]/40 hover:shadow-sm"
            >
              <p className="text-xs text-black/40">Next</p>
              <p className="mt-2 font-medium transition-colors group-hover:text-[#F73914]">
                {blogPosts[postIndex + 1].title}
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
