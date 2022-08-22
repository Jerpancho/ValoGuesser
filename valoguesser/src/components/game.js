import React, { useState, useRef, useReducer } from "react";
import Map from "./map";
import { reducer } from '../util/gameReducer'
// import { useParams } from "react-router-dom";

const Game = () => {

  const defaultState = {
    roundNumber: 0,
    confirmed: false,
    mapClick: false,
    xCoords: 0,
    yCoords: 0,
    score: []
  }

  const map = useRef(null); //targets the map

  // convert to reducer
  const [gameState, dispatch] = useReducer(reducer, defaultState);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [confirm, setConfirm] = useState(false);
  const [click, setClick] = useState(false);
  const [roundNumber, setRoundNumber] = useState(0);


  const [rounds, setRounds] = useState([
    "round1",
    "round2",
    "round3",
    "round4",
    "round5",
  ]);

  // TODO: refactor into a gameState variable , maybe use reducer hook instead
  // TODO: rounds variable that manages guess images

  // use a reducer to handle game state/ track scores?

  const getCoords = (e) => {
    let pos = map.current.getBoundingClientRect();
    console.log(e.clientX);
    console.log(pos);
    let newX = e.clientX -  pos.left;
    let newY = e.clientY - pos.top;
    return [newX, newY];
  };
  // or gets prop from the link-to with the map image url
  const handleCoords = (e) => {
    let [newX, newY] = getCoords(e);

    // update coordinates and set mapClick to true
    dispatch({ type: "UPDATE_COORDS", payload: { x: newX, y: newY } });

    setCoords({ x: newX, y: newY });
    setClick(true);
  };
  console.log(gameState);
  return (
    <div className="game">
      {/* create a seperate component later for the map and the image-to-guess */}
      {/* this should also be a canvas to implement interactivity */}
      <div>
        {/* NOTE: this is for the map and a dot that points where you choose on the map*/}
        <Map
          handleCoords={handleCoords}
          map={map}
          click={gameState.mapClick}
          x={gameState.xCoords}
          y={gameState.yCoords}
        />

        <button
          className="map-button"
          onClick={() => {
            setConfirm(!confirm);
            setRoundNumber(roundNumber + 1);
          }}
        >
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
      <div>{roundNumber < 5 ? rounds[roundNumber] : "game over"}</div>
    </div>
  );
};

export default Game;
