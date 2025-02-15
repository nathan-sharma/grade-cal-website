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
      <p className="font-extrabold mt-[-10px] mb-1"> By Nathan Sharma</p>

      <div className="mt-3 border border-gray-300 p-8 rounded shadow-md">
        {!calculatorType && (
          <div className="flex flex-col space-y-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
              onClick={() => setCalculatorType('semester')}
            >
              Semester Exam Calculator
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
              onClick={() => setCalculatorType('gpa')}
            >
              GPA Calculator
            </button>
            <button
              className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
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
            className="rounded mt-4 bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out"
            onClick={() => setCalculatorType(null)}
          >
            Back to Menu
          </button>
        )}
        <button
          className={`rounded mt-4 ml-auto bg-gray-500 hover:bg-gray-900 text-white font-bold py-2 px-4 mr-4 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition duration-300 ease-in-out ${!calculatorType ? 'w-full' : ''}`}
          onClick={() => setShowHowToUse(true)} // Open pop-up
        >
          How to use
        </button>
      </div>

      {/* Basic Pop-up (Modal) */}
      {showHowToUse && (
        <div
          className="fixed top-0 left-0 p-8 w-50 h-full bg-black bg-opacity-50 z-999 flex justify-center items-center"
          onClick={() => setShowHowToUse(false)} // Close on overlay click
        >
          <div
            className="bg-white p-8 rounded shadow-md z-1000 relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing on pop-up click
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowHowToUse(false)}
            >
              X
            </button>
            <h2 className = "font-extrabold">How to use the calculators</h2>
            <p className="mt-3">Semester Calculator: Input your six weeks averages for any class into the SW fields. </p>
            <p className="mt-3">GPA Calculator: Enter your grades in the following format: Letter grade(Number of semesters), separated by commas. For each letter grade, enter the number of semesters you earned that grade. For example, if you earned an A for 2 semesters, enter A(2). Put 'none' or leave the KAP/AP placeholder blank if you haven't taken any 5.0 courses. If you took high school credit courses in middle school, include those grades and semesters in your calculation.</p>
            <p className="mt-3">Class Average Calculator: Input your grades separated by commas or their averages into each category. You can also use this as a what if calculator to see what you need to get the average you're aiming for. </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;