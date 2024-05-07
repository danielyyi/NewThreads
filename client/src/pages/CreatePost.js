//crop.jsx
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Crop = () => {
  const [src, selectFile] = useState(null);
  const handleFileChange = (e) => {
    selectFile(URL.createObjectURL(e.target.files[0]));
  };

  const [setImage] = useState(null);
  const [crop, setCrop] = useState({
    
    aspect:1,
  });
  console.log(crop);

  function getCroppedImg() {
    const canvas = document.getElementById("canvas");
    const image = document.getElementById("result");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(
      image.width,
      image.height,
      image.naturalWidth,
      image.naturalHeight
    );

    const imageWidthRatio = image.naturalWidth / image.width;
    const imageHeightRatio = image.naturalHeight / image.height;

    console.log(crop);
    ctx.drawImage(
      image,
      crop.x * imageWidthRatio,
      crop.y * imageHeightRatio,
      crop.width * imageWidthRatio,
      crop.height * imageHeightRatio,
      0,
      0,
      crop.width,
      crop.height
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {src && (
          <div>
            <ReactCrop crop={crop} onChange={c => setCrop(c)}>
              <img id="result" src={src} alt="description" onLoad={setImage} />
            </ReactCrop>
            <button className="btn btn-danger" onClick={getCroppedImg}>
              Crop image
            </button>
          </div>
        )}
        <canvas
          id="canvas"
          width={crop.width}
          height={crop.height}
          style={{
            border: "1px solid black",
            objectFit: "contain",
          }}
        ></canvas>
      </div>
    </div>
  );
};
export default Crop;
