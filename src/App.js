import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Patients from "./components/Patients.js";
import MainContent from "./components/MainContent.js";
import RightAside from "./components/RightAside";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

const App = () => {
  const [activePatient, setActivePatient] = useState(null);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main">
          <Patients setActivePatient={setActivePatient} />
          <MainContent activePatient={activePatient} />
          <RightAside activePatient={activePatient} />
        </div>
      </div>
    </Router>
  );
};

export default App;
