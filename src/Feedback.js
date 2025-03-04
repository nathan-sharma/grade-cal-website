import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Feedback() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isErrorNotification, setIsErrorNotification] = useState(false);
    const q1Options = [
        { value: 'very_easy', label: 'Very Easy' },
        { value: 'easy', label: 'Easy' },
        { value: 'neutral', label: 'Neutral' },
        { value: 'difficult', label: 'Difficult' },
        { value: 'very_difficult', label: 'Very Difficult' },
    ];
    const [q2Answer, setQ2Answer] = useState('');
    const [q1Answer, setQ1Answer] = useState('');
    const [showImproveInput, setShowImproveInput] = useState(false);

    useEffect(() => {
        if (notificationMessage) {
            const timer = setTimeout(() => {
                setNotificationMessage('');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [notificationMessage]);

    const handleQ1Change = (e) => {
        const selectedValue = e.target.value;
        setQ1Answer(selectedValue);
        setShowImproveInput(['neutral', 'difficult', 'very_difficult'].includes(selectedValue));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('https://gradecalwebsite.onrender.com/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, message, q1Answer, q2Answer }), // Include answers
            });

            if (response.ok) {
                setNotificationMessage('Feedback sent successfully! Thanks!');
                setIsErrorNotification(false);
                setName('');
                setMessage('');
                setQ1Answer('');
                setQ2Answer('');
            } else {
                const errorData = await response.json();
                setNotificationMessage(errorData.error || 'Failed to send feedback.');
                setIsErrorNotification(true);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setNotificationMessage('An unexpected error occurred.');
            setIsErrorNotification(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="App flex flex-col min-h-screen justify-start">
            <Navbar />
            <div className="bg-gray-200 flex-grow">
                <div className="flex flex-col items-center justify-start">
                    <h2 className="text-2xl font-semibold mb-4 mt-10 text-center">Feedback</h2>

                    <form onSubmit={handleSubmit} className="px-4 md:px-8 max-w-md mx-auto w-full">
                        <div className="mb-5">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
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

                        <div className="mb-5">
    <label htmlFor="q1Answer" className="block text-sm font-medium text-gray-700">
        How easy was it to use the calculators?<span className="text-red-500"> *</span>
    </label>
    <div className="mt-2 space-y-2"> {/* Container for radio buttons */}
        {q1Options.map((option) => (
            <div key={option.value} className="flex items-center">
                <input
                    type="radio"
                    id={`q1Answer-${option.value}`} // Unique ID for each radio button
                    name="q1Answer" // All radio buttons in the group must have the same name
                    value={option.value}
                    checked={q1Answer === option.value}
                    onChange={handleQ1Change}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    required
                />
                <label
                    htmlFor={`q1Answer-${option.value}`}
                    className="ml-3 block text-sm font-medium text-gray-700"
                >
                    {option.label}
                </label>
            </div>
        ))}
    </div>
    </div>

                        {showImproveInput && ( <div className="mb-5">
                            <label htmlFor="q2Answer" className="block text-sm font-medium text-gray-700">
                            What can we do to improve?
                            </label>
                            <textarea
                                id="q2Answer"
                                value={q2Answer}
                                onChange={(e) => setQ2Answer(e.target.value)}
                                rows="2"
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                                placeholder="Your Answer"
                            ></textarea>
                        </div> ) }

                        <div className="mb-5">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            General Feedback<span className="text-red-500"> *</span> 
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                                placeholder="Your Answer"
                                required 
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="mb-10 bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            disabled={isLoading}
                        >
                            Submit Feedback
                        </button>
                    </form>
                    {isLoading && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    {notificationMessage && (
                        <div
                            className={`p-4 mt-4 rounded-md ${
                                isErrorNotification ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                            }`}
                        >
                            {notificationMessage}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Feedback;