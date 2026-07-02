import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import AddEvent from "./pages/AddEvent";
import MyBookings from "./pages/MyBookings";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  return (
    <BrowserRouter>
      {user && <Navbar setUser={setUser} />}

      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/home" replace />
            ) : (
              <Login setUser={setUser} />
            )
          }
        />

        <Route
          path="/register"
          element={
            user ? <Navigate to="/home" replace /> : <Register />
          }
        />

        <Route
          path="/home"
          element={
            user ? <Home /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/events"
          element={
            user ? <Events /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/bookings"
          element={
            user ? <MyBookings /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/addevent"
          element={
            user ? <AddEvent /> : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;