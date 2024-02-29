import React, {useState, useEffect, useRef} from "react";
import Navbar from "../components/Navbar";
import Headerbar from "../components/Headerbar";
import Post from "../components/Post";
import { LOAD_POSTS_QUERY } from "../util/graphql";

import { useQuery, useLazyQuery, ApolloClient, InMemoryCache, makeVar} from "@apollo/client";

import gql from "graphql-tag";
import {FETCH_POSTS_QUERY} from '../util/graphql'
//YOU NEED TO CHANGE CREATE POST TO LOAD POST QUERY
function Home() {

  var posts = [];
    const limit = 3;
    const {loading, data, refetch} = useQuery(LOAD_POSTS_QUERY, {
      variables:{
        limit
      },
      fetchPolicy: 'network-only', // Used for first execution
      nextFetchPolicy: 'cache-first',
    });

  
    const listInnerRef = useRef();
    const onScroll = () => {
      if (listInnerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
        //console.log("Scroll Top: " + scrollTop, "Scroll Height" + scrollHeight, "Client Height: " + clientHeight)
        //console.log(scrollTop + clientHeight + 100)
        if (scrollTop + clientHeight +  800>= scrollHeight) {
          console.log("BOTTOM")
          refetch({limit: posts.length+3})
        }
      }
    };

//---------
   
    console.log(data)
    if(!loading && data && data.loadPosts){
      data.loadPosts.forEach(element => {
        posts.push(element);
      });

      
      console.log(posts)
      console.log("pressed");
      
    }
    //----
  return (
    <div>
      <Headerbar />
      <div className="fake-headerbar"></div>
      <div className="current-posts" onScroll={onScroll} ref={listInnerRef}>
      {loading ? (
        <div className="loader-holder"><div className="loader"></div></div>
      ) : (
        posts &&
        posts.map((post) => (
          <div className="post-holder" key={post.id} >
            <Post post={post} />
          </div>
        ))
      )}
      <div className = "fake-nav"></div>
      </div>
      
      <Navbar />
    </div>
  );
}
/*
<div>
      {!loading ? (
        <div className="post-holder"><button className="create-button" onClick={() => refetch({limit: posts.length+3})}>Load More</button></div>
      ) : (<></>)}
    </div>
*/

export default Home;
