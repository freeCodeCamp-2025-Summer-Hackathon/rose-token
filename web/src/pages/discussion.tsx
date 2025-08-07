import axios from "axios";
import { useEffect, useState } from "react";
import { type Post } from "@/stores/forum/posts-store"
import { Sidebar } from "@/components/forum/sidebar";
import PostList from "@/components/forum/post-list";

export const Forum = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const fetchPosts = async () => {
    const response = await axios.get(`http://localhost:3000/posts/main`);
    setPosts(response.data.posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  return (
    <section className="flex gap-4 justify-between mt-16 p-2">
      <Sidebar />
      <PostList posts={posts}/>
    </section>
  );
};
