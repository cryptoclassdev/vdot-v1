import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // Parse request body
    const { name, email, body: commentBody, postId } = await request.json()

    // Validate required fields
    if (!name || !email || !commentBody || !postId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const token = process.env.SANITY_API_TOKEN
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

    if (!token) {
      console.error("[v0] SANITY_API_TOKEN is not set")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    if (!projectId) {
      console.error("[v0] NEXT_PUBLIC_SANITY_PROJECT_ID is not set")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const commentDoc = {
      _type: "comment",
      name,
      email,
      body: commentBody,
      approved: false,
      createdAt: new Date().toISOString(),
      post: {
        _type: "reference",
        _ref: postId,
      },
    }

    console.log("[v0] Creating comment with document:", JSON.stringify(commentDoc, null, 2))

    // Make direct HTTP request to Sanity mutations API
    const sanityUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`

    const response = await fetch(sanityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            create: commentDoc,
          },
        ],
        returnDocuments: true,
      }),
    })

    console.log("[v0] Sanity API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Sanity API error:", errorText)
      return NextResponse.json({ error: "Failed to create comment in Sanity", details: errorText }, { status: 500 })
    }

    const result = await response.json()
    console.log("[v0] Sanity API result:", JSON.stringify(result, null, 2))

    if (!result.results || result.results.length === 0) {
      console.error("[v0] No results returned from Sanity")
      return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
    }

    const createdComment = result.results[0].document

    if (createdComment && createdComment._id) {
      console.log("[v0] Comment created successfully:", createdComment._id)
      return NextResponse.json({ success: true, comment: createdComment }, { status: 201 })
    } else {
      // Document was created but not returned in response
      console.log("[v0] Comment created successfully (no document returned)")
      return NextResponse.json({ success: true, message: "Comment submitted for moderation" }, { status: 201 })
    }
  } catch (error: any) {
    console.error("[v0] Error creating comment:", error)
    return NextResponse.json({ error: "Failed to create comment", details: error.message }, { status: 500 })
  }
}
