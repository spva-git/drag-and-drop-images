import React, { useState } from "react";

const AddButton = ({ addNodeToCanvas }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = {
          src: reader.result, // Set the image src as a data URL
          id: file.name, // Use the file name as a unique id
          widthPx: 200, // Set default width and height
          heightPx: 150,
        };
        setSelectedImage(imageData); // Set the selected image state

        handleAddImage(imageData); // Add the image to the canvas immediately
      };
      reader.readAsDataURL(file); // Convert the file to a data URL
    }
  };

  // Add the selected image to the canvas
  const handleAddImage = (image) => {
    if (image) {
      addNodeToCanvas(image, { x: 100, y: 100 }); // You can adjust the position as needed
      setSelectedImage(null); // Reset after adding the image
    }
  };

  return (
    <div
      style={{
        width: "200px",
        height: "150px",
        margin: "0 10px",
        backgroundColor: "#e0e0e0", // Similar to image background
        cursor: "pointer",
        display: "inline-block", // Align it like the images in the ImageBar
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", // To position the "+" icon at the center
        overflow: "hidden", // Ensure the "+" doesn't overflow the button
        boxSizing: "border-box", // Ensure padding is included in the width calculation
      }}
      onClick={() => document.getElementById("fileInput").click()} // Trigger file input on box click
    >
      {/* File input to select an image, hidden for styling */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0, // Hide the input
          cursor: "pointer",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        id="fileInput" // Unique id for the file input
      />
      {/* Optional: Add "+" icon inside the button */}
      {!selectedImage && (
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#333",
            fontWeight: "bold",
            fontSize: "36px", // Make the "+" bigger
          }}
        >
          +
        </span>
      )}
    </div>
  );
};

export default AddButton;
