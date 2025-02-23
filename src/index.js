import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import routing components
import './index.css';
import App from './App';
import Feedback from './Feedback'; 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
      <Routes> {/* Use Routes to define individual routes */}
        <Route path="/" element={<App />} /> {/* Main route */}
        <Route path="/feedback" element={<Feedback/>} /> {/* Route for /feedback */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();