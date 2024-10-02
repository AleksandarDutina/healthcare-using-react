import React from "react";

export default function PatientDeepDetails({ activePatient }) {
  return (
    <div className="patient-deep-details">
      <div className="patient-detail">
        <img src="./img/respiratory rate.svg" alt="" />
        <h3>Respiratory Rate</h3>
        <h1>
          {activePatient.diagnosis_history.at(-1).respiratory_rate.value} bpm
        </h1>
        <h4>
          {activePatient.diagnosis_history.at(-1).respiratory_rate.levels}
        </h4>
      </div>
      <div className="patient-detail">
        <img src="./img/temperature.svg" alt="" />
        <h3>Temperature</h3>
        <h1>{activePatient.diagnosis_history.at(-1).temperature.value}°F</h1>
        <h4>{activePatient.diagnosis_history.at(-1).temperature.levels}</h4>
      </div>
      <div className="patient-detail">
        <img src="./img/HeartBPM.svg" alt="" />
        <h3>Heart Rate</h3>
        <h1>{activePatient.diagnosis_history.at(-1).heart_rate.value} bpm</h1>
        <div className="arrow-down">
          <span>
            <img className="arrDown" src="./img/ArrowDown.svg" alt="" />
          </span>
          <span className="">
            {activePatient.diagnosis_history.at(-1).heart_rate.levels}
          </span>
        </div>
      </div>
    </div>
  );
}
