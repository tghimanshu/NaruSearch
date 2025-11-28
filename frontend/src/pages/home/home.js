import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./home.css";

/**
 * Home page component.
 * Displays user details if authenticated, otherwise redirects to login.
 *
 * @component
 * @returns {JSX.Element} The rendered home page component.
 */
const Home = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  /**
   * Effect hook to fetch user data on component mount.
   * Checks for a token in local storage, decodes it, and fetches user details from the API.
   * Redirects to login if token is missing or invalid.
   */
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    const getUser = async () => {
      try {
        const data = jwtDecode(localStorage.getItem("token"));
        const res = await axios.get(`/api/${data.id}`, {
          headers: { "auth-token": localStorage.getItem("token") },
        });
        setUser(res.data.body);
      } catch (error) {
        navigate("/login");
      }
    };

    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Handles user logout.
   * Removes the token from local storage and redirects to the login page.
   *
   * @param {React.MouseEvent} e - The click event.
   */
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="jsonContainer d-flex justify-content-center align-items-center">
      <pre className="jsonCode p-5">{JSON.stringify(user, null, 2)}</pre>
      <div className="logout" onClick={handleLogout}>
        <button className="btn btn-success">Log Out</button>
      </div>
    </div>
  );
};

export default Home;
