import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import shyguyryicon from "../assets/shyguyry_icon.png";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-indigo-900 shadow z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 relative">
        <div className="text-lg font-bold flex items-center gap-2">
          <Link to="/founder" className="flex items-center gap-2">
            <img src={shyguyryicon} alt="Icon" className="w-6 h-6" />
            <span>Ryan Martinez</span>
          </Link>
        </div>
        <button
          className="navbar-mobile-menu md:hidden block text-2xl focus:outline-none"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
        <div className={`flex items-center space-x-4 navbar-links${mobileOpen ? " navbar-mobile-open" : ""}`}>
          <ul className="flex space-x-6 text-sm text-gray-700 dark:text-indigo-200 flex-col md:flex-row md:space-x-6 space-y-4">
            <li>
              <Link to="/" className="hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/agents"
                className={`hover:text-blue-600 transition ${location.pathname.startsWith("/agents") ? "font-semibold underline" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                Agents
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link to="/flamecoin" className="hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>
                FlameCoin
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-blue-600 transition" onClick={() => setMobileOpen(false)}>
                Blog
              </Link>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
