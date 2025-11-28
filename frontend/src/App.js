import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/404/404";
import Home from "./pages/home/home";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";

/**
 * Main application component.
 * Sets up routing for the application using React Router.
 *
 * @component
 * @returns {JSX.Element} The rendered application component.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
