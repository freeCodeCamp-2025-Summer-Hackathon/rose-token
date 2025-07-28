import { formatDate } from "@/lib/utils";
import { type Comment } from "@/stores/forum/posts-store"

function Comment( { comment }: { comment: Comment }) {
    return (
      <div className="mb-4 last:mb-0">
        <p className="mb-2">{comment.comment}</p>
        <small className="text-gray-500 flex gap-4">
            <span className="text-blue-300">{comment.author.name}</span>
            <span>Created {formatDate(new Date(comment.date))}</span>
        </small>
      </div>
    );
}

export default function CommentsSection({ comments }: {comments: Comment[]}) {
  if (comments.length === 0) return <></>;

  return (
    <div className="text-sm font-light rounded-md p-4 bg-zinc-900">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};