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
import "./Clothes.css";
import {
  useQuery,
  useLazyQuery,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import Footer from "../components/Footer";

import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../util/graphql";
//YOU NEED TO CHANGE CREATE POST TO LOAD POST QUERY
function Clothes() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page") && !searchParams.get("category")) {
      setSearchParams({ page: 0, category: 0 });
    }
    
    window.scrollTo(0, 0);
  }, [searchParams]);
  const category = Number(searchParams.get("category"));
  const page = Number(searchParams.get("page"));


  const next = page + 1;
  const prev = page - 1;
  const limit = 12;

  var posts = [];

  const { loading, data} = useQuery(LOAD_POSTS_QUERY, {
    variables: {
      limit: limit,
      offset: page * limit,
      category: category,
    }
    //there is an error when we dont include fetchPolicy: 'network-only', fixed it by using numbers for categories instead of strings through url
  });


  if (!loading && data && data.loadPosts) {
    let i = 0;
    data.loadPosts.forEach((element) => {
      posts.push(element);
      if (i % 2 == 0) {
        posts.reverse();
      }
      i++;
    });
    console.log(posts);
  }

  const filterCategory = (filter) => {
    setSearchParams({ page: 0, category: filter });
  };

  const nextPage = () => {
    setSearchParams({ page: next, category: category });
  };

  const prevPage = () => {
    setSearchParams({ page: prev, category: category });
  };

  //----
  return (
    <div>
      <Headerbar />
      <div className="home">
        <div id="filters">
          <div id="categories">
            <button
              onClick={() => filterCategory(0)}
              className={
                !category || category === 0
                  ? "active-button"
                  : "inactive-button"
              }
            >
              All
            </button>
            <button
              onClick={() => filterCategory(1)}
              className={
                category === 1 ? "active-button" : "inactive-button"
              }
            >
              Tees
            </button>
            <button
              onClick={() => filterCategory(2)}
              className={
                category === 2 ? "active-button" : "inactive-button"
              }
            >
              Pullovers
            </button>
            <button
              onClick={() => filterCategory(3)}
              className={
                category === 3 ? "active-button" : "inactive-button"
              }
            >
              Shorts
            </button>
            <button
              onClick={() => filterCategory(4)}
              className={
                category === 4 ? "active-button" : "inactive-button"
              }
            >
              Pants
            </button>
            <button
              onClick={() => filterCategory(5)}
              className={
                category === 5 ? "active-button" : "inactive-button"
              }
            >
              Hats
            </button>
            <button
              onClick={() => filterCategory(6)}
              className={
                category === 6 ? "active-button" : "inactive-button"
              }
            >
              Other
            </button>
          </div>
        </div>
        <div className="posts-holder">
          {loading ? (
            <div className="loader-holder">
              <div className="loader">Finding New Clothes....</div>
            </div>
          ) : (
            posts && posts.map((post) => <Post key={post.id} post={post} />)
          )}
        </div>
      </div>
      {loading ? (
        <></>
      ) : (
        <>
          <div id="nav-buttons">
            <button
              className="nav-button"
              disabled={page <= 0}
              onClick={() => prevPage()}
            >
              ≪
            </button>

            <button className="nav-button" onClick={() => nextPage()}>
              ≫
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}
/* <Link to={`/clothes/${Number(page)-1}`}>*/
export default Clothes;

/*
<div className="categories">
          <button
              onClick={() => filterCategory("tshirt")}
              className={
                category === "unisex" ? "gender-active-button" : "gender-inactive-button"
              }
            >
              Unisex
            </button>
            <button
              onClick={() => filterCategory("tshirt")}
              className={
                category === "men" ? "gender-active-button" : "gender-inactive-button"
              }
            >
              Men
            </button>
            <button
              onClick={() => filterCategory("tshirt")}
              className={
                category === "women" ? "gender-active-button" : "gender-inactive-button"
              }
            >
              Women
            </button>
          </div>

*/
