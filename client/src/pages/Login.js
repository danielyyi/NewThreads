import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import "../Login.css";
import Navbar from "../components/Navbar";

function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

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

  return (
    <>
      <div className="form-holder">
        <form onSubmit={onSubmit} noValidate className="form">
          <div class="title">NewThreads</div>
          <div class="subtitle">Login</div>
          <div class="input-container ic1">
            <input
              id="username"
              placeholder=" "
              name="username"
              value={values.username}
              className="input"
              onChange={onChange}
            />
            <div class="cut"></div>
            <label for="username" class="placeholder">
              Username
            </label>
          </div>
          <div class="input-container ic2">
            <input
              id="password"
              type="password"
              placeholder=" "
              className="input"
              name="password"
              value={values.password}
              onChange={onChange}
            />
            <div class="cut"></div>
            <label for="password" class="placeholder">
              Password
            </label>
          </div>
          {loading ? (
            <div className="loader-holder-small">
              <div className="loader-small"></div>
            </div>
          ) : (
            <button className="submit" type="submit">
              Login
            </button>
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
          <Link to="/">
            <div style={{ fontSize: "larger", color: "white", margin: 15 }}>
              Back
            </div>
          </Link>
        </form>
      </div>
      <Navbar />
    </>
  );
}
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
      brandLink
      bio
    }
  }
`;
export default Login;
