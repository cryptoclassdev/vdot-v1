import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

// Sanity webhook secret for verification
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET

interface SanityWebhookBody {
  _type: string
  _id: string
  slug?: {
    current: string
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const secret = request.headers.get('x-sanity-webhook-secret')

    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: 'Invalid webhook secret' },
        { status: 401 }
      )
    }

    const body: SanityWebhookBody = await request.json()

    // Handle different content types
    if (body._type === 'post') {
      // Revalidate the blog listing page
      revalidatePath('/blog')

      // Revalidate the specific blog post if slug exists
      if (body.slug?.current) {
        revalidatePath(`/blog/${body.slug.current}`)
      }

      return NextResponse.json({
        revalidated: true,
        message: `Revalidated blog pages for post: ${body.slug?.current || body._id}`,
        paths: ['/blog', body.slug?.current ? `/blog/${body.slug.current}` : null].filter(Boolean)
      })
    }

    if (body._type === 'category') {
      // Revalidate the blog listing page when categories change
      revalidatePath('/blog')

      return NextResponse.json({
        revalidated: true,
        message: 'Revalidated blog listing for category update',
        paths: ['/blog']
      })
    }

    if (body._type === 'author') {
      // Revalidate all blog pages when author info changes
      revalidatePath('/blog', 'layout')

      return NextResponse.json({
        revalidated: true,
        message: 'Revalidated all blog pages for author update',
        paths: ['/blog']
      })
    }

    if (body._type === 'comment') {
      // Revalidate when comments are approved/updated
      // Note: We'd need the post reference to revalidate the specific post
      // For now, this triggers on comment moderation
      return NextResponse.json({
        revalidated: false,
        message: 'Comment updates do not trigger full revalidation'
      })
    }

    return NextResponse.json({
      revalidated: false,
      message: `Unknown content type: ${body._type}`
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { message: 'Error revalidating', error: String(error) },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint for manual testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path')

  if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    )
  }

  if (!path) {
    return NextResponse.json(
      { message: 'Missing path parameter' },
      { status: 400 }
    )
  }

  revalidatePath(path)

  return NextResponse.json({
    revalidated: true,
    path
  })
}
