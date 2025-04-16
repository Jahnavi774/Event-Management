import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/event/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Error fetching event details", err);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleProceed = () => {
    // Optionally store ticket count in localStorage or context
    localStorage.setItem("ticketCount", tickets);
    navigate(`/payment/${eventId}`);
  };

  if (!event) return <p>Loading event details...</p>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Book Your Ticket</h2>
      <h3>{event.name}</h3>
      <p>Category: {event.category}</p>
      <p>Location: {event.location}</p>
      <p>Price: ₹{event.price}</p>
      <p>Available Tickets: {event.availableTickets}</p>

      <label>
        Number of Tickets:
        <input
          type="number"
          min="1"
          max={event.availableTickets}
          value={tickets}
          onChange={(e) => setTickets(Number(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
      </label>

      <div>
        <button
          style={{
            backgroundColor: "#28a745",
            color: "white",
            padding: "10px",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
            borderRadius: "5px"
          }}
          onClick={handleProceed}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
