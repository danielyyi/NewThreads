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


import "./BrandTag.css";

function BrandCard({ user: { id, username, bio, brandLink, pfp} }) {
    
  return (
    <Link to={`/brands/${username}`}>
    <div id="brand-tag" key={id}>
      <div id="tag-text">
        <div id="tag-name">{username}</div>
        <div id="tag-desc">"{bio}"</div>
      </div>
      <div><img   id="tag-pfp" src={pfp}></img></div>
    </div>
    </Link>
  );
}
export default BrandCard;
