// Popup.js
import React from "react";

const Popup = ({ selectedCard, setSelectedCard }) => {
  return (
    <div className="popup">
      <div>{selectedCard.data.label}</div>
      <button onClick={() => setSelectedCard(null)}>Close</button>
    </div>
  );
};

export default Popup;
