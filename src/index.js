/* eslint-disable import/first */
if (sessionStorage.redirected) {
  sessionStorage.removeItem('redirected');
  console.log("Redirected from 404, now handling route.");
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './index.css';
import App from './App';
import Feedback from './Feedback'; 
import reportWebVitals from './reportWebVitals';
import HowToUse from './HowToUse.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<App />} /> 
        <Route path="/feedback" element={<Feedback/>} />
        <Route path = "/how-to-use" element ={<HowToUse/>}  />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();