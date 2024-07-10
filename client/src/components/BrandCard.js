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
import BrandTag from "./BrandTag"

import "./BrandCard.css";

function BrandCard({ user: { id, username, brandLink, bio, pfp} }) {
  const limit = 4;
  const { loading, data, refetch } = useQuery(GET_USER_POSTS, {
    variables: {
      username,
      limit,
    },
  });
  var posts = {};
  if (!loading) {
 
    posts = data.getPostsByUser;
  }

  return (
    <div className="brand-card" key={id}>
      <div className="posts-holder">
        {loading ? (
          <>...</>
        ) : (
          posts && posts.map((post) => <Post post={post} key={post.id} />)
        )}
      </div>
      <div className="brand-card-bottom">
        <BrandTag user={{username, id, pfp, bio}}/>
      </div>
    </div>
  );
}
const GET_USER_POSTS = gql`
  query GetPostsByUser($id: ID!, $limit: Int!) {
    getPostsByUser(id: $id, limit: $limit) {
      caption
      createdAt
      id
      price
      title
      
      productLink
      image
      username
    }
  }
`;
export default BrandCard;
