import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages";
import { Register } from "./pages/Register";

import "./style/reset.css";
import "./style/style.css"

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}