import React from "react";
import downLoadPic from "../img/download_FILL0_wght300_GRAD0_opsz24 (1).png";

const RightAside = ({ activePatient }) => {
  return (
    <aside className="right-aside">
      <div className="top-aside">
        {activePatient ? (
          <>
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
                  <span className="patient-info">
                    {activePatient.phone_number}
                  </span>
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
                  <span className="patient-info">
                    {activePatient.insurance_type}
                  </span>
                </div>
              </div>
            </div>
            <a href="#">
              <h4>Show All Information</h4>
            </a>
          </>
        ) : (
          <p>No patient selected</p>
        )}
      </div>
      <div className="bottom-aside">
        <h1>Lab Results</h1>
        <div className="lab-results scroll-thin">
          {activePatient &&
            activePatient.lab_results.map((result, idx) => (
              <div className="lab-result" key={idx}>
                <h5>{result}</h5>
                <img src={downLoadPic} alt="Download" />
              </div>
            ))}
        </div>
      </div>
    </aside>
  );
};

export default RightAside;
