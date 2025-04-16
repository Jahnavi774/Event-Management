import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [location.pathname]); // Re-fetch data when returning to HomePage

  const filteredEvents =
    selectedGenre === "All"
      ? events
      : events.filter((event) => event.category === selectedGenre);

  return (
    <div>
      <section style={{ padding: "20px", textAlign: "center", background: "#f4f4f4" }}>
        <h1>Discover & Book Exciting Events!</h1>
        <p>Find concerts, comedy shows, tech meetups, and more.</p>
      </section>

      <div style={{ margin: "20px", textAlign: "center" }}>
        <label><strong>Filter by Genre:</strong> </label>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="All">All</option>
          <option value="Music">Music</option>
          <option value="Comedy">Comedy</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} style={{ border: "1px solid #ddd", padding: "15px", width: "280px", textAlign: "center", borderRadius: "10px" }}>
              <img
                src={`http://localhost:5000/${event.image}`}
                alt={event.name}
                style={{ width: "100%", borderRadius: "10px", height: "150px", objectFit: "cover" }}
              />
              <h3>{event.name}</h3>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <p><strong>Tickets Left:</strong> {event.availableTickets}</p>
              <button
                style={{
                  backgroundColor: "#007BFF",
                  color: "white",
                  padding: "10px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                  borderRadius: "5px"
                }}
                onClick={() => navigate(`/book/${event._id}`)}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
