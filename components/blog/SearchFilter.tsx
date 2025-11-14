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
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 md:max-w-md">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-full border border-border bg-background py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            selectedCategory === "" ? "bg-brand-cyan text-white" : "bg-muted text-foreground hover:bg-muted/80"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => onCategoryChange(category.slug.current)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              selectedCategory === category.slug.current
                ? "bg-brand-cyan text-white"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>
    </div>
  )
}
