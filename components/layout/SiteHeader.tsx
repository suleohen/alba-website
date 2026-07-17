"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight"
        >
          <span className="relative h-6 w-7 shrink-0 transition-transform duration-200 group-hover:scale-110">
            <Image
              src="/logo/logo-mark.png"
              alt=""
              fill
              className="object-contain mix-blend-multiply"
              sizes="28px"
              priority
            />
          </span>
          <span className="font-display text-lg font-bold lowercase tracking-tight">
            albastudio
          </span>
          <span className="ml-0.5 text-lg font-bold leading-none text-[#F73914] transition-transform duration-200 group-hover:scale-125">
            ●
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "group relative text-sm tracking-tight text-black/70 transition-colors hover:text-black focus-visible:text-black focus-visible:outline-none",
                  active && "text-black"
                )}
              >
                <span className="inline-flex items-center gap-2">
                  {item.label}
                  <span
                    className={cx(
                      "text-[#F73914] opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
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
                    "group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-haspopup="true"
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex flex-col items-end gap-1.5 p-1 md:hidden"
        >
          <span
            className={cx(
              "block h-px w-6 bg-black transition-transform duration-200",
              mobileOpen && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cx(
              "block h-px w-6 bg-black transition-transform duration-200",
              mobileOpen && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-black/10 bg-white px-6 py-2 md:hidden">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cx(
                  "block py-2.5 text-base tracking-tight text-black/70 transition-colors",
                  active && "text-black"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
