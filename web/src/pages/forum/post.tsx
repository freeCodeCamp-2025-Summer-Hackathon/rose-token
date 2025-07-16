import { Post as PostComponent, Replies } from "@/components/forum/post"
import { Sidebar } from "@/components/forum/sidebar";
import {type Comment, type Post } from "@/stores/forum/posts-store";
import { useEffect, useState } from "react";
import axios from 'axios'; 
import { useParams } from 'react-router'

export default function Discussion() {
  const [myposts, setPosts] = useState<Post[]>([])
  // const slug = "first-post-title-0d34bb32-564b-4f09-b849-4bd2f5cbcae6"
  const slug = useParams()
  console.log(slug)
  useEffect(()=>{
    const fetchPosts = async() => {
      const response = await axios.get(`http://localhost:3000/posts/${slug.slug}`)
      setPosts(response.data.posts)
      console.log(response.data.posts)
    }
    fetchPosts()
  }, [slug])

  const mainPost = myposts.find(post => post.isMainPost);
  const replyPosts = myposts.filter(post => !post.isMainPost);

  // const mainPost = dummyPosts.find(post => post.isMainPost);
  // const replyPosts = dummyPosts.filter(post => !post.isMainPost);

  return (
    <section className="flex justify-between mt-16 p-2">
      <Sidebar />
      <section className="flex-grow">
        <div className="w-3/4 px-12">
          {/* {posts && <Post post={posts} />}
          <Replies replyPosts={replies} /> */}
          {mainPost && <PostComponent post={mainPost} />}
          <Replies replyPosts={replyPosts} />
        </div>
      </section>
    </section>
  );
};