import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./Register.css";

function RegisterPage() {
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
      if (data.password !== data.confirmPassword) {
        return setError("Passwords Don't Match");
      }
      const res = await axios.post("/api/register", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      setSuccess("User Registered Sucessfully");
      localStorage.setItem("token", res.headers["auth-token"]);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setError(error.response.data.body);
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="registerPage row d-flex justify-content-center align-items-center">
      <div className="card col-md-5 rounded">
        <div className="card-body px-2 py-4">
          <h1 className="mb-5 text-center">Naru Search</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form className="row" onSubmit={handleSubmit(registerUser)}>
            <div className="col-12 col-md-6">
              <div className="form-floating  mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="first"
                  placeholder="First Name"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "First Name is Required",
                    },
                    min: {
                      value: 1,
                      message: "First Name should be of atleast 1 Character",
                    },
                    pattern: {
                      value: /[A-Za-z]*/,
                      message: "Only Alphates Allowed In First Name",
                    },
                  })}
                />
                {errors.firstName && (
                  <small className="formErrors">
                    {errors.firstName.message}
                  </small>
                )}
                <label htmlFor="#first">First Name*</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating  mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="last"
                  placeholder="Last Name"
                  {...register("lastName", {
                    min: {
                      value: 1,
                      message: "Last name should be of atleast 1 Character",
                    },
                    pattern: {
                      value: /[A-Za-z]*/,
                      message: "Only Alphates Allowed In Last Name",
                    },
                  })}
                />
                {errors.lastName && (
                  <small className="formErrors">
                    {errors.firstName.message}
                  </small>
                )}
                <label htmlFor="#last">Last Name</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "First Name is Required",
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
            </div>

            <div className="col-12 col-md-6">
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
                  <small className="formErrors">
                    {errors.password.message}
                  </small>
                )}
                <label htmlFor="#password">Password</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "Confirm Password is Required",
                    },
                    minLength: {
                      value: 3,
                      message:
                        "Confirm Password should be atleast 3 characters long",
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <small className="formErrors">
                    {errors.confirmPassword.message}
                  </small>
                )}
                <label htmlFor="#cpassword">Confirm Password*</label>
              </div>
            </div>
            <button type="submit" className="btn btn-lg btn-success w-100 mb-2">
              Sign Up
            </button>
            <p className="text-center">
              Already Registered? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
