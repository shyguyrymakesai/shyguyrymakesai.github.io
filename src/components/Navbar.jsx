import React from "react";
import { Link, useLocation } from "react-router-dom";
import shyguyryicon from "../assets/shyguyry_icon.png";

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold flex items-center gap-2">
          <img src={shyguyryicon} alt="Icon" className="w-6 h-6" />
          <Link to="/">Ryan Martinez</Link>
        </div>
        <ul className="flex space-x-6 text-sm text-gray-700">
          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/agents"
              className={`hover:text-blue-600 transition ${location.pathname.startsWith("/agents") ? "font-semibold underline" : ""}`}
            >
              Agents
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600 transition">
              Contact
            </Link>
          </li>
                  <li>
  <Link
    to="/blog"
    className={`hover:text-blue-600 transition ${
      location.pathname.startsWith("/blog") ? "font-semibold underline" : ""
    }`}
  >
    Blog
  </Link>
</li>
        </ul>

      </nav>
    </header>
  );
}
