"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CommentFormProps {
  postId: string
}

export function CommentForm({ postId }: CommentFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          body: comment,
          postId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit comment")
      }

      setSubmitStatus("success")
      setName("")
      setEmail("")
      setComment("")
    } catch (error) {
      console.error("Error submitting comment:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-6 text-2xl font-bold text-foreground">Leave a Comment</h3>

      {submitStatus === "success" && (
        <div className="mb-6 rounded-lg bg-brand-cyan/10 p-4 text-brand-cyan">
          <p className="font-semibold">Your comment is awaiting moderation</p>
          <p className="mt-1 text-sm">Thank you for your comment! It will be visible once approved.</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 rounded-lg bg-red-500/10 p-4 text-red-500">
          <p className="font-semibold">Error submitting comment</p>
          <p className="mt-1 text-sm">Please try again later.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
            Email *
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="comment" className="mb-2 block text-sm font-semibold text-foreground">
            Comment *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={5}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/20"
            placeholder="Share your thoughts..."
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-3xl bg-brand-orange px-8 py-3 font-bold text-white shadow-lg transition-colors hover:bg-brand-orange/90 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Comment"}
        </Button>
      </form>
    </div>
  )
}
