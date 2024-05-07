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
  post: {
    caption,
    image,
    title,
    productLink,
    price,
    brandLink,
    createdAt,
    id,
    username,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
      <div class="card">
        <Link to={`/posts/${id}`}>
          <img src={image} alt={"post"} className="image" />
        </Link>
        <div>
          <div>{title}</div>
          <div class="price">${price}</div>
          <br></br>
          <div>{username}</div>
        </div>
        {user && (user.username === username || user.username == "Admin") && (
        <DeleteButton postId={id} />
      )}
      </div>


  );
}
export default Post;
