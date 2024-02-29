import React, { useContext, useState, useEffect } from "react";
import {
  CirclePicker,
  GithubPicker,
  HuePicker,
  TwitterPicker,
} from "react-color";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import MockPost from "../components/MockPost";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY, LOAD_POSTS_QUERY } from "../util/graphql";
import FileBase from "react-file-base64";
import moment from "moment";

const pickerStyles = {
  default: {
    picker: {
      // See the individual picker source for which keys to use
      width: "350px",
      height: "25px",
    },
  },
};

function MakePost(props) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    caption: "",
    image: "",
    color: "#fff",
  });

  const [color, setColor] = useState("#fff");
  function changeColor(color) {
    values.color = color;
    setColor(color);
  }

  function resizeImage(base64Str, maxWidth = 400, maxHeight = 350) {
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
    setImage(image);
    resizeImage(image, 400, 400).then((result) => (values.image = result));
  }

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: LOAD_POSTS_QUERY,
      });
      if (data) {
        proxy.writeQuery({
          query: LOAD_POSTS_QUERY,
          data: {
            getPosts: [result.data.createPost, ...data.getPosts],
          },
        });
        values.caption = "";
      }
    },
  });

  function createPostCallback() {
    createPost();
    navigate('/');
  }

  return (
    <div>
      <div className="create-form">
        <form onSubmit={onSubmit}>
          <div className="create-post-form-holder">
            <div className="single-post-holder" style={{ paddingTop: 0 }}>
              <div>
                <div className="post-user">{user.username}</div>
                <div className="post" style={{ backgroundColor: `${color}` }}>
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
                <div className="post-caption">
                  <input
                    wrap="soft"
                    type="text"
                    maxLength={100}
                    onChange={onChange}
                    value={values.caption}
                    className="post-caption"
                    name="caption"
                    placeholder="Your caption here..."
                  />
                </div>
                <div className="post-bottom-holder">
                  <div className="post-date">
                    {moment().format("MMMM Do, YYYY")}{" "}
                  </div>
                  <div className="spacer"></div>

                  <div className="comment-icon">
                    0 <FontAwesomeIcon icon={faComments} />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <HuePicker
                styles={pickerStyles}
                color={color}
                onChange={({ hex }) => changeColor(hex)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Link to="/profile">
                <button className="create-button">Cancel</button>
              </Link>
              <button className="create-button" type="submit" disabled={values.caption.trim() === "" || values.image ===""}>
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($caption: String!, $image: String!, $color: String) {
    createPost(caption: $caption, image: $image, color: $color) {
      id
      caption
      createdAt
      username
      image
      color
      commentCount
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export default MakePost;
