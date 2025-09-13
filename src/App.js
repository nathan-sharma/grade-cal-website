import React, { useState, useEffect } from 'react';
import SemesterCalculator from './SemesterCalculator';
import GradeAverageCalculator from './GradeAverageCalculator';
import GPACalculator from './GPACalculator';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App flex flex-col items-center min-h-screen justify-start bg-gray-200 m-0 realtive">
      <Navbar />
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-black bg-opacity-50">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-100 border border-gray-300 text-center">
          <p className="mb-4">👋 Hey there! Welcome to Katy Grade Calc, a free website that calculates your Katy ISD grades. Please make sure you visit the how to use page before using our calculators. Disclaimer: this website was not created nor endorsed by Katy ISD in any way.</p>
          <button onClick={closePopup} className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
            Got it!
          </button>
        </div>
        </div>
      )}
      <div className="mt-6 p-6 w-auto max-w-2xl h-full">
        <div className="flex flex-col space-y-8">
          <div>
          <GradeAverageCalculator /> 
          </div>
          <div>
             <GPACalculator />
          </div>
          <div>
            <SemesterCalculator />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;