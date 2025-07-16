import { dummyPosts } from "@/stores/forum/posts-store"
import { Post, Replies } from "@/components/forum/post";
import { Sidebar } from "@/components/sidebar";
import PostList from "@/components/forum/post-list";

export const Discussion = () => {
  // const mainPost = dummyPosts.find(post => post.isMainPost);
  // const replyPosts = dummyPosts.filter(post => !post.isMainPost);

  return (
    <section className="flex justify-between mt-16 p-2">
      <Sidebar />
      {/* <section className="flex-grow">
        <div className="w-3/4 px-12">
          {mainPost && <Post post={mainPost} />}
          <Replies replyPosts={replyPosts} />
        </div>
      </section> */}
      <PostList posts={dummyPosts}/>
    </section>
  );
};
