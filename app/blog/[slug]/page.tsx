import { notFound } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { ArrowLeft } from 'lucide-react'
import { PortableText } from "@portabletext/react"
import { getPostBySlug, getAllPosts, getCommentsByPostId } from "@/lib/sanity.queries"
import { urlFor } from "@/lib/sanity"
import { portableTextComponents } from "@/components/blog/PortableTextComponents"
import { Footer } from "@/components/Footer"
import { CommentForm } from "@/components/blog/CommentForm"
import { CommentList } from "@/components/blog/CommentList"

// ISR: Revalidate every hour as fallback, webhook handles instant updates
export const revalidate = 3600

// Allow dynamic params for new posts created after build
export const dynamicParams = true

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts
    .filter((post) => post.slug && post.slug.current)
    .map((post) => ({
      slug: post.slug.current,
    }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const comments = await getCommentsByPostId(post._id)

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
            <Link href="/blog" className="text-base font-medium text-foreground underline decoration-brand-orange decoration-2 underline-offset-8 transition-colors hover:text-muted-foreground">
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

      <main className="px-4 py-16 md:px-8 md:py-24 lg:px-15">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to writing
          </Link>

          {post.categories && post.categories.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {post.categories.map((category, i) => (
                <span key={category._id} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-muted-foreground/50">·</span>}
                  <span>{category.title}</span>
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-8 break-words text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <div className="mb-12 flex items-center gap-4 text-sm text-muted-foreground">
            {post.author && (
              <>
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <Image
                      src={urlFor(post.author.image).width(40).height(40).url() || "/placeholder.svg"}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      sizes="40px"
                      className="rounded-full"
                    />
                  )}
                  <span className="font-medium text-foreground">{post.author.name}</span>
                </div>
                <span aria-hidden="true" className="text-muted-foreground/50">·</span>
              </>
            )}
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</time>
          </div>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={urlFor(post.featuredImage).width(1200).height(675).url() || "/placeholder.svg"}
                alt={post.featuredImage.alt || post.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
            {post.content && Array.isArray(post.content) && post.content.length > 0 ? (
              <PortableText value={post.content} components={portableTextComponents} />
            ) : (
              <p className="text-muted-foreground">No content available.</p>
            )}
          </div>

          {/* Author Bio */}
          {post.author && post.author.bio && (
            <div className="mt-12 rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start gap-4">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(80).height(80).url() || "/placeholder.svg"}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    sizes="80px"
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="mb-2 text-xl font-bold text-foreground">About {post.author.name}</h3>
                  <p className="text-muted-foreground">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 space-y-8">
            <CommentList comments={comments} />
            <CommentForm postId={post._id} />
          </div>
        </article>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
