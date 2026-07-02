import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/API";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const register = async (e) => {

    e.preventDefault();

    try {

      await API.post("/users/register", user);

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Registration Failed");
      }

    }

  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card shadow p-4" style={{ width: "420px" }}>

        <h2 className="text-center mb-4">
          Register
        </h2>

        <form onSubmit={register}>

          <div className="mb-3">

            <label>Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              required
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              required
            />

          </div>

          <button className="btn btn-success w-100">
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?
        </p>

        <Link
          to="/login"
          className="btn btn-primary w-100"
        >
          Login
        </Link>

      </div>
    </div>
  );
}

export default Register;