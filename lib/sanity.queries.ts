import { client } from "./sanity"
import type { BlogPost, Category, Comment } from "./sanity.types"

export async function getAllPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      "excerpt": pt::text(excerpt),
      content,
      "author": author->{
        _id,
        name,
        image,
        "bio": pt::text(bio)
      },
      publishedAt,
      mainImage,
      "categories": categories[]->{ 
        _id,
        title,
        slug
      }
    }`,
  )
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }`,
  )
}

export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      "excerpt": pt::text(excerpt),
      content,
      "author": author->{
        _id,
        name,
        image,
        "bio": pt::text(bio)
      },
      publishedAt,
      mainImage,
      "categories": categories[]->{ 
        _id,
        title,
        slug
      }
    }`,
    { categorySlug },
  )
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "post" && (
      title match $query + "*" ||
      pt::text(excerpt) match $query + "*"
    )] | order(publishedAt desc) {
      _id,
      title,
      slug,
      "excerpt": pt::text(excerpt),
      content,
      "author": author->{
        _id,
        name,
        image,
        "bio": pt::text(bio)
      },
      publishedAt,
      mainImage,
      "categories": categories[]->{ 
        _id,
        title,
        slug
      }
    }`,
    { query },
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      "excerpt": pt::text(excerpt),
      content,
      "author": author->{
        _id,
        name,
        image,
        "bio": pt::text(bio)
      },
      publishedAt,
      mainImage,
      "categories": categories[]->{ 
        _id,
        title,
        slug
      }
    }`,
    { slug },
  )
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  return client.fetch(
    `*[_type == "comment" && post._ref == $postId && approved == true] | order(createdAt desc) {
      _id,
      name,
      email,
      body,
      createdAt,
      approved
    }`,
    { postId },
  )
}

// Additional query functions can be added here
