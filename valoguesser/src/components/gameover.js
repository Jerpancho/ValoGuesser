import React, { useEffect } from "react";
import Map from "./map";
import { useNavigate } from "react-router-dom";
const Gameover = ({ map_uid, roundHistory }) => {
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.setItem('isPlaying', false);
  }, []);
  return (
    <div className="game-over">
      <Map
        map_uid={map_uid}
        click={false}
        confirmed={false}
        gameOver={true}
        roundHistory={roundHistory}
      />

      <div className="redirect-buttons">
        <button
          onClick={() => {
            sessionStorage.setItem('isPlaying', true);
            window.location.reload();
          }}
        >
          Play Again
        </button>
        <button onClick={() => {
          navigate("/map");
        }}>MapSelect</button>
      </div>
    </div>
  );
};

export default Gameover;
