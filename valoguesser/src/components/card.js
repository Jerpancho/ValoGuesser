import React from "react";
import { Link } from "react-router-dom";

const Card = ({ img, name, id }) => {

  return (
    <div className="card">
      <img src={img} alt="sample game map" />
      <p>{name}</p>
      <Link className="card-btn" to={`/game/${id}`}>Play</Link>
    </div >
  );
};

export default Card;
