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
import BrandCard from "./BrandCard"
import { GET_RANDOM_USER_QUERY } from "../util/graphql";
import "./Spotlight.css";

function Spotlight() {
  var users = [];
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
  {loading ? (
    <div className="loader-holder">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="brand-holder">
      {users.map((user) => (
        <>
          <BrandCard user={user}></BrandCard>
        </>
      ))}
    </div>
  )}
  <button onClick={() => refetch()}>
    Press Me to Find <span>NEW</span> Clothes
  </button>
  return (
    <div id="spotlight-card">
      <div id="title2">Weekly  |  NewBrand Spotlight</div>
      <div>insert four pieces of the clothing</div>
    </div>
  );
}

export default Spotlight;
