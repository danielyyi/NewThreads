import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import "./Register.css";
import Navbar from "../components/Navbar";
import FileBase from "react-file-base64";
import Footer from "../components/Footer"
function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [applied, setApplied] = useState(false);
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
    window.scrollTo(0, 0)
  }, [applied])
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
      //context.login(userData);
      setApplied(true);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <>
      <nav className="dev-nav">
        <Link to="/">
          <div className="logo">
            NewThreads <span id="share"> - Register</span>
          </div>
        </Link>
      </nav>
      {!applied ? (
        <div className="register-form-holder">
          <Link to="/">
            <button id="back">Back</button>
          </Link>
          <form className="post-form" onSubmit={onSubmit} noValidate>
            <div id="input-group">
              <label for="username" className="">
                Brand Name
              </label>
              <input
                maximum-scale = {1}
                placeholder=" "
                id="username"
                name="username"
                value={values.username}
                className=""
                onChange={onChange}
              />
            </div>
            <div id="input-group">
              <label for="email" className="">
                Brand Email
              </label>
              <input
              maximum-scale = {1}
                placeholder=" "
                id="email"
                name="email"
                value={values.email}
                className=""
                onChange={onChange}
              />
            </div>
            <div id="input-group">
              <label for="bio" className="">
                Brand Description
              </label>
              <textarea
              maximum-scale = {1}
                placeholder="A couple sentences or less..."
                id="bio"
                name="bio"
                value={values.bio}
                className=""
                onChange={onChange}
              />
            </div>
            <div id="input-group">
              <label for="brandLink" className="">
                Brand Link
              </label>
              <input
              maximum-scale = {1}
                placeholder=" "
                id="brandLink"
                name="brandLink"
                value={values.brandLink}
                className=""
                onChange={onChange}
              />
            </div>
            <div id="input-group">
              <label for="password" className="password-label">
                Password (Minimum of 8 characters, 1 uppercase character, 1 lowercase character, and 1 special character)
              </label>
              <input
              maximum-scale = {1}
                placeholder=" "
                type="password"
                id="password"
                name="password"
                value={values.password}
                className=""
                onChange={onChange}
              />
            </div>
            <div id="input-group">
              <label for="confirmPassword" className="">
                Password
              </label>
              <input
              maximum-scale = {1}
                type="password"
                id="confirmPassword"
                placeholder=" "
                name="confirmPassword"
                value={values.confirmPassword}
                className=""
                onChange={onChange}
              />
            </div>
            <div id="input-group">
              <label for="logo" id="image-input">
                Brand Logo
              </label>
                <div className="fake-post-image">
                  <FileBase
                    id="image-input"
                    title=" "
                    name = "logo"
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => changeImage(base64)}
                  />
               
                {image === "" ? <></> : <img id="image" src={image} />}
                </div>
            </div>
            {loading ? (
              <div className="loader-holder">
              <div className="loader">Loading...</div>
            </div>
            ) : (
              <div>
                {Object.keys(errors).length > 0 && (
                  <div>
                    <ul>
                      {Object.values(errors).map((value) => (
                        <li className="errors" key={value}>
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="register-button-holder">
                  <button className="register-button" type="submit">
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      ) : (
        <>
        <div id="after-submit">
          Your brand has successfully been registered for approval. Please allow up to 24 hours for your brand to be approved.
        </div>
        <div id="after-submit">
        You can login to NewThreads using your Brand Username and Passcode to view your brand's status. 
        </div>
        <div id="after-submit-button">
          <Link to="/">
            <button>Okay</button>
          </Link>
          </div>
        
        </>
      )}
      <Footer />
    </>
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
export default Register;
