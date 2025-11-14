"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BlogCard } from "@/components/blog/BlogCard"
import { SearchFilter } from "@/components/blog/SearchFilter"
import { getAllPosts, getAllCategories, getPostsByCategory, searchPosts } from "@/lib/sanity.queries"
import type { BlogPost, Category } from "@/lib/sanity.types"
import { Footer } from "@/components/Footer"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, categoriesData] = await Promise.all([getAllPosts(), getAllCategories()])
        setPosts(postsData)
        setAllPosts(postsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching blog data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setSelectedCategory("")

    if (!query.trim()) {
      setPosts(allPosts)
      return
    }

    try {
      const results = await searchPosts(query)
      setPosts(results)
    } catch (error) {
      console.error("Error searching posts:", error)
    }
  }

  const handleCategoryChange = async (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    setSearchQuery("")

    if (!categorySlug) {
      setPosts(allPosts)
      return
    }

    try {
      const results = await getPostsByCategory(categorySlug)
      setPosts(results)
    } catch (error) {
      console.error("Error filtering by category:", error)
    }
  }

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
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Link Hub
            </Link>
            <Link
              href="/#rewards"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              Rewards
            </Link>
            <Link href="#" className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground">
              Tutorial
            </Link>
            <Link
              href="/#team"
              className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground"
            >
              About
            </Link>
            <Link href="https://cryptoclass.mintlify.app/" className="text-sm font-bold text-foreground transition-colors hover:text-muted-foreground">
              Support
            </Link>
            <Link href="/blog" className="text-sm font-bold text-brand-cyan transition-colors hover:text-brand-cyan/80">
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

          {/* Search and Filter */}
          <SearchFilter
            categories={categories}
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-brand-cyan border-t-transparent" />
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-xl text-muted-foreground">
                  {searchQuery || selectedCategory
                    ? "No posts found matching your criteria."
                    : "No blog posts available yet."}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
