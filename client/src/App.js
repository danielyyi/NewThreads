import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NoProfile from "./pages/NoProfile";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import SingleUser from "./pages/SingleUser";
import EditProfile from "./pages/EditProfile";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/posts/:postId" element={<SinglePost />} />
          <Route exact path="/users/:username" element={<SingleUser />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/noprofile" element={<NoProfile />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/createpost"
            element={
              <AuthRoute redirectTo="/">
                <CreatePost />
              </AuthRoute>
            }
          />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
