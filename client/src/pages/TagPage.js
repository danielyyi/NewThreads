import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import ReactSlider from "react-slider";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Post from "../components/Post";
import { LOAD_POSTS_QUERY } from "../util/graphql";

import {
  useQuery,
  useLazyQuery,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import Footer from "../components/Footer";
import TagItem from "../components/TagItem";

import gql from "graphql-tag";
import { FILTER_TAGS_QUERY, GET_TAG_QUERY } from "../util/graphql";
import "./Explore.css";
import TagTitle from "../components/TagTitle";
//YOU NEED TO CHANGE CREATE POST TO LOAD POST QUERY
function TagPage() {
  const { tag } = useParams();
  console.log(tag);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { loading, data } = useQuery(FILTER_TAGS_QUERY, {variables:{
    tags: [tag]
  }});
  let posts = [];

  if (!loading && data && data.filterTags) {
    console.log(data.filterTags);
    posts = data.filterTags
  }

  //----
  return (
    <>
      <Headerbar />
      <div id="explore-holder">
        <TagTitle tag={tag} />
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
      </div>
      <Footer />
    </>
  );
}

export default TagPage;
