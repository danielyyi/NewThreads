import React, { useState, useEffect } from "react";
import ReactSlider from "react-slider";
import { useSearchParams, Link } from "react-router-dom";
import { GET_TAGS_QUERY } from "../util/graphql";
import "../pages/Clothes.css";
import TagItem from "./TagItem";
import { useQuery } from "@apollo/client";

function Filters(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category"));
  const [page, setPage] = useState(Number(searchParams.get("page")));
  const [sex, setSex] = useState(searchParams.get("sex"));
  const [minAndMax, setMinAndMax] = useState(searchParams.get("price"));

  if (minAndMax == "NaN" || minAndMax == "null") {
    setMinAndMax("0to200");
  }
  const [variables, setVariables] = useState({
    page: 0,
  });

  const [tags, setTags] = useState([]);

  var preTags = [];

  function handleTagClick(name, color) {
    if (tags.length > 4) return;
    if (tags.some((el) => el.name === name)) return;
    setTags([...tags, { name: name, color: color }]);
  }
  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  var min = 0;
  var max = 200;
  if (minAndMax) {
    min = Number(minAndMax.split("to")[0]);
    max = Number(minAndMax.split("to")[1]);
  }
  const [prices, setPrices] = useState([min, max]);
  const handleChange = (newPrices) => setPrices(newPrices);

  const applyFilters = () => {
    let str = "";
    let arr = tags.map((tag) => tag.name);
    arr.forEach((tag) => {
      str += tag + ",";
    });
    if (str != "") {
      variables.tags = str;
    }
    let str2 = `${prices[0]}to${prices[1]}`;
    if (str2 != "") {
      variables.price = str2;
    }
    if (str2 == "0to200") {
      delete variables.price;
    }
    if (category == "all") {
      delete variables.category;
    }
    if (sex == "all") {
      delete variables.sex;
    }

    console.log(variables);

    console.log(variables);
    setSearchParams(variables);
    setFilters();
  };

  const clearFilters = () => {
    setSearchParams({});
    setFilters();
  };

  const filterPrice = () => {};

  const filterCategory = (filter) => {
    variables.category = filter;
    setCategory(filter);
  };

  const filterSex = (filter) => {
    variables.sex = filter;
    setSex(filter);
  };

  const setFilters = (data) => {
    props.setFilters(data);
  };

  const { loading, data } = useQuery(GET_TAGS_QUERY, {
    fetchPolicy: "cache-first",
  });
  if (!loading && data && data.getTags) {
    preTags = data.getTags;
  }
  if (loading) {
    console.log("LOADING");
  }
  let strTags = searchParams.get("tags");
  useEffect(() => {
    if (strTags && strTags != "null") {
      let arr = strTags.split(",");
      let objArr = [];
      arr.forEach((name) => {
        let obj = preTags.find((tag) => tag.name === name);
        if (obj) {
          objArr.push(obj);
        }
      });
      setTags(objArr);
    }
  }, [loading]);
  //----
  return (
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" onClick={() => setFilters(false)}>
          &times;
        </span>
        <h2>Filter Apparel</h2>
        <div id="filters">
          <label id="filter-label">Style</label>
          <div id="categories">
            <button
              onClick={() => filterCategory("all")}
              className={
                !category || category === "all"
                  ? "active-button"
                  : "inactive-button"
              }
            >
              All
            </button>
            <button
              onClick={() => filterCategory("tshirt")}
              className={
                category === "tshirt" ? "active-button" : "inactive-button"
              }
            >
              Tees
            </button>
            <button
              onClick={() => filterCategory("sweatshirt")}
              className={
                category === "sweatshirt" ? "active-button" : "inactive-button"
              }
            >
              Pullovers
            </button>
            <button
              onClick={() => filterCategory("shorts")}
              className={
                category === "shorts" ? "active-button" : "inactive-button"
              }
            >
              Shorts
            </button>
            <button
              onClick={() => filterCategory("pants")}
              className={
                category === "pants" ? "active-button" : "inactive-button"
              }
            >
              Pants
            </button>
            <button
              onClick={() => filterCategory("hat")}
              className={
                category === "hat" ? "active-button" : "inactive-button"
              }
            >
              Hats
            </button>
            <button
              onClick={() => filterCategory("other")}
              className={
                category === "other" ? "active-button" : "inactive-button"
              }
            >
              Other
            </button>
          </div>
          <label id="filter-label">Gender</label>
          <div id="categories">
            <button
              onClick={() => filterSex("all")}
              className={
                !sex || sex === "all" ? "active-button" : "inactive-button"
              }
            >
              All
            </button>
            <button
              onClick={() => filterSex("male")}
              className={sex === "male" ? "active-button" : "inactive-button"}
            >
              Male
            </button>
            <button
              onClick={() => filterSex("female")}
              className={sex === "female" ? "active-button" : "inactive-button"}
            >
              Female
            </button>
            <button
              onClick={() => filterSex("unisex")}
              className={sex === "unisex" ? "active-button" : "inactive-button"}
            >
              Unisex
            </button>
          </div>
          <label id="filter-label"> Price</label>
          <div id="slider-holder-holder">
            <div id="slider-holder">
              <div id="prices">
                <div>${prices[0]}</div>
                <div>${prices[1]}</div>
              </div>

              <ReactSlider
                className="slider"
                value={prices}
                onChange={handleChange}
                min={0}
                max={200}
              />
            </div>
          </div>
          <label id="filter-label">Tags</label>
          <div id="tags-filter-top">
            <div name="tags" id="#tags-filter-top">
              {preTags.length > 0 &&
                preTags.map((tag, index) => (
                  <>
                    {tags.some((el) => el.name === tag.name) ? (
                      <span onClick={() => handleTagClick(tag.name, tag.color)}>
                        <TagItem
                          name={tag.name}
                          color={tag.color}
                          clicked={true}
                          key={index}
                        />
                      </span>
                    ) : (
                      <span onClick={() => handleTagClick(tag.name, tag.color)}>
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
          <div name="tags" id="tags-filter-bottom">
            {tags.length > 0 &&
              tags.map((tag, index) => (
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
          </div>
          <button className="inactive-button" onClick={() => applyFilters()}>
            Apply
          </button>
          <button className="inactive-button" onClick={() => clearFilters()}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
