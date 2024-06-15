import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import gql from "graphql-tag";
import { GET_RANDOM_USER_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";
import pfp from "../pfp.png";
import "../Misc.css";
import Headerbar from "../components/Headerbar";
import BrandCard from "../components/BrandCard";
import "./Home.css";
function Home() {
  const [term, newTerm] = useState("");

  const [page, setPage] = useState(0);
  const limit = 1;



  var users = [];
  console.log(limit * page);
  const { loading, data, refetch } = useQuery(GET_RANDOM_USER_QUERY, {
    fetchPolicy: "network-only", // Used for first execution
    nextFetchPolicy: "cache-first",
  });
  console.log(data);
  if (!loading && data && data.getRandomUser) {
    data.getRandomUser.forEach((element) => {
      users.pop();
      users.push(element);
    });

    console.log(users);
    console.log("pressed");
  }

  return (
    <div>
      <Headerbar />
      <div>June 12th Collection</div>
      {loading ? (
        <div className="loader-holder">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="brand-holder">
          {users.map((user) => (
            <>
              {user.username.toLowerCase().indexOf(term.toLowerCase()) != -1 ? (
                <BrandCard user={user}></BrandCard>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
      )}
      <button onClick={() => refetch()}>
        Press Me to Find <span>NEW</span> Clothes
      </button>
    </div>
  );
}


export default Home;
