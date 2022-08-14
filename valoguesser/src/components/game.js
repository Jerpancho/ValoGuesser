import React, { useState, useRef } from "react";
import Map from "./map";
// import { useParams } from "react-router-dom";

const Game = (props) => {
  // the useParams takes the id and gets the map image url with the following id
  const map = useRef(null); //targets the map
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [click, setClick] = useState(false);
  const [confirm, setConfirm] = useState(false);
  // use a reducer to handle game state/ track scores?

  const getCoords = (e) => {
    let pos = map.current.getBoundingClientRect();
    let newX = e.clientX - pos.left;
    let newY = e.clientY - pos.top;
    return [newX, newY];
  };
  // or gets prop from the link-to with the map image url
  const handleCoords = (e) => {
    let [newX, newY] = getCoords(e);
    console.log(newX, newY);
    setCoords({ x: newX, y: newY });
    setClick(true);
  };

  return (
    <div className="game">
      {/* create a seperate component later for the map and the image-to-guess */}
      {/* this should also be a canvas to implement interactivity */}
      <div>
        {/* NOTE: this is for the map and a dot that points where you choose on the map*/}
        <Map
          handleCoords={handleCoords}
          map={map}
          click={click}
          coords={coords}
        />

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
      {/* another component here for showing the image */}
    </div>
  );
};

export default Game;
