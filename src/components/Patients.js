import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Patients = ({ setActivePatient }) => {
  const [patients, setPatients] = useState([]);
  const [activePatientIndex, setActivePatientIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = "coalition";
    const password = "skills-test";
    const auth = btoa(`${username}:${password}`);

    fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPatients(data);

        if (data.length > 0) {
          setActivePatient(data[0]);
          setActivePatientIndex(0);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setLoading(false);
      });
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
              class="patient-more"
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
