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

function LoginPopup(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
      username: "",
      password: "",
    });
  
    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
  
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
      update(_, { data: { login: userData } }) {
        context.login(userData);
        navigate("/profile");
      },
      onError(err) {
        console.log(err);
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables: values,
    });
  
    function loginUserCallback() {
      loginUser();
    }

  const setLogin = (data) => {
    props.setLogin(data);
  };
  const setRegister = (data) => {
    props.setRegister(data);
    props.setLogin(false)
  };
  //----
  return (
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={() => setLogin(false)}>
          &times;
        </span>
       
          <div id="popup-form-holder">
            <form id="popup-form" onSubmit={onSubmit} noValidate>
              <div id="popup-form-title">Login</div>
              <div id="popup-form-subtitle">
                Welcome back!
              </div>
              <div id="popup-form-subtitle2" onClick={()=>setRegister(true)}>Don't have an account?</div>
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
                <label for="password" className="">
                  Password
                </label>
                <input
                type="password"
                  name="password"
                  value={values.password}
                  onChange={onChange}
                ></input>
              </div>

              <button id="popup-register-button" type="submit">
                Log In
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
        
      </div>
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

export default LoginPopup;
