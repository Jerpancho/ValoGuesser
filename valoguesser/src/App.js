import "./app.css";
import Home from "./components/home";
import Select from "./components/select";
import Game from "./components/game";
import RoundForm from "./components/roundForm.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/map" element={<Select />}></Route>
        <Route exact path="/game/:id" element={<Game />}></Route>
        <Route exact path="/round" element={<RoundForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
