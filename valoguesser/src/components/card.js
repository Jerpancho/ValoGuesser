import React from "react";

const Card = ({ img, name, handleClick }) => {

  return (
    <div className="card">
      <img src={img} alt="sample game map" />
      <p>{name}</p>
      <button onClick={() => { handleClick(name) }}>Play</button>
    </div>
  );
};

export default Card;
