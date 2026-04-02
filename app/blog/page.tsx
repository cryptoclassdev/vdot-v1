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
              href="/#link-hub"
              className="text-lg font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Link Hub
            </Link>
            <Link
              href="/#rewards"
              className="text-lg font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Rewards
            </Link>
            <Link href="#" className="text-lg font-bold text-foreground transition-colors hover:text-muted-foreground">
              Tutorial
            </Link>
            <Link
              href="/#team"
              className="text-lg font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              About
            </Link>
            <Link href="https://docs.validator.com/" className="text-lg font-bold text-foreground transition-colors hover:text-muted-foreground">
              Support
            </Link>
            <Link href="/blog" className="text-lg font-bold text-brand-cyan transition-colors hover:text-brand-cyan/80">
              Blog
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

      {/* Blog Content */}
      <main className="px-4 py-20 md:px-8 lg:px-15">
        <div className="mx-auto max-w-7xl">
          {/* Logo Section */}
          <div className="mb-12 flex flex-col items-center gap-4">
            {/* Three colored squares logo */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-navy md:h-10 md:w-10" />
              <div className="h-8 w-8 rounded-lg bg-brand-cyan md:h-10 md:w-10" />
              <div className="h-8 w-8 rounded-lg bg-brand-orange md:h-10 md:w-10" />
            </div>
            {/* Brand name */}
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">validator.com</h2>
          </div>

          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">Blog</h1>
            <p className="text-lg text-muted-foreground md:text-xl">
              Insights, updates, and stories from the validator.com team
            </p>
          </div>

          {/* Interactive Blog Content (Client Component) */}
          <BlogContent initialPosts={posts} categories={categories} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
