import { BrowserRouter as Router, Routes, Route, Navigate,  } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import Signup from "./components/Signup";
import Login from "./components/Login";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import ShowPost from "./components/ShowPost";

function App() {
  const [user, setUser] = useState(null);
  // const navigate= useNavigate()

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }




  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <Router>
      < Navbar user={user} setUser={setUser} />
      <Routes>
         <Route path= "/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />

        <Route path="/posts" element={<PostList />} />
        <Route path="/createPost" element={<CreatePost user= {user} />} />
        <Route path="/post/:postId" element={<ShowPost user={user} />} /> */
      </Routes>
    </Router>
  );
}

export default App;