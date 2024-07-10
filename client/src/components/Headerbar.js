import Logo from "../YoustagramLogo.png";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../Misc.css";
import "./Headerbar.css";
import { faCaretDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../context/auth";

function Headerbar() {
  const { user } = useContext(AuthContext);
  const pathname = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1, window.location.href.lastIndexOf("/")+6
  ); //name of page aka /login etc.

  const path = pathname === "" ? "home" : pathname;
  console.log(pathname);
  const [activeItem] = useState(path);

  return (
    <nav className="navbar">
      <div id="nav-elements">
        <Link to="/">
          <div className="logo">NewThreads</div>
        </Link>
        <div id="nav-buttons">
          <Link
            to="/clothes"
            id={activeItem === "cloth" ? "active-icon" : "inactive-icon"}
          >
            APPAREL
          </Link>
          <Link
            to="/brands"
            id={activeItem === "brand" ? "active-icon" : "inactive-icon"}
          >
            BRANDS
          </Link>
          {user ? (
            <Link
              to="/profile"
              id={activeItem === "profile" ? "active-icon" : "inactive-icon"}
            >
              <FontAwesomeIcon icon={faUserCircle} />
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Headerbar;
