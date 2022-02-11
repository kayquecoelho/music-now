import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  Home, 
  Login, 
  Register, 
  NavigationBar, 
  ArtistsSection, 
  Artist,
  Product } from "./pages";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Register />}/>
          <Route path="/artists" element={<ArtistsSection />}/>
          <Route path="/artist/:id" element={<Artist />}/>
          <Route path="/product/:id" element={<Product />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}