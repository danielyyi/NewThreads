import React, { useContext } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
//import astro from "../astro.jpg";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../context/auth";
import Post from "./Post";
import BrandTag from "./BrandTag";
import { GET_AUTO } from "../util/graphql";

import "./Daily.css";

function Daily() {
  const { user } = useContext(AuthContext);
  var d1 = new Date(); //"now"
  var d2 = new Date("2024-06-25T01:51:00"); // some date
  var counter = Math.floor((d1 - d2) / 1000 / 60 / 60 / 24);
  console.log(counter);

  var posts = [];
  const { loading, data, refetch } = useQuery(GET_AUTO, {
    variables: {
      counter,
    }
  });

  console.log(data);
  if (!loading && data && data.getAuto) {
    data.getAuto.forEach((element) => {
      posts.push(element);
    });
    console.log(posts);
  }

  return (
    <div id="daily-card">
      <div id="title1">Threads of the Day</div>
      <div id="subtitle1">{moment().format("MMMM Do")}</div>
      <div id="daily-posts">
        {loading ? (
          <div className="loader-holder"></div>
        ) : (
          posts &&
          posts.map((post, index) => (
            <Post key={index} post={post}/>
          ))
        )}
      </div>
    </div>
  );
}
export default Daily;


/*
            <div class="daily-inner-card">
              <Link to={`/posts/${post.id}`}>
                <img src={post.image} alt={"post"} id="daily-image" />
              </Link>
              <div id="daily-card-text">
                <div>
                  <div>{post.title}</div>
                  <div id="daily-price">${post.price}</div>
                </div>
                {user &&
                  (user.username === post.username || user.username == "Admin") && (
                    <DeleteButton postId={post.id} />
                  )}
              </div>
            </div>

*/