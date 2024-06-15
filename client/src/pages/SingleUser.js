import React, { useContext, useRef } from "react";
import gql from "graphql-tag";
import { Link, useNavigate, useParams } from "react-router-dom";
import SingleUserHeaderbar from "../components/SingleUserHeaderbar";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import "../Misc.css";
import pfp from "../pfp.png";
import "./SingleUser.css";
function SingleUser() {
  const navigate = useNavigate();
  const { username } = useParams();
  console.log(username);
  //const username = props.match.params.username;
  const limit = 3;
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
    <div>
      <Headerbar></Headerbar>
      <div className="brandInfo"></div>

      <SingleUserHeaderbar username={username} />
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
      id
      price
      title
      productLink
      image
      username
    }
  }
`;
export default SingleUser;
