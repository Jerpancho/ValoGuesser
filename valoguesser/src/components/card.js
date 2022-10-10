import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ img, name, id }) => {
  const navigate = useNavigate();
  function handleClick() {
    sessionStorage.setItem("isPlaying", true);
    navigate(`/game/${id}`);
  }
  return (
    <div className="card">
      <img src={img} alt="sample game map" />
      <p>{name}</p>
      <button className="card-btn" onClick={handleClick}>Play</button>
    </div >
  );
};

export default Card;
