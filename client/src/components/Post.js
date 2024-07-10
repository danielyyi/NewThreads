import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import astro from "../astro.jpg";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import { AuthContext } from "../context/auth";
import "./Post.css";

function Post({
  post
}) {
  const { user } = useContext(AuthContext);

  return (
    <div className="card">
      <Link to={`/posts/${post.id}`}>
        <img src={post.image} alt={"post"} className="image" />
      </Link>
      <div className="card-text">
        <div>
        <div>{post.title}</div>
        <div className="price">${post.price}</div>
        </div>
        <br></br>
        <div className="text-bottom">
          <Link to={`/brands/${post.user}`}>
          <div id="link">{post.username}</div>
          </Link>
          {user && (user.id === post.user || user.username == "Admin") && (
            <DeleteButton postId={post.id} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Post;
