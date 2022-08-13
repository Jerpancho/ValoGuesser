import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// things to consider testing:
// -  the link correctly goes to the select route
// -  you can see header and sections

const Home = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(["test1", "test2", "test3", "test4"]);
  }, [])
  return (
    <div className="app">
      <header className="app-header">
        <h1>Valorant Guesser</h1>
      </header>
      <main>
        {/* this section will be replaced by images of instructions? */}
        <div className="tutorial">
          {list.map((item, index) => {
            return <section key={index}>{item}</section>
          })}
        </div>
        <div className="btn-container">
          <Link to="/map" className="btn">
            START
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
