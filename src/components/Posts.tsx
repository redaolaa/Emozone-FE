import { Link, useNavigate } from "react-router-dom";
import { IPost } from "../interfaces/post";
import axios from "axios";
import { useState } from "react";
import "../App.css";
import { FaPen } from "react-icons/fa";


interface PostProps extends IPost {
  onDelete: (postId: string) => void;
}
function Post({ _id, name, image, zone, user, onDelete }: PostProps) {
  const navigate = useNavigate();
  // Function to handle deleting the post
  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/api/posts/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onDelete(_id); // Call the onDelete function passed from the parent to remove the post from the UI
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile ">
      <Link to={`/post/${_id}`}>
        <div className="card " style={{ maxWidth: "250px", margin: "auto" }}>
          <header className=" card-header">
            
            {user && ( 
                <>
                <button
              className="delete is-large "
              onClick={handleDeletePost}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 10,
              }}>

              </button>

              <div className="buttons mt-2"   style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                left: "180px",
                zIndex: 10,
              }}>
                
              <FaPen 
       
               onClick={() => navigate(`/edit/${_id}`)}
                />
             
           </div>
           </>
            )}
            


            



            <p className="card-header-title is-size-7">{name}</p>


          </header>
          {/* // fixing my image height */}
          <div className="card-image">
            <figure
              className="image"
              style={{ width: "100%", height: "150px", overflow: "hidden" }}>
              <img
                src={image}
                alt={name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Ensures the entire image is visible
                }}
              />
            </figure>
          </div>

          {/* Card Content with colored strip */}
          <div
            className="card-content"
            style={{
              backgroundColor: `${zone}`,
              padding: "10px",
              minHeight: "50px",
              marginTop: "10px",
            }}>
            <div className="content" style={{ fontSize: "0.85rem" }}></div>
          </div>
        </div>
      </Link>

    </div>
  );
}

export default Post;
