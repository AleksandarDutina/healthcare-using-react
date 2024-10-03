import React from "react";
import downLoadPic from "../img/download_FILL0_wght300_GRAD0_opsz24 (1).png";

export default function BottomAside({ activePatient }) {
  return (
    <div className="bottom-aside">
      <h1>
        <i class="fas fa-flask"></i>Lab Results
      </h1>
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
  );
}
