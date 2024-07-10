import React, { useContext, useState, useEffect } from "react";
import pfp from "../pfp.png";
import { AuthContext } from "../context/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPlus,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

import { CirclePicker } from "react-color";

import MockPost from "../components/MockPost";

import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import "./ProfileHeaderbar.css";
import { Link } from "react-router-dom";

function ProfileHeaderbar({ canPost }) {
  const { user, logout } = useContext(AuthContext);
  //if it works it works...
  const { data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: user.id,
    },
  });
  console.log(data);
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
          <div className="profile-buttons">
            {canPost ? (
                  <Link to="/profile/create">
                  <button className="post-button" >
                    Post +
                  </button>
                </Link>
              
            ) : (
              <button className="post-button" disabled>Post +</button>
            )}

            <Link to="/profile/edit">
              <button className="post-button">Edit Profile</button>
            </Link>
            <Link to="/">
              <button className="dots-button" onClick={logout}>
                Logout
              </button>
            </Link>
          </div>
        </div>

        <div className="profile-bio">"{bio}"</div>
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

export default ProfileHeaderbar;
