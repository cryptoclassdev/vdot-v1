import { BlogContent } from "@/components/blog/BlogContent"
import { getAllPosts, getAllCategories } from "@/lib/sanity.queries"
import { Footer } from "@/components/Footer"
import { SiteHeader } from "@/components/SiteHeader"

// ISR: Revalidate every hour as fallback, webhook handles instant updates
export const revalidate = 3600

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getAllPosts(), getAllCategories()])

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader currentPath="/blog" />

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
