import BusinessCard from "@/components/contact/BusinessCard";
import ContactForm from "@/components/contact/ContactForm";
import { about } from "@/lib/content";

export default function ContactPage() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 85% 0%, #fff4f2 0%, #ffffff 55%, #fafafa 100%)",
        }}
      />
      <div className="mx-auto w-full max-w-[1100px] px-6 md:px-10">
      <div className="grid grid-cols-1 gap-16 pt-10 md:grid-cols-2 md:gap-10 md:pt-14">
        <div>
          <p className="text-xs tracking-[0.22em] text-black/60">CONTACT</p>
          <h1 className="mt-4 font-display text-3xl tracking-tight md:text-5xl">
            Let&apos;s create something together.
          </h1>
          <p className="mt-6 max-w-[55ch] text-base leading-relaxed text-black/70 md:text-lg">
            Open to new projects, collaborations, and conversations. Reach
            out directly or send a note below.
          </p>

          <div className="mt-8 space-y-3 text-sm">
            {about.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-3 text-black/70 transition-colors hover:text-[#F73914]"
              >
                <span className="w-20 shrink-0 text-xs tracking-[0.15em] text-black/40">
                  {s.label.toUpperCase()}
                </span>
                <span>
                  {s.href.startsWith("mailto:")
                    ? s.href.replace("mailto:", "")
                    : s.href.replace(/^https?:\/\//, "")}
                </span>
              </a>
            ))}
          </div>

          <ContactForm />
        </div>

        <div className="flex w-full flex-col items-center justify-center pb-16 md:pb-0">
          <BusinessCard />
        </div>
      </div>
      </div>
    </>
  );
}
