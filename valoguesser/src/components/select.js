import React from "react";
import { useFetchData } from "../util/hooks/useFetchData";
// import { Link } from "react-router-dom";
import Card from "./card";

const Select = () => {
  // this list should be taken from an api with proper unique ids
  // fetch map data
  const { isLoading, data, error } = useFetchData("http://localhost:4646/map");

  console.log(data);
  return (
    <div className="app">
      <header className="app-header">
        <h1> Map Selection</h1>
      </header>
      <main>
        <ul className="map-selection">
          {error ? (
            <div>error</div>
          ) : !isLoading ? (
            data.map((item, index) => (
              //turn this into a cards list instead
              //replace index with actual id
              <li key={item.map_uid}>
                <Card img={item.thumbnail} id={item.map_uid} name={item.name} />
              </li>
            ))
          ) : (
            <div>loading...</div>
          )}
        </ul>
      </main>
    </div>
  );
};

export default Select;
