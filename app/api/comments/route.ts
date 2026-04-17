import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, body: commentBody, postId } = await request.json()

    if (!name || !email || !commentBody || !postId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const token = process.env.SANITY_API_TOKEN
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

    if (!token || !projectId) {
      console.error(
        "Comment route misconfigured:",
        !token ? "SANITY_API_TOKEN missing" : "NEXT_PUBLIC_SANITY_PROJECT_ID missing",
      )
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

    const sanityUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`

    const response = await fetch(sanityUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mutations: [{ create: commentDoc }],
        returnDocuments: true,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Sanity mutate API error:", response.status, errorText)
      return NextResponse.json(
        { error: "Failed to create comment in Sanity", details: errorText },
        { status: 500 },
      )
    }

    const result = await response.json()

    if (!result.results || result.results.length === 0) {
      console.error("Sanity mutate returned no results")
      return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
    }

    const createdComment = result.results[0].document

    if (createdComment && createdComment._id) {
      return NextResponse.json({ success: true, comment: createdComment }, { status: 201 })
    }

    // Document created but not returned in response — still a success from the user's perspective
    return NextResponse.json(
      { success: true, message: "Comment submitted for moderation" },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating comment:", error)
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ error: "Failed to create comment", details: message }, { status: 500 })
  }
}
