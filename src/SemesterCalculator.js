import React, { useState } from 'react';

function SemesterCalculator() {
  const [sw1, setSw1] = useState('');
  const [sw2, setSw2] = useState('');
  const [sw3, setSw3] = useState('');
  const [results, setResults] = useState(null);

  const calculate = () => {
    const average = (parseFloat(sw1) + parseFloat(sw2) + parseFloat(sw3)) / 3;
    const get_an_a = 20 / 3 * (89.5 - (0.85 * average));
    const get_a_b = 20 / 3 * (79.5 - (0.85 * average));
    const to_pass = 20 / 3 * (70 - (0.85 * average));
    const skibidi_toilet = 0.85 * average + 15;

    setResults({ get_an_a, get_a_b, to_pass, skibidi_toilet });
  };

  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-bold mb-4">Semester Exam Calculator</h2>
      <p className = "mt-[-10px]"> Assumes that the final is worth 15% of your average.</p>
      <input
        type="number"
        placeholder="1st SW"
        value={sw1}
        onChange={e => setSw1(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="2nd SW"
        value={sw2}
        onChange={e => setSw2(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="3rd SW"
        value={sw3}
        onChange={e => setSw3(e.target.value)}
        className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={calculate}
      >
        Calculate exam scores
      </button>

      {results && (
        <div className="mt-4"> {/* Added margin-top for spacing */}
          <p className ="my-1">
            Minimum needed to get an A:{" "}
            {results.get_an_a > 100
              ? "❌ Impossible"
              : results.get_an_a <= 0
              ? "✅ Guaranteed"
              : results.get_an_a.toFixed(2)}
               {/* Format to 2 decimal places */}
          </p>
          <p className = "my-1">
            Minimum needed get a B:{" "}
            {results.get_a_b > 100
              ? "❌ Impossible"
              : results.get_a_b <= 0
              ? "✅ Guaranteed"
              : results.get_a_b.toFixed(2)}
          </p>
          <p className = "my-1">
            Minimum needed to pass:{" "}
            {results.to_pass > 100
              ? "❌ Impossible"
              : results.to_pass <= 0
              ? "✅ Guaranteed"
              : results.to_pass.toFixed(2)}
          </p>
          <p>Best case scenario: {results.skibidi_toilet.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default SemesterCalculator;