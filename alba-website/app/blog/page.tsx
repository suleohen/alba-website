import BlogsHero from "@/components/blogs/BlogsHero";
import BlogList from "@/components/blogs/BlogList";

export default function BlogsPage() {
  return (
    <div className="relative mx-auto w-full max-w-[1200px] px-6 md:px-10">
      <BlogsHero />
      <BlogList />

      {/* Footer */}
      <footer className="mt-20 border-t border-black/10 pb-20 pt-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-black/50">
            Editorial notes — updated occasionally.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="/contact"
              className="text-black/60 transition-colors hover:text-[#1800ad]"
            >
              Get in touch
            </a>
            <span className="text-black/20">•</span>
            <a
              href="/works"
              className="text-black/60 transition-colors hover:text-[#1800ad]"
            >
              View works
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}