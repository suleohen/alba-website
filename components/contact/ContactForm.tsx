"use client";

export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-12 max-w-[480px] space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-xs tracking-[0.15em] text-black/50"
        >
          NAME
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="mt-2 w-full border-b border-black/20 bg-transparent py-2 text-base outline-none transition-colors focus:border-[#F73914]"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs tracking-[0.15em] text-black/50"
        >
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="mt-2 w-full border-b border-black/20 bg-transparent py-2 text-base outline-none transition-colors focus:border-[#F73914]"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs tracking-[0.15em] text-black/50"
        >
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-2 w-full resize-none border-b border-black/20 bg-transparent py-2 text-base outline-none transition-colors focus:border-[#F73914]"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#F73914]"
      >
        Send message
      </button>
      <p className="text-xs text-black/40">
        This form isn&apos;t connected to email yet — for now, please reach
        out directly above.
      </p>
    </form>
  );
}
