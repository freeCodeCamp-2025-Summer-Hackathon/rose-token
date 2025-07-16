import {ChatCircleTextIcon} from "@phosphor-icons/react"
import { type Post } from "@/stores/forum/posts-store"
import CommentsSection from '@/components/forum/comment';
import { formatDate } from "@/lib/utils";

interface PostProps{
  post: Post;
}

const AddCommentButton = () => (
  <div className="flex gap-1 items-center w-max px-2 py-1 rounded-4xl bg-zinc-700 hover:bg-zinc-500">
    <ChatCircleTextIcon size={20} />
    <span className="text-xs">Add a comment</span>
  </div>
);

const PostMetadata = ({ post}: PostProps) => (
  <div className="flex gap-4 text-sm">
    <span className="text-blue-300">{post.author.name}</span>
    <span className="text-zinc-500">Created {new Date(post.createdAt).toLocaleDateString()}</span>
    <span className="text-zinc-500">Modified {new Date(post.updatedAt).toLocaleDateString()}</span>
  </div>
);

export function Post ({ post }: PostProps){
  const isMain = post.isMainPost;

  return (
    <article className={`mb-8 ${!isMain ? 'border-l-2 border-zinc-700 pl-6' : ''}`}>
        {isMain ? (<h1 className="text-3xl font-bold mb-4">{post.title}</h1>) : (null)} 
        <PostMetadata post={post} />
        <p className={`${isMain ? 'mt-8 mb-12' : 'mb-6 mt-4'}`}>{post.body}</p>
        <CommentsSection comments={post.comments} />
        <div className={isMain ? 'mt-8' : 'mt-4'}>
            <AddCommentButton/>
        </div>
    </article>
  );
};

export function Replies({ replyPosts }: { replyPosts: Post[] }){
  if (replyPosts.length === 0) return null;
  
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{replyPosts.length} Replies</h2>
      {replyPosts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

