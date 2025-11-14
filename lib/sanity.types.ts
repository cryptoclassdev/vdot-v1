import type { PortableTextBlock } from "@portabletext/types"

export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
}

export interface Category {
  _id: string
  _type: "category"
  title: string
  slug: {
    current: string
  }
}

export interface Author {
  _id: string
  _type: "author"
  name: string
  image?: SanityImage
  bio?: string
}

export interface BlogPost {
  _id: string
  _type: "post"
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: PortableTextBlock[]
  author: Author
  publishedAt: string
  featuredImage?: SanityImage  // ← Changed from mainImage (also made optional)
  categories: Category[]
}

export interface Comment {
  _id: string
  _type: "comment"
  name: string
  email: string
  body: string
  post: {
    _ref: string
    _type: "reference"
  }
  approved: boolean
  createdAt: string
}
