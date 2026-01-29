"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/content";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-black/80 transition-transform duration-200 group-hover:scale-110" />
          <span>{site.name}</span>
          <span className="text-black/40 transition-colors group-hover:text-[#F73914]">
            ·
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "group relative text-sm tracking-tight text-black/70 transition-colors hover:text-black",
                  active && "text-black"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  {item.label}
                  <span
                    className={cx(
                      "text-[#F73914] opacity-0 transition-opacity group-hover:opacity-100",
                      active && "opacity-100"
                    )}
                  >
                    •
                  </span>
                </span>
                <span
                  className={cx(
                    "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black/40 transition-transform duration-200",
                    active && "scale-x-100",
                    "group-hover:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* mobile: tek link */}
        <Link
          href="/works"
          className="md:hidden text-sm text-black/70 hover:text-black transition-colors"
        >
          Works
        </Link>
      </div>
    </header>
  );
}