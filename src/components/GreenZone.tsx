import { useState, useEffect } from "react";
import { IPost } from "../interfaces/post";
import Post from "./Posts";
import axios from "axios";
import { IUser } from "../interfaces/user";

function GreenZone({user}: {user:null | IUser}) {
    console.log("USER,", user)
  const [posts, setPosts] = useState<IPost[]> ([]);
  const [error, setError] = useState<string | null>(null);
  console.log(" GreenZone is rendering");
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
  console.log("Posts before filtering:", posts);

  const greenZonePosts = posts.filter((post) => {
    console.log(`Checking post ${post._id} with zone: ${post.zone}`);
    return post.zone.toLowerCase() === "green";
  });
  console.log("filtered green zone posts", greenZonePosts);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };
  
  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }


  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Green Zone Tools</h1>
        <div className="columns is-multiline">
          {greenZonePosts &&
            greenZonePosts.map((post: IPost) => (
              <Post {...post} key={post._id} onDelete= {handleDeletePost} />
            ))}
          {error && <div className="has-text-danger">{error}</div>}
          {!greenZonePosts?.length && <p>No green zone posts available.</p>}
        </div>
      </div>
    </section>
  );
}

export default GreenZone;