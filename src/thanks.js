import React from 'react';
import Navbar from './Navbar'; 

function Thanks() {
    return (
        <div className="App flex flex-col min-h-screen justify-start bg-gray-200">
            <Navbar />
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center"> Love you Mom Dad and Nahnna!</h2>
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center"> Thank you Vinh for being my best friend for almost a decade, the 8 figures, and all my other friends who have been with me along the way </h2> 
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center"> Also thanks to Ms. Cho for inspiring me to keep pushing forward</h2>
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center"> Miss you Pei wei</h2>
            <h2 className="text-2xl font-semibold mb-4 mt-10 text-center"> I honestly don't know where I would be without you guys</h2>
        <sm className = "text-center">4/24/25, freshman year</sm>
        </div>
    );
}

export default Thanks;