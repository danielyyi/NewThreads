import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FETCH_POSTS_QUERY } from "../util/graphql";
function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const [deletePostOrComment] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      setDeleted(true);
      console.log("POST DELETED");

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <div className="delete-icon">
      {confirmOpen ? (
        <div style={{ display: "flex" }}>
          <div>
            <button className="delete-buttons" onClick={deletePostOrComment}>
              Confirm|
            </button>
          </div>
          <div>
            <button
              className="delete-buttons"
              onClick={() => setConfirmOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {deleted ? (
            <div>Post has been deleted.</div>
          ) : (
            <button
              className="delete-buttons"
              onClick={() => setConfirmOpen(true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;
