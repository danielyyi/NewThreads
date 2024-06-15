const Output = ({ ratio, image, croppedArea }) => {
  const scale = 100 / croppedArea.width;
  const transform = {
    x: `${-croppedArea.x * scale}%`,
    y: `${-croppedArea.y * scale}%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
  };

  return (
    <div className="output" style={{ paddingBottom: `${100 / ratio}%` }}>
      <img src={image} alt="" style={imageStyle} />
    </div>
  );
};

export default Output;
