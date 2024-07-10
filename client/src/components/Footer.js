import React from "react";
import { Link } from "react-router-dom";
//import astro from "../astro.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
import { faCaretDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
function Footer() {
  const { user } = useContext(AuthContext);
  return (
    <div id="footer-wrapper">
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-row">
            <div class="footer-col">
              <h4>brand owners</h4>
              <ul>
                {user ? (
                  <Link to="/profile">
                    <li>
                      <a href="#">Profile</a>
                    </li>
                  </Link>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <a href="#">Login</a>{" "}
                      </Link>
                    </li>

                    <li>
                      {" "}
                      <Link to="/register">
                        <a href="#">Register Your Brand</a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div class="footer-col">
              <h4>company</h4>
              <ul>
                <li>
                  <Link to="/about">
                    <a href="#">About NewThreads</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
