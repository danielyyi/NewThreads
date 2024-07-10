import React, { useContext } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
//import astro from "../astro.jpg";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../context/auth";
import Post from "./Post";
import BrandTag from "./BrandTag";

import "./Seasonal.css";

function Seasonal() {
  return (
    <div id="seasonal-card">
      <div id="title3">Summer Shorts</div>
      <div>insert four pieces of the clothing</div>
    </div>
  );
}

export default Seasonal;
