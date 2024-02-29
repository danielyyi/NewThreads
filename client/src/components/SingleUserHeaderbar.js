import Logo from '../YoustagramLogo.png'
import React, {useContext} from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth"
import pfp from "../pfp.png";

function SingleUserHeaderbar({username}) {
    console.log(username);  
    //if it works it works...
    const {
      data,
    } = useQuery(FETCH_USER_QUERY, {
      variables: {
        username
      }
    });
   
    let searchUser;
    if(data){
      searchUser = data.searchUser;
    }
    //----
    let postMarkup;
    if (!searchUser) {
      postMarkup = <p>Loading...</p>;
    } else {
      const { bio, createdAt, email, id, username } = searchUser;
      postMarkup = (
          <div>
          <div className="profile-other-headerbar">
        <div className="profile-header-info">
          <div className="profile-name-bio">
            <div className="profile-name">{username}</div>
            <div className="profile-bio">{bio}</div>
          </div>
          <img className="pfp" src={pfp} alt={"logo"} />
        </div>
      </div>

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
    username
    
    }
  }
`;

export default SingleUserHeaderbar


