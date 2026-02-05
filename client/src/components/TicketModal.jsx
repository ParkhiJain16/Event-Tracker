import { useState } from "react";
import { api } from "../services/api";

function TicketModal({ event, onClose }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const submit = async () => {
    if (!email || !consent) {
      alert("Email and consent required");
      return;
    }

    await api.post("/leads", {
      email,
      consent,
      eventId: event._id
    });

    window.location.href = event.source.url;
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)"
    }}>
      <div style={{
        background: "#fff",
        padding: "20px",
        maxWidth: "400px",
        margin: "100px auto"
      }}>
        <h3>{event.title}</h3>

        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div>
          <input
            type="checkbox"
            checked={consent}
            onChange={e => setConsent(e.target.checked)}
          />
          <label>I agree to receive updates</label>
        </div>

        <button onClick={submit}>Continue</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TicketModal;
