import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}