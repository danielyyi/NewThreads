import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Navbar from "../components/Navbar";
import gql from "graphql-tag";
import { FETCH_USERS_QUERY } from "../util/graphql";
import { Link } from "react-router-dom";
import pfp from "../pfp.png";
function Search() {
  const { loading, data } = useQuery(FETCH_USERS_QUERY);
  const [term, newTerm] = useState("");
  var users = [];
  if (!loading) {
    users = data.getUsers;
  }
  

  return (
    <div >
      {loading ? (
        <div className="loader-holder"><div className="loader"></div></div>
      ) : (
        <div className="search-page">
          <div className="search-search-holder">
            <div className="search-search">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => newTerm(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="users-holder">
            <div style={{ height: 65 }}></div>
            {users.map((user) => (
              <div>
                {user.username.toLowerCase().indexOf(term.toLowerCase()) !=
                -1 ? (
                  <Link to={`/users/${user.username}`}>
                    <div key={user.id} className="user-search-widget">
                      <img
                        className="pfp"
                        style={{ width: 40, height: 40 }}
                        src={pfp}
                        alt={"logo"}
                      />
                      <div className="search-bio">
                        {user.bio ? (
                          <>
                            "
                            {user.bio.length > 16 ? (
                              <>{user.bio.substring(0, 15)}..."</>
                            ) : (
                              <>"{user.bio}"</>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div>{user.username}</div>
                    </div>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <Navbar />
    </div>
  );
}
/*
const SEARCH_USER = gql`
  query searchUser($username: String!) {
    searchUser(username: $username) {
      id
      username
      bio
    }
  }
`;*/

export default Search;
