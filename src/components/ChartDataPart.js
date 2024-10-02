import React from "react";

export default function ChartDataPart({ activePatient }) {
  return (
    <div>
      <div className="c-d-block">
        <div className="c-d-block-header">
          <div className="circle"></div>
          <span>Systolic</span>
        </div>
        <h2>
          {activePatient.diagnosis_history.at(-1).blood_pressure.systolic.value}
        </h2>
        <div className="c-d-block-footer">
          <img src="./img/ArrowUp.svg" alt="" />
          <span>
            {
              activePatient.diagnosis_history.at(-1).blood_pressure.systolic
                .levels
            }
          </span>
        </div>
      </div>
      <div className="c-d-block">
        <div className="c-d-block-header">
          <div className="circle"></div>
          <span>Diastolic</span>
        </div>
        <h2>
          {
            activePatient.diagnosis_history.at(-1).blood_pressure.diastolic
              .value
          }
        </h2>
        <div className="c-d-block-footer">
          <img src="./img/ArrowDown.svg" alt="" />
          <span>
            {
              activePatient.diagnosis_history.at(-1).blood_pressure.diastolic
                .levels
            }
          </span>
        </div>
      </div>
    </div>
  );
}
