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
        { value: 'okay', label: 'Okay' },
        { value: 'difficult', label: 'Difficult' },
        { value: 'very_difficult', label: 'Very Difficult' },
    ];
    const [q1Answer, setQ1Answer] = useState('');

    useEffect(() => {
        if (notificationMessage) {
            const timer = setTimeout(() => {
                setNotificationMessage('');
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, [notificationMessage]);

    const handleQ1Change = (e) => {
        setQ1Answer(e.target.value);
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
                body: JSON.stringify({ name, message, q1Answer }),
            });

            if (response.ok) {
                setNotificationMessage('Feedback sent successfully! Thanks!');
                setIsErrorNotification(false);
                setName('');
                setMessage('');
                setQ1Answer('');
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
            <div className="bg-gray-200 flex-grow flex justify-center">
                <div className="flex flex-col items-center justify-start w-full max-w-md">
                    <h2 className="text-2xl font-semibold mb-4 mt-10 text-center">Feedback</h2>

                    <form onSubmit={handleSubmit} className="px-4 md:px-8 w-full">
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
                            <div className="mt-2 space-y-2">
                                {q1Options.map((option) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`q1Answer-${option.value}`}
                                            name="q1Answer"
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

                        <div className="mb-5">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Feedback<span className="text-red-500"> *</span>
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
                            className="mb-10 bg-blue-300  text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            disabled={isLoading}
                        >
                            This page is a work in progress...
                        </button>
                    </form>
                    {isLoading && (
                        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    {notificationMessage && (
                        <div className="fixed md:top-[96px] top-[75px] left-1/2 transform -translate-x-1/2 z-50">
                            <div
                                className={`p-4 rounded-md text-center ${
                                    isErrorNotification ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                                }`}
                            >
                                {notificationMessage}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Feedback;