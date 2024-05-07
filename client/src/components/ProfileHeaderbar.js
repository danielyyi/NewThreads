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

import { Link } from "react-router-dom";

function ProfileHeaderbar() {
  /*How the bio works: updateBio and bio are a function and variable from context/auth.js, in that page, bio is set to ''. Now, if
  that bio == '', then we know the bio has not since been edited so we will set theBio, which is what the bio is always supposed to be, to 
  user.bio because that is what the value is. If we edit the bio, then we call the updateBio function in context/auth.js, so 
  bio will go from '' to the new value. Now theBio will be set to that so the edited bio will be displayed in real time*/
  const { user, logout, updateBio, bio } = useContext(AuthContext);
  console.log(bio)
  console.log(user.bio)
  var theBio = "";
  if(user.bio){
    theBio = user.bio;
  }
  
  if(bio!=''){
    theBio = bio
  }

  console.log(useContext(AuthContext));
  const [edit, updateEdit] = useState(false);
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    bio: theBio,
  });

  const [editBio, { error }] = useMutation(EDIT_BIO_MUTATION, {
    variables: values,
  });

  function createPostCallback() {
    editBio();
    updateBio(values.bio);
    updateEdit(false);
  }

  return (
    <div className="profile-headerbar">
      
      <div className="profile-header-info">
        <div className="profile-name-bio">
          <div className="profile-name">{user.username}</div>
          {edit ? (
            <div>
              <form onSubmit={onSubmit} className="edit-bio-form">
              
                <textarea
                  className="edit-bio-input"
                  name="bio"
                  maxLength={45}
                  onChange={onChange}
                  value={values.bio}
                  rows="2" cols="4" wrap="hard"
                ></textarea>
                <button type="submit"  className="edit-profile-button" style={{margin:10}}>Done</button>
              </form>
            </div>
          ) : (
            <div className="profile-bio">{values.bio}</div>
          )}
        </div>
        {edit ? (
            <></>
          ) : (
            <></>
          )}
        
      </div>
      <div className="profile-header-buttons">
        <Link to="/createpost">
          <button className="post-button">Post +</button>
        </Link>
        <div className="header-right">
          {edit ? (
            <button
              type="button"
              className="edit-profile-button"
              onClick={() => updateEdit(false)}
            >
              Cancel Edit
            </button>
          ) : (
            <button
              className="edit-profile-button"
              onClick={() => updateEdit(true)}
            >
              Edit Profile
            </button>
          )}

          <Link to="/">
            <button className="dots-button" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
const EDIT_BIO_MUTATION = gql`
  mutation editBio($bio: String!) {
    editBio(bio: $bio) {
      bio
      createdAt
      email
      id
      username
    }
  }
`;

export default ProfileHeaderbar;
