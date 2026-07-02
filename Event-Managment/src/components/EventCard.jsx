import React from "react";

function EventCard({ event, onBook }) {
  return (
    <div className="col-md-4 mb-4">

      <div className="card shadow h-100">

        <img
          src={event.image}
          className="card-img-top"
          alt={event.title}
          style={{ height: "220px", objectFit: "cover" }}
        />

        <div className="card-body">

          <h4>{event.title}</h4>

          <p>{event.description}</p>

          <p>
            <strong>Date:</strong> {event.date}
          </p>

          <p>
            <strong>Venue:</strong> {event.location}
          </p>

          <button
            className="btn btn-success w-100"
            onClick={() => onBook(event)}
          >
            🎟 Book Ticket
          </button>

        </div>

      </div>

    </div>
  );
}

export default EventCard;