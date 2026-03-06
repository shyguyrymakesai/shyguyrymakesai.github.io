import { HashRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import BlogEntryPage from "./pages/BlogEntryPage";
import TagPage from "./pages/TagPage";
import CategoryPage from "./pages/CategoryPage";
import FlameCoinPage from "../pages/flamecoin";
import HabitTrackerPage from "./pages/HabitTrackerPage";
import DemoPage from "./pages/DemoPage";

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogEntryPage />} />
        <Route path="/tag/:tag" element={<TagPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/flamecoin" element={<FlameCoinPage />} />
        <Route path="/habit-tracker" element={<HabitTrackerPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </HashRouter>
  );
}
