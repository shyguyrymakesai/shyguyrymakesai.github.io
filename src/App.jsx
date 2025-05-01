import React from "react";
import { Link } from "react-router-dom";
import heroImage from "./assets/hero.jpg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import AgentProfile from "./pages/AgentProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agents/:agentId" element={<AgentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

