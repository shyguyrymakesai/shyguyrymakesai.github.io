import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import AgentProfile from "./pages/AgentProfile";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import BlogEntryPage from "./pages/BlogEntryPage";
import TagPage from "./pages/TagPage";
import CategoryPage from "./pages/CategoryPage";
import ProjectPage from "./pages/projects/[slug].tsx";
import FlameCoinPage from "../pages/flamecoin";
import KamePage from "../pages/kame";
import FounderPage from "./pages/founder";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agents/:agentId" element={<AgentProfile />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogEntryPage />} />
        <Route path="/tag/:tag" element={<TagPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/flamecoin" element={<FlameCoinPage />} />
        <Route path="/kame" element={<KamePage />} />
        <Route path="/founder" element={<FounderPage />} />
      </Routes>
    </HashRouter>
  );
}
