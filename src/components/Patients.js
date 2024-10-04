import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPatients = async () => {
  const res = await fetch("http://127.0.0.1:8000/patients");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const Patients = ({ setActivePatient }) => {
  const {
    data: patients = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const [activePatientIndex, setActivePatientIndex] = React.useState(null);

  React.useEffect(() => {
    if (patients.length > 0) {
      setActivePatient(patients[0]);
      setActivePatientIndex(0);
    }
  }, [patients, setActivePatient]);

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

  const handlePatientClick = (patient, index) => {
    setActivePatient(patient);
    setActivePatientIndex(index);
  };

  return (
    <aside className="left-aside">
      <div className="aside-header">
        <h1>
          <i className="fas fa-users"></i>Patients
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
    </aside>
  );
};

export default Patients;
