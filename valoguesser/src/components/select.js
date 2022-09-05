import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Card from "./card";

const Select = () => {
  // this list should be taken from an api with proper unique ids
  const [mapList, setMapList] = useState([]);
  useEffect(() => {
    setMapList([
      {
        id: 0,
        name: "Ascent"
      },
      {
        id: 1,
        name: "Bind"
      },
      {
        id: 2,
        name: "Haven"
      }
    ]);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1> Map Selection</h1>
      </header>
      <main>
        <ul className="map-selection">
          {mapList.map((item, index) => (
            //turn this into a cards list instead
            //replace index with actual id
            <li key={item.id}>
              <Card
                img={
                  "https://cdn1.dotesports.com/wp-content/uploads/2020/06/08142212/Ascent-2.png"
                }
                id={item.id}
                name={item.name}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Select;
