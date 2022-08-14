import React, { useState } from "react";

const Select = () => {
  // this list should be taken from an api with proper unique ids
  const [mapList, setMapList] = useState(["Ascent", "Bind", "Haven"]);
  const [selected, setSelected] = useState("");
  console.log(selected);
  console.log(setMapList);
  return (
    <div className="app">
      <header className="app-header">
        <h1> Map Selection</h1>
      </header>
      <main>
        <ul className="map-selection">
          {mapList.map((item, index) => (
            //turn this into a cards list instead
            <li key={index}>
              <input
                type="button"
                value={item}
                name={item}
                onClick={(e) => setSelected(e.target.name)}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Select;
