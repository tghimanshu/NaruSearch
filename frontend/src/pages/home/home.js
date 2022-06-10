import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./home.css";

const Home = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
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
  }, []);
  return (
    <div className="jsonContainer d-flex justify-content-center align-items-center">
      <pre className="jsonCode p-5">{JSON.stringify(user, null, 2)}</pre>
      <div
        className="logout"
        onClick={(e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        <button className="btn btn-success">Log Out</button>
      </div>
    </div>
  );
};

export default Home;
