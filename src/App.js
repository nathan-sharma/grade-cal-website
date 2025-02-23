import React, { useState } from 'react';
import SemesterCalculator from './SemesterCalculator';
import GradeAverageCalculator from './GradeAverageCalculator';
import GPACalculator from './GPACalculator';
import Navbar from './Navbar';

function App() {
  const [showHowToUse, setShowHowToUse] = useState(false);

  return (
    <div className="App flex flex-col items-center min-h-screen justify-start bg-gray-200"> 
     <Navbar setShowHowToUse={setShowHowToUse} />
      <div className="mt-6 p-8 w-30 h-full"> 
        <div className="flex flex-col space-y-8">
          <div>
            <SemesterCalculator />
          </div>
          <div>
            <GPACalculator />
          </div>
          <div>
            <GradeAverageCalculator />
          </div>
        </div>
      </div>

      {showHowToUse && (
        <div
          className="fixed top-0 left-0 p-8 w-50 h-full bg-black bg-opacity-50 z-999 flex justify-center items-center overflow-y-auto"
          onClick={() => setShowHowToUse(false)}
        >
          <div
            className="bg-white p-8 rounded shadow-md z-1000 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-extrabold">How to use the calculators</h2>
            <p className="mt-4 text-sm">Semester Calculator: Input your six weeks averages for any class into the SW fields. </p>
            <p className="mt-3 text-sm">GPA Calculator: Enter your grades in the following format: Letter grade(Number of semesters), separated by commas. For each letter grade, enter the number of semesters you earned that grade. For example, if I earned an A for 2 semesters, a B for 3 semesters, a C for 3 semesters, and a D for 0 semesters in all the 5.0 courses I have taken so far, I would enter A(2), B(3), C(3) in the KAP/AP placeholder. If you took high school credit courses in middle school, include those grades and semesters in your calculation.</p>
            <p className="mt-3 text-sm">Class Average Calculator: Input your grades separated by commas or their averages into each category. You can also use this as a what if calculator to see what you need to get the average you're aiming for. </p>
            <button
              className="bg-blue-600 hover:bg-blue-900 text-white font-bold px-4 py-1 rounded mt-4"
              onClick={() => setShowHowToUse(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;