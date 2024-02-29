import React from "react";

function Post({i: image, color: color}) {
  return (
    <div>
      <div className="post" style={{backgroundColor: `${color}`}} >
        <div style={{ display: "flex", justifyContent: "center"}}>
          <img className="post-image" src={image}  />
        </div>
          
      </div>
    </div>
  );
}
export default Post;
