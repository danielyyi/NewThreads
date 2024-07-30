import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import ReactSlider from "react-slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Post from "../components/Post";
import Filters from "../components/Filters";
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
function Clothes({ filterOn }) {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 0 });
    }

    window.scrollTo(0, 0);
  }, [searchParams]);
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page"));
  const sex = searchParams.get("sex");
  const price = searchParams.get("price");
  const tags = searchParams.get("tags");

  let str = "";
  let tagsArray = [];
  if (tags) {
    tagsArray = tags.split("%2C");
    tagsArray.forEach((tag) => {
      str += tag + ",";
    });
    if (str[str.length - 1] === ",") {
      str = str.substring(0, str.length - 2);
    }
  }

  const next = page + 1;
  const prev = page - 1;
  const limit = 12;

  var posts = [];

  const { loading, data } = useQuery(LOAD_POSTS_QUERY, {
    variables: {
      limit: limit,
      offset: page * limit,
      category: category,
      price: price,
      sex: sex,
      tags: str,
    },
    //there is an error when we dont include fetchPolicy: 'network-only', fixed it by using numbers for categories instead of strings through url
  });

  if (!loading && data && data.loadPosts) {
    posts = data.loadPosts;
  }

  const variables = {};
  const nextPage = () => {
    variables.page = next;
    if (category) {
      variables.category = category;
    }
    if (sex) {
      variables.sex = sex;
    }
    if (price) {
      variables.price = price;
    }
    if (tags) {
      variables.tags = tags;
    }
    console.log(variables);

    setSearchParams(variables);
  };

  const prevPage = () => {
    variables.page = prev;
    if (category) {
      variables.category = category;
    }
    if (sex) {
      variables.sex = sex;
    }
    if (price) {
      variables.price = price;
    }
    if (tags) {
      variables.tags = tags;
    }
    setSearchParams(variables);
  };

  const [showFilters, setShowFilters] = useState(filterOn);

  //----
  return (
    <div>
      <Headerbar />
      {showFilters ? <Filters setFilters={setShowFilters} /> : <></>}
      <div id="top">
        <span id="filters-button" onClick={() => setShowFilters(true)}>
          <FontAwesomeIcon icon={faFilter} /> Filters
        </span>
      </div>
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
export default Clothes;
