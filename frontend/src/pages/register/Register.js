import { Link } from "react-router-dom";
import "./Register.css";

function RegisterPage() {
  return (
    <div className="registerPage row d-flex justify-content-center align-items-center">
      <div className="card col-md-5 rounded">
        <div className="card-body px-2 py-4">
          <h1 className="mb-5 text-center">Naru Search</h1>
          <form className="row">
            <div className="col-6">
              <div className="form-floating  mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="first"
                  placeholder="First Name"
                />
                <label htmlFor="#first">First Name</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating  mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="last"
                  placeholder="Last Name"
                />
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
                />
                <label htmlFor="#email">Email Address</label>
              </div>
            </div>

            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                />
                <label htmlFor="#password">Password</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  placeholder="Confirm Password"
                />
                <label htmlFor="#cpassword">Confirm Password</label>
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
