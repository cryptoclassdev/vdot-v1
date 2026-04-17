"use client"

import { useState } from "react"
import { BlogCard } from "@/components/blog/BlogCard"
import { SearchFilter } from "@/components/blog/SearchFilter"
import { getPostsByCategory, searchPosts } from "@/lib/sanity.queries"
import type { BlogPost, Category } from "@/lib/sanity.types"

interface BlogContentProps {
  initialPosts: BlogPost[]
  categories: Category[]
}

export function BlogContent({ initialPosts, categories }: BlogContentProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setSelectedCategory("")

    if (!query.trim()) {
      setPosts(initialPosts)
      return
    }

    setLoading(true)
    try {
      const results = await searchPosts(query)
      setPosts(results)
    } catch (error) {
      console.error("Error searching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = async (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    setSearchQuery("")

    if (!categorySlug) {
      setPosts(initialPosts)
      return
    }

    setLoading(true)
    try {
      const results = await getPostsByCategory(categorySlug)
      setPosts(results)
    } catch (error) {
      console.error("Error filtering by category:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Search and Filter */}
      <SearchFilter
        categories={categories}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />

      {loading ? (
        <div className="flex min-h-[400px] items-center" aria-live="polite" role="status">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Loading posts…
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex min-h-[400px] items-center" aria-live="polite" role="status">
          <p className="max-w-prose text-base text-muted-foreground md:text-lg">
            {searchQuery || selectedCategory
              ? "No posts match that search or filter yet."
              : "Nothing published yet. Check back soon."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </>
  )
}
