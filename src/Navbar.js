import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ setShowHowToUse }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-900 p-4 w-full">
      <div className=" flex justify-between items-center">
      <div className={`flex items-center ${isOpen ? 'hidden' : 'flex'}`}>
          <Link to="/">
            <img
              src="/A-192x192.png"
              alt="KISD Grade Calculator Logo"
              className="h-8 mr-3"
              style={{ marginBottom: '-2px' }}
            />
          </Link>
          <Link to="/" className="text-white font-bold text-xl">
            Katy Grade Calc
          </Link>
        </div>
        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.829-4.828 4.829a1 1 0 0 1-1.414-1.414l4.829-4.828-4.829-4.828a1 1 0 1 1 1.414-1.414l4.828 4.828 4.829-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.828 4.828 4.829z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-4 w-full md:w-auto mt-2 md:mt-0 md:justify-end`}
        >
          <Link
            to="/"
            className="block md:inline-block text-gray-300 hover:text-white py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <button
            className="block md:inline-block text-gray-300 hover:text-white py-2 px-4"
            onClick={() => {
              setShowHowToUse(true);
              setIsOpen(false);
            }}
          >
            How to Use
          </button>
          <Link
            to="/feedback"
            className="block md:inline-block text-gray-300 hover:text-white py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            Feedback
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;