import React, { useContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";
import MockPost from "../components/MockPost";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "../util/hooks";
import {
  FETCH_POSTS_QUERY,
  LOAD_POSTS_QUERY,
  COUNT_POSTS,
  GET_TAGS_QUERY,
} from "../util/graphql";
import FileBase from "react-file-base64";
import moment from "moment";
import "./CreatePost.css";
import pfp from "../pfp.png";
import Headerbar from "../components/Headerbar";
import Output from "../components/Output";
import Cropper from "react-easy-crop";
import Footer from "../components/Footer";
import TagItem from "../components/TagItem";
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
    tags: [],
  });

  const [tags, setTags] = useState([]);
  var preTags = [];

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value.toLowerCase();
    if (value.length > 14) return;
    if (value.indexOf(",") != -1) return;
    if (!value.trim()) return;
    if (tags.length > 2) return;
    if (tags.some((el) => el.name === value)) return;

    if (preTags.some((el) => el.name === value)) {
      const color = preTags.find((x) => x.name === value).color;
      console.log("already exists");
      setTags([...tags, { name: value, color: color }]);
    } else {
      setTags([
        ...tags,
        {
          name: value,
          color: `hsla(${~~(360 * Math.random())}, 87%,  60%, 0.8)`,
        },
      ]);
    }

    e.target.value = "";
  }

  function handleTagClick(name, color) {
    if (tags.some((el) => el.name === name)) return;
    if (tags.length > 2) return;
    setTags([...tags, { name: name, color: color }]);
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  const { loading, data } = useQuery(GET_TAGS_QUERY, {
    fetchPolicy: "cache-first",
  });
  if (!loading && data && data.getTags) {
    preTags = data.getTags;
  }
  if (loading) {
    console.log("LOADING");
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

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
      0 -
        (safeArea / 2 + 2) +
        img.width * 0.5 -
        (img.width * pixelCrop.x) / 100,
      0 -
        (safeArea / 2 + 2) +
        img.height * 0.5 -
        (img.height * pixelCrop.y) / 100
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
  const [errors, setErrors] = useState({});

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
      navigate("/profile");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
     setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const [addTag1, { tag1Error }] = useMutation(ADD_TAG_MUTATION, {
    variables: {
      tag: tags[0],
    },
    onError(err) {
      console.log(err);
    },
  });

  const [addTag2, { tag2Error }] = useMutation(ADD_TAG_MUTATION, {
    variables: {
      tag: tags[1],
    },
    onError(err) {
      console.log(err);
      //setErrors(err.graphQLErrors[0].message);
    },
  });

  const [addTag3, { tag3Error }] = useMutation(ADD_TAG_MUTATION, {
    variables: {
      tag: tags[2],
    },

    onError(err) {
      console.log(err);
      //setErrors(err.graphQLErrors[0].message);
    },
  });

  async function createPostCallback() {
    values.price = Number(values.price);
    values.tags = tags;
    console.log(tags[0]);
    if (tags[0]) {
      await addTag1();
    }
    if (tags[1]) {
      await addTag2();
    }
    if (tags[2]) {
      await addTag3();
    }

    await prepareImage(values.image, croppedArea);
    createPost();
  }

  return (
    <div>
      <Headerbar />
      <div id="create-post-content">
      <div id="popup-form-holder">
        <form
          id="popup-form"
          onSubmit={onSubmit}
          className="post-form"
          onKeyDown={(e) => checkKeyDown(e)}
        >
          <Link to="/profile">
            <button
              type="button"
              id="popup-register-button"
              style={{ marginTop: "0px" }}
            >
              Cancel
            </button>
          </Link>
          <div id="popup-form-title">Create a Post</div>
          <div id="popup-form-subtitle">
            Share products from your brand to the world!
          </div>
          <div id="popup-form-group">
            <label for="image" className="">
              Image
            </label>
            <FileBase
              title=" "
              name="image"
              type="file"
              multiple={false}
              onDone={({ base64 }) => changeImage(base64)}
            />
            {image ? (
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
            ) : (
              <></>
            )}
          </div>
          <div id="popup-form-group">
            <label for="title" className="">
              Title
            </label>
            <input
              wrap="soft"
              type="text"
              maxLength={40}
              onChange={onChange}
              value={values.title}
              name="title"
              placeholder="Title"
            ></input>
          </div>
          <div id="popup-form-group">
            <label for="price" className="">
              Price
            </label>
            <input
              wrap="soft"
              type="number"
              maxLength={6}
              onChange={onChange}
              id="price"
              value={values.price}
              name="price"
              placeholder="Price"
            ></input>
          </div>
          <div id="popup-form-group">
            <label for="sex" className="">
              Sex
            </label>
            <select
              onChange={onChange}
              id="sex"
              value={values.sex}
              name="sex"
              maximum-scale={1}
            >
              <option value="unisex">Unisex</option>
              <option value="male">Men</option>
              <option value="female">Women</option>
            </select>
          </div>
          <div id="popup-form-group">
            <label for="category" className="">
              Category
            </label>
            <select
              maximum-scale={1}
              onChange={onChange}
              id="category"
              value={values.category}
              name="category"
            >
              <option value="tshirt">T-Shirt</option>
              <option value="sweatshirt">Sweatshirt/Hoodie</option>
              <option value="shorts">Shorts</option>
              <option value="pants">Pants</option>
              <option value="hat">Hat</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div id="popup-form-group">
            <label for="tags" className="">
              Add Tags
            </label>
            <div id="pre-tags-input-container">
              <input
                onKeyDown={handleKeyDown}
                id="tags-input"
                type="text"
                placeholder="Type or choose from existing tags..."
              />
              <div name="tags" id="tags-input-container-top">
                {preTags.length > 0 &&
                  preTags.map((tag, index) => (
                    <>
                      {tags.some((el) => el.name === tag.name) ? (
                        <span
                          onClick={() => handleTagClick(tag.name, tag.color)}
                        >
                          <TagItem
                            name={tag.name}
                            color={tag.color}
                            clicked={true}
                            key={index}
                          />
                        </span>
                      ) : (
                        <span
                          onClick={() => handleTagClick(tag.name, tag.color)}
                        >
                          <TagItem
                            name={tag.name}
                            color={tag.color}
                            clicked={false}
                            key={index}
                          />
                        </span>
                      )}
                    </>
                  ))}
              </div>
            </div>
            <div name="tags" id="tags-input-container-bottom">
              {tags.map((tag, index) => (
                <div
                  id="tag-item"
                  key={index}
                  style={{ backgroundColor: tag.color }}
                >
                  <span id="tag-text2">{tag.name}</span>
                  <span id="tag-close" onClick={() => removeTag(index)}>
                    &times;
                  </span>
                </div>
              ))}
              <div id="tags-count">{tags.length}/3</div>
            </div>
          </div>

          <div id="popup-form-group">
            <label for="productLink" className="">
              Product Link
            </label>
            <input
              maximum-scale={1}
              wrap="soft"
              type="text"
              maxLength={100}
              onChange={onChange}
              value={values.productLink}
              name="productLink"
              placeholder="URL to purchase item"
            />
          </div>

          <div id="popup-form-group">
            <label for="caption" className="">
              Description
            </label>
            <textarea
              maximum-scale={1}
              wrap="soft"
              rows="10"
              cols="70"
              maxLength={600}
              onChange={onChange}
              value={values.caption}
              name="caption"
              placeholder="Write some information about this product or copy and paste it from your own website..."
            ></textarea>
          </div>


          <button id="popup-register-button" type="submit">
            Share
          </button>
          <div>
            {loading ? (
              <div className="loader-holder">Loading...</div>
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
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $caption: String!
    $image: String!
    $price: Float!
    $title: String!
    $productLink: String!
    $sex: String!
    $category: String!
    $tags: [TagInput]!
  ) {
    createPost(
      caption: $caption
      image: $image
      price: $price
      title: $title
      productLink: $productLink
      sex: $sex
      category: $category
      tags: $tags
    ) {
      id
      caption
      createdAt
      username
      image
      category
      sex
      tags {
        name
        color
      }
      price
    }
  }
`;

const ADD_TAG_MUTATION = gql`
  mutation AddTag($tag: TagInput!) {
    addTag(tag: $tag) {
      color
      name
    }
  }
`;

export default MakePost;
