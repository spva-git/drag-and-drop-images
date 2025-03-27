import React, { useState } from "react";
import { useNodesState, useEdgesState, addEdge } from "react-flow-renderer";
import ImageBar from "./ImageBar";
import CanvasArea from "./CanvasArea";
import Popup from "./Popup";
import ResizableImageNode from "./ResizableImageNode";
import PropTypes from 'prop-types'; // Import PropTypes

const CanvasComponent = ({ ImageArr }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [reactEdges, setReactEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [updatedImageArr, setUpdatedImageArr] = useState(ImageArr); // To manage the ImageArr state

  const addNodeToCanvas = (image, position) => {
    const id = `${image.id}-${nodes.length + 1}`;

    const newNode = {
      id,
      type: "default",
      position,
      data: {
        label: (
          <ResizableImageNode
            image={image}
            id={id}
            onNodeResize={onNodeResize}
          />
        ),
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeResize = (id, newSize) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                label: (
                  <ResizableImageNode
                    image={{
                      ...node.data.label.props.image,
                      widthPx: newSize.width,
                      heightPx: newSize.height,
                    }}
                    id={id}
                    onNodeResize={onNodeResize}
                  />
                ),
              },
            }
          : node
      )
    );
  };

  const removeImageFromBar = (imageId) => {
    setUpdatedImageArr((prevImages) => prevImages.filter((image) => image.id !== imageId));
  };
 // Function to remove image from the canvas when dropped back to ImageBar
 const removeImageFromCanvas = (imageId) => {
  setNodes((prevNodes) => prevNodes.filter((node) => node.id !== imageId));
};

  // Function to add image back to ImageArr when dragged back to the ImageBar
  const addImageBackToBar = (image) => {
    setUpdatedImageArr((prevImages) => [...prevImages, image]);
  };

  const onConnect = (params) => setReactEdges((eds) => addEdge(params, eds));

  const handleDrop = (e) => {
    e.preventDefault();
    const imageData = e.dataTransfer.getData("image");
    const dropTarget = e.target;

    if (imageData) {
      const image = JSON.parse(imageData);
      /*const position = { x: e.clientX - 50, y: e.clientY - 50 };
      addNodeToCanvas(image, position);
      removeImageFromBar(image.id);*/
      if (dropTarget.classList.contains("react-flow__pane")) {
        const position = { x: e.clientX - 50, y: e.clientY - 50 };
        addNodeToCanvas(image, position); // Add image to canvas
        removeImageFromBar(image.id); // Remove image from ImageBar
      }
      // If dropped back onto the ImageBar
      else if (dropTarget.classList.contains("image-bar")) {
        addImageBackToBar(image); // Add the image back to ImageBar
        removeImageFromCanvas(image.id); // Remove image from canvas
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <CanvasArea
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        reactEdges={reactEdges}
        addNodeToCanvas={addNodeToCanvas}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        onConnect={onConnect} // Pass onConnect prop to CanvasArea
      />
      {selectedCard && <Popup selectedCard={selectedCard} setSelectedCard={setSelectedCard} />}
      <ImageBar ImageArr={updatedImageArr} addNodeToCanvas={addNodeToCanvas} removeImageFromBar={removeImageFromBar}  addImageBackToBar={addImageBackToBar } />

    </div>
  );
};

// Define PropTypes for better type-checking and readability
CanvasComponent.propTypes = {
  ImageArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      widthPx: PropTypes.number.isRequired,
      heightPx: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CanvasComponent;
