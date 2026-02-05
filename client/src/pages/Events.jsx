import { useEffect, useState } from "react";
import { api } from "../services/api";
import TicketModal from "../components/TicketModal";

function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  // ✅ DEFENSIVE FILTER
  const sydneyEvents = events.filter(e =>
    e.city?.toLowerCase().includes("syd")
  );

  return (
    <div className="container">
      <h1>Sydney Events</h1>

      {sydneyEvents.length === 0 && <p>No events found.</p>}

      <div className="grid">
        {sydneyEvents.map(event => (
          <div key={event._id} className="card">
            <img src={event.imageUrl} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.city}</p>

            <button onClick={() => setSelectedEvent(event)}>
              GET TICKETS
            </button>
          </div>
        ))}
      </div>

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
