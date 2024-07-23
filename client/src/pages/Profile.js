import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth";
import ProfileHeaderbar from "../components/ProfileHeaderbar";
import Headerbar from "../components/Headerbar";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import Post from "../components/Post";
import "./SingleUser.css";
import Footer from "../components/Footer"

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0)
    console.log("not logged in")
    if(!user){
      navigate("/login");
    }
  }, [user]);

  const userId = user.id;
  const limit = 12;
  const { loading, data, refetch } = useQuery(GET_USER_POSTS, {
    variables: {
      userId,
      limit,
    }
  });
  var posts;
  if (!loading && data && data.getPostsByUser) {
    posts = []
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
      {!posts || posts.length>=12? (<ProfileHeaderbar canPost={false}/>):(<ProfileHeaderbar canPost={true}/>)}
      
  
      <div className="posts-holder">
        <div className="posts">

          {loading ? (
            <div className="loader-holder">
              <div className="loader">Finding New Clothes....</div>
            </div>
          ) : (
            posts && posts.map((post) => <Post key={post.id} post={post} />)
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
      price
      productLink
      title
      caption
      id
      user
      image
      username
    }
  }
`;
export default Profile;
