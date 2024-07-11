import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import gql from "graphql-tag";
import { GET_RANDOM_USER_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";
import pfp from "../pfp.png";
import "../Misc.css";
import Headerbar from "../components/Headerbar";
import Daily from "../components/Daily";
import Seasonal from "../components/Seasonal";
import Spotlight from "../components/Spotlight";
import Footer from "../components/Footer";
import "./Home.css";
function Home() {

  return (
    <div>
      <Headerbar />
      <div id="intro">
        <div id="intro-text">NEW CLOTHES FROM STARTUP BRANDS</div>
      </div>
      <Daily />
      <Link to="/clothes">
        <div id="shop-apparel">
          <div id="shop-apparel-text">Browse Apparel</div>
        </div>
      </Link>
      <Link to="/brands">
        <div id="shop-brands">
          <div id="shop-brands-text">Discover Brands</div>
        </div>
      </Link>
      <Footer />
    </div>
  );
}

export default Home;
