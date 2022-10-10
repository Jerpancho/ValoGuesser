import React, { useState, useRef, useReducer, useEffect } from "react";
import { useFetchData } from "../util/hooks/useFetchData";
import { useParams, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import { reducer } from "../reducer/gameReducer";
import { getCoords } from "../util/gameUtils/getCoords";
import { score } from "../util/gameUtils/score";
import Map from "./map";
import Gameover from "./gameover";
// replace images from actual api
const Game = () => {
  const defaultState = {
    roundNumber: 0,
    confirmed: false,
    mapClick: false,
    xCoords: 0,
    yCoords: 0,
  };
  //reducer
  const [gameState, dispatch] = useReducer(reducer, defaultState);
  // map id from paremeter
  const { id } = useParams();
  const navigate = useNavigate();
  //targets the map for reference
  const map = useRef(null);
  // configure round item data
  const [rounds, setRounds] = useState([]);
  const [isRoundLoading, setIsRoundLoading] = useState(true);
  const { isLoading, data, error } = useFetchData(
    `http://localhost:4646/round/${id}`
  );

  useEffect(() => {
    if (isLoading === false) {
      setIsRoundLoading(true);
      let roundList = [];
      data.forEach((element) => {
        const newObject = { ...element, x_chosen: 0, y_chosen: 0, score: 0 };
        roundList = [...roundList, newObject];
      });
      setRounds(roundList);
      setIsRoundLoading(false);
    }
  }, [isLoading, data]);

  useEffect(
    () => {
      const session = sessionStorage.getItem('isPlaying');
      if (session === 'false') navigate('/');
    }, [navigate]
  );
  // TODO: rounds variable that manages guess images
  // or gets prop from the link-to with the map image url
  const handleCoords = (e) => {
    let [newX, newY] = getCoords(e, map);
    // update coordinates and set mapClick to true
    // if gamestate hasnt been confirmed yet or if rounds at the current round exist
    if (!gameState.confirmed && rounds[gameState.roundNumber]) {
      dispatch({ type: "UPDATE_COORDS", payload: { x: newX, y: newY } });
    }
  };
  // when button is clicked
  const handleRound = () => {
    // set the round confirmed to true
    // set payload to be the actual coordinates and compare with chosen coordinates
    // calculate score
    if (gameState.mapClick) {
      // if not confirmed, confirm the round and calculate score
      // calculate score here and send payload
      if (!gameState.confirmed) {
        // calculate score and update chosen coords
        const updateRounds = rounds.map((item, index) => {
          if (gameState.roundNumber === index) {
            let s = score(gameState.xCoords, gameState.yCoords, item.x_coord, item.y_coord);
            return { ...item, x_chosen: gameState.xCoords, y_chosen: gameState.yCoords, score: s }
          }
          return item;
        })

        setRounds(updateRounds);
        dispatch({ type: "ROUND_CONFIRMED" });
      } else {
        // if game state has already been confirmed, then go to next round
        // increase the round counter, set mapClick to false, set confirm to false
        dispatch({ type: "NEXT_ROUND" });
      }
    }
  };
  return (
    <div>
      {/* create a seperate component later for the map and the image-to-guess */}
      {error !== null ? (
        <div>Error Loading Game</div>
      ) : isRoundLoading ? (
        <div> Loading Game... </div>
      ) : (gameState.roundNumber < rounds.length) ? (
        <div className="game">
          {/* NOTE: this is for the map and a dot that points where you choose on the map*/}
          <div className="left-panel">
            <div>
              <Map
                map_uid={id}
                handleCoords={handleCoords}
                map={map}
                click={gameState.mapClick}
                x={gameState.xCoords}
                y={gameState.yCoords}
                confirmed={gameState.confirmed}
                xActual={rounds[gameState.roundNumber].x_coord}
                yActual={rounds[gameState.roundNumber].y_coord}
              />

              {gameState.confirmed && <div className="score">{rounds[gameState.roundNumber].score}</div>}

              <button className="map-button" onClick={handleRound}>
                {gameState.confirmed ? "Next Round" : "Confirm"}
              </button>
            </div>
          </div>


          {/* setup round images and reveal expanded image when confirming round */}
          <div className="round-container">
            {gameState.confirmed ? (
              <img
                id="expanded-image"
                src={rounds[gameState.roundNumber].expanded_img}
                alt="expanded"
              />
            ) : (
              <img
                id="guess-image"
                src={rounds[gameState.roundNumber].guess_img}
                alt="guess"
              />
            )}
          </div>
        </div>
      ) : <Gameover map_uid={id} roundHistory={rounds} />
      }
      {/* create component for showing the image */}
      {/* needs refactoring on conditional rendering */}
    </div>
  );
};

export default Game;
