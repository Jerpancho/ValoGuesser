import "./app.css";
import Home from "./components/home";
import Select from "./components/select";
import Game from "./components/game";
import CreateRound from "./components/createRound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/map" element={<Select />}></Route>
        <Route exact path="/game/:id" element={<Game />}></Route>
        <Route exact path="/round" element={<CreateRound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
