import { Post as PostComponent, Replies } from "@/components/forum/post"
import { Sidebar } from "@/components/forum/sidebar";
import {type Comment, type Post } from "@/stores/forum/posts-store";
import { useEffect, useState } from "react";
import axios from 'axios'; 
import { useParams } from 'react-router'
import { Input} from "@/components/forum/input";

export default function Discussion() {
  const [myposts, setPosts] = useState<Post[]>([])
  const slug = useParams()

  const fetchPosts = async() => {
    const response = await axios.get(`http://localhost:3000/posts/${slug.slug}`)
    setPosts(response.data.posts)
    console.log(response.data.posts)
  }
  useEffect(()=>{
    fetchPosts()
  }, [slug])

  const mainPost = myposts.find(post => post.isMainPost);
  const replyPosts = myposts.filter(post => !post.isMainPost);

  return (
    <section className="flex justify-between mt-16 p-2">
      <Sidebar />
      <section className="flex-grow">
        <div className="w-3/4 px-12">
          {mainPost && <PostComponent post={mainPost} />}
          <Replies replyPosts={replyPosts} />
          <form>
            <Input/>
            <button type="submit" className="mt-6 mb-6 p-2 bg-gray-500 hover:bg-gray-600 rounded-md">
              Post your answer
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};