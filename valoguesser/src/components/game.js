import React, { useState, useRef, useReducer } from "react";
import Map from "./map";
import { reducer } from '../reducer/gameReducer'
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

  const [rounds, setRounds] = useState([
    "round1",
    "round2",
    "round3",
    "round4",
    "round5",
  ]);

  // TODO: rounds variable that manages guess images

  const getCoords = (e) => {
    let pos = map.current.getBoundingClientRect();
    let newX = e.clientX - Math.floor(pos.left);
    let newY = e.clientY - Math.floor(pos.top);
    return [newX, newY];
  };
  // or gets prop from the link-to with the map image url
  const handleCoords = (e) => {
    let [newX, newY] = getCoords(e);
    // update coordinates and set mapClick to true
    if (!gameState.confirmed) {
      dispatch({ type: "UPDATE_COORDS", payload: { x: newX, y: newY } });
    }
  };
  const handleRound = () => {
    // set the round confirmed to true
    // set payload to be the actual coordinates and compare with chosen coordinates
    // calculate score
    if (gameState.mapClick) {
      // if not confirmed, confirm the round and calculate score
      // score payload here?
      if (!gameState.confirmed) {
        dispatch({ type: "ROUND_CONFIRMED" });
      }
      else {
        // if game state has already been confirmed, then go to next round
        // increase the round counter, set mapClick to false, set confirm to false
        dispatch({ type: "NEXT_ROUND" });
      }
    }

  }

  console.log(gameState);
  return (
    <div className="game">
      {/* create a seperate component later for the map and the image-to-guess */}
      <div>
        {/* NOTE: this is for the map and a dot that points where you choose on the map*/}
        <Map
          handleCoords={handleCoords}
          map={map}
          click={gameState.mapClick}
          x={gameState.xCoords}
          y={gameState.yCoords}
          confirmed={gameState.confirmed}
          xActual={424}
          yActual={168}
        />

        <button
          className="map-button"
          onClick={handleRound}
        >          {gameState.confirmed ? "Next Round" : "Confirm"}
        </button>

        {gameState.confirmed && (
          <div>
            <p>Your coordinates are:</p>
            <p>x: {gameState.xCoords}</p>
            <p>y: {gameState.yCoords}</p>
          </div>
        )}
      </div>
      {/* create component for showing the image */}
      <div>{gameState.roundNumber < 5 ? rounds[gameState.roundNumber] : "game over"}</div>
    </div>
  );
};

export default Game;
