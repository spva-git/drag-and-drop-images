// ResizableImageNode.js
import React from "react";
import { ResizableBox } from "react-resizable";

const ResizableImageNode = ({ image, id, onNodeResize }) => {
  return (
    <ResizableBox
      width={image.widthPx}
      height={image.heightPx}
      minConstraints={[50, 50]}
      maxConstraints={[500, 500]}
      onResizeStop={(e, data) => onNodeResize(id, data.size)}
      resizeHandles={['se']} // Optional: Resize from one corner
      style={{ border: "none", boxShadow: "none" }} // Remove border and shadow
    >
      <img
        src={image.src}
        alt={image.id}
        width={image.widthPx}
        height={image.heightPx}
      />
    </ResizableBox>
  );
};

export default ResizableImageNode;
