import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";
import { useState } from "react";

interface NavbarProps {
  user: null | IUser;
  setUser: Function;
}

function Navbar({ user, setUser }: NavbarProps) {
  const navigate = useNavigate();
  const [selectedZone, setSelectedZone]= useState<string>("");
console.log(selectedZone)
  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }
  const handleZoneSelection = (zone: string) => {
    setSelectedZone(zone);
    console.log(`Selected zone:${zone}`)

  };

  return (
    <>
      <header>
        <nav className="navbar is-dark">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Home
              </Link>
           
              {!user && (
                <Link to="/signup" className="navbar-item">
                  Signup
                </Link>
              )}
              {!user && (
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
              )}
                 <Link to="/posts" className="navbar-item">
                All Tools
              </Link>
                {!user && ( <Link to="/createPost" className="navbar-item">
                Create Tools
              </Link>
                )}
           
           {user && (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Select Zone</a>
                  <div className="navbar-dropdown">
                    {["Blue", "Green", "Yellow", "Red"].map((zone) => (
                      <a key={zone} className="navbar-item" onClick={() => handleZoneSelection(zone)}>
                        {zone} Zone
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {user && (
                <button
                  onClick={logout}
                  className="button navbar-item is-ghost"
                >
                  Logout
                </button>
              )}
              {user && (
                <span className="navbar-item ">{`Welcome back ${user.username}`}</span>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;