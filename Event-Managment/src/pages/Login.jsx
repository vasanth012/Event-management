import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/API";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", loginData);

      localStorage.setItem("user", JSON.stringify(response.data));

      setUser(response.data);

      alert("Login Successful!");

      navigate("/home");

    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={login}>
          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
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
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?
        </p>

        <Link to="/register" className="btn btn-success w-100">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;