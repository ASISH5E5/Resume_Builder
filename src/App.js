import './Components/Home.js'
import './App.css'
import Home from './Components/Home.js';
import ResumeBuilder from './Components/Resumebuilder.js';
import Display from './Components/Display.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/form' element={<ResumeBuilder/>}/>
        <Route path="/home/:email" element={<Display />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
