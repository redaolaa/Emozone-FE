import { useState, useEffect } from "react";
import { IPost } from "../interfaces/post";
import Post from "./Posts";
import axios from "axios";
import { IUser } from "../interfaces/user";

type Posts = IPost[];

function PostList({ user }: { user: null | IUser }) {
  const [posts, setPosts] = useState<Posts>([]);
  const [error, setError] = useState<string | null>(null);
  console.log(" PostList is rendering");
  console.log(error);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get("/api/posts");
        console.log("Fetched posts data: ", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setError("failed to load posts");
      }
    }
    fetchPosts();
  }, []);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="columns is-multiline">
      {posts.map((post) => (
        <Post
          key={post._id}
          {...post}
          onDelete={handleDeletePost}
          user={user}
        />
      ))}
    </div>
  );
}

export default PostList;
