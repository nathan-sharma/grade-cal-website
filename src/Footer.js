import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-500 py-2 border-t border-gray-200 w-full text-center text-xs">
       <p>
        Website by <Link to="/thanks">Nathan Sharma</Link>
      </p>
    </footer>
  );
}

export default Footer;