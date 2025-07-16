import { Sidebar } from "@/components/forum/sidebar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router";
import {type Post}  from "@/stores/forum/posts-store";

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([]); 

  useEffect(() => {
    const fetchPosts = async () => {
        const response = await axios.get(`http://localhost:3000/posts`);
        console.log("hell",response.data);
        console.log("bye",JSON.stringify( response.data))
        setPosts(response.data.posts);
    };

    fetchPosts();
  }, []); 

  return (
    <div className="flex">
      <h1 className="text-2xl font-bold mb-4">Forum Posts</h1>
      <nav>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.slug} className="border-b pb-2">
              <Link 
                to={`/forum/posts/${post.slug}`} 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {post.title}
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                By {post.author?.name} - {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))
          }
        </ul>
      </nav>
    </div>
  );
}