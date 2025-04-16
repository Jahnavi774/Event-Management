import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchHistory(currentUser.uid);
    });
    return () => unsubscribe();
  }, []);

  const fetchHistory = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/history/${userId}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">EventHub</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
      </div>

      <div className="nav-right">
        {user && (
          <div className="profile-menu">
            <FaUserCircle
              className="profile-icon"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="dropdown">
                <p className="profile-name">{user.displayName || "User"}</p>
                <p className="profile-email">{user.email}</p>
                <hr />
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <div className="dropdown-item history-dropdown">
                  <p>History</p>
                  <ul>
                    {history.length === 0 ? (
                      <li>No bookings yet</li>
                    ) : (
                      history.map((event, index) => (
                        <li key={index}>{event.eventName} ({event.genre})</li>
                      ))
                    )}
                  </ul>
                </div>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  Logout
                </button>
                <hr />
                <Link to="/privacy-policy" className="dropdown-item">Privacy Policy</Link>
              </div>
            )}
          </div>
        )}

        {!user && (
          <div className="auth-links">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
