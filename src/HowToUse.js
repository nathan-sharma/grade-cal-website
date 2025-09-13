import React from 'react';
import Navbar from './Navbar'; 
import Footer from './Footer';
import { useState } from 'react';

function HowToUse() {
    const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
    const toggleCalculator = () => {
      setIsCalculatorVisible(!isCalculatorVisible);
    };
    return (
        <div className="App flex flex-col min-h-screen justify-start bg-gray-200">
            <Navbar />
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center">How to Use </h2>
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
                <div className="mt-4">
          <div className={isCalculatorVisible ? "block" : "hidden sm:block"}>
          </div>
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
                <p className = "mt-3">In the example transcript above, the student earned As in four and Bs in two 4.0 semesters. They earned As in two 5.0 semesters, a B in one 5.0 semester, and Cs in two 5.0 semesters. They also earned As in 1 dual credit (4.5) semester and a B in another dual credit semester. Their calculation would be the following:</p>
                <div className="flex flex-col md:flex-row mt-4 gap-4 justify-center items-center">
            <img
                        src="/gpaexample.png"
                        alt="Example GPA calculation"
                        className="max-w-full md:max-w-[45%] h-auto rounded-md shadow-md"
                    />
                </div>
                <p className = "mt-3 mb-4">The top row is for ACA class entries, the middle is for dual credits, and the last is for KAP class entries. If you didn't take a certain type of class you can leave that row blank.</p>
                <h1 className="text-xl underline mt-5">Semester Exam Calculator</h1>
                <p className="mt-4">
                Input your six-week averages for any class into the SW fields, and input your mock final exam score in the final row. The calculator will return the minimum exam scores you need for your average to be an A or higher, B or higher, and C or higher, as well as your average if you exempted the final, your best-case scenario average, and average with your mock exam grade. ✅ Guaranteed means you will get that letter grade or higher for your average. ❌Impossible means that even with a 100 on the final exam, it would not be possible for you to receive that letter grade or higher.
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
                In the example above, the student needs a 41.33 or higher on the exam to get an A in Algebra 2 for the semester. Their average is guaranteed to be B (or possibly higher). If the student is exempt from the semester exam, their average would be 98.00. If the student took the semester exam and got a 100 (best-case scenario), their average would be 98.30. If the student took the semester exam and got their mock score (a 97), their average would be 97.85. 
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default HowToUse;