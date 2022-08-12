import "./app.css";
import Home from "./components/home";
import Select from "./components/select";
import Game from './components/game';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/map" element={<Select />}>
          {/* start the game when map is selected with /map/:id or /map/:name */}
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;
