import React from "react";

export default function TopAside({ activePatient }) {
  return (
    <div className="top-aside">
      <img
        className="big"
        src={activePatient.profile_picture}
        alt={activePatient.name}
      />
      <h1>{activePatient.name}</h1>
      <div className="patient-dd">
        <div className="patient">
          <img
            className="patient-photo"
            src="./img/BirthIcon.png"
            alt="Birth Icon"
          />
          <div className="patient-details">
            <span className="patient-name">Date Of Birth</span>
            <span className="patient-info">
              {new Date(activePatient.date_of_birth).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="patient">
          <img
            className="patient-photo"
            src="./img/FemaleIcon.png"
            alt="Gender Icon"
          />
          <div className="patient-details">
            <span className="patient-name">Gender</span>
            <span className="patient-info">{activePatient.gender}</span>
          </div>
        </div>
        <div className="patient">
          <img
            className="patient-photo"
            src="./img/PhoneIcon.png"
            alt="Phone Icon"
          />
          <div className="patient-details">
            <span className="patient-name">Contact Info.</span>
            <span className="patient-info">{activePatient.phone_number}</span>
          </div>
        </div>
        <div className="patient">
          <img
            className="patient-photo"
            src="./img/PhoneIcon.png"
            alt="Emergency Contact Icon"
          />
          <div className="patient-details">
            <span className="patient-name">Emergency Contacts</span>
            <span className="patient-info">
              {activePatient.emergency_contact}
            </span>
          </div>
        </div>
        <div className="patient">
          <img
            className="patient-photo"
            src="./img/InsuranceIcon.png"
            alt="Insurance Icon"
          />
          <div className="patient-details">
            <span className="patient-name">Insurance Provider</span>
            <span className="patient-info">{activePatient.insurance_type}</span>
          </div>
        </div>
      </div>
      <a href="#">
        <h4>Show All Information</h4>
      </a>
    </div>
  );
}
