import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MindMap from "./components/MindMap";
import Navbar from "./components/Navbar";
import { WalletProvider } from "./contexts/WalletContext";
import UserProfile from "./components/UserProfile";

export default function App() {
  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <div className="pt-16">
          {/* Add padding to avoid content being hidden behind the fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mindmap" element={<MindMap />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}
