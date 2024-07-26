import React, { useContext, useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { GET_TAGS_QUERY } from "../util/graphql";
import "../pages/Clothes.css";
import TagItem from "./TagItem";
import { useQuery } from "@apollo/client";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import "./RegisterPopup.css";
import Navbar from "../components/Navbar";
import FileBase from "react-file-base64";
import Footer from "../components/Footer";

function RegisterPopup(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    email: "",
    password: "",
    bio: "",
    brandLink: "",
    pfp: "",
    confirmPassword: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  function resizeImage(base64Str, maxWidth = 600, maxHeight = 600) {
    return new Promise((resolve) => {
      let img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        const MAX_WIDTH = maxWidth;
        const MAX_HEIGHT = maxHeight;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL());
      };
    });
  }

  const [image, setImage] = useState("");
  function changeImage(image) {
    console.log(image);
    setImage(image);
    resizeImage(image, 600, 600).then((result) => (values.pfp = result));
    console.log(values.pfp);
  }

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      context.login(userData);
      setSuccess(true);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  const resetLogo = () => {
    setImage("");
  };

  const setRegister = (data) => {
    props.setRegister(data);
  };
  const setLogin = (data) => {
    props.setLogin(data);
    props.setRegister(false)
  };
  //----
  return (
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={() => setRegister(false)}>
          &times;
        </span>
        {success ? (
          <div id="popup-success">
            <div>Success! Your Brand Account has been created.</div>
            <Link to="/profile">
              <button id="popup-register-button">Go to profile</button>
            </Link>
          </div>
        ) : (
          <div id="popup-form-holder">
            <form id="popup-form" onSubmit={onSubmit} noValidate>
              <div id="popup-form-title">Register Your Brand</div>
              <div id="popup-form-subtitle" >
                Take a couple minutes to fill out the form below
              </div>
              <div id="popup-form-subtitle2" onClick={()=>setLogin(true)}>Already have an account?</div>

              <div id="popup-form-group">
                <label for="username" className="">
                  Brand Name
                </label>
                <input
                  name="username"
                  value={values.username}
                  onChange={onChange}
                ></input>
              </div>
              <div id="popup-form-group">
                <label for="email" className="">
                  Email
                </label>
                <input
                  name="email"
                  value={values.email}
                  onChange={onChange}
                ></input>
              </div>
              <div id="popup-form-group">
                <label for="brandLink" className="">
                  Link to Brand's Website
                </label>
                <input
                  name="brandLink"
                  value={values.brandLink}
                  onChange={onChange}
                ></input>
              </div>
              <div id="popup-form-group">
                <label for="bio" className="">
                  Description
                </label>
                <textarea
                  placeholder="What is your brand's mission or message?"
                  name="bio"
                  value={values.bio}
                  onChange={onChange}
                />
              </div>
              <div id="popup-form-group">
                <label for="logo" className="">
                  Logo
                </label>

                {image === "" ? (
                  <FileBase
                    name="logo"
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => changeImage(base64)}
                  />
                ) : (
                  <div style={{ display: "flex" }}>
                    <img id="popup-logo" src={image} />

                    <span id="logo-close" onClick={() => resetLogo()}>
                      &times;
                    </span>
                  </div>
                )}
              </div>
              <div id="popup-form-group">
                <label for="password" className="">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder=""
                  value={values.password}
                  onChange={onChange}
                ></input>
              </div>
              <div id="popup-form-group">
                <label for="confirmPassword" className="">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={onChange}
                ></input>
              </div>
              <button id="popup-register-button" type="submit">
                Sign Up
              </button>
              {loading ? (
                <div className="loader-holder">
                  Loading...
                </div>
              ) : (
                <div>
                  {Object.keys(errors).length > 0 && (
                    <div>
                      <ul>
                        {Object.values(errors).map((value) => (
                          <li className="errors" key={value}>
                            - {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $bio: String!
    $brandLink: String!
    $password: String!
    $confirmPassword: String!
    $pfp: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
        brandLink: $brandLink
        bio: $bio
        pfp: $pfp
      }
    ) {
      id
      email
      username
      createdAt
      token
      bio
      brandLink
      pfp
    }
  }
`;

export default RegisterPopup;
