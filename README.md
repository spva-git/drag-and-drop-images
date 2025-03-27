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

### 2. **Drag and Drop from Image Bar**
Users can drag and drop images from an image bar onto the canvas. Each image in the bar can be dragged to the desired location on the canvas.

```js
// Handle the drag start event
const handleDragStart = (event, image) => {
  event.dataTransfer.setData('image', JSON.stringify(image));
};

// Handle drop event on canvas
const handleDrop = (event) => {
  const image = JSON.parse(event.dataTransfer.getData('image'));
  const position = { x: event.clientX, y: event.clientY };
  addNodeToCanvas(image, position);
};

const imageBar = [
  { id: 'image1', src: '/images/image1.jpg' },
  { id: 'image2', src: '/images/image2.jpg' },
  { id: 'image3', src: '/images/image3.jpg' },
];

return (
  <div>
    <div className="image-bar">
      {imageBar.map((image) => (
        <img
          key={image.id}
          src={image.src}
          alt={image.id}
