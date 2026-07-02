import React from "react";
import QRCode from "react-qr-code";

function TicketQR({ event }) {
  return (
    <div
      className="card shadow-lg mt-5 p-4"
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <h2 className="text-success">
        🎟 Event Ticket
      </h2>

      <QRCode
        value={JSON.stringify({
          id: event.id,
          title: event.title,
          date: event.date,
          location: event.location,
        })}
        size={220}
      />

      <hr />

      <h3>{event.title}</h3>

      <p><strong>Date:</strong> {event.date}</p>

      <p><strong>Venue:</strong> {event.location}</p>

      <p className="text-success">
        Booking Confirmed
      </p>
    </div>
  );
}

export default TicketQR;