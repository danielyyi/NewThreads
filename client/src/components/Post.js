import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import astro from "../astro.jpg";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteButton from "./DeleteButton";
import MiniTag from "./MiniTag";
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
        <div className="post-price">${post.price}</div>
        <div className="card-title">{post.title}</div>

        </div>
        <div className="post-tags-holder">{post.tags && post.tags.map((tag, index) => <MiniTag key={index} color={tag.color} name={tag.name}/>)}</div>
        
        <div className="text-bottom">
          <Link to={`/brands/${post.user}`}>
          <div id="user-link">{post.username}</div>
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
