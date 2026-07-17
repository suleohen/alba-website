"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/content";
import PlaceholderThumb from "@/components/ui/PlaceholderThumb";

export default function WritingPage() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #f4f6ff 0%, #ffffff 45%, #fff6f4 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10">
        <header className="pt-10 md:pt-14">
          <p className="text-xs tracking-[0.22em] text-black/60">WRITING</p>
          <h1 className="mt-4 font-display text-3xl tracking-tight md:text-5xl">
            Notes, essays, and things I&apos;m thinking about.
          </h1>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-black/70 md:text-lg">
            Editorial notes — updated occasionally.
          </p>
        </header>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {blogPosts.map((post, i) => {
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <div className={reversed ? "md:order-2" : "md:order-1"}>
                  <PlaceholderThumb
                    seed={post.slug}
                    className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-black/10"
                  />
                </div>

                <div className={reversed ? "md:order-1" : "md:order-2"}>
                  <Link href={`/writing/${post.slug}`} className="group block">
                    <p className="text-sm text-black/50">{post.date}</p>
                    <h2 className="mt-2 font-display text-2xl tracking-tight transition-colors group-hover:text-[#F73914] md:text-3xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-[50ch] text-sm leading-relaxed text-black/70 md:text-base">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 text-xs text-black/40">
                      {post.content.length} min read
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-black transition-colors group-hover:text-[#F73914]">
                      Read
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 border-t border-black/10 pb-16 pt-8 text-xs text-black/50 md:mt-24">
          <Link href="/contact" className="transition-colors hover:text-black">
            Get in touch
          </Link>
          <span className="mx-3 text-black/20">•</span>
          <Link href="/work" className="transition-colors hover:text-black">
            View work
          </Link>
        </div>
      </div>
    </>
  );
}
