import React, { useState, useEffect } from 'react';

function GPACalculator() {
  const [academicGrades, setAcademicGrades] = useState('');
  const [kapApGrades, setKapApGrades] = useState('');
  const [weightedGpa, setWeightedGpa] = useState(null);
  const [UnweightedGpa, setUnweightedGpa] = useState(null);
  const [savedGpas, setSavedGpas] = useState([]);
  const [calculationMade, setCalculationMade] = useState(false);
  const [showSavedGpas, setShowSavedGpas] = useState(false);
  const handleCalculateSaved = (grade) => {
    setAcademicGrades(grade.academicGrades || '');
    setKapApGrades(grade.kapApGrades || '');
    setWeightedGpa(grade.weightedGpa || '');
    setUnweightedGpa(grade.UnweightedGpa || '');
    calculateGPA();
    setShowSavedGpas(false); // Close the saved grades list
  };

  useEffect(() => {
    const savedAcademic = localStorage.getItem('academicGrades');
    const savedKapAp = localStorage.getItem('kapApGrades');
    const savedGpasData = localStorage.getItem('savedGpas');

    if (savedAcademic) setAcademicGrades(savedAcademic);
    if (savedKapAp) setKapApGrades(savedKapAp);
    if (savedGpasData) setSavedGpas(JSON.parse(savedGpasData) || []);
  }, []);

  const handleInputChange = (e, setter) => {
    const sanitizedValue = e.target.value.replace(/[^a-df0-9(),\s]/gi, '');
    setter(sanitizedValue);
  };

  const isDataSaved =
  localStorage.getItem('academicGrades') ||
  localStorage.getItem('kapApGrades');

  const handleReset = () => {
    localStorage.removeItem('academicGrades');
    localStorage.removeItem('kapApGrades');
    setAcademicGrades('');
    setKapApGrades('');
    setCalculationMade(false); 
    alert("Saved data cleared.");
  };
  const calculatePoints = (gradesString, letterValues) => {
    let points = 0;
    let count = 0;
    let hasError = false;

    if (gradesString.toLowerCase() !== 'none' && gradesString.trim() !== '') {
      const entries = gradesString.split(',');
      for (const entry of entries) {
        const parts = entry.trim().split('(');
        if (parts.length === 2) {
          const letter = parts[0].trim().toUpperCase();
          const num = parseInt(parts[1].replace(')', ''));

          if (isNaN(num)) {
            alert(`Invalid input: ${entry}. See how to use in the navbar for more info.`);
            hasError = true;
            break;
          } else {
            points += letterValues[letter] * num;
            count += num;
          }
        } else {
          alert(`Invalid format: ${entry}. See how to use in the navbar for more info.`);
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
    const unweightedKapApPointsCount = calculatePoints(kapApGrades, acaLetters)
    const kapPointsCount = calculatePoints(kapApGrades === 'none' ? '' : kapApGrades, kapApLetters);

    if (acaPointsCount.hasError || kapPointsCount.hasError) {
      setWeightedGpa(null);
      setUnweightedGpa(null); 
      return;
    }

    const totalPoints = acaPointsCount.points + kapPointsCount.points;
    const totalCourses = acaPointsCount.count + kapPointsCount.count;
    const unweightedPoints = unweightedKapApPointsCount.points + acaPointsCount.points;

    const calculatedWeightedGpa = totalCourses > 0 ? totalPoints / totalCourses : 0;
    const calculatedUnweightedGpa = totalCourses > 0 ? unweightedPoints / totalCourses : 0

    setWeightedGpa(calculatedWeightedGpa.toFixed(4));
    setUnweightedGpa(calculatedUnweightedGpa.toFixed(4));
    setCalculationMade(true);
  };

  const clearResults = () => {
    if (!localStorage.getItem('academicGrades') && !localStorage.getItem('kapApGrades') ) {
      setAcademicGrades('');
      setKapApGrades('');
    }
    setWeightedGpa(null);
    setCalculationMade(false);
  };
  const handleSave = () => {
    const name = prompt('Enter a name for this GPA calculation:');
    if (name) {
      const newSavedGpa = {
        name: name,
        academicGrades: academicGrades,
        kapApGrades: kapApGrades,
        weightedGpa: weightedGpa,
        unweightedGpa: UnweightedGpa,
      };
      const updatedSavedGpas = [...savedGpas, newSavedGpa];
      setSavedGpas(updatedSavedGpas);
      // Save the updated GPAs to localStorage
      localStorage.setItem('savedGpas', JSON.stringify(updatedSavedGpas));
      setAcademicGrades('');
      setKapApGrades('');
      setWeightedGpa(null);
      setUnweightedGpa(null);
      setCalculationMade(false);
    }
  };
  
  const handleViewSaved = () => {
    setShowSavedGpas(true);
  };
  const handleCloseSaved = () => {
    setShowSavedGpas(false);
  };
  const handleUnsaveAll = () => {
    setSavedGpas([]);
    localStorage.removeItem('savedGpas');
  };
  const handleRemoveGpa = (indexToRemove) => {
    const updatedSavedGpas = savedGpas.filter((_, index) => index !== indexToRemove);
    setSavedGpas(updatedSavedGpas);
    localStorage.setItem('savedGpas', JSON.stringify(updatedSavedGpas));
  };
  return (
    
    <div className="md:p-8 p-4 bg-white">
      <h2 className="text-2xl font-bold mb-4">GPA</h2>
      <input
        type="text"
        placeholder="ACA (4.0) courses"
        value={academicGrades}
        onChange={(e) => handleInputChange(e, setAcademicGrades)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="KAP & AP (5.0) courses"
        value={kapApGrades}
        onChange={(e) => handleInputChange(e, setKapApGrades)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />
      <div className="flex items-center mb-4">
        <button onClick={calculateGPA} className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
          Calculate
        </button>
        {isDataSaved && (
          <button
            className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ml-3"
            onClick={handleReset}
          >
            Unsave
          </button>
        ) }
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-3"
          onClick={handleViewSaved}
        >
          View
        </button>
        {weightedGpa !== null && (
          <>
             <button
             className= " bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-3"
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

      {weightedGpa !== null && (
        <div className="mt-4 relative">
          <p className="text-lg">Your weighted KISD GPA: {weightedGpa}</p>
          <p className="text-lg">Your unweighted GPA: {UnweightedGpa}</p>
        </div>
        
      )}
         {showSavedGpas && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-1/2 w-[90vw] max-h-[70vh] overflow-y-auto overflow-x-auto">
            <h2 className="text-2xl font-bold mb-2 text-center">Saved GPAs</h2>
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
            {savedGpas.length > 0 ? (
              <ul>
                {savedGpas.map((gpa, index) => (
                  <li key={index} className="mb-4 border-b pb-2">
              <p>
        <strong>Name:</strong> {gpa.name}
      </p>
                    <p>
                      <strong>ACA Courses:</strong> {gpa.academicGrades || 'N/A'}
                    </p>
                    <p>
                      <strong>KAP/AP Courses:</strong> {gpa.kapApGrades || 'N/A'}
                    </p>
                    <p>
                      <strong>Weighted GPA:</strong> {gpa.weightedGpa}
                    </p>
                    <p>
                      <strong>Unweighted GPA:</strong> {gpa.unweightedGpa}
                    </p>
                    <div className = "flex flex-wrap">
                    <button
      onClick={() => handleRemoveGpa(index)}
      className="text-red-600 hover:text-red-800 mt-2 underline" 
    >
      Remove
    </button>
    <button
                      onClick={() => handleCalculateSaved(gpa)}
                      className="text-blue-600 hover:text-blue-800 mt-2 ml-3 underline"
                    >
                      Enter in calculator 
                    </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className = "text-center">No GPAs saved to this browser.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GPACalculator;