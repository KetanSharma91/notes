import React from 'react';
import ReactDOM from 'react-dom/client';  // Use `react-dom/client` instead of `react-dom`
import App from './App';
import './index.css';

// Create a root for the app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
