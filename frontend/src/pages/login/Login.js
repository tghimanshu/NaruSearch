import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Login.css";

function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const registerUser = async (data) => {
    try {
      const res = await axios.post("/api/login", data);
      localStorage.setItem("token", res.headers["auth-token"]);
      setSuccess("User Logged In Sucessfully");
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setError(error.response.data.body || error.response.statusText);
      setTimeout(() => setError(""), 3000);
    }
  };
  return (
    <div className="loginPage row d-flex justify-content-center align-items-center">
      <div className="card col-md-3 rounded mx-3">
        <div className="card-body px-2 py-4">
          <h1 className="mb-5 text-center">Naru Search</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit(registerUser)}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "invalid email address",
                  },
                })}
              />
              {errors.email && (
                <small className="formErrors">{errors.email.message}</small>
              )}
              <label htmlFor="#email">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 3,
                    message: "Password should be atleast 3 characters long",
                  },
                })}
              />
              {errors.password && (
                <small className="formErrors">{errors.password.message}</small>
              )}
              <label htmlFor="#password">Password</label>
            </div>
            <button type="submit" className="btn btn-lg btn-success w-100 mb-2">
              Login
            </button>
            <p className="text-center">
              New to NaruSearch? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
