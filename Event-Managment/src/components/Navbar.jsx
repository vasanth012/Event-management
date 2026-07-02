import { Link, useNavigate } from "react-router-dom";

function Navbar({ setUser }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">

      <Link className="navbar-brand" to="/home">
        Event Management
      </Link>

      <div className="navbar-nav ms-auto align-items-center">

        <Link className="nav-link" to="/home">
          Home
        </Link>

        <Link className="nav-link" to="/events">
          Events
        </Link>

        <Link className="nav-link" to="/bookings">
          My Bookings
        </Link>

        {/* Display Logged-in User Name */}
        <span className="navbar-text text-white mx-3">
          👤 Welcome, <strong>{user?.name || user?.username || user?.email}</strong>
        </span>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;