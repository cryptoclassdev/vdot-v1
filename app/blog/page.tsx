import Link from "next/link"
import { BlogContent } from "@/components/blog/BlogContent"
import { getAllPosts, getAllCategories } from "@/lib/sanity.queries"
import { Footer } from "@/components/Footer"

// ISR: Revalidate every hour as fallback, webhook handles instant updates
export const revalidate = 3600

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex items-center justify-between px-4 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="h-6 w-6 rounded bg-brand-navy" />
            <div className="h-6 w-6 rounded bg-brand-cyan" />
            <div className="h-6 w-6 rounded bg-brand-orange" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/#staking"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Stake
            </Link>
            <Link
              href="/#rewards"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Calculator
            </Link>
            <Link
              href="/#team"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Team
            </Link>
            <Link href="/blog" aria-current="page" className="text-base font-medium text-foreground underline decoration-brand-orange decoration-2 underline-offset-8 transition-colors hover:text-muted-foreground">
              Blog
            </Link>
            <Link
              href="https://docs.validator.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-foreground transition-colors hover:text-muted-foreground"
            >
              Docs
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="/"
            className="rounded-3xl bg-brand-orange px-6 py-2 font-bold text-white shadow-2xl transition-colors hover:bg-brand-orange/90"
          >
            Stake Now
          </Link>
        </div>
      </header>

      <main className="px-4 py-24 md:px-8 md:py-32 lg:px-15">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl md:mb-20">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Writing
            </p>
            <h1 className="mt-3 break-words text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              Notes from the validator.
            </h1>
            <p className="mt-6 max-w-prose text-base text-muted-foreground md:text-lg">
              Operator notes, Solana ecosystem research, and occasional tutorials from the team
              running validator.com.
            </p>
          </div>

          <BlogContent initialPosts={posts} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
