import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Feedback() {
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeo-uGaaej2lGDUPbTjOz_oHbBA7hnTv2GqnDlVmRoCzdkXXw/viewform?usp=dialog";

    return (
        // Main container for the feedback page, ensuring it takes at least the full screen height
        <div className="flex flex-col min-h-screen bg-gray-200 font-sans">
            <Navbar />
            {/* Header section with the title */}
          

            {/* Content area for the Google Form, centered horizontally and vertically */}
            <div className="flex-grow flex justify-center items-center p-4 sm:p-6 md:p-8">
                {/* Responsive container for the iframe with a rounded border and shadow */}
                <div className="w-full max-w-4xl h-[700px] sm:h-[800px] md:h-[900px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
                    {/* The Google Form embedded in an iframe */}
                    <iframe
                        src={googleFormUrl}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        className="rounded-lg" // Apply rounded corners to the iframe itself
                        title="Feedback Form"
                    >
                        Loading...
                    </iframe>
                </div>
            </div>

    <Footer/>
        </div>
    );
}

export default Feedback;
