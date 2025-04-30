import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // ✅ Tailwind import
import HomePage from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>
);
