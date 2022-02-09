import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}