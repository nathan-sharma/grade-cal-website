import React, { useState } from 'react';

function GradeAverageCalculator() {
  const [majors, setMajors] = useState('');
  const [minors, setMinors] = useState('');
  const [others, setOthers] = useState('');
  const [results, setResults] = useState(null);

  const clearResults = () => {
    setResults(null);
  };

  const calculateAverage = () => {
    const calculateAverageForCategory = (gradesString) => {
      if (!gradesString) return 0;
      const gradesList = gradesString.split(',').map(grade => parseFloat(grade.trim()));
      const validGrades = gradesList.filter(grade => !isNaN(grade));
      if (validGrades.length === 0) return 0;
      return validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length;
    };

    const avgMajors = calculateAverageForCategory(majors);
    const avgMinors = calculateAverageForCategory(minors);
    const avgOthers = calculateAverageForCategory(others);

    const finalAvgKap = 0.6 * avgMajors + 0.3 * avgMinors + 0.1 * avgOthers;
    const finalAvgAca = 0.5 * avgMajors + 0.35 * avgMinors + 0.15 * avgOthers;
    const finalAvgAp = 0.7 * avgMajors + 0.2 * avgMinors + 0.1 * avgOthers;

    setResults({ kap: finalAvgKap, aca: finalAvgAca, ap: finalAvgAp });
  };

  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-bold mb-4">Class Average</h2>
      <input
        type="text"
        placeholder="Major Grades"
        value={majors}
        onChange={(e) => setMajors(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Minor Grades"
        value={minors}
        onChange={(e) => setMinors(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Other Grades"
        value={others}
        onChange={(e) => setOthers(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />
      <div className="flex items-center mb-4"> {/* Added items-center */}
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={calculateAverage}
        >
          Calculate
        </button>
        {results && (
          <button
            onClick={clearResults}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-2"
          >
          Clear
          </button>
        )}
      </div>

      {results && (
        <div>
          <p>KAP Average: {results.kap.toFixed(2)}</p>
          <p>ACA Average: {results.aca.toFixed(2)}</p>
          <p>AP Average: {results.ap.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default GradeAverageCalculator;