import React from "react";
import { useQuery } from "@tanstack/react-query";

// Fetch only the necessary data (patient list)
const fetchPatients = async () => {
  const res = await fetch("http://127.0.0.1:8000/patients");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json(); // List of patients with basic info (name, profile picture, etc.)
};

// Fetch detailed data of the selected patient on demand
const fetchPatientDetails = async (patientId) => {
  const res = await fetch(`http://127.0.0.1:8000/patient/${patientId}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json(); // Detailed patient data (medical records, etc.)
};

const Patients = ({ setActivePatient }) => {
  // Fetch the list of patients when the component loads
  const {
    data: patients = [], // Default to an empty array if no patients are loaded yet
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const [activePatientIndex, setActivePatientIndex] = React.useState(null);
  const [selectedPatientDetails, setSelectedPatientDetails] =
    React.useState(null);

  // Set the first patient as active when the data is available
  React.useEffect(() => {
    if (patients.length > 0) {
      setActivePatient(patients[0]); // Set the first patient as active initially
      setActivePatientIndex(0);
    }
  }, [patients, setActivePatient]);

  // Function to handle patient click, fetch additional data on demand
  const handlePatientClick = async (patient, index) => {
    setActivePatient(patient);
    setActivePatientIndex(index);

    // Ensure patient.id is defined before making the API call
    if (!patient.id) {
      console.error("Patient ID is undefined. Cannot fetch details.");
      return;
    }

    try {
      const detailedData = await fetchPatientDetails(patient.id); // Fetch details only when clicked
      setSelectedPatientDetails(detailedData);
    } catch (err) {
      console.error("Failed to fetch patient details:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading patients: {error.message}</div>;
  }

  return (
    <aside className="left-aside">
      <div className="aside-header">
        <h1>
          <i className="fas fa-users"></i> Patients
        </h1>
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

      {/* Render selected patient details if available */}
      {selectedPatientDetails && (
        <div className="patient-details-container">
          <h2>{selectedPatientDetails.name}'s Details</h2>
          <p>Age: {selectedPatientDetails.age}</p>
          <p>Gender: {selectedPatientDetails.gender}</p>
        </div>
      )}
    </aside>
  );
};

export default Patients;
