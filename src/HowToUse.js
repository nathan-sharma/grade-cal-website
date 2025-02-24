import React from 'react';
import Navbar from './Navbar'; 

function HowToUse() {
    return (
        <div className="App flex flex-col min-h-screen justify-start bg-gray-200">
            <Navbar />
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center">How to use the calculators</h2>
            <div className="px-8 md:px-10">
                <h1 className="text-xl underline mt-5">Semester Exam Calculator</h1>
                <p className="mt-4">
                    Input your six-week averages for any class into the SW fields. The calculator will return the minimum exam scores you need for your average to be an A or higher, B or higher, and C or higher, as well as your average if you exempted the final and your best-case scenario average.✅ Guaranteed means you are guaranteed to get that letter grade or higher for your average. ❌Impossible means that even with a 100 on the final exam, it would not be possible for you to receive that letter grade or higher.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center mt-4 gap-4">
                    <img
                        src="/semesterexamexample.png"
                        alt="HAC view for semester exam average"
                        className="max-w-full md:max-w-[45%] h-auto rounded-md shadow-md"
                    />
                    <img
                        src="/semesterexamexample2.png"
                        alt="Example of semester exam input"
                        className="max-w-full md:max-w-[45%] h-auto rounded-md shadow-md"
                    />
                </div>

                <p className="mt-3">
                    In the example above, the student needs a 41.33 or higher on the exam to get an A in Algebra 2 for the semester. Their semester average is guaranteed to be B (or possibly higher). If the student is exempted from the semester exam, their semester average would be 98.00. If the student took the semester exam and got a 100 (best-case scenario), their semester average would be 98.30.
                </p>
                <h1 className="text-xl underline mt-8">Class Average Calculator</h1>
                <p className="mt-3">
                    Input your grades separated by commas or their averages into each category. You can also use this as a what-if calculator to see what you need to get your desired grade or how a mock grade could impact your average. If you have a single number repeating for a category (example: 100, 100, 100, 100), just input one number.
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
            <h1 className="text-xl underline mt-8">GPA Calculator</h1>
            <p className = "mt-3">Students can utilize the GPA calculator to calculate their current GPAs, future GPAs and the GPAs of competitors. Grades must be entered in the following format: Letter grade(Number of semesters), separated by commas. For each letter grade, enter the number of semesters that grade was earned. If high school credit courses were taken in middle school, include them in the calculation.</p>
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
                <p className = "mt-3 mb-7">Please note that academic (ACA) courses are 4.0s, and KAP/AP courses are 5.0s.</p>
            </div>
        </div>
    );
}

export default HowToUse;