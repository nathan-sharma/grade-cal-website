import React from 'react';
import { useNavigate } from 'react-router-dom';

function Feedback() {
  const navigate = useNavigate(); 

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div className = "text-center">
      <p>im working on it</p>
      <img
              src="/meme.jpg"
              alt="Katy ISD Grade Calculator Logo"
              className="h-50 w-50 mx-auto my-auto"
              style={{ marginBottom: '-2px' }}
            />
      <button
        className="bg-blue-600 hover:bg-blue-900 text-white font-bold px-4 py-1 rounded mt-4"
        onClick={handleGoHome}
      >
        OK
      </button>
    </div>
  );
}

export default Feedback;