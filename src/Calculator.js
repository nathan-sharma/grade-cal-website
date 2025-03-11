import React, { useState } from 'react';

function Calculator() {
  const [partialScore, setPartialScore] = useState('');
  const [nValue, setNValue] = useState('');
  const [sumOtherScores, setSumOtherScores] = useState('');
  const [kValue, setKValue] = useState('');
  const [result, setResult] = useState('');
  const [category, setCategory] = useState('major');
  const [isResultVisible, setIsResultVisible] = useState(false); // Track visibility

  const calculate = () => {
    if (isResultVisible) {
      // If result is visible, hide it and return
      setIsResultVisible(false);
      return;
    }

    const parsedPartialScore = parseFloat(partialScore);
    const parsedNValue = parseFloat(nValue);
    const parsedSumOtherScores = parseFloat(sumOtherScores);
    const parsedKValue = parseFloat(kValue);

    if (isNaN(parsedPartialScore) || isNaN(parsedNValue) || isNaN(parsedSumOtherScores) || isNaN(parsedKValue)) {
      alert('Please enter valid numbers.');
      return;
    }

    const calculatedResult = (parsedPartialScore + parsedNValue * parsedSumOtherScores) / (1 + parsedNValue * (parsedKValue - 1));
    setResult(calculatedResult.toFixed(2));
    setIsResultVisible(true); // Show the result
  };

  return (
    <div>
      <div className="calculator mt-4 border p-4 rounded-md shadow-md sm:w-full w-[90vw] mx-auto flex items-center justify-center sm:flex-row flex-col">
        <label htmlFor="category" className="block mb-1">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-2 ml-1"
        >
          <option value="major">Major</option>
          <option value="minor">Minor</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="partialScore" className="block mb-1 ml-3">P:</label>
        <input type="number" id="partialScore" value={partialScore} onChange={(e) => setPartialScore(e.target.value)} className="border p-2 w-full mb-2 ml-1" />

        <label htmlFor="nValue" className="block mb-1 ml-3">n:</label>
        <input type="number" id="nValue" value={nValue} onChange={(e) => setNValue(e.target.value)} className="border p-2 w-full mb-2 ml-1" />

        <label htmlFor="sumOtherScores" className="block mb-1 ml-3 text-sm">S:</label>
        <input type="number" id="sumOtherScores" value={sumOtherScores} onChange={(e) => setSumOtherScores(e.target.value)} className="border p-2 w-full mb-2 ml-1" />

        <label htmlFor="kValue" className="block mb-1 ml-3">k:</label>
        <input type="number" id="kValue" value={kValue} onChange={(e) => setKValue(e.target.value)} className="border p-2 w-full mb-2 ml-1" />

        <button onClick={calculate} className="ml-3 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-900">Calculate</button>
      </div>
      {isResultVisible && result && (
        <div className="mt-4 text-center">
          <span>Replace your {category} grade inputs with the following number:</span> <span className="font-bold">{result}</span>
        </div>
      )}
    </div>
  );
}

export default Calculator;