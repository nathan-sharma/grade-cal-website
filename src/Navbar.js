import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdEmail, MdLink } from 'react-icons/md';

function Navbar({ setShowHowToUse }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const handleShareClick = () => {
    setIsShareOpen(!isShareOpen);
    setIsOpen(false);
  };

  const closeSharePopup = () => {
    setIsShareOpen(false);
  };

  const handleCopyClick = (event) => {
    event.preventDefault();
    const linkToCopy = 'https://katygradecalc.com';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(linkToCopy)
        .then(() => alert('Link copied to clipboard!'))
        .catch((err) => console.error('Could not copy text: ', err));
    } else {
      const tempInput = document.createElement('textarea');
      tempInput.value = linkToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <nav className="bg-blue-900 p-4 w-full sticky top-0">
      <div className="flex justify-between items-center">
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
          <Link
            to="/how-to-use"
            className="block md:inline-block text-gray-300 hover:text-white py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            How to Use
          </Link>
          <Link
            to="/feedback"
            className="block md:inline-block text-gray-300 hover:text-white py-2 px-4"
            onClick={() => setIsOpen(false)}
          >
            Feedback
          </Link>
          <button
            className="block md:inline-block text-gray-300 hover:text-white py-2 px-4"
            onClick={handleShareClick}
          >
            Share
          </button>
        </div>
      </div>

      {isShareOpen && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded shadow-md z-50 w-1/2 sm:w-auto">
          <p className="mb-4 font-bold text-xl">Share:</p>
          <div className="flex items-center flex-wrap">
            <a href="sms:&body=Check%20out%20Katy%20Grade%20Calc:%20https://katygradecalc.com">
              <img
                src="/imessage.png"
                alt="Imessage logo"
                className="h-8 md:h-10 mr-3 mb-2 mt-3"
                style={{ marginBottom: '-2px' }}
              />
            </a>
            <a
              href="mailto:?subject=Sharing%20Katy%20Grade%20Calc&body=Check%20out%20this%20useful%20grade%20calculator:%20https://katygradecalc.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdEmail className="text-3xl text-gray-400 mr-3 mt-3" />
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.katygradecalc.com"
              className = "mt-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-3xl text-blue-600 mr-3" />
            </a>
            <Link to="https://www.reddit.com/submit?url=https://katygradecalc.com&title=Check%20out%20this%20useful%20grade%20calculator!">
            <img
              src="/reddit-logo.png"
              alt="Reddit Logo"
              className="h-8 mr-3 mt-3"
              style={{ marginBottom: '-2px' }}
            />
          </Link>
            <Link to="https://wa.me/?text=Check%20out%20this%20useful%20grade%20calculator!%20https://katygradecalc.com">
            <img
              src="/whatsapp-logo.png"
              alt="Whatsapp Logo"
              className="h-8 mr-3 mt-3"
              style={{ marginBottom: '-2px' }}
            />
          </Link>
          <button onClick={handleCopyClick} style={{ display: 'flex', alignItems: 'center', background:'none', border:'none', padding:0, cursor:'pointer' }}>
              <MdLink className = "text-3xl mr-3 mt-3" />
            </button>
          </div>
          
          <button
            className="font-bold mt-5 bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
            onClick={closeSharePopup}
          >
            Close
          </button>
        </div>
      )}

      {isShareOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={closeSharePopup}
        ></div>
      )}
    </nav>
  );
}

export default Navbar;