import { useState, useEffect } from "react";
import { IPost } from "../interfaces/post";
import Post from "./Posts";

type Posts = IPost[] | null

function PostList() {
  const [posts, setPosts] = useState<Posts>(null);
  console.log(" PostList is rendering")

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const postsData = await response.json();
      setPosts(postsData);
    }
    fetchPosts();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {posts?.map((post) => (
            <Post {...post} key={post._id} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PostList;