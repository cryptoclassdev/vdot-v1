import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { urlFor } from "@/lib/sanity"
import type { BlogPost } from "@/lib/sanity.types"

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block">
      <article className="h-full overflow-hidden rounded-2xl bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={
              post.featuredImage
                ? urlFor(post.featuredImage).width(600).height(400).url()
                : "/placeholder.svg?height=400&width=600&query=blog post thumbnail"
            }
            alt={post.featuredImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category._id}
                  className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-semibold text-brand-cyan"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-foreground transition-colors group-hover:text-brand-cyan">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {post.excerpt || "Read more to discover the full story..."}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {post.author && (
              <>
                <span className="font-semibold">{post.author.name}</span>
                <span>•</span>
              </>
            )}
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}
