import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Events.css";

const Events = () => {

  const [events, setEvents] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const bookEvent = async (event) => {

    if (!user) {
      alert("Please Login First");
      return;
    }

    try {

      const booking = {

        status: "CONFIRMED",

        user: {
          id: user.id
        },

        event: {
          id: event.id
        }

      };

      const res = await axios.post(
        "http://localhost:8080/bookings",
        booking
      );

      alert("✅ Event Booked Successfully");

      fetchEvents();

    } catch (err) {

      console.log(err);

      if (err.response) {
        alert(err.response.data);
      } else {
        alert("Booking Failed");
      }

    }

  };

  return (

    <div className="events-container">

      <h2>Available Events</h2>

      <div className="events-grid">

        {events.map((event) => (

          <div className="event-card" key={event.id}>

            <h3>{event.name}</h3>

            <p>{event.description}</p>

            <p>
              <b>Location :</b> {event.location}
            </p>

            <p>
              <b>Price :</b> ₹{event.price}
            </p>

            <p>
              <b>Seats :</b> {event.availableSeats}
            </p>

            <button
              className="book-btn"
              onClick={() => bookEvent(event)}
              disabled={event.availableSeats <= 0}
            >
              {event.availableSeats <= 0 ? "Sold Out" : "Book Now"}
            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Events;