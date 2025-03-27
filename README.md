# Drag and Drop Image to Canvas

This project allows users to upload images from their computer and drag them from an image bar onto a canvas. The images can be repositioned, resized, and connected to other nodes.

## Features

### 1. **Upload Images from Computer**
Users can upload images directly from their computer. These images are added to the canvas as draggable and resizable nodes.

```js
// Image Upload Handler
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const uploadedImage = { src: reader.result, id: file.name };
      addNodeToCanvas(uploadedImage, { x: 100, y: 100 });
    };
    reader.readAsDataURL(file);
  }
};

// Add image to canvas as a node
const addNodeToCanvas = (image, position) => {
  const id = `${image.id}-${nodes.length + 1}`;
  const newNode = {
    id,
    type: 'default',
    position,
    data: {
      label: <img src={image.src} alt={image.id} width="100" />,
    },
  };
  setNodes((nds) => [...nds, newNode]);
};
