import { Link } from "react-router-dom";
import "./Login.css";

function LoginPage() {
  return (
    <div className="loginPage row d-flex justify-content-center align-items-center">
      <div className="card col-md-3 rounded">
        <div className="card-body px-2 py-4">
          <h1 className="mb-5 text-center">Naru Search</h1>
          <form>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
              />
              <label htmlFor="#email">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
              />
              <label htmlFor="#email">Email Address</label>
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
