import { format } from "date-fns"
import type { Comment } from "@/lib/sanity.types"

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="mb-4 text-2xl font-bold text-foreground">Comments</h3>
        <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="mb-6 text-2xl font-bold text-foreground">Comments ({comments.length})</h3>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-cyan/10 font-bold text-brand-cyan">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-foreground">{comment.name}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(comment.createdAt), "MMMM dd, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
            <p className="text-foreground">{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
