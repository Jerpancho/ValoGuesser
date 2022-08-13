import React, { useState } from "react";
// import { useParams } from "react-router-dom";

const Game = ({ map }) => {
  // the useParams takes the id and gets the map image url with the following id
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [confirm, setConfirm] = useState(false);
  // or gets prop from the link-to with the map image url
  const handleCoords = (e) => {
    if (confirm === false) {
      const newX = e.clientX - e.target.offsetLeft;
      const newY = e.clientY - e.target.offsetTop;
      setCoords({ ...coords, x: newX, y: newY });
    }
  };

  return (
    <div className="game">
      {/* create a seperate component later for the map and the image-to-guess */}
      {/* this should also be a canvas to implement interactivity */}
      <div className="map-container" onMouseDown={handleCoords}></div>
      <div>
        <button className="map-button" onClick={() => setConfirm(!confirm)}>
          Confirm
        </button>
        {confirm && (
          <div>
            <p>Your coordinates are:</p>
            <p>x: {coords.x}</p>
            <p>y: {coords.y}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
