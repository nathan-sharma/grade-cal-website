import React, { useState, useEffect } from 'react';

function GradeAverageCalculator() {
  const [majors, setMajors] = useState('');
  const [minors, setMinors] = useState('');
  const [others, setOthers] = useState('');
  const [results, setResults] = useState(null);
  const [calculationMade, setCalculationMade] = useState(false);
  const [savedGrades, setSavedGrades] = useState([]);
  const [showSavedGrades, setShowSavedGrades] = useState(false);
  const handleCalculateSaved = (grade) => {
    setMajors(grade.majors || '');
    setMinors(grade.minors || '');
    setOthers(grade.others || '');
    calculateAverage();
    setShowSavedGrades(false); // Close the saved grades list
  };
  useEffect(() => {
    const saved = localStorage.getItem('savedGrades');
    if (saved) {
      setSavedGrades(JSON.parse(saved));
    }

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
  const calculateAverage = () => {
    const calculateAverageForCategory = (gradesString) => {
      if (!gradesString) return 0;
      const gradesList = gradesString.split(',').map((grade) => parseFloat(grade.trim()));
      const validGrades = gradesList.filter((grade) => !isNaN(grade));
      if (validGrades.length === 0) return 0;
      return validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length;
    };

    const avgMajors = calculateAverageForCategory(majors);
    const avgMinors = calculateAverageForCategory(minors);
    const avgOthers = calculateAverageForCategory(others);

    let finalAvgKap, finalAvgAca, finalAvgAp;

    const majorsCount = majors.split(',').filter((grade) => !isNaN(parseFloat(grade.trim()))).length;
    const minorsCount = minors.split(',').filter((grade) => !isNaN(parseFloat(grade.trim()))).length;
    const othersCount = others.split(',').filter((grade) => !isNaN(parseFloat(grade.trim()))).length;

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
  };
  const clearResults = () => {
    setMajors('');
    setMinors('');
    setOthers('');
    setResults(null);
    setCalculationMade(false);
  };
  const handleSave = () => {
    const name = prompt('Enter a name for this class:');
    if (name) {
      const newSavedGrade = {
        name: name,
        majors: majors,
        minors: minors,
        others: others,
        results: results,
      };
      const updatedSavedGrades = [...savedGrades, newSavedGrade];
      setSavedGrades(updatedSavedGrades);
      localStorage.setItem('savedGrades', JSON.stringify(updatedSavedGrades));
      setMajors('');
      setMinors('');
      setOthers('');
      setResults(null);
      setCalculationMade(false);
    }
  };

  const handleViewSaved = () => {
    setShowSavedGrades(true);
  };

  const handleCloseSaved = () => {
    setShowSavedGrades(false);
  };
  const handleUnsaveAll = () => {
    setSavedGrades([]);
    localStorage.removeItem('savedGrades');
  };
  const handleRemoveClass = (indexToRemove) => {
    const updatedSavedGrades = savedGrades.filter((_, index) => index !== indexToRemove);
    setSavedGrades(updatedSavedGrades);
    localStorage.setItem('savedGrades', JSON.stringify(updatedSavedGrades));
  };
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
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-3"
          onClick={handleViewSaved}
        >
          View
        </button>
        {results && (
          <>
            <button
              className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-3"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              onClick={clearResults}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-3"
            >
              Done
            </button>
          </>
        )}
      </div>

      {results && (
        <div>
          <p>KAP Average: {results.kap.toFixed(2)}</p>
          <p>ACA Average: {results.aca.toFixed(2)}</p>
          <p>AP Average: {results.ap.toFixed(2)}</p>
        </div>
      )}


      {showSavedGrades && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-1/2  w-[90vw] md:w-[40vw] max-h-[70vh] overflow-y-auto overflow-x-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">Saved Grades</h2>
            <div className = "flex items-center justify-center">
            <button
              className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-1 mb-3"
              onClick={handleCloseSaved}
            >
              Close
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded ml-3 h-auto mt-1 mb-3"
              onClick={handleUnsaveAll}
            >
              Clear
            </button>
</div>
            {savedGrades.length > 0 ? (
              <ul>
                {savedGrades.map((grade, index) => (
                  <li key={index} className="mb-4 border-b pb-2">
                    <div className = "flex items-center justify-between"></div>
                    <p><strong>Name:</strong> {grade.name}</p>
                    <p><strong>Majors:</strong> {grade.majors || 'N/A'}</p>
                    <p><strong>Minors:</strong> {grade.minors || 'N/A'}</p>
                    <p><strong>Others:</strong> {grade.others || 'N/A'}</p>
                    {grade.results && (
                      <div>
                        <p><strong>KAP Average:</strong> {grade.results.kap.toFixed(2)}</p>
                        <p><strong>ACA Average:</strong> {grade.results.aca.toFixed(2)}</p>
                        <p><strong>AP Average:</strong> {grade.results.ap.toFixed(2)}</p>
                      </div>
                    )}
                     <div className = "flex">
                    <button
      onClick={() => handleRemoveClass(index)}
      className="text-red-600 hover:text-red-800 mt-2 underline" // Add some top margin
    >
     
      Remove
    </button>
    <button
                      onClick={() => handleCalculateSaved(grade)}
                      className="text-blue-600 hover:text-blue-800 mt-2 ml-3 underline"
                    >
                      Enter in calculator
                    </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className = "text-center">No classes saved to this browser.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GradeAverageCalculator; 