import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Feedback() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isErrorNotification, setIsErrorNotification] = useState(false);

    useEffect(() => {
        if (notificationMessage) {
            const timer = setTimeout(() => {
                setNotificationMessage('');
            }, 2000);

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
                body: JSON.stringify({ name, message }), // Removed email
            });

            if (response.ok) {
                setNotificationMessage('Feedback sent successfully!');
                setIsErrorNotification(false);
                setName('');
                setMessage('');
                //removed setEmail('')
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
            <Navbar/>
            <div className="bg-gray-200 flex-grow">
                <div className="flex flex-col items-center justify-start">
                    <h2 className="text-2xl font-semibold mb-4 mt-10 text-center">Feedback</h2>

                    <form onSubmit={handleSubmit} className="px-4 md:px-8 max-w-md mx-auto w-full">
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

                        {/* Removed email input */}

                        <div className="mb-5">
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