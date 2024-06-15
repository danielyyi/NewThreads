import React, { useContext, useState, useEffect } from "react";

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
import "./CreatePost.css";
import pfp from "../pfp.png";
import Output from "../components/Output";
import Cropper from "react-easy-crop";
//import generateDownload from "./cropUtil"

//TODO: Figure out resizeImage
const CROP_AREA_ASPECT = 4 / 5;

function MakePost(props) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    caption: "",
    image: "",
    price: "",
    title: "",
    productLink: "",
    sex: "unisex",
    category: "tshirt",
  });

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

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

  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (error) => reject(error));
      img.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
      img.src = url;
    });

  async function getCroppedImg(imageSrc, pixelCrop) {
    console.log(pixelCrop);

    const img = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const maxSize = Math.max(img.width, img.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.drawImage(
      img,
      safeArea / 2 - img.width * 0.5,
      safeArea / 2 - img.height * 0.5
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = img.width * (pixelCrop.width / 100) - 2;
    canvas.height = img.height * (pixelCrop.height / 100) - 2;

    ctx.putImageData(
      data,
      0 - (safeArea / 2 +2) + img.width * 0.5 - (img.width * pixelCrop.x) / 100,
      0 - (safeArea / 2 +2) + img.height * 0.5 - (img.height * pixelCrop.y) / 100
    );

    // As Base64 string
    // return canvas.toDataURL("image/jpeg");

    return canvas;
  }

  const prepareImage = async (imageSrc, crop) => {
    if (!crop || !imageSrc) {
      return;
    }
    const canvas = await getCroppedImg(imageSrc, crop);
    const base64Canvas = canvas.toDataURL("image/jpeg");
    console.log(base64Canvas);
    values.image = base64Canvas;
    //resizeImage(base64Canvas, 200, 600).then((result) => (values.image = result));
  };

  const [image, setImage] = useState("");
  function changeImage(image) {
    setImage(image);
    values.image = image;
    console.log(image);
    //values.image = image;
    //resizeImage(image, 600, 600).then((result) => (values.image = result));
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

  async function createPostCallback() {
    await prepareImage(values.image, croppedArea);
    createPost();
    navigate("/");
  }

  return (
    <div>
      <nav className="dev-nav">
        <Link to="/">
          <div className="logo">NewThreads <span id="share"> - Share an Item</span></div>
        </Link>
      </nav>

      <div className="create-holder">
        
        <div>
        <Link to="/profile">
                <button id="create-button">Cancel</button>
              </Link>
          <form onSubmit={onSubmit} className="post-form">
            <FileBase
              title=" "
              type="file"
              multiple={false}
              onDone={({ base64 }) => changeImage(base64)}
            />
            <input
              wrap="soft"
              type="text"
              maxLength={100}
              onChange={onChange}
              value={values.title}
              name="title"
              placeholder="Title"
            />

            <input
              wrap="soft"
              type="number"
              min="0.00"
              max="10000.00"
              step="0.01"
              maxLength={10}
              onChange={onChange}
              id="price"
              value={values.price}
              name="price"
              placeholder="Price"
            />

            <select onChange={onChange} id="sex" value={values.sex} name="sex">
              <option value="unisex">Unisex</option>
              <option value="male">Men</option>
              <option value="female">Women</option>
            </select>

            <select 
              onChange={onChange}
              id="category"
              value={values.category}
              name="category"
            >
              <option value="tshirt">T-Shirt</option>
              <option value="sweatshirt">Sweatshirt/Hoodie</option>
              <option value="shorts">Shorts</option>
              <option value="pants">Pants</option>
            </select>
            <input
              wrap="soft"
              type="text"
              maxLength={100}
              onChange={onChange}
              value={values.productLink}
              name="productLink"
              placeholder="URL to purchase item"
            />
            <textarea
              wrap="soft"
              rows="20"
              cols="70"
              maxLength={1000}
              onChange={onChange}
              value={values.caption}
              name="caption"
             placeholder="Description of Apparel"
            ></textarea>

            <div>

              <button
                type="submit"  id="create-button"
                disabled={values.title == "" || values.image == "" || values.price == "" ||  values.caption == "" || values.productLink == ""}
              >
                Share
              </button>
            </div>
          </form>
        </div>

        <div className="images">
          <div className="cropper">
            <Cropper
              image={image}
              aspect={CROP_AREA_ASPECT}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropAreaChange={setCroppedArea}
            />
          </div>
          <div className="viewer">
            <div>
              {croppedArea && (
                <Output
                  ratio={CROP_AREA_ASPECT}
                  image={image}
                  croppedArea={croppedArea}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $caption: String!
    $image: String!
    $price: String!
    $title: String!
    $productLink: String!
    $sex: String!
    $category: String!
  ) {
    createPost(
      caption: $caption
      image: $image
      price: $price
      title: $title
      productLink: $productLink
      sex: $sex
      category: $category
    ) {
      id
      caption
      createdAt
      username
      image
      category
      sex
      price
    }
  }
`;

export default MakePost;
