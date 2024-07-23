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
import "./TagItem.css"

function TagItem({ name, color, clicked }) {
  return (
    <>
      {clicked ? (
        <div id="tag-item-clicked" style={{ backgroundColor: color}}>
          <span id="tag-text2">{name}</span>
        </div>
      ) : (
        <div id="tag-item" style={{ backgroundColor: color }}>
          <span id="tag-text2">{name}</span>
        </div>
      )}
    </>
  );
}
export default TagItem;
