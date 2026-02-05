import { useEffect, useState } from "react";
import { api } from "../services/api";
import TicketModal from "../components/TicketModal";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/events")
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load events", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading events...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1>Sydney Events</h1>

      {events.length === 0 && <p>No events found.</p>}

      {events.map(event => (
        <div
          key={event._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "6px"
          }}
        >
          <h3>{event.title}</h3>

          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              style={{
                width: "100%",
                maxHeight: "250px",
                objectFit: "cover",
                marginBottom: "10px"
              }}
            />
          )}

          <p style={{ color: "#555" }}>
            {event.description || "No description available."}
          </p>

          <p style={{ fontSize: "12px", color: "#777" }}>
            Source: {event.source?.name}
          </p>

          <button
            style={{
              padding: "10px 15px",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "10px"
            }}
            onClick={() => setSelectedEvent(event)}
          >
            GET TICKETS
          </button>
        </div>
      ))}

      {selectedEvent && (
        <TicketModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default Events;
