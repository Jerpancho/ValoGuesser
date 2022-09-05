import React, { useState, useRef, useReducer } from "react";
import Map from "./map";
import { reducer } from "../reducer/gameReducer";
// replace images from actual api
import image from "../resources/images/valorant_ascent.jpg";
import image2 from "../resources/images/valorant-map-ascent-centre.jpg";
// import { useParams } from "react-router-dom";

const Game = () => {
  const defaultState = {
    roundNumber: 0,
    confirmed: false,
    mapClick: false,
    xCoords: 0,
    yCoords: 0,
  };

  const map = useRef(null); //targets the map

  // convert to reducer
  const [gameState, dispatch] = useReducer(reducer, defaultState);
  // replace static data with data from api
  const [rounds, setRounds] = useState([
    {
      id: 1,
      mapId: 1,
      guessImage: image,
      answerImage: image,
      xChosenCoords: 0,
      yChosenCoords: 0,
      xActualCoords: 424,
      yActualCoords: 168,
      score: 0,
    },
    {
      id: 2,
      mapId: 1,
      guessImage: image2,
      answerImage: image2,
      xChosenCoords: 0,
      yChosenCoords: 0,
      xActualCoords: 312,
      yActualCoords: 212,
      score: 0,
    },
    {
      id: 3,
      mapId: 1,
      guessImage: image,
      answerImage: image,
      xChosenCoords: 0,
      yChosenCoords: 0,
      xActualCoords: 168,
      yActualCoords: 424,
      score: 0,
    },
    {
      id: 4,
      mapId: 1,
      guessImage: image2,
      answerImage: image2,
      xChosenCoords: 0,
      yChosenCoords: 0,
      xActualCoords: 321,
      yActualCoords: 123,
      score: 0,
    },
    {
      id: 5,
      mapId: 1,
      guessImage: image,
      answerImage: image,
      xChosenCoords: 0,
      yChosenCoords: 0,
      xActualCoords: 123,
      yActualCoords: 205,
      score: 0,
    },
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
    // if gamestate hasnt been confirmed yet or if rounds at the current round exist
    if (!gameState.confirmed && rounds[gameState.roundNumber]) {
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
      } else {
        // if game state has already been confirmed, then go to next round
        // increase the round counter, set mapClick to false, set confirm to false
        dispatch({ type: "NEXT_ROUND" });
      }
    }
  };

  console.log(gameState);
  return (
    <div className="game">
      {/* create a seperate component later for the map and the image-to-guess */}
      <div>
        {/* NOTE: this is for the map and a dot that points where you choose on the map*/}
        {rounds[gameState.roundNumber] ? (
          <Map
            handleCoords={handleCoords}
            map={map}
            click={gameState.mapClick}
            x={gameState.xCoords}
            y={gameState.yCoords}
            confirmed={gameState.confirmed}
            xActual={rounds[gameState.roundNumber].xActualCoords}
            yActual={rounds[gameState.roundNumber].yActualCoords}
          />
        ) : (
          // when game is over
          // should pass in a prop of all the rounds with their coordinate history
          <Map
            handleCoords={handleCoords}
            map={map}
            click={gameState.mapClick}
            x={gameState.xCoords}
            y={gameState.yCoords}
            confirmed={gameState.confirmed}
            xActual={0}
            yActual={0}
          />
        )}

        <button className="map-button" onClick={handleRound}>
          {gameState.confirmed ? "Next Round" : "Confirm"}
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
      {/* needs refactoring on conditional rendering */}
      {rounds[gameState.roundNumber] && (
        <div className="round-container">
          <p>
            {gameState.roundNumber < 5
              ? rounds[gameState.roundNumber].id
              : "game over"}
          </p>

          {gameState.roundNumber < 5 ? (
            <img
              src={rounds[gameState.roundNumber].guessImage}
              alt="a certain location in valorant"
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Game;
