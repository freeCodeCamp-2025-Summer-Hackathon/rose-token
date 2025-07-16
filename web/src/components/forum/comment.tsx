import { type Comment } from "@/stores/forum/posts-store"

function Comment( { comment }: { comment: Comment }) {
    return (
      <div className="mb-4 last:mb-0">
        <p className="mb-2">{comment.comment}</p>
        <small className="text-gray-500 flex gap-4">
            <span className="text-blue-300">{comment.author.name}</span>
            <span>{new Date(comment.createdAt).toLocaleDateString() }</span>
        </small>
      </div>
    );
}

export default function CommentsSection({ comments }: {comments: Comment[]}) {
  if (comments.length === 0) return null;

  return (
    <div className="text-sm font-light rounded-md p-4 bg-zinc-900">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};