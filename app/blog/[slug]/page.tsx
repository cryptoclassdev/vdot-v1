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

      {/* Blog Post Content */}
      <main className="px-4 py-12 md:px-8 lg:px-15">
        <article className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan transition-colors hover:text-brand-cyan/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span
                  key={category._id}
                  className="rounded-full bg-brand-cyan/10 px-3 py-1 text-sm font-semibold text-brand-cyan"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">{post.title}</h1>

          {/* Meta */}
          <div className="mb-8 flex items-center gap-4 text-muted-foreground">
            {post.author && (
              <>
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <Image
                      src={urlFor(post.author.image).width(48).height(48).url() || "/placeholder.svg"}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-semibold text-foreground">{post.author.name}</span>
                </div>
                <span>•</span>
              </>
            )}
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMMM dd, yyyy")}</time>
          </div>

          {/* Featured Image */}
          {post.mainImage && (
            <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url() || "/placeholder.svg"}
                alt={post.mainImage.alt || post.title}
                fill
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
