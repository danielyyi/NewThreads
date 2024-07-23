import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import Headerbar from "../components/Headerbar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TagItem from "../components/TagItem";

import "./SinglePost.css";

function SinglePost() {
  const { postId } = useParams();
  //const postId = props.match.params.postId;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

  console.log(postId);
  //if it works it works...
  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  let getPost;
  if (data) {
    getPost = data.getPost;
  }

  function deletePostCallback() {
    navigate("/");
    //props.history.push("/");
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = (
      <div className="loader-holder">
        <div className="loader"></div>
      </div>
    );
  } else {
    const {
      id,
      caption,
      image,
      username,
      title,
      category,
      sex,
      createdAt,
      user,
      price,
      productLink,
      brandLink,
      tags,
    } = getPost;
    console.log(caption);
    console.log(tags)
    postMarkup = (
      <>
        <Headerbar />
        <button onClick={() => navigate(-1)} id="back-button">
          Back
        </button>
        <div className="single-post-container">
          <div className="item-image">
            <img src={image} alt={"post"} />
          </div>
          <div className="item-info">
            <div className="item-title">{title}</div>
            <div className="item-price">${price}</div>
            <div className="item-caption">{caption}</div>
            <div className="item-caption">
              {tags &&
                tags.map((tag, index) => <TagItem name={tag.name} color={tag.color} key={index} />)}
            </div>{" "}
            <div className="item-caption">
              {category}, {sex}
            </div>
            <Link to={`/brands/${user}`}>
              <div id="link">{username}</div>
            </Link>
            <div className="item-date">
              Posted {moment(createdAt).format("MMMM Do, YYYY")}
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`${productLink}`}
            >
              <button id="item-button">Visit Site</button>
            </a>
            {user &&
              (user.username === username || user.username == "Admin") && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return postMarkup;
}
const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      image
      username
      title
      caption
      category
      sex
      createdAt
      price
      tags{
        name
        color
      }
      productLink
      username
      user
    }
  }
`;
export default SinglePost;
