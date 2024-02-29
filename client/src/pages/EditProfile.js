import React, { useContext, useState, useEffect } from "react";
import {CirclePicker} from "react-color";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import MockPost from "../components/MockPost";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../util/hooks";
import {FETCH_POSTS_QUERY} from '../util/graphql'

function EditProfile(props) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    bio: 'Hello',
  });

  const [editBio, { error }] = useMutation(EDIT_BIO_MUTATION, {
    variables: values,
  });

  function createPostCallback(){
    editBio();
    navigate('/profile');
  }

  
  return (
    <div>
      <div style={{textAlign: 'center', fontSize: '3vh', paddingTop: '2vh'}}>Create a post</div>
      
    </div>
  );
}

const EDIT_BIO_MUTATION = gql`
  mutation editBio(
    $bio: String!
    ) {
    editBio(
      bio: $bio
      ) {
      bio
    createdAt
    email
    id
    username
    }
  }
`;

export default EditProfile;
