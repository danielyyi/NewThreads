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
import TagItem from "../components/TagItem";
import { GET_TAGS_QUERY } from "../util/graphql";
function Home() {
  var tags = [];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { loading, data } = useQuery(GET_TAGS_QUERY, {});

  if (!loading && data && data.getTags) {
    tags = data.getTags;
    console.log(tags);
  }

  return (
    <div>
      <Headerbar />
      <div id="intro">
        <div id="intro-text">Find Clothes from Startup Brands.</div>
      </div>
      <Daily />
      <div id="explore-text">Shop Niches</div>
      <div id="shop-by-tag-holder">
        <div id="shop-by-tag">
          {loading ? (
            <div className="loader-holder">
              <div className="loader">Tags...</div>
            </div>
          ) : (
            tags &&
            tags.map((tag, index) => (
              <Link to={`/explore/${tag.name}`}>
                <TagItem key={index} name={tag.name} color={tag.color} />
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
