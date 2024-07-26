import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHome, faUser } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../context/auth";


function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  ); //name of page aka /login etc.

  const path = pathname === "" ? "home" : pathname;
  console.log(path);

  const [activeItem] = useState(path);



  const navbar = user ? (
    
    <div className="nav-container">
    
      <div className="nav">
        <Link to="/search">
          <FontAwesomeIcon
            name="search"
            className={
              activeItem === "search" ? "active-icon" : "inactive-icon"
            }
            size="lg"
            icon={faSearch}
          />
        </Link>
        <Link to="/">
          <FontAwesomeIcon
            name="home"
            className={activeItem === "home" ? "active-icon" : "inactive-icon"}
            size="lg"
            icon={faHome}
          />
        </Link>
        <Link to="/profile">
          <FontAwesomeIcon
            name="profile"
            className={
              activeItem === "profile" ? "active-icon" : "inactive-icon"
            }
            size="lg"
            icon={faUser}
          />
        </Link>
      </div>
    </div>
  ) : (
    <div className="nav-container">
      <div className="nav">
        <Link to="/search">
          <FontAwesomeIcon
            name="search"
            className={
              activeItem === "search" ? "active-icon" : "inactive-icon"
            }
            size="lg"
            icon={faSearch}
          />
        </Link>
        <Link to="/">
          <FontAwesomeIcon
            name="home"
            className={activeItem === "home" ? "active-icon" : "inactive-icon"}
            size="lg"
            icon={faHome}
          />
        </Link>
        <Link to="/noprofile">
          <FontAwesomeIcon
            name="noprofile"
            className={
              activeItem === "noprofile" ? "active-icon" : "inactive-icon"
            }
            size="lg"
            icon={faUser}
          />
        </Link>
      </div>
    </div>
  );

  return navbar;
}

export default Navbar;
