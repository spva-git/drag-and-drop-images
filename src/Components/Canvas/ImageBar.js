import React from "react";
import AddButton from "./AddButton"; // Import AddButton

const ImageBar = ({ ImageArr, addNodeToCanvas, addImageBackToBar  }) => {
  // Handle drag start event for images
  const handleDragStart = (e, image) => {
    // Remove image from ImageArr
    e.dataTransfer.setData("image", JSON.stringify(image)); // Send the image data to the canvas
    e.target.classList.add("dragging");

    e.target.style.zIndex = 1000;
  };
  const handleDragEnd = (e) => {
    e.target.style.zIndex = ""; // Reset the z-index after dragging ends
    e.target.classList.remove("dragging");

  };
  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };
  const handleDrop = (e) => {
    console.log('Drop event triggered!');
    e.preventDefault();
    const imageData = e.dataTransfer.getData("image");
    if (imageData) {
      const image = JSON.parse(imageData);
      addImageBackToBar(image); // Add the image back to the ImageBar when dropped
      console.log('Image dropped back to bar: ', image);

    }
  };
  return (
    <div
      className="image-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: "45%",
        transform: "translateX(-50%)", // Center the ImageBar horizontally
        width: "80%", // Set a fixed width for the ImageBar
        display: "flex",
        justifyContent: "flex-start", // Align items to the left
        padding: "10px",
        backgroundColor: "#f0f0f0",
        zIndex: 20,
        overflowX: "auto", // Enable horizontal scrolling if needed
        whiteSpace: "nowrap", // Prevent wrapping of images
        boxSizing: "border-box", // Ensure padding is included in the width calculation
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* AddButton will be the first element */}
      <AddButton addNodeToCanvas={addNodeToCanvas} />

      {/* Existing images in the ImageArr */}
      {ImageArr.map((image) => (
        <div
          key={image.id}
          style={{
            width: image.widthPx,
            height: image.heightPx,
            backgroundImage: `url(${image.src})`,
            backgroundSize: "cover",
            cursor: "pointer",
            margin: "0 10px",
            display: "inline-block", // Ensure images align horizontally
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, image)}
         
          onDragEnd={handleDragEnd}

        />
      ))}
    </div>
  );
};

export default ImageBar;
