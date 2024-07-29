import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import "./Register.css";
import "./EditProfile.css";
import Headerbar from "../components/Headerbar";
import FileBase from "react-file-base64";

function EditProfile(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { onChange, onSubmit, values } = useForm(makeEdit, {
    bio: null,
    email: null,
    pfp: null,
    brandLink: null,
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
    update(_, {}){
      navigate("/profile")
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors)
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function makeEdit() {

    console.log(values )
    edit();


  }
  const resetLogo = () => {
    setImage("");
  };

  return (
    <>
      <Headerbar />

      <div id="popup-form-holder">
        <form id="popup-form" onSubmit={onSubmit} noValidate>
          <Link to="/profile">
            <button
              type="button"
              id="popup-register-button"
              style={{ marginTop: "0px" }}
            >
              Cancel
            </button>
          </Link>
          <div id="popup-form-title">Edit Profile</div>
          <div id="popup-form-subtitle">
            Fill in the info you'd like to change and leave the rest blank!
          </div>
          <div id="popup-form-group">
                <label for="username" className="not-required">
                  Brand Name
                </label>
                <input
                  name="username"
                  value={values.username}
                  onChange={onChange}
                ></input>
              </div>
              <div id="popup-form-group">
                <label for="email" className="not-required">
                  Email
                </label>
                <input
                  name="email"
                  value={values.email}
                  onChange={onChange}
                ></input>
              </div>
              <div id="popup-form-group">
                <label for="bio" className="not-required">
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
                <label for="brandLink" className="not-required">
                  Link to Brand's Website
                </label>
                <input
                  name="brandLink"
                  value={values.brandLink}
                  onChange={onChange}
                  placeholder="You can copy/paste this in..."
                ></input>
              </div>
              <div id="popup-form-group">
                <label for="logo" className="not-required">
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
              <button id="popup-register-button" type="submit">
                Confirm Changes
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
