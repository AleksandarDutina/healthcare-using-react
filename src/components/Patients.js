import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Patients = ({ setActivePatient }) => {
  const [patients, setPatients] = useState([]);
  const [activePatientIndex, setActivePatientIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    const fetchPatients = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/patients");
        const data = await res.json();
        setPatients(data);

        if (data.length > 0) {
          setActivePatient(data[0]);
          setActivePatientIndex(0);
        }
      } catch (err) {
        console.warn(err);
      } finally {
        clearTimeout(loadingTimeout);
        setLoading(false);
      }
    };
    fetchPatients();
    return () => clearTimeout(loadingTimeout);
  }, [setActivePatient]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const handlePatientClick = (patient, index) => {
    setActivePatient(patient);
    setActivePatientIndex(index);
  };

  return (
    <aside className="left-aside">
      <div className="aside-header">
        <h1>Patients</h1>
        <Link to="#">
          <img
            className="search-icon"
            src="./img/search_FILL0_wght300_GRAD0_opsz24.png"
            alt="Search"
          />
        </Link>
      </div>
      <div className="patient-container">
        {patients.map((patient, index) => (
          <div
            className={`patient ${
              activePatientIndex === index ? "active" : ""
            }`}
            key={index}
            onClick={() => handlePatientClick(patient, index)}
          >
            <img
              className="patient-photo"
              src={patient.profile_picture}
              alt={patient.name}
            />
            <div className="patient-details">
              <span className="patient-name">{patient.name}</span>
              <span className="patient-info">
                {patient.gender}, {patient.age}
              </span>
            </div>
            <img
              className="patient-more"
              src="./img/more_horiz_FILL0_wght300_GRAD0_opsz24.png"
              alt="More info"
            />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Patients;
