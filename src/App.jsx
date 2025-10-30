import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Survey from "./pages/Survey";
import Admin from "./pages/Admin";
import Login from "./pages/Login"; // <- make sure this line exists

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />   {/* <- required */}
        </Routes>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm">
        © {new Date().getFullYear()} Customer Survey System
      </footer>
    </div>
  );
}