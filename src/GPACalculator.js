import React, { useState } from 'react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'; // Import the reset icon

function GPACalculator() {
  const [academicGrades, setAcademicGrades] = useState('');
  const [kapApGrades, setKapApGrades] = useState('');
  const [weightedGpa, setWeightedGpa] = useState(null);

  const calculatePoints = (gradesString, letterValues) => {
    let points = 0;
    let count = 0;
    let hasError = false;

    if (gradesString.toLowerCase() !== 'none' && gradesString.trim() !== "") {
      const entries = gradesString.split(',');
      for (const entry of entries) {
        const parts = entry.trim().split('(');
        if (parts.length === 2) {
          const letter = parts[0].trim().toUpperCase();
          const num = parseInt(parts[1].replace(')', ''));

          if (isNaN(num)) {
            alert(`Invalid input: ${entry}. See how to use (in the navbar) for more info.`);
            hasError = true;
            break;
          } else {
            points += letterValues[letter] * num;
            count += num;
          }
        } else {
          alert(`Invalid format: ${entry}. See how to use (in the navbar) for more info.`);
          hasError = true;
          break;
        }
      }
    }
    return { points, count, hasError };
  };

  const calculateGPA = () => {
    const acaLetters = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const kapApLetters = { A: 5, B: 4, C: 3, D: 2, F: 0 };

    const acaPointsCount = calculatePoints(academicGrades, acaLetters);
    const kapPointsCount = calculatePoints(kapApGrades === 'none' ? "" : kapApGrades, kapApLetters);

    if (acaPointsCount.hasError || kapPointsCount.hasError) {
      setWeightedGpa(null);
      return;
    }

    const totalPoints = acaPointsCount.points + kapPointsCount.points;
    const totalCourses = acaPointsCount.count + kapPointsCount.count;

    const calculatedWeightedGpa = totalCourses > 0 ? totalPoints / totalCourses : 0;

    setWeightedGpa(calculatedWeightedGpa.toFixed(4));
  };

  const clearResults = () => {
    setWeightedGpa(null);
  };

  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold mb-4">GPA</h2>
      <input
        type="text"
        placeholder="ACA (4.0) courses"
        value={academicGrades}
        onChange={e => setAcademicGrades(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="KAP & AP (5.0) courses"
        value={kapApGrades}
        onChange={e => setKapApGrades(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />
      <div className="flex items-center mb-4"> {/* Added flex items-center */}
        <button onClick={calculateGPA} className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
          Calculate
        </button>
        {weightedGpa !== null && (
          <button
            onClick={clearResults}
            className="text-gray-600 px-2 py-2 ml-2 hover:text-gray-900" 
          >
            <ArrowUturnLeftIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {weightedGpa !== null && (
        <div className="mt-4 relative">
          <p className="text-lg">Your weighted KISD GPA: {weightedGpa}</p>
          <p className="text-lg">Your 4.0 scaled GPA: {(weightedGpa * 0.8).toFixed(4)}</p>
        </div>
      )}
    </div>
  );
}

export default GPACalculator;