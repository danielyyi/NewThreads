
import React, { useContext, useRef, useEffect } from "react";
import gql from "graphql-tag";
import { Link, useNavigate, useParams } from "react-router-dom";
import SingleUserHeaderbar from "../components/SingleUserHeaderbar";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import Footer from "../components/Footer"
import "../Misc.css";
import pfp from "../pfp.png";
import "./SingleUser.css";

function SingleUser() {
  const navigate = useNavigate();
  const { userId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  console.log(userId);
  //const username = props.match.params.username;
  const limit = 20;
  const { loading, data, refetch } = useQuery(GET_USER_POSTS, {
    variables: {
      userId,
      limit,
    },
  });
  console.log(data);
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

      <SingleUserHeaderbar userId={userId} />
      <div className="posts-holder">
        <div className="posts">

          {loading ? (
            <div className="loader-holder">
              <div className="loader">Finding New Clothes....</div>
            </div>
          ) : posts && posts.length > 0 ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div style={{ marginTop: "30px", marginBottom: "30px" }}>
              No Clothes Found
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

const GET_USER_POSTS = gql`
  query GetPostsByUser($userId: ID!, $limit: Int!) {
    getPostsByUser(userId: $userId, limit: $limit) {
      caption
      createdAt
      id
      tags {
      color
      name
    }
      price
      title
      productLink
      user
      image
      username
    }
  }
`;
export default SingleUser;
