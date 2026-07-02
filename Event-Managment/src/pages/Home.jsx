import React from "react";
import API from "../services/api";

function Home() {
  return (
    <div className="container mt-5">

      <div className="text-center">

        <h1>Event Management System</h1>

        <p className="lead">
          Book tickets for your favourite events quickly and easily.
        </p>

        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200"
          className="img-fluid rounded shadow"
          alt="Events"
        />

      </div>
      <div className="hero">

<div className="text-center">

<h1>Welcome to Event Management</h1>

<p className="lead">
Book Tickets For Amazing Events
</p>

<a href="/events" className="btn btn-warning btn-lg">
Explore Events
</a>

</div>

</div>

    </div>
  );
}

export default Home;