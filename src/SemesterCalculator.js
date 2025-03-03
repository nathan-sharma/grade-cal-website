import React, { useState } from 'react';

function SemesterCalculator() {
  const [sw1, setSw1] = useState('');
  const [sw2, setSw2] = useState('');
  const [sw3, setSw3] = useState('');
  const [results, setResults] = useState(null);
  const handleInputChange = (e, setter) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
  
    const numbers = sanitizedValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
  
    const validNumbers = numbers.filter(num => num >= 0 && num <= 105);
  
    setter(validNumbers.join(','));
  };
  const clearResults = () => {
    setResults(null);
    setSw1('');
    setSw2('');
    setSw3('');
  };

  const calculate = () => {
    const average = (parseInt(sw1) + parseInt(sw2) + parseInt(sw3)) / 3;
    const get_an_a = (20 / 3) * (89.5 - 0.85 * average);
    const get_a_b = (20 / 3) * (79.5 - 0.85 * average);
    const to_pass = (20 / 3) * (70 - 0.85 * average);
    const skibidi_toilet = 0.85 * average + 15;

    setResults({ get_an_a, get_a_b, to_pass, skibidi_toilet });
  };

  return (
    <div className="bg-white p-8">
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
      <div className="flex items-center mb-4"> {/* Added flex items-center */}
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={calculate}
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
        <div className="mt-4 relative">
          <p className="my-1">
            Minimum needed on final to get an A:{" "}
            {results.get_an_a > 100
              ? "❌ Impossible"
              : results.get_an_a <= 0
              ? "✅ Guaranteed"
              : results.get_an_a.toFixed(2)}
          </p>
          <p className="my-1">
            Minimum needed on final get a B:{" "}
            {results.get_a_b > 100
              ? "❌ Impossible"
              : results.get_a_b <= 0
              ? "✅ Guaranteed"
              : results.get_a_b.toFixed(2)}
          </p>
          <p>
            Minimum needed on final to pass:{" "}
            {results.to_pass > 100
              ? "❌ Impossible"
              : results.to_pass <= 0
              ? "✅ Guaranteed"
              : results.to_pass.toFixed(2)}
          </p>
          <p className="my-1">
            Best case scenario: your average is a(n) {results.skibidi_toilet.toFixed(2)}
          </p>
          <p className>Average if exempted: {((parseInt(sw1) + parseInt(sw2) + parseInt(sw3)) / 3).toFixed(2)} </p>
        </div>
      )}
    </div>
  );
}

export default SemesterCalculator;