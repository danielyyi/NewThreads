import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import ReactSlider from "react-slider";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Post from "../components/Post";
import { LOAD_POSTS_QUERY } from "../util/graphql";

import {
  useQuery,
  useLazyQuery,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import Footer from "../components/Footer";
import TagItem from "../components/TagItem";

import gql from "graphql-tag";
import { GET_TAGS_QUERY } from "../util/graphql";
import "./Explore.css";
//YOU NEED TO CHANGE CREATE POST TO LOAD POST QUERY
function Explore() {

  //----
  return (
    <>
      <Headerbar />
      
      <div id="explore-holder">
      <Link to="/clothes">
        <div id="all">
          <div id="all-text">All Apparel</div>
        </div>
      </Link>

      </div>
      <Footer />
    </>
    
  );
}

export default Explore;
