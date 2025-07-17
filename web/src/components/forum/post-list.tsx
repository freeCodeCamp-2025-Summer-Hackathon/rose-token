import type { ReactNode } from "react";
import type { Post } from "@/stores/forum/posts-store";
import { PostMetadata } from "./post";

const renderPost = (post: Post): ReactNode => {
    return (
        <article className={`mb-8 border-l-2 border-zinc-700 pl-6`}>
            <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
            <PostMetadata post={post} />
            <p className='mt-8 mb-12 line-clamp-1'>{post.body}</p>
        </article>
    );
}


interface PostListProps{
    posts: Post[];
}

const PostList = ({ posts = [] }: PostListProps) => {
    return posts.length > 0 ? (
        <div>
            {posts.map((post: Post) => renderPost(post))}
        </div>
    ) : (
        <div>
            No posts to view
        </div>
    )
}

export default PostList;
