import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import App from './App.jsx';
import './index.css';

// Configure Axios API endpoint for production deployment vs local proxy
axios.defaults.baseURL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://gnanastackwebsite.onrender.com' : '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
