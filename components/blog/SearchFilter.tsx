"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import type { Category } from "@/lib/sanity.types"

interface SearchFilterProps {
  categories: Category[]
  onSearch: (query: string) => void
  onCategoryChange: (categorySlug: string) => void
  selectedCategory: string
}

export function SearchFilter({ categories, onSearch, onCategoryChange, selectedCategory }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query)
  }

  return (
    <div className="mb-14 flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-center md:justify-between md:gap-10">
      <div className="relative flex-1 md:max-w-sm">
        <Search
          className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search blog posts"
          className="w-full border-b border-transparent bg-transparent py-2 pl-6 pr-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-orange"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          onClick={() => onCategoryChange("")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
            selectedCategory === ""
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onCategoryChange(category.slug.current)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
              selectedCategory === category.slug.current
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  )
}
