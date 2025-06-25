import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ✅ Tailwind import
import HomePage from './App';

// Track mouse position to update gradient background
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  document.documentElement.style.setProperty('--mouse-x', `${x}px`);
  document.documentElement.style.setProperty('--mouse-y', `${y}px`);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
