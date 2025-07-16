import { getPosts } from "@/api/services/forum";
import { Post, Replies } from "@/components/forum/post"
import { Sidebar } from "@/components/forum/sidebar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { routerForum } from ".";

export const Discussion = () => {
  const [posts, setPosts] = useState('')
  const [replies, setReplies] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      const { slug } = useParams<{ slug?: string }>();
      if(slug) {
        const response = await getPosts(slug);
      }
    };
    fetchPosts();
  }, []);

  const mainPost = dummyPosts.find(post => post.isMainPost);
  const replyPosts = dummyPosts.filter(post => !post.isMainPost);

  return (
    <section className="flex justify-between mt-16 p-2">
      <Sidebar />
      <section className="flex-grow">
        <div className="w-3/4 px-12">
          {mainPost && <Post post={mainPost} />}
          <Replies replyPosts={replyPosts} />
        </div>
      </section>
    </section>
  );
};