import SemesterCalculator from './SemesterCalculator';
import GradeAverageCalculator from './GradeAverageCalculator';
import GPACalculator from './GPACalculator';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {


  return (
    <div className="App flex flex-col items-center min-h-screen justify-start bg-gray-200 m-0"> 
     <Navbar/>
      <div className="mt-6 p-6 w-auto h-full"> 
        <div className="flex flex-col space-y-8">
        <div>
        <GPACalculator />
          </div>
          <div>
          <GradeAverageCalculator />
          </div>
          <div>
          <SemesterCalculator /> 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;