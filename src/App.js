import React from "react";
import "./App.css";
import CanvasComponent from "./Components/Canvas";
import { ImageArr } from "./Components/Canvas/imagesjson"; // Importing ImageArr from the dummyImages.js file

const App = () => {

  return (
    <div>
      <CanvasComponent ImageArr={ImageArr} />
    </div>
  );
};

export default App;
