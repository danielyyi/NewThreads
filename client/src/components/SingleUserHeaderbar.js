import Logo from "../YoustagramLogo.png";
import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth";
import pfp from "../pfp.png";
import "./SingleUserHeaderbar.css";

function SingleUserHeaderbar({ username }) {
  console.log(username);
  //if it works it works...
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      username,
    },
  });

  let searchUser;
  if (data) {
    searchUser = data.searchUser;
  }
  //----
  let postMarkup;
  if (!searchUser) {
    postMarkup = <p>Loading...</p>;
  } else {
    const { bio, createdAt, email, id, username, pfp, brandLink } = searchUser;
    postMarkup = (
      <div className="profile-headerbar">
      <div className="profile-top">
        <img className="pfp" src={pfp}></img>
      </div>
      <div className="profile-middle">
        <div className="profile-name">{username}</div>
        <div className="profile-buttons">
        <a
          href={`${brandLink}`}
          className="profile-bio"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit their site
        </a>
        </div>
      </div>
        <div className="profile-bio">{bio}</div>
        
      </div>
    );
  }

  return postMarkup;
}
const FETCH_USER_QUERY = gql`
  query ($username: String!) {
    searchUser(username: $username) {
      bio
      createdAt
      email
      id
      pfp
      username
      brandLink
    }
  }
`;

export default SingleUserHeaderbar;
