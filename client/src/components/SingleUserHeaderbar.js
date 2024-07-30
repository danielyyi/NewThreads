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

function SingleUserHeaderbar({ userId }) {
  console.log(userId);
  //if it works it works...
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId,
    },
  });

  let searchUser;
  if (data) {
    searchUser = data.getUser;
  }
  //----
  let postMarkup;
  if (!searchUser) {
    postMarkup = <p></p>;
  } else {
    const { bio, createdAt, email, id, username, pfp, brandLink } = searchUser;
    postMarkup = (
      <div className="profile-headerbar">
      <div className="profile-top">
        <img id="pfp" src={pfp}></img>
      </div>
      <div className="profile-middle">
        <div className="profile-name">{username}</div>

      </div>
        <div className="profile-bio">{bio}</div>
        <div className="profile-buttons">
        <a
          href={`${brandLink}`}
          className="profile-link"
          id="visit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit site
        </a>
        </div>
      </div>
    );
  }

  return postMarkup;
}
const FETCH_USER_QUERY = gql`
  query ($userId: ID!) {
    getUser(userId: $userId) {
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
