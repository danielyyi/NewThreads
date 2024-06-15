import Logo from "../YoustagramLogo.png";
import { Link } from "react-router-dom";
import "../Misc.css";
import { faCaretDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Headerbar() {
  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/">
          <div className="logo">NewThreads</div>
        </Link>
        <div className="dropdown">
          <button className="dropbtn">
            <Link to="/clothes/0">APPAREL</Link>
          </button>
        </div>
        <div className="dropdown">
          <button className="dropbtn">
            <Link to="/brands">BRANDS</Link>
          </button>
        </div>

        <div className="dropdown">
          <button className="dropbtn">
            <Link to="/women">DISCOVER</Link>
          </button>
          <div className="dropdown-content">
            <a href="#">Tees</a>
            <a href="#">Hoodies/Sweaters</a>
            <a href="#">Pants</a>
            <a href="#">Shorts</a>
            <a href="#">Dresses</a>
          </div>
        </div>

      </div>
      <div className="right-section">
        <div className="dropdown">
          <button className="dropbtn">
            <FontAwesomeIcon size="xl" icon={faUserCircle} />
          </button>
          <div className="dropdown-content">
            <div className="dropdown-content">
              <Link to="/login">
                <a href="#">Login</a>
              </Link>
              <Link to="/register">
                <a href="#">Register</a>
              </Link>
              <Link to="/profile">
                <a href="#">Profile</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Headerbar;
