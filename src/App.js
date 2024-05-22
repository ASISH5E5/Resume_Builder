import './Components/Home.js'
import './App.css'
import Home from './Components/Home.js';
// import ResumeBuilder from './Components/Resumebuilder.js';
import Display from './Components/Display.js';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Profile from './Components/profile.js';
import MR1 from './Modern_Resume1.js';
import LoginForm from './Signup.js'
import PR1 from './Components/PR1.js';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home email="user@example.com" />} />

        {/* <Route path="/form" element={<ResumeBuilder />} /> */}
        <Route path="/home/:email" element={<Display />} />
        <Route path="/prof/:email" element={<PR1 />} />

        <Route path="/profile/:email" element={<Profile />} />
        <Route path="/mr1" element={<MR1 />} />
        <Route path="/signup" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
