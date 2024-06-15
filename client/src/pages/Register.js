import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import {AuthContext} from '../context/auth'
import '../Login.css'
import Navbar from "../components/Navbar";
import FileBase from "react-file-base64";
function Register(props) {
  const context = useContext(AuthContext)
  const [errors, setErrors] = useState({});
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
    console.log(values.pfp)
  }


  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, {data: {register: userData}}) {
      console.log(userData);
      context.login(userData)
      navigate('/profile');
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
    <div className="form-holder">
      <form className="form" onSubmit={onSubmit} noValidate>
      <div class="title">New Threads</div>
      <div class="subtitle">Register Your Brand</div>
      <div class="input-container ic1">
        <input
          placeholder=" "
          id= "username"
          name="username"
          value={values.username}
          className="input"
          onChange={onChange}
        />
        <div class="cut"></div>
        <label for="username" className="placeholder">Username</label>
        </div>
        <div class="input-container ic2">
        <input
          placeholder=" "
          id="email"
          name="email"
          value={values.email}
          className="input"
          onChange={onChange}
        />
        <div class="cut"></div>
        <label for="email" className="placeholder">Email</label>
        </div>
        <div class="input-container ic2">
        <input
          placeholder=" "
          id="bio"
          name="bio"
          value={values.bio}
          className="input"
          onChange={onChange}
        />
        <div class="cut"></div>
        <label for="bio" className="placeholder">Bio</label>
        </div>
        <div class="input-container ic2">
        <input
          placeholder=" "
          id="brandLink"
          name="brandLink"
          value={values.brandLink}
          className="input"
          onChange={onChange}
        />
        <div class="cut"></div>
        <label for="brandLink" className="placeholder">Brand Link</label>
        </div>
        <div class="input-container ic2">
        <input
          placeholder=" "
          type="password"
          id="password"
          name="password"
          value={values.password}
          className="input"
          onChange={onChange}
        />
        <div class="cut"></div>
        <label for="password" className="placeholder">Password</label>
        </div>
        <div class="input-container ic2">
        <input
        type="password"
          id="confirmPassword"
          placeholder=" "
          name="confirmPassword"
          value={values.confirmPassword}
          className="input"
          onChange={onChange}
        />
         <div class="cut"></div>
        <label for="confirmPassword" className="placeholder">Confirm Password</label>
        </div>
        <div className="post">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {image === "" ? (
                      <div className="fake-post-image">
                        <FileBase
                          title=" "
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) => changeImage(base64)}
                        />
                      </div>
                    ) : (
                      <img className="post-image" src={image} />
                    )}
                  </div>
                </div>
        {loading ? (<div className="loader-holder-small"><div className="loader-small"></div></div>):(<button className="submit" type="submit">Sign Up</button>)}
        
        {Object.keys(errors).length > 0 && (
        <div>
          <ul>
            {Object.values(errors).map((value) => (
              <li className="errors" key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <Link to="/">
        <div style={{  fontSize:"larger",color: "white", margin:15 }}>Back</div>
      </Link>
      </form>
      
      
    </div>
    <Navbar />
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
