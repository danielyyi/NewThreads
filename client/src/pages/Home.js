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
  const [term, newTerm] = useState("");

  const [page, setPage] = useState(0);
  const limit = 1;

  var users = [];
  console.log(limit * page);
  const { loading, data, refetch } = useQuery(GET_RANDOM_USER_QUERY, {
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first",
  });
  console.log(data);
  if (!loading && data && data.getRandomUser) {
    data.getRandomUser.forEach((element) => {
      users.pop();
      users.push(element);
    });

    console.log(users);
    console.log("pressed");
  }

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
