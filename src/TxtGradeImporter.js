import React, { useState } from 'react';

// Define the required grade categories for parsing
const CATEGORIES = ['Major', 'Minor', 'Other'];

// Helper function to centralize grade processing logic
const processGrade = (currentClass, category, scoreStr, totalPointsStr) => {
    scoreStr = scoreStr.trim();
    totalPointsStr = totalPointsStr.trim();

    // Ignore invalid, missing, or exempt grades/points
    if (scoreStr.length === 0 || totalPointsStr.length === 0 || 
        scoreStr.includes('X-Exempt') || scoreStr.includes('N/A') || 
        scoreStr.includes('M-Missing') || totalPointsStr.includes('N/A')) {
        return; 
    }

    const score = parseFloat(scoreStr);
    const totalPoints = parseFloat(totalPointsStr);
    
    // Final validation and calculation
    if (!isNaN(score) && !isNaN(totalPoints) && totalPoints > 0 && CATEGORIES.includes(category)) {
        // Exclude 0/100 grades (e.g., SECTIONALS) based on file content observation
        if (score === 0 && totalPoints === 100) return; 
        
        const percentage = (score / totalPoints) * 100;
        const scoreString = percentage.toFixed(2);
        
        if (category === 'Major') {
            currentClass.majors.push(scoreString);
        } else if (category === 'Minor') {
            currentClass.minors.push(scoreString);
        } else if (category === 'Other') {
            currentClass.others.push(scoreString);
        }
    }
}


// ⭐️ Component name changed to TxtGradeImporter ⭐️
function TxtGradeImporter({ onGradesExtracted }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // NEW: State to control visibility of the help text
    const [showHelp, setShowHelp] = useState(false); 

    // NEW: Function to toggle the help text visibility
    const toggleHelp = () => setShowHelp(!showHelp);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        
        // Enforce TXT file type check
        if (file && (file.type === 'text/plain' || file.name.endsWith('.txt'))) {
            extractTextFile(file);
        } else if (file) {
            setError("Please upload a plain text file (.txt) only.");
        }
    };

    const extractTextFile = (file) => {
        setLoading(true);
        setError(null);
        const reader = new FileReader();

        reader.onload = async (e) => {
            try {
                const fullText = e.target.result;
                // We now call the dedicated TXT parser
                const classesData = parseTextToClasses(fullText);
                
                // Pass the single class data to the calculator's handler
                onGradesExtracted(classesData); 

            } catch (err) {
                console.error("Text file processing error:", err);
                setError(err.message || "Failed to process the text file. Please ensure it is correctly formatted.");
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = () => {
            setError("Error reading file.");
            setLoading(false);
        };

        reader.readAsText(file);
    };

    /**
     * Parses the content for a SINGLE class using the known tab-delimited structure.
     */
    const parseTextToClasses = (text) => {
        
        // Normalize newlines and split into lines
        const normalizedText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        const lines = normalizedText.split('\n').filter(line => line.trim().length > 0);
        
        if (lines.length < 3) {
            throw new Error("Text file is too short to contain a class name, header, and grades.");
        }

        // 1. Extract the Class Name (from the very first line)
        const classHeaderLine = lines[0].trim();
        // Regex to extract the class name portion (e.g., 0142A - 21 ENG 2 KAP A)
        const nameMatch = classHeaderLine.match(/(\d{4}[A-Z]? - \d{1,3}[A-Z]? [A-Z0-9\s/]+[A-Z]A?)/);
        
        if (!nameMatch) {
            throw new Error("Could not find a valid class name in the first line.");
        }
        
        // Use the matched class name, trimming any trailing 'A' or 'Classwork Average X'
        const className = nameMatch[1].replace(/AClasswork Average \d+/,'').trim();

        let currentClass = { name: className, majors: [], minors: [], others: [] };

        // 2. Process remaining lines for grades
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            
            // Ignore the header line (Date Due, Date Assigned, etc.)
            if (line.includes('Date Due\tDate Assigned\tAssignment')) continue;
            
            // Split the line strictly by the tab delimiter
            const fields = line.split('\t').map(f => f.trim());

            // We require 6 fields for the Grade Category, Score, and Total Points
            if (fields.length >= 6) {
                // Fields are 0-indexed: 
                // [3]: Category, [4]: Score, [5]: Total Points
                const category = fields[3]; 
                const scoreStr = fields[4]; 
                const totalPointsStr = fields[5]; 
                
                processGrade(currentClass, category, scoreStr, totalPointsStr);
            }
        }

        // Final check
        if (currentClass.majors.length === 0 && currentClass.minors.length === 0 && currentClass.others.length === 0) {
             throw new Error("Parsing failed: Found the class name but extracted no valid grades.");
        }

        // Return the single class inside an array (to match the expectation of the calculator's handler)
        return [currentClass];
    };


    return (
        <div className="p-2 bg-white rounded-lg shadow-md border border-blue-400">
            {/* Header with Title and Toggle Button */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-blue-600">Import Grades</h2>
                <button
                    onClick={toggleHelp}
                    className="p-1 text-blue-600 hover:text-blue-800 transition-transform duration-300"
                    aria-expanded={showHelp}
                    aria-controls="import-help"
                >
                    {/* SVG for the down arrow. Rotates 180deg when 'showHelp' is false */}
                    <svg 
                        className={`w-5 h-5 transform ${showHelp ? 'rotate-180' : 'rotate-0'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
            </div>
            
            {/* Collapse/Help Text Section */}
            {/* Uses max-h-0/max-h-60 and overflow-hidden for a smooth vertical transition */}
            <div 
                id="import-help"
                className={`transition-all duration-300 ease-in-out overflow-hidden ${showHelp ? 'max-h-60 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
            >
                <p className="mb-3 text-sm text-gray-700">
                    To import, upload a .txt file for ONE CLASS at a time. For more info, see video tutorial in How to Use.
                </p>
            </div>

            <input
                type="file"
                accept=".txt" 
                onChange={handleFileChange}
                disabled={loading}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {loading && <p className="mt-2 text-blue-500">Processing file... please wait.</p>}
            {error && <p className="mt-2 text-red-500 font-medium">{error}</p>}
        </div>
    );
}

export default TxtGradeImporter;
