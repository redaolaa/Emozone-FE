import { Link, useNavigate} from 'react-router-dom'
import { IPost } from '../interfaces/post'
import axios from 'axios'
import { useState } from 'react'


interface PostProps extends IPost {
    onDelete: (postId: string) => void;

}
function Post({ _id, name, image, zone, onDelete}: PostProps) {
    const navigate = useNavigate();
    // Function to handle deleting the post
    const handleDeletePost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response= await axios.delete(`/api/posts/${_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
       
        onDelete(_id); // Call the onDelete function passed from the parent to remove the post from the UI
      } catch (error) {
        console.error("Error deleting post:", error);

      }
    };




    
    return <div className="column is-one-quarter-desktop is-one-third-tablet">
        <Link to={`/post/${_id}`}>
            <div className="card">
                <div className="card-header">
                    <div className="card-header-title">{name}</div>
                </div>
                <div className="card-image">
                    <figure className="image image-is-1by1">
                        <img src={image} alt={name} />
                    </figure>
                </div>
                <div className="card-content">
                    <h5>{zone}</h5>
        
                </div>
            </div>
        </Link>
        <div className="buttons mt-2">
        <button
              className="button is-danger mt-2"
              onClick={handleDeletePost}>
              Delete Post
            </button>
            <button className="button is-info" onClick={() => navigate(`/edit/${_id}`)}>
                    Edit Post
                </button>
            </div>
    </div>
}



export default Post