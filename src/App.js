import React, { useState } from 'react';
import SemesterCalculator from './SemesterCalculator';
import GradeAverageCalculator from './GradeAverageCalculator';
import GPACalculator from './GPACalculator';

function App() {
  const [calculatorType, setCalculatorType] = useState(null);
  const [showHowToUse, setShowHowToUse] = useState(false);

  return (
    <div className="App flex flex-col items-center h-screen justify-center bg-gray-200">
      <h1 className="text-blue-500 text-3xl text-center font-bold font-sans py-4">Katy ISD Grade Calculator</h1>
      <p className="font-extrabold mt-[-10px]"> By Nathan Sharma</p>

      <div className="mt-3 border border-gray-300 p-8 rounded shadow-md">
        {!calculatorType && (
          <div className="flex flex-col space-y-4">
            <button
              className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => setCalculatorType('semester')}
            >
              Semester Exam Calculator
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => setCalculatorType('gpa')}
            >
              GPA Calculator
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded w-full"
              onClick={() => setCalculatorType('grades')}
            >
              Class Average Calculator
            </button>
          </div>
        )}
        {calculatorType === 'semester' && <SemesterCalculator />}
        {calculatorType === 'grades' && <GradeAverageCalculator />}
        {calculatorType === 'gpa' && <GPACalculator />}

        {calculatorType && (
          <button
            className="rounded mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 mr-4" 
            onClick={() => setCalculatorType(null)}
          >
            Back to Menu
            </button>
        )}
        <button
          className={`rounded mt-4 bg-gray-600 hover:bg-gray-900 text-white font-bold py-2 px-4 ml-auto ${!calculatorType ? 'w-full' : ''}`}
          onClick={() => setShowHowToUse(true)} // Open pop-up
        >
          How to use
        </button>
      </div>

      {/* Basic Pop-up (Modal) */}
      {showHowToUse && (
        <div
          className="fixed top-0 left-0 p-8 w-50 h-full bg-black bg-opacity-50 z-999 flex justify-center items-center overflow-y-auto"
          onClick={() => setShowHowToUse(false)} // Close on overlay click
        >
          <div
            className="bg-white p-8 rounded shadow-md z-1000 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing on pop-up click
          >
            <h2 className = "font-extrabold">How to use the calculators</h2>
            <p className="mt-4 text-sm">Semester Calculator: Input your six weeks averages for any class into the SW fields. </p>
            <p className="mt-3 text-sm">GPA Calculator: Enter your grades in the following format: Letter grade(Number of semesters), separated by commas. For each letter grade, enter the number of semesters you earned that grade. For example, if I earned an A for 2 semesters, a B for 3 semesters, a C for 3 semesters, and a D for 0 semesters in all the 5.0 courses I have taken so far, I would enter A(2), B(3), C(3) in the KAP/AP placeholder. If you took high school credit courses in middle school, include those grades and semesters in your calculation.</p>
            <p className="mt-3 text-sm">Class Average Calculator: Input your grades separated by commas or their averages into each category. You can also use this as a what if calculator to see what you need to get the average you're aiming for. </p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
              onClick={() => setShowHowToUse(false)}
            > X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;