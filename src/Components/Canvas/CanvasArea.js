// CanvasArea.js
import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";

const CanvasArea = ({
  nodes,
  onNodesChange,
  onEdgesChange,
  reactEdges,
  handleDrop,
  handleDragOver,
}) => {
  const proOptions = { hideAttribution: true };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: "100%", height: "calc(100vh - 100px)" }}
      className="canvas-area"
    >
      <ReactFlow
        nodes={nodes}
        edges={reactEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{ width: "100%", height: "100%" }}
        proOptions={proOptions}
        nodesConnectable ={false}
        connectOnClick={false}
        nodesFocusable={false}
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(n) => "#ff0072"}
          zoomable
          pannable
          style={{ position: "absolute", bottom: 20, right: 20 }}
        />
      </ReactFlow>
    </div>
  );
};

export default CanvasArea;
