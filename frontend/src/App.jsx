import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./home/Home";
import Control from "./control/Control";
import Display from "./display/Display";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/control" element={<Control />} />
      <Route path="/display" element={<Display />} />
    </Routes>
  );
}

export default App;