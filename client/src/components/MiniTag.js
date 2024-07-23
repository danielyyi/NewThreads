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
import "./TagItem.css";

function MiniTag({ name, color }) {
  return (
    <Link to={`/explore/${name}`}>
    <div id="mini-tag" style={{ backgroundColor: color }}>
      <span id="mini-tag-text">{name}</span>
    </div>
    </Link>
  );
}
export default MiniTag;
