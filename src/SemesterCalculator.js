import React, { useState, useEffect } from 'react';

function SemesterCalculator() {
  const [sw1, setSw1] = useState('');
  const [sw2, setSw2] = useState('');
  const [sw3, setSw3] = useState('');
  const [testScore, setTestScore] = useState ('');
  const [results, setResults] = useState(null);
  const [savedSemesters, setSavedSemesters] = useState([]);
  const [showSavedSemesters, setShowSavedSemesters] = useState(false);
  const handleCalculateSaved = (grade) => {
    setSw1(grade.sw1 || '');
    setSw2(grade.sw2 || '');
    setSw3(grade.sw3 || '');
    setTestScore(grade.testScore || ''); 
    calculate();
    setShowSavedSemesters(false); // Close the saved grades list
  };

  useEffect(() => {
    const savedSW1 = localStorage.getItem('sw1');
    const savedSW2 = localStorage.getItem('sw2');
    const savedSW3 = localStorage.getItem('sw3');
    const savedTestScore = localStorage.getItem('testScore');
    const savedSemestersData = localStorage.getItem('savedSemesters');

    if (savedSW1) setSw1(savedSW1);
    if (savedSW2) setSw2(savedSW2);
    if (savedSW3) setSw3(savedSW3);
    if (savedTestScore) setTestScore(savedTestScore);
    if (savedSemestersData) setSavedSemesters(JSON.parse(savedSemestersData) || []);
  }, []);

  const handleInputChange = (e, setter) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');

    const number = parseInt(sanitizedValue);

    if (!isNaN(number) && number >= 0 && number <= 105) {
      setter(sanitizedValue);
    } else if (sanitizedValue === "") {
      setter(sanitizedValue);
    }
  };

  const clearResults = () => {
    if (!localStorage.getItem('sw1') && !localStorage.getItem('sw2') && !localStorage.getItem('sw3')) {
      setSw1('');
      setSw2('');
      setSw3('');
      setTestScore('');
    }
    setResults(null);
  };
  const calculate = () => {
    const average = ((parseInt(sw1) || 0) + (parseInt(sw2) || 0) + (parseInt(sw3) || 0)) / 3;
    const get_an_a = (20 / 3) * (89.5 - 0.85 * average);
    const get_a_b = (20 / 3) * (79.5 - 0.85 * average);
    const to_pass = (20 / 3) * (70 - 0.85 * average);
    const skibidi_toilet = 0.85 * average + 15;
    const final_average = 0.85 * average + 0.15* testScore; 

    setResults({ get_an_a, get_a_b, to_pass, skibidi_toilet, final_average});
  };



  const handleReset = () => {
    localStorage.removeItem('sw1');
    localStorage.removeItem('sw2');
    localStorage.removeItem('sw3');
    localStorage.removeItem('testScore'); 
    setSw1('');
    setSw2('');
    setSw3('');
    setTestScore(''); 
    alert("Saved data cleared.");
  };

  const isDataSaved =
    localStorage.getItem('sw1') ||
    localStorage.getItem('sw2') ||
    localStorage.getItem('sw3') || 
    localStorage.getItem('testScore'); 

    const handleSave = () => {
      const name = prompt('Enter a name for this class:');
      if (name) {
        const newSavedSemester = {
          name: name,
          sw1: sw1,
          sw2 : sw2,
          sw3 : sw3,
          testScore : testScore,
        };
        const updatedSavedSemesters = [...savedSemesters, newSavedSemester];
        setSavedSemesters(updatedSavedSemesters);
        localStorage.setItem('savedSemesters', JSON.stringify(updatedSavedSemesters));
        setSw1('');
        setSw2('');
        setSw3('');
        setTestScore(''); 
      }
    };
  
    // Function to show saved GPAs
    const handleViewSaved = () => {
      setShowSavedSemesters(true);
    };
  
    // Function to close the saved GPAs view
    const handleCloseSaved = () => {
      setShowSavedSemesters(false);
    };
  
    // Function to clear all saved GPAs
    const handleUnsaveAll = () => {
      setSavedSemesters([]);
      localStorage.removeItem('savedSemesters');
    };

    const handleRemoveSemesters = (indexToRemove) => {
      const updatedSavedSemesters = savedSemesters.filter((_, index) => index !== indexToRemove);
      setSavedSemesters(updatedSavedSemesters);
      localStorage.setItem('savedSemesters', JSON.stringify(updatedSavedSemesters));
    };
  return (
    <div className="bg-white p-8 mb-1">
      <h2 className="text-2xl font-bold mb-4">Semester Exam</h2>
      <input
        type="number"
        placeholder="1st SW"
        value={sw1}
        onChange={(e) => handleInputChange(e, setSw1)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="2nd SW"
        value={sw2}
        onChange={(e) => handleInputChange(e, setSw2)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="3rd SW"
        value={sw3}
        onChange={(e) => handleInputChange(e, setSw3)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />
        <input
        type="number"
        placeholder="Exam score"
        value={testScore}
        onChange={(e) => handleInputChange(e, setTestScore)}
        className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
      />
      <div className="flex items-center mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={calculate}
        >
          Calculate
        </button>
        {isDataSaved && (
  <button
    className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded ml-3"
    onClick={handleReset}
  >
    Unsave
  </button>
)}
           <button
        className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-3"
        onClick={handleViewSaved}
      >
        View
      </button>
      {results && (
  <> {/* Use a fragment to group multiple elements */}
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
        <div className="mt-4 relative">
          <p className="my-1">
            Minimum needed on final to get an A: {results.get_an_a > 100 ? '❌ Impossible' : results.get_an_a <= 0 ? '✅ Guaranteed' : results.get_an_a.toFixed(2)}
          </p>
          <p className="my-1">
            Minimum needed on final get a B: {results.get_a_b > 100 ? '❌ Impossible' : results.get_a_b <= 0 ? '✅ Guaranteed' : results.get_a_b.toFixed(2)}
          </p>
          <p>
            Minimum needed on final to pass: {results.to_pass > 100 ? '❌ Impossible' : results.to_pass <= 0 ? '✅ Guaranteed' : results.to_pass.toFixed(2)}
          </p>
          <p className="my-1">
            Best case scenario: your average is a(n) {results.skibidi_toilet.toFixed(2)}
          </p>
          <p className>Average if exempted: {((parseInt(sw1) || 0) / 3 + (parseInt(sw2) || 0) / 3 + (parseInt(sw3) || 0) / 3).toFixed(2)} </p>
        <p className="my-1">
            Average with mock score: {results.final_average.toFixed(2)}
          </p>
        </div>
      )}
      {showSavedSemesters && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-8 rounded-lg w-1/2  w-[90vw] md:w-[40vw] max-h-[70vh]  overflow-y-auto overflow-x-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Saved Semesters</h2>
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
      {savedSemesters.length > 0 ? (
        <ul>
          {savedSemesters.map((semester, index) => (
            <li key={index} className="mb-4 border-b pb-2">
              <p>
                <strong>Name:</strong> {semester.name}
              </p>
              <p>
                <strong>1st SW:</strong> {semester.sw1}
              </p>
              <p>
                <strong>2nd SW:</strong> {semester.sw2}
              </p>
              <p>
                <strong>3rd SW:</strong> {semester.sw3}
              </p>
              <p>
                <strong>Exam score:</strong> {semester.testScore}
              </p>
              {semester.results && (
                <div>
                  <p>
                    <strong>Min A:</strong> {semester.results.get_an_a ? semester.results.get_an_a.toFixed(2) : 'N/A'}
                  </p>
                  <p>
                    <strong>Min B:</strong> {semester.results.get_a_b ? semester.results.get_a_b.toFixed(2) : 'N/A'}
                  </p>
                  <p>
                    <strong>Min Pass:</strong> {semester.results.to_pass ? semester.results.to_pass.toFixed(2) : 'N/A'}
                  </p>
                  <p>
                    <strong>Best Case:</strong> {semester.results.skibidi_toilet ? semester.results.skibidi_toilet.toFixed(2) : 'N/A'}
                  </p>
                </div>
              )}
               <div className = "flex">
              <button
      onClick={() => handleRemoveSemesters(index)}
      className="text-red-600 hover:text-red-800 mt-2 underline" // Add some top margin
    >
      Remove
    </button>
    <button
                      onClick={() => handleCalculateSaved(semester)}
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

export default SemesterCalculator;