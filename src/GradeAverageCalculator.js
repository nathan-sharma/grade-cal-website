import React, { useState, useEffect } from 'react';

function GradeAverageCalculator() {
  const [majors, setMajors] = useState('');
  const [minors, setMinors] = useState('');
  const [others, setOthers] = useState('');
  const [results, setResults] = useState(null);
  const [calculationMade, setCalculationMade] = useState(false);

  useEffect(() => {
    const savedMajors = localStorage.getItem('majors');
    const savedMinors = localStorage.getItem('minors');
    const savedOthers = localStorage.getItem('others');

    if (savedMajors) setMajors(savedMajors);
    if (savedMinors) setMinors(savedMinors);
    if (savedOthers) setOthers(savedOthers);
  }, []);

  const handleInputChange = (e, setter) => {
    const sanitizedValue = e.target.value.replace(/[^0-9.,\s]/g, '');
    setter(sanitizedValue);
  };
  const isDataSaved =
  localStorage.getItem('majors') ||
  localStorage.getItem('minors') ||
  localStorage.getItem('others');
  const clearResults = () => {
    if (!localStorage.getItem('majors') && !localStorage.getItem('minors') && !localStorage.getItem('others')) {
      setMajors('');
      setMinors('');
      setOthers('');
    }
    setResults(null);
    setCalculationMade(false);
  };
  const handleReset = () => {
    localStorage.removeItem('majors');
    localStorage.removeItem('minors');
    localStorage.removeItem('others');
    localStorage.removeItem('results'); 
    setMajors('');
    setMinors('');
    setOthers('');
    setResults(null); 
    setCalculationMade(false); 
    alert("Saved data cleared.");
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

    let finalAvgKap, finalAvgAca, finalAvgAp;

    const majorsCount = majors.split(',').filter(grade => !isNaN(parseFloat(grade.trim()))).length;
    const minorsCount = minors.split(',').filter(grade => !isNaN(parseFloat(grade.trim()))).length;
    const othersCount = others.split(',').filter(grade => !isNaN(parseFloat(grade.trim()))).length;


    if (majorsCount >= 1 && minorsCount === 0 && othersCount === 0) {
      finalAvgKap = avgMajors;
      finalAvgAca = avgMajors;
      finalAvgAp = avgMajors;
    } else if (majorsCount === 0 && minorsCount >= 1 && othersCount === 0) {
      finalAvgKap = avgMinors;
      finalAvgAca = avgMinors;
      finalAvgAp = avgMinors;
    } else if (majorsCount === 0 && minorsCount === 0 && othersCount >= 1) {
      finalAvgKap = avgOthers;
      finalAvgAca = avgOthers;
      finalAvgAp = avgOthers;
    } else if (!majors) {
      finalAvgKap = 0.75 * avgMinors + 0.25 * avgOthers;
      finalAvgAca = 0.7 * avgMinors + 0.3 * avgOthers;
      finalAvgAp = (2 / 3) * avgMinors + (1 / 3) * avgOthers;
    } else if (!minors) {
      finalAvgKap = (6 / 7) * avgMajors + (1 / 7) * avgOthers;
      finalAvgAca = (10 / 13) * avgMajors + (3 / 13) * avgOthers;
      finalAvgAp = (7 / 8) * avgMajors + (1 / 8) * avgOthers;
    } else if (!others) {
      finalAvgKap = (2 / 3) * avgMajors + (1 / 3) * avgMinors;
      finalAvgAca = (10 / 17) * avgMajors + (7 / 17) * avgMinors;
      finalAvgAp = (7 / 9) * avgMajors + (2 / 9) * avgMinors;
    } else {
      finalAvgKap = 0.6 * avgMajors + 0.3 * avgMinors + 0.1 * avgOthers;
      finalAvgAca = 0.5 * avgMajors + 0.35 * avgMinors + 0.15 * avgOthers;
      finalAvgAp = 0.7 * avgMajors + 0.2 * avgMinors + 0.1 * avgOthers;
    }

    setResults({ kap: finalAvgKap, aca: finalAvgAca, ap: finalAvgAp });
    setCalculationMade(true);
  }

  const handleSave = () => {
    localStorage.setItem('majors', majors);
    localStorage.setItem('minors', minors);
    localStorage.setItem('others', others);
    alert("Grades saved to this browser!");
  };
  const saveButtonColor = calculationMade ? 'bg-blue-600 hover:bg-blue-900' : 'bg-blue-200';
  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-bold mb-4">Class Average</h2>
      <input
        type="text"
        placeholder="Major Grades"
        value={majors}
        onChange={(e) => handleInputChange(e, setMajors)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Minor Grades"
        value={minors}
        onChange={(e) => handleInputChange(e, setMinors)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Other Grades"
        value={others}
        onChange={(e) => handleInputChange(e, setOthers)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={calculateAverage}
        >
          Calculate
        </button>
        {isDataSaved ? (
          <button
            className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ml-3"
            onClick={handleReset}
          >
            Unsave
          </button>
        ) : (
          <button
            className={`${saveButtonColor} text-white font-bold py-2 px-4 rounded ml-3`}
            onClick={handleSave}
            disabled={!calculationMade}
          >
            Save
          </button> ) }
        {results && (
          <button
            onClick={clearResults}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-3"
          >
            Done
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