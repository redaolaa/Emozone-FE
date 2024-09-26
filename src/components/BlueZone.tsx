import { useState, useEffect } from "react";
import { IPost } from "../interfaces/post";
import Post from "./Posts";
import axios from "axios";
import { IUser } from "../interfaces/user";

function BlueZone({user}: {user:null | IUser}) {
    console.log("USER,", user)
  const [posts, setPosts] = useState<IPost[]> ([]);
  const [error, setError] = useState<string | null>(null);
  console.log(" BlueZone is rendering");
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

  const blueZonePosts = posts.filter((post) => {
    console.log(`Checking post ${post._id} with zone: ${post.zone}`);
    return post.zone.toLowerCase() === "blue";
  });
  console.log("filtered blue zone posts", blueZonePosts);

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };
  
  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }


  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Blue Zone Tools</h1>
        <div className="columns is-multiline">
          {blueZonePosts &&
            blueZonePosts.map((post: IPost) => (
              <Post {...post} key={post._id}   onDelete= {handleDeletePost}/>
            ))}
          {error && <div className="has-text-danger">{error}</div>}
          {!blueZonePosts?.length && <p>No blue zone posts available.</p>}
        </div>
      </div>
    </section>
  );
}

export default BlueZone;
