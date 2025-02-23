import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Feedback() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, message });
    // In a real app, you'd send this data to a server
    // and handle success/error states.
    alert("Thanks for the feedback"); //temporary alert.
  };

  return (
    <div className="text-center p-4">
        <img
        src="/meme.jpg"
        alt="Katy ISD Grade Calculator Logo"
        className="h-50 w-50 mx-auto my-auto mt-6"
        style={{ marginBottom: '-2px' }}
      />
      <p className = "text-red-600 text-bold text-underline text-xl mt-5">⚠️ This page is a work in progress</p>
      <button
        className="bg-blue-600 hover:bg-blue-900 text-white font-bold px-4 py-1 rounded mt-4"
        onClick={handleGoHome}
      >
        BACK TO HOME PAGE
      </button>
      <h2 className="text-2xl font-semibold mb-4 mt-10">Feedback</h2>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Your Name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email (Optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Your Email"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Feedback
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
            placeholder="Your Feedback"
            required //make feedback required.
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-100 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;