import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import "./Register.css";
import "./EditProfile.css";
import Navbar from "../components/Navbar";
import FileBase from "react-file-base64";

function EditProfile(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { onChange, onSubmit, values } = useForm(makeEdit, {
    email: null,
    bio: null,
    brandLink: null,
    pfp: null,
    username: null,
  });

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

  const [edit, { loading }] = useMutation(EDIT_PROFILE, {
    /*
    update(_, { data: { register: userData } }) {
      console.log(userData);
      navigate("/profile");
    },*/
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function makeEdit() {
    edit();
    navigate("/profile");
  }

  return (
    <>
      <nav className="dev-nav">
        <Link to="/">
          <div className="logo">
            NewThreads <span id="share"> - Edit Profile</span>
          </div>
        </Link>
      </nav>

      <div className="edit-form-holder">
        <Link to="/profile">
          <button id="cancel-button">Cancel</button>
        </Link>
        <form className="post-form" onSubmit={onSubmit} noValidate>
          <div id="instructions">
            Enter new values for fields you would like to edit
          </div>
          <div id="input-group">
            <label for="username" className="">
              Username
            </label>
            <input
            maximum-scale={1}
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
              Email
            </label>
            <input
            maximum-scale={1}
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
              Bio
            </label>
            <textarea
            maximum-scale={1}
              placeholder=" "
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
            maximum-scale={1}
              placeholder=" "
              id="brandLink"
              name="brandLink"
              value={values.brandLink}
              className=""
              onChange={onChange}
            />
          </div>
          <div className="post">
            <label for="img" className="">
              Logo
            </label>
            <div name="img" style={{display: "flex", flexWrap: "wrap"}}>
              <div className="fake-post-image">
                <FileBase
                  title=" "
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => changeImage(base64)}
                />
              </div>
              {image === "" ? <></> : <img id="image" src={image} />}
            </div>
          </div>
          {loading ? (
            <div className="loader-holder-small">
              <div className="loader-small">Loading...</div>
            </div>
          ) : (
            <div className="edit-button-holder">
              <button className="edit-profile-button" type="submit">
                Edit Profile
              </button>
            </div>
          )}

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
        </form>
      </div>
    </>
  );
}
const EDIT_PROFILE = gql`
  mutation EditProfile(
    $bio: String
    $brandLink: String
    $email: String
    $pfp: String
    $username: String
  ) {
    editProfile(
      bio: $bio
      brandLink: $brandLink
      email: $email
      pfp: $pfp
      username: $username
    ) {
      bio
      brandLink
      username
      pfp
      email
    }
  }
`;
export default EditProfile;
