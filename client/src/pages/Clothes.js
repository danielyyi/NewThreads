import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../components/Post";
import { LOAD_POSTS_QUERY } from "../util/graphql";
import "./Clothes.css";
import {
  useQuery,
  useLazyQuery,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../util/graphql";
//YOU NEED TO CHANGE CREATE POST TO LOAD POST QUERY
function Clothes() {
  const { page } = useParams();
  console.log(page);
  const next = page+1;
  const prev = page-1;
  const limit = 8;
  var posts = [];
  console.log(limit * page);
  const { loading, data, refetch } = useQuery(LOAD_POSTS_QUERY, {
    variables: {
      limit: limit,
      offset: page * limit,
    },
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first",
  });
  console.log(data);
  if (!loading && data && data.loadPosts) {
    data.loadPosts.forEach((element) => {
      posts.push(element);
    });

    console.log(posts);
    console.log("pressed");
  }
  //----
  return (
    <div>
      <Headerbar />
      <div className="home">
        <div className="posts-holder">
          {loading ? (
            <div className="loader-holder">
              <div className="loader">Finding New Clothes....</div>
            </div>
          ) : (
            posts && posts.map((post) => <Post post={post} />)
          )}
        </div>
      </div>
      {loading ? (
            <></>
          ) : (
            <>
            <Link to={`/clothes/${Number(page)-1}`}>
            <button className="nav-button" disabled = {page<=0}> Previous</button></Link>
            <Link to={`/clothes/${Number(page)+1}`}>
            <button className="nav-button">Next</button></Link>
            </>
          )}

    </div>
  );
}

export default Clothes;
