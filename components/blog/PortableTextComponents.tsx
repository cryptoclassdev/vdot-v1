import type { PortableTextComponents } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/lib/sanity"

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(800).url() || "/placeholder.svg"}
            alt={value.alt || "Blog image"}
            width={800}
            height={450}
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="mb-4 mt-8 text-4xl font-bold text-foreground">{children}</h1>,
    h2: ({ children }) => <h2 className="mb-3 mt-6 text-3xl font-bold text-foreground">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-4 text-2xl font-bold text-foreground">{children}</h3>,
    h4: ({ children }) => <h4 className="mb-2 mt-4 text-xl font-bold text-foreground">{children}</h4>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-foreground">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand-cyan pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2 text-foreground">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2 text-foreground">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = value?.href || ""
      if (href.startsWith("/")) {
        return (
          <Link href={href} className="text-brand-cyan underline hover:text-brand-cyan/80">
            {children}
          </Link>
        )
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-cyan underline hover:text-brand-cyan/80"
        >
          {children}
        </a>
      )
    },
  },
}
