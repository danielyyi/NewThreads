import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import gql from "graphql-tag";
import { FETCH_USERS_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";
import pfp from "../pfp.png";
import "../Misc.css";
import "./Search.css";
import Headerbar from "../components/Headerbar";
import BrandTag from "../components/BrandTag";

function Brands() {
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  const [term, newTerm] = useState("");
  var users = [];
  if (!loading) {
    users = data.getUsers;
  }
  

  return (
    <div >
      <Headerbar/>
      {loading ? (
        <div className="loader-holder"><div className="loader"></div></div>
      ) : (
        <div className="search-page">
            {users.map((user) => (
              <div className="brand-card">
                {user.username.toLowerCase().indexOf(term.toLowerCase()) !=
                -1 ? (
                  <BrandTag user={user}></BrandTag>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
/*
const SEARCH_USER = gql`
  query searchUser($username: String!) {
    searchUser(username: $username) {
      id
      username
      bio
    }
  }
`;*/


/*          <div className="search-search-holder">
            <div className="search-search">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => newTerm(e.target.value)}
              ></input>
            </div>
          </div>*/

export default Brands;
