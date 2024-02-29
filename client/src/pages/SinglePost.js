import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import Navbar from "../components/Navbar";
function SinglePost() {
  const {postId} = useParams();
  //const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

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
  //----
  //THE SCREEN REFRESHES WHEN POSTING A COMMENT. THIS CAN BE REMOVED BY NOT WRAPPING IT IN A FORM BUT THEN U CANT USE ENTER BUTTON ON KEYBOARD
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      document.getElementById("commentInput").value = "";
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    navigate('/');
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
      createdAt,
      color,
      commentCount,
      comments,
    } = getPost;
    console.log(caption);
    console.log(comments);

    postMarkup = (
      <div>
        <div className="current-posts">
        <div className="single-post-page">
          <div className="single-post-holder">
            <div>
              <div className="post-user">{username}</div>
              <div className="post" style={{ backgroundColor: `${color}` }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img className="post-image" src={image} alt={"post"} />
                </div>
              </div>
              <div className="post-caption">{caption}</div>
              <div className="post-bottom-holder">
                <div className="post-date">
                  {moment(createdAt).format("MMMM Do, YYYY")} (
                  {moment(createdAt).fromNow()})
                </div>
                <div className="spacer"></div>

                <div className="comment-icon">
                  {commentCount} <FontAwesomeIcon icon={faComments} />
                </div>
              </div>
              {user && (user.username === username || user.username == "Admin") && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </div>
          </div>

          <div className="comment-section">
            <div className="comment-area" style={{ borderColor: `${color}` }}>
              {comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                  <div className="comment-bulk">
                    <div className="comment-username">{comment.username}:</div>
                    <div className="comment-body">{comment.body}</div>
                    <div className="comment-date">
                      {moment(comment.createdAt).fromNow()}
                    </div>
                  </div>
                  <div>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  </div>
                </div>
              ))}
            </div>
            <div className="comment-input-holder">
              {user ? (
                <div className="comment-input">
                  <input
                    type="text"
                    maxLength="40"
                    size="15"
                    id="commentInput"
                    placeholder="Comment..."
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <button
                    className="comment-submit"
                    disabled={comment.trim() === ""}
                    onClick={submitComment}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: 20, marginBottom: 10, fontWeight: "bold" }}>
                  You must be logged in to comment
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{height:70}}></div>
        </div>
       
        <Navbar />
      </div>
    );
  }

  return postMarkup;
}
const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
    }
  }
`;
const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      image
      username
      caption
      createdAt
      color
      commentCount
      comments {
        body
        createdAt
        id
        username
      }
    }
  }
`;
export default SinglePost;
