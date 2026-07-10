import Link from "next/link"
import Container from "@/components/ui/Container"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/studio", label: "Studio" },
  { href: "/services", label: "Services" },
  { href: "/objects", label: "Objects" },
  { href: "/journal", label: "Journal" },
  { href: "/experiential", label: "Experiential" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-sm font-medium tracking-wide">
            ALBA STUDIO
          </Link>

          <nav className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm opacity-70 transition hover:opacity-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  )
}