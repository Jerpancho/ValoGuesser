import "./app.css";
import Home from "./components/home";
import Select from "./components/select";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/select" element={<Select />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
