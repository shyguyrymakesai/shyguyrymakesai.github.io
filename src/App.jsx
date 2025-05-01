import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import AgentProfile from "./pages/AgentProfile";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agents/:agentId" element={<AgentProfile />} />
      </Routes>
    </HashRouter>
  );
}
