import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Feedback() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isErrorNotification, setIsErrorNotification] = useState(false);
    const [q1Answer, setQ1Answer] = useState(''); // Answer for question 1
    const [q2Answer, setQ2Answer] = useState(''); // Answer for question 2

    useEffect(() => {
        if (notificationMessage) {
            const timer = setTimeout(() => {
                setNotificationMessage('');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [notificationMessage]);

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
                        <div className="mb-4">
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

                        <div className="mb-4">
                            <label htmlFor="q1Answer" className="block text-sm font-medium text-gray-700">
                            <span className="text-red-500">* </span>How easy was it to use the calculators?
                            </label>
                            <textarea
                                id="q1Answer"
                                value={q1Answer}
                                onChange={(e) => setQ1Answer(e.target.value)}
                                rows="3"
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                                placeholder="Your answer"
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="q2Answer" className="block text-sm font-medium text-gray-700">
                            <span className="text-red-500">* </span>Any features you would like to see added? 
                            </label>
                            <textarea
                                id="q2Answer"
                                value={q2Answer}
                                onChange={(e) => setQ2Answer(e.target.value)}
                                rows="3"
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                                placeholder="Your answer"
                                required 
                            ></textarea>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            <span className="text-red-500">* </span>General Feedback
                            </label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows="4"
                                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:outline-none"
                                placeholder="Your answer"
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