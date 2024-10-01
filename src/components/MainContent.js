import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const MainContent = ({ activePatient }) => {
  const [bloodPressureChart, setBloodPressureChart] = useState(null);

  useEffect(() => {
    if (activePatient) {
      displayChart(activePatient);
    }
  }, [activePatient]);

  const displayChart = (patient) => {
    const ctx = document.getElementById("bloodPressureChart").getContext("2d");
    const months = [
      "Oct, 2023",
      "Nov, 2023",
      "Dec, 2023",
      "Jan, 2024",
      "Feb, 2024",
      "Mar, 2024",
    ];

    // Arrays to hold systolic and diastolic values (in the correct chronological order)
    const systolicValues = new Array(months.length).fill(null); // Initialize with null values
    const diastolicValues = new Array(months.length).fill(null); // Initialize with null values

    // Define a mapping from month names to index for the chart labels
    const monthMap = {
      October: 0,
      November: 1,
      December: 2,
      January: 3,
      February: 4,
      March: 5,
    };

    // Sort diagnosis_history by year and month
    patient.diagnosis_history.sort((a, b) => {
      // Compare year first
      if (a.year !== b.year) {
        return a.year - b.year;
      }
      // If years are equal, compare month
      return monthMap[a.month] - monthMap[b.month];
    });

    // For each diagnosis history item, map blood pressure values to the correct month
    patient.diagnosis_history.forEach((diagnosis) => {
      const monthIndex = monthMap[diagnosis.month];

      if (monthIndex !== undefined) {
        systolicValues[monthIndex] = diagnosis.blood_pressure.systolic.value;
        diastolicValues[monthIndex] = diagnosis.blood_pressure.diastolic.value;
      }
    });

    if (bloodPressureChart) {
      bloodPressureChart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Systolic",
            data: systolicValues,
            borderColor: "#E66FD2",
            pointBackgroundColor: "#E66FD2",
            fill: false,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 6,
          },
          {
            label: "Diastolic",
            data: diastolicValues,
            borderColor: "#8C6FE6",
            pointBackgroundColor: "#8C6FE6",
            fill: false,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
            min: 60,
            max: 180,
            ticks: {
              stepSize: 20,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    setBloodPressureChart(newChart);
  };

  return (
    <main className="main-content">
      <div className="top-section">
        <h1 className="title">Diagnosis History</h1>
        <div className="blood-pressure">
          <div className="chart-part">
            <div className="c-p-header">
              <h2>Blood Pressure</h2>
              <div className="period">
                <span>Last 6 months</span>
                <img
                  src="./img/expand_more_FILL0_wght300_GRAD0_opsz24.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="chart" id="chart">
              <canvas
                id="bloodPressureChart"
                className="bloodPressureChart"
              ></canvas>
            </div>
          </div>
          <div className="chart-data-part" id="chart-data-part">
            {activePatient && (
              <div>
                <div className="c-d-block">
                  <div className="c-d-block-header">
                    <div className="circle"></div>
                    <span>Systolic</span>
                  </div>
                  <h2>
                    {
                      activePatient.diagnosis_history.at(-1).blood_pressure
                        .systolic.value
                    }
                  </h2>
                  <div className="c-d-block-footer">
                    <img src="./img/ArrowUp.svg" alt="" />
                    <span>
                      {
                        activePatient.diagnosis_history.at(-1).blood_pressure
                          .systolic.levels
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
                      activePatient.diagnosis_history.at(-1).blood_pressure
                        .diastolic.value
                    }
                  </h2>
                  <div className="c-d-block-footer">
                    <img src="./img/ArrowDown.svg" alt="" />
                    <span>
                      {
                        activePatient.diagnosis_history.at(-1).blood_pressure
                          .diastolic.levels
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="top-section">
          {activePatient && (
            <div className="patient-deep-details">
              <div className="patient-detail">
                <img src="./img/respiratory rate.svg" alt="" />
                <h3>Respiratory Rate</h3>
                <h1>
                  {
                    activePatient.diagnosis_history.at(-1).respiratory_rate
                      .value
                  }{" "}
                  bpm
                </h1>
                <h4>
                  {
                    activePatient.diagnosis_history.at(-1).respiratory_rate
                      .levels
                  }
                </h4>
              </div>
              <div className="patient-detail">
                <img src="./img/temperature.svg" alt="" />
                <h3>Temperature</h3>
                <h1>
                  {activePatient.diagnosis_history.at(-1).temperature.value}°F
                </h1>
                <h4>
                  {activePatient.diagnosis_history.at(-1).temperature.levels}
                </h4>
              </div>
              <div className="patient-detail">
                <img src="./img/HeartBPM.svg" alt="" />
                <h3>Heart Rate</h3>
                <h1>
                  {activePatient.diagnosis_history.at(-1).heart_rate.value} bpm
                </h1>
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
          )}
        </div>
      </div>
      <div className="bottom-section scroll-thin">
        <h1>Diagnostic List</h1>
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Problem/Diagnosis</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activePatient &&
              activePatient.diagnostic_list.map((diag, idx) => (
                <tr key={idx}>
                  <td>{diag.name}</td>
                  <td>{diag.description}</td>
                  <td>{diag.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MainContent;
