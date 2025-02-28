import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer'

function Feedback() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showHowToUse, setShowHowToUse] = useState(false);
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
                body: JSON.stringify({ name, email, message }),
            });

            if (response.ok) {
                setNotificationMessage('Feedback sent successfully!');
                setIsErrorNotification(false);
                setName('');
                setEmail('');
                setMessage('');
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
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="App flex flex-col min-h-screen justify-start">
            <Navbar setShowHowToUse={setShowHowToUse} />
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

                    {showHowToUse && (
                        <div
                            className="fixed top-0 left-0 p-8 w-full h-full bg-black bg-opacity-50 z-999 flex justify-center items-center overflow-y-auto"
                            onClick={() => setShowHowToUse(false)}
                        >
                            <div
                                className="bg-white p-8 rounded shadow-md z-1000 relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="font-extrabold">How to use the calculators</h2>
                                <p className="mt-4 text-sm">Semester Calculator: Input your six weeks averages for any class into the SW fields. </p>
                                <p className="mt-3 text-sm">GPA Calculator: Enter your grades in the following format: Letter grade(Number of semesters), separated by commas. For each letter grade, enter the number of semesters you earned that grade. For example, if I earned an A for 2 semesters, a B for 3 semesters, a C for 3 semesters, and a D for 0 semesters in all the 5.0 courses I have taken so far, I would enter A(2), B(3), C(3) in the KAP/AP placeholder. If you took high school credit courses in middle school, include those grades and semesters in your calculation.</p>
                                <p className="mt-3 text-sm">Class Average Calculator: Input your grades separated by commas or their averages into each category. You can also use this as a what if calculator to see what you need to get the average you're aiming for. </p>
                                <button
                                    className="bg-blue-600 hover:bg-blue-900 text-white font-bold px-4 py-1 rounded mt-4"
                                    onClick={() => setShowHowToUse(false)}
                                >
                                    OK
                                </button>
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