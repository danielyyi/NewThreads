import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { GET_TAGS_QUERY, GET_TAG_QUERY } from "../util/graphql";
import "./TagTitle.css"
function TagTitle({ tag }) {
  const { loading, data } = useQuery(GET_TAG_QUERY, {
    variables: {
      name: tag,
    },
  });

  if (!loading && data && data.getTag) {
    console.log(data.getTag);
  }

  return (
    <>
      {data && data.getTag ? (
        <div id="tag-title-holder">
        <div id="tag-title" style={{backgroundColor: data.getTag.color}}>
          <span id="tag-title-text">{tag} </span>
        </div>
        
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
export default TagTitle;
