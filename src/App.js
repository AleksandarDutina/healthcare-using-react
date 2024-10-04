import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Patients from "./components/Patients.js";
import MainContent from "./components/MainContent.js";
import RightAside from "./components/RightAside";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  const [activePatient, setActivePatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetching or loading delay
    const timer = setTimeout(() => {
      setLoading(false); // Stop showing the loader after 3 seconds (adjust as needed)
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app-container">
        {loading && (
          <div className="pulse-loader-container">
            <div className="pulse-loader"></div>
          </div>
        )}
        {!loading && (
          <>
            <Navbar />
            <div className="main">
              <QueryClientProvider client={queryClient}>
                <Patients setActivePatient={setActivePatient} />
                <MainContent activePatient={activePatient} />
                <RightAside activePatient={activePatient} />
              </QueryClientProvider>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
