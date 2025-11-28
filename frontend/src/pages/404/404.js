import { Link } from "react-router-dom";
import notFoundImage from "./404.png";
import "./404.css";

/**
 * 404 Page Not Found component.
 * Displays a 404 image and a link to go back to the home page.
 *
 * @component
 * @returns {JSX.Element} The rendered 404 page component.
 */
const PageNotFound = () => {
  return (
    <div className="notFoundContainer d-flex justify-content-center align-items-center">
      <div className="notFound d-flex flex-column justify-content-center align-items-center p-3">
        <img src={notFoundImage} width="50%" height="auto" alt="404 Not Found" />
        <h3 className="text-center">Page Not Found</h3>
        <Link to="/" className="btn btn-success">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
