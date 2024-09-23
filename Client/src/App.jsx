import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Classes from './pages/Classes';
import Tasks from './pages/Tasks';
import Tests from './pages/Tests';
import Scores from './pages/Scores';
import NavBar from './components/NavBar';  // Add NavBar import
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <NavBar />  {/* Add NavBar here */}
        <Routes>
          <Route path="/classes" element={<Classes />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/scores" element={<Scores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
