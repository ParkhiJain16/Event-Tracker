import { useEffect, useState } from "react";
import { api } from "../services/api";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminEvents = async () => {
      try {
        const res = await api.get("/events/admin");
        console.log("Admin events response:", res.data); // 🔍 DEBUG
        setEvents(res.data);
      } catch (err) {
        console.error("Failed to fetch admin events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminEvents();
  }, []);

  const importEvent = async (id) => {
    try {
      await api.patch(`/events/${id}/import`);
      const res = await api.get("/events/admin");
      setEvents(res.data);
    } catch (err) {
      console.error("Import failed", err);
    }
  };

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading dashboard…</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Imported At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.status}</td>
                <td>
                  {event.importedAt
                    ? new Date(event.importedAt).toLocaleString()
                    : "-"}
                </td>
                <td>
                  {event.status !== "imported" && (
                    <button onClick={() => importEvent(event._id)}>
                      Import
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
