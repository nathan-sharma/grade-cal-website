import SemesterCalculator from './SemesterCalculator';
import GradeAverageCalculator from './GradeAverageCalculator';
import GPACalculator from './GPACalculator';
import Navbar from './Navbar';

function App() {


  return (
    <div className="App flex flex-col items-center min-h-screen justify-start bg-gray-200"> 
     <Navbar/>
      <div className="mt-6 p-8 w-30 h-full"> 
        <div className="flex flex-col space-y-8">
          <div>
            <SemesterCalculator />
          </div>
          <div>
          <GradeAverageCalculator />
          </div>
          <div>
          <GPACalculator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;