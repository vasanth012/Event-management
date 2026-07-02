import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "./MyBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Fetch bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/bookings/user/${userId}`
      );

      setBookings(res.data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  // Cancel booking
  const cancelBooking = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/bookings/${id}`);

      alert("Booking cancelled successfully.");

      fetchBookings();
    } catch (error) {
      console.error("Delete Error:", error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Unable to cancel booking.");
      }
    }
  };

  return (
    <div className="bookings-container">
      <h2 className="title">My Bookings</h2>

      <div className="bookings-grid">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((item) => (
            <div className="booking-card" key={item.id}>
              <h3>{item.event?.name}</h3>

              <p>📍 {item.event?.location}</p>

              <p>💰 ₹{item.event?.price}</p>

              <p className="status">
                Status: <b>{item.status}</b>
              </p>

              <div className="qr-box">
                <QRCodeCanvas
                  value={JSON.stringify({
                    bookingId: item.id,
                    userId: userId,
                    eventId: item.event?.id,
                    eventName: item.event?.name,
                  })}
                  size={120}
                />
              </div>

              <button
                className="cancel-btn"
                onClick={() => cancelBooking(item.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;