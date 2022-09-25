import React, { useState, useRef } from "react";
import { useFetchData } from "../util/hooks/useFetchData";
import Map from "./map";
import { getCoords } from "../util/gameUtils/getCoords";
const RoundForm = () => {
  const { isLoading, data, error } = useFetchData("http://localhost:4646/map");
  const [mapId, setMapId] = useState("0");
  const [mapClick, setMapClick] = useState(false);
  const [guessImage, setGuessImage] = useState("");
  const [expandedImage, setExpandedImage] = useState("");
  const [x, setX] = useState(250);
  const [y, setY] = useState(250);
  const [diffficulty, setDifficulty] = useState("normal");
  const mapRef = useRef(null);

  const handleMapId = (e) => {
    setMapId(e.target.value);
    if (mapId === "0") {
      setMapClick(false);
      setX(250);
      setY(250);
    }
  };
  const handleDifficulty = (e) => {
    setDifficulty(e.target.value);
  };
  const handleImageUrl = (e, dispatch) => {
    const url = e.target.value;
    dispatch(url);
  };
  const handleCoords = (e) => {
    let [xCoord, yCoord] = getCoords(e, mapRef);
    console.log(xCoord, yCoord);
    setX(xCoord);
    setY(yCoord);
    setMapClick(true);
  };
  return (
    <>
      <h1>Create a Round</h1>
      {/* select the map */}
      {error ? (
        <div>error retrieving map selection</div>
      ) : (
        !isLoading && (
          <div>
            <label htmlFor="create-round-map">Select the map:</label>
            <select id="create-round-map" onChange={handleMapId}>
              <option value="0">select map</option>
              {data.map((item) => {
                return (
                  <option key={item.map_uid} value={item.map_uid}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        )
      )}
      {/* render map on selected option*/}
      {/* once map is fixed, remove confirmed and actual coordinates */}
      {mapId !== "0" ? (
        <div className="map-select">
          <h2>select coordinates: </h2>
          <Map
            map_uid={mapId}
            map={mapRef}
            confirmed={true}
            click={mapClick}
            handleCoords={handleCoords}
            x={x}
            y={y}
            xActual={x}
            yActual={y}
          ></Map>
        </div>
      ) : null}
      {/* upload image url path for both guess image and expanded image*/}
      <label htmlFor="guess-image-url">guessing image url: </label>
      <input
        type="text"
        id="guess-image-url"
        onChange={(e) => handleImageUrl(e, setGuessImage)}
      />
      <br />
      <label htmlFor="expanded-image-url">expanded image url: </label>
      <input
        type="text"
        id="expanded-image-url"
        onChange={(e) => handleImageUrl(e, setExpandedImage)}
      />
      <br />
      {/* select x and y coords of round item*/}
      {/* select difficulty of round */}
      <label htmlFor="select-difficulty">select difficulty: </label>
      <select
        name="difficulty"
        id="select-diffficulty"
        onChange={handleDifficulty}
      >
        <option value="normal">normal</option>
        <option value="hard">hard</option>
      </select>
      {/* create button to send a request to create a round on info given */}
      <br />
      <button>submit</button>
      {/* confirmation form */}
      <div className="confirmation-form">
        <h1>Confirmation Form</h1>
        <p>map_uid = {mapId}</p>
        <p>guess_img = {guessImage}</p>
        <p>expanded_img = {expandedImage}</p>
        <p>x_coord = {x}</p>
        <p>y_coord = {y}</p>
        <p>difficulty = {diffficulty}</p>
      </div>
    </>
  );
};

export default RoundForm;
