// src/components/button.jsx
import React from "react";

export function Button({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 bg-pink-500 text-white hover:bg-pink-600 active:scale-95 shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;