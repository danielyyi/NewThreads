import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function NoProfile() {
  return (
    <>
      <div className="form-holder">
        <form className="form">
          <div class="subtitle">You're not logged in...</div>

          <div class="input-container ic1">
            <Link to="/login">
              <button className="button">Login</button>
            </Link>
            <div class="cut"></div>
          </div>
          <div class="input-container ic2">
          <div class="subtitle-2">Don't have an account?</div>
            <div class="cut"></div>
          </div>
          <div class="input-container ic3">
            <Link to="/register">
              <button className="button">Sign Up</button>
            </Link>
            <div class="cut"></div>
          </div>
        </form>
      </div>
      <Navbar />
    </>
  );
}
export default NoProfile;
