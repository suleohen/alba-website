"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/content";
import { useState } from "react";

export default function BlogList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative mt-32 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
      {/* FULL SCREEN BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <Image
          src="/blog/list.png" // 👈 ekran boyutunda arka plan
          alt="Blog list background"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* okunurluk için soft overlay */}
        <div className="absolute inset-0" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-8">
        {/* Section header */}
        <div className="mb-8 flex items-end justify-between border-b border-black/10 pb-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-[#1800ad]">LATEST</p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight">
              Recent writings
            </h2>
          </div>
          <p className="text-sm text-black/40">
            {String(blogPosts.length).padStart(2, "0")} articles
          </p>
        </div>

        {/* Blog list */}
        <div className="space-y-3">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative block overflow-hidden rounded-2xl border border-black/10 bg-white/95 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#1800ad]/30 hover:shadow-lg md:p-8"
            >
              {/* hover glow */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(24,0,173,0.03), transparent 50%)",
                }}
              />

              <div className="relative flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-xs font-mono text-black/30">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-black/5" />
                  </div>

                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-medium tracking-tight transition-colors group-hover:text-[#1800ad] md:text-2xl">
                      {post.title}
                    </h3>
                    <span
                      className="text-[#F73914] transition-all duration-300"
                      style={{
                        opacity: hoveredIndex === index ? 1 : 0,
                        transform:
                          hoveredIndex === index
                            ? "translateX(0)"
                            : "translateX(-8px)",
                      }}
                    >
                      •
                    </span>
                  </div>

                  <p className="mt-3 max-w-[75ch] text-sm leading-relaxed text-black/60 md:text-base">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-xs text-black/40">
                    <span>{post.content.length} min read</span>
                    <span>•</span>
                    <span className="transition-colors group-hover:text-[#1800ad]">
                      Read more
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 group-hover:border-[#1800ad] group-hover:bg-[#1800ad] group-hover:text-white">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-16 flex items-center justify-center gap-2 text-xs text-black/30">
          <div className="h-px w-16 bg-black/10" />
          <span>End of list</span>
          <div className="h-px w-16 bg-black/10" />
        </div>
      </div>
    </section>
  );
}
