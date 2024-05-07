import Logo from "../YoustagramLogo.png";
import { Link } from "react-router-dom";
import "../Home.css";
import { faCaretDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Headerbar() {
  return (
    <nav className="navbar">
      <div className="left-section">
      <Link to="/"><div className="logo">NewThreads</div></Link>
        <div class="dropdown">
          <button class="dropbtn"><Link to="/men">MEN</Link></button>
          <div class="dropdown-content">
            <a href="#">Tees</a>
            <a href="#">Hoodies/Sweaters</a>
            <a href="#">Pants</a>
            <a href="#">Shorts</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn"><Link to="/women">WOMEN</Link></button>
          <div class="dropdown-content">
            <a href="#">Tees</a>
            <a href="#">Hoodies/Sweaters</a>
            <a href="#">Pants</a>
            <a href="#">Shorts</a>
            <a href="#">Dresses</a>
          </div>
        </div>
        <div class="dropdown">
          <button class="dropbtn">
            <Link to="/search">BRANDS</Link>
          </button>
        </div>
      </div>
      <div className="right-section">
        <div class="dropdown">
          <button class="dropbtn">
            <FontAwesomeIcon size="xl" icon={faUserCircle} />
          </button>
          <div class="dropdown-content">
            <Link to="/login">
              <a href="#">Login</a>
            </Link>
            <Link to="/register">
              <a href="#">Register</a>
            </Link>
            <a href="#">Are You A Brand Owner?</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Headerbar;
