import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth";
import ProfileHeaderbar from "../components/ProfileHeaderbar";
import Headerbar from "../components/Headerbar";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import Post from "../components/Post";
import "./SingleUser.css";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const username = user.username;
  const limit = 10;
  const { loading, data, refetch } = useQuery(GET_USER_POSTS, {
    variables: {
      username,
      limit,
    },
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first",
  });
  var posts = [];
  if (!loading && data && data.getPostsByUser) {
    data.getPostsByUser.forEach((element) => {
      posts.push(element);
    });
    console.log(posts);
    console.log("pressed");
  }

  const listInnerRef = useRef();
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log(
        "Scroll Top: " + scrollTop,
        "Scroll Height" + scrollHeight,
        "Client Height: " + clientHeight
      );
      console.log(scrollTop + clientHeight + 100);
      if (scrollTop + clientHeight + 25 >= scrollHeight) {
        console.log("BOTTOM");
        refetch({ limit: posts.length + 3 });
      }
    }
  };

  return (
    <div className="profile-page">
      <Headerbar />
      <ProfileHeaderbar />
  
      <div className="current-posts" onScroll={onScroll} ref={listInnerRef}>
        {loading ? (
          <div className="loader-holder">
            <div className="loader"></div>
          </div>
        ) : (
          posts &&
          posts.map((post) => (
            <div className="posts-holder" key={post.id}>
              <Post post={post} />
            </div>
          ))
        )}
        <div></div>
      </div>
    </div>
  );
}
const GET_USER_POSTS = gql`
  query GetPostsByUser($username: String!, $limit: Int!) {
    getPostsByUser(username: $username, limit: $limit) {
      caption
      createdAt
      price
      productLink
      title
      caption
      id
      image
      username
    }
  }
`;
export default Profile;
