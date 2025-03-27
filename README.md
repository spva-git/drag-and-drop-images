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
```
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
          draggable
          onDragStart={(event) => handleDragStart(event, image)}
        />
      ))}
    </div>
    <div
      className="canvas"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()} // To allow drop
    >
      {nodes.map((node) => (
        <Node key={node.id} data={node.data} />
      ))}
    </div>
  </div>
);
```

### 3. **Resizable Nodes**
Nodes added to the canvas can be resized. You can implement the resizing functionality using libraries like `react-resizable` or custom handlers.

```js
import { ResizableBox } from 'react-resizable';

// Example of resizable image node
const ResizableImageNode = ({ image, onResize }) => (
  <ResizableBox width={100} height={100} onResizeStop={onResize}>
    <img src={image.src} alt={image.id} width="100%" height="100%" />
  </ResizableBox>
);
```

## Installation

### Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/drag-and-drop-images.git
```
### Install dependencies:

```bash
npm install

```
###Run the project:

```bash
npm start

```
This will start the development server, and you can view the app in your browser at http://localhost:3000.

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  
The page will reload when you make changes.  
You may also see any lint errors in the console.

#### `npm test`
Launches the test runner in the interactive watch mode.  
See the section about running tests for more information.

#### `npm run build`
Builds the app for production to the build folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.  
The build is minified, and the filenames include hashes.  
Your app is ready to be deployed!  
See the section about deployment for more information.

#### `npm run eject`

