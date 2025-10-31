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
        // ⭐️ REMOVED: The previous condition that excluded 0/100 grades is gone. 
        // All valid scores, including 0, are now processed.
        
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
        
        // --- START OF EDITED LOGIC ---
        const classworkIndex = classHeaderLine.indexOf('Classwork');
        let className;

        if (classworkIndex !== -1) {
            // Take all characters up to "Classwork"
            className = classHeaderLine.substring(0, classworkIndex).trim();
        } else {
            // Fallback if "Classwork" isn't found, though it should be in the expected format.
            throw new Error("Could not find the expected 'Classwork' marker in the first line.");
        }
        
        if (className.length === 0) {
            throw new Error("Extracted class name is empty. Check file format.");
        }
        // --- END OF EDITED LOGIC ---

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
        <div className="p-4 bg-white rounded-lg shadow-md border border-blue-400">
            <p className="mb-3 text-sm text-gray-700">
                To import, upload a .txt file for ONE CLASS at a time. For more info, see video tutorial in How to Use.
            </p>
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
