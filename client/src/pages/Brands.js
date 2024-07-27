import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {useSearchParams} from "react-router-dom"
import Navbar from "../components/Navbar";
import gql from "graphql-tag";
import { FETCH_USERS_QUERY, LOAD_USERS_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";
import pfp from "../pfp.png";
import "../Misc.css";
import "./Search.css";
import Headerbar from "../components/Headerbar";
import BrandTag from "../components/BrandTag";
import Footer from "../components/Footer";
function Brands() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 0 });
    }
    window.scrollTo(0, 0)
  }, [searchParams]);

  const page = Number(searchParams.get("page"));

  const next = page + 1;
  const prev = page - 1;
  const limit = 12;


  const { loading, data, refetch } = useQuery(LOAD_USERS_QUERY, {
    variables: {
      limit: limit,
      offset: page * limit,
    }
  });
  const [term, newTerm] = useState("");
  var users = [];
  if (!loading) {

    users = data.loadUsers;
  }

  const nextPage = () => {
    setSearchParams({ page: next });
  };

  const prevPage = () => {
    setSearchParams({ page: prev});
  };


  return (
    <div>
      <Headerbar />
      
      {loading ? (
        <div className="loader-holder">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="search-page">
          <div id="brands-title">All Brands</div>
          <div id="brands-holder-holder">
          <div id="brands-holder">
          {users && users.map((user) => (
            <div id="brand-holder" key={user.id}>
              {user.username.toLowerCase().indexOf(term.toLowerCase()) != -1 ? (
                <BrandTag user={user}></BrandTag>
              ) : (
                <></>
              )}
            </div>
          ))}
          </div>
          </div>
        </div>
      )}
            {loading ? (
        <></>
      ) : (
        <>
          <div id="nav-buttons" style={{marginTop:"10px"}}>
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

export default Brands;
