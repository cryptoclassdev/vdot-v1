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
      <article className="h-full overflow-hidden rounded-xl bg-card transition-all duration-300 hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={
              post.featuredImage
                ? urlFor(post.featuredImage).width(600).height(450).url()
                : "/placeholder.svg?height=450&width=600&query=blog post thumbnail"
            }
            alt={post.featuredImage?.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="pt-5">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {post.categories.slice(0, 2).map((category, i) => (
                <span key={category._id} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-muted-foreground/50">·</span>}
                  <span>{category.title}</span>
                </span>
              ))}
            </div>
          )}

          <h3 className="mb-2 line-clamp-2 text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand-orange md:text-2xl">
            {post.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            {post.excerpt || "Read more."}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {post.author && (
              <>
                <span className="font-medium text-foreground">{post.author.name}</span>
                <span aria-hidden="true" className="text-muted-foreground/50">·</span>
              </>
            )}
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMM d, yyyy")}</time>
          </div>
        </div>
      </article>
    </Link>
  )
}
