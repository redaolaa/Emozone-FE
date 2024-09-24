import { useState, useEffect, SyntheticEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/post";
import Post from "./Posts";
import { IUser } from "../interfaces/user";
import axios from "axios";

function ShowPost({ user }: { user: null | IUser }) {
  console.log("USER: ", user);
  const [post, setPost] = useState<IPost | null>(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(`api/post/${postId}`);
      const postData = await response.json();
      setPost(postData);
    }

    fetchPost();
  }, [postId]);

  async function deletePost(e: SyntheticEvent) {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/posts");
    } catch (error: any) {
      console.log(error.response.data);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {post && <Post {...post} />}
        </div>
        {post && post.user === user?._id && (
          <button onClick={deletePost} className="button is-danger">
            Delete
          </button>
        )}
      </div>
    </section>
  );
}

export default ShowPost;