import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { faTrash, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FETCH_POSTS_QUERY} from '../util/graphql'
function DeleteButton({ postId, commentId, callback}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deleted, setDeleted] = useState(false);
  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if(!commentId){
        /* CANT MUTATE POST CACHE AFTER DELETE
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })
        if(data && data.getPosts){
          data.getPosts = data.getPosts.filter((p) => p.id !== postId)
          proxy.writeQuery({query: FETCH_POSTS_QUERY, data})
        }
        */
       setDeleted(true);
       console.log("POST DELETED")
      }

      if(callback) callback();
      
    },
    variables: {
      postId, commentId
    },
  });

  return (
    <div className="delete-icon" >
      {deleted ? (<div>Post has been deleted.</div>) : (<button className="delete-buttons" onClick={() => setConfirmOpen(true)}>
        <FontAwesomeIcon  icon={faTrash} />
      </button>)}
      
      {confirmOpen ? (
          <>
            <div ><button className="delete-buttons"onClick={() => setConfirmOpen(false)}>Cancel</button></div>
            <div><button className="delete-buttons" onClick={deletePostOrComment}>Delete</button></div>
          </>
        ) : null}
    </div>
  );
}
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!){
    deleteComment(postId: $postId, commentId: $commentId){
      id
      comments{
        id username createdAt body
      }
      commentCount
    }
  }
`
export default DeleteButton;
