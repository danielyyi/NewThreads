import React from "react";
import { Link } from "react-router-dom";
//import astro from "../astro.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";
import { faCaretDown, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import RegisterPopup from "./RegisterPopup";
import LoginPopup from "./LoginPopup";
function Footer() {
  const { user } = useContext(AuthContext);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div id="footer-wrapper">
      {showRegister && !showLogin ? (
        <RegisterPopup setRegister={setShowRegister} setLogin={setShowLogin}/>
      ) : (
        <></>
      )}
      {showLogin && !showRegister ? (
        <LoginPopup setLogin={setShowLogin} setRegister={setShowRegister}/>
      ) : (
        <></>
      )}
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
                      <a onClick={() => setShowLogin(true)}>Login</a>
                    </li>

                    <li>
                      <a onClick={() => setShowRegister(true)}>
                        Register Your Brand
                      </a>
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
