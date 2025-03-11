import React from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer';
import Calculator from './Calculator.js'
import { useState } from 'react';

function HowToUse() {
    const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
    const toggleCalculator = () => {
      setIsCalculatorVisible(!isCalculatorVisible);
    };
    return (
        <div className="App flex flex-col min-h-screen justify-start bg-gray-200">
            <Navbar />
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center">How to Use the Calculators</h2>
            <div className="px-8 md:px-10">
                <h1 className="text-xl underline mt-8">Class Average Calculator</h1>
                <p className="mt-3">
                Input your grades separated by commas into each category. You can also use this as a what-if calculator to see what you need to get your desired grade or how a mock grade could impact your average. If you have a single number repeating for a category (example: 100, 100, 100, 100), just input one number.
                </p>

                <div className="flex flex-col md:flex-row mt-4 gap-4">
                    <img
                        src="/classaverageexample.png"
                        alt="HAC view for class average"
                        className="max-w-full md:max-w-[70%] h-auto rounded-md shadow-md"
                    />
                    <img
                        src="/classaverageexample2.png"
                        alt="Example of class average input"
                        className="max-w-full md:max-w-[30%] h-auto rounded-md shadow-md"
                    />
                </div>
                <div className="flex justify-center items-center mt-2">
                    <img
                        src="/classaverageexample3.png"
                        alt="Example of class average input with mock grade"
                        className="max-w-full md:max-w-[30%] h-auto rounded-md shadow-md"
                    />
                </div>
                <p className="mt-3 font-bold">
               Advanced (for nerds)
                </p>
                <p> <p className = "mt-2">
                Say you want to add an assignment worth a fraction of a specific grade (major, minor, other). Let the assignment weigh 1/n of a major, minor, or other grade, and let k be the total number of grades you have for that category (including the partially weighted one.) Let P be the partially weighted assignment score and S be the sum of all other scores in that category, excluding the partially weighted assignment score. Input these values into the calculator below to find the number to replace your category inputs.
               </p>
                   <div className = "mt-2 flex flex-col ">
                   <p>Example: I got a 95 on an assignment worth 1/3 of a minor grade, and I want to add that to my minor grade scores of 100, 98, 97, and 100.  </p>
                   <p>P = 95</p>
                    <p className = "mt-1">1/n = 1/3</p> 
                    <p className = "mt-1">n = 3</p>
                    <p className = "mt-1">S = 100 + 98 + 97 + 100 = 395</p>
                    <p className = "mt-1">k = 4 + 1 = 5</p>
                   </div>
                   <span>Calculator output: replace minor grade inputs with</span> <span className = "font-bold">98.46</span> 
                </p>
                <div className="mt-4">
          <button
            onClick={toggleCalculator}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-900"
          >
            {isCalculatorVisible ? 'Hide Calculator' : 'Show Calculator'}
          </button>
          {isCalculatorVisible && <Calculator />}
        </div>
            <h1 className="text-xl underline mt-5">GPA Calculator</h1>
            <p className = "mt-3">Students can utilize the GPA calculator to calculate their current GPAs, future GPAs, and the GPAs of competitors. Entries must be in the following format: Letter grade(Number of semesters), separated by commas. Input the number of semesters each letter grade was earned in parentheses, and make sure to include high school credit courses taken in middle school in the calculation. </p>
            <div className="flex flex-col md:flex-row mt-4 gap-4 justify-center items-center">
            <img
                        src="/exampletranscript.png"
                        alt="Example transcript"
                        className="max-w-full md:max-w-[35%] h-auto rounded-md shadow-md"
                    />
                </div>
                <p className = "mt-3">In the example transcript above, the student earned As in four and Bs in two 4.0 semesters. They also earned As in two 5.0 semesters, a B in one 5.0 semester, and Cs in two 5.0 semesters. Their calculation would be the following:</p>
                <div className="flex flex-col md:flex-row mt-4 gap-4 justify-center items-center">
            <img
                        src="/gpaexample.png"
                        alt="Example GPA calculation"
                        className="max-w-full md:max-w-[45%] h-auto rounded-md shadow-md"
                    />
                </div>
                <p className = "mt-3 mb-4">Please note that this calculator does not yet support dual credit (4.5) courses.</p>
                <h1 className="text-xl underline mt-5">Semester Exam Calculator</h1>
                <p className="mt-4">
                Input your six-week averages for any class into the SW fields. The calculator will return the minimum exam scores you need for your average to be an A or higher, B or higher, and C or higher, as well as your average if you exempted the final and your best-case scenario average.✅ Guaranteed means you will get that letter grade or higher for your average. ❌Impossible means that even with a 100 on the final exam, it would not be possible for you to receive that letter grade or higher.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-4">
                    <img
                        src="/semesterexamexample.png"
                        alt="HAC view for semester exam average"
                        className="max-w-full md:max-w-[60%] h-auto rounded-md shadow-md"
                    />
                    <img
                        src="/semesterexamexample2.png"
                        alt="Example of semester exam input"
                        className="max-w-full md:max-w-[45%] h-auto rounded-md shadow-md"
                    />
                </div>

                <p className="mt-3 mb-7">
                In the example above, the student needs a 41.33 or higher on the exam to get an A in Algebra 2 for the semester. Their average is guaranteed to be B (or possibly higher). If the student is exempt from the semester exam, their average would be 98.00. If the student took the semester exam and got a 100 (best-case scenario), their average would be 98.30.
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default HowToUse;