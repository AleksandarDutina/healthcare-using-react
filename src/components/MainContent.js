import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import PatientDeepDetails from "./PatientDeepDetails";
import BottomTable from "./BottomTable";
import ChartDataPart from "./ChartDataPart";

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
      <div className="top-section card">
        <h1 className="title">
          <i class="fas fa-file-medical-alt"></i>Diagnosis History
        </h1>
        <div className="blood-pressure">
          <div className="chart-part">
            <div className="c-p-header">
              <h2>
                <i class="fas fa-heartbeat"></i>Blood Pressure
              </h2>
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
            {activePatient && <ChartDataPart activePatient={activePatient} />}
          </div>
        </div>
        <div id="top-section">
          {activePatient && (
            <PatientDeepDetails activePatient={activePatient} />
          )}
        </div>
      </div>
      <div className="bottom-section">
        <h1>
          <i class="fas fa-list"></i>Diagnostic List
        </h1>
        <table className="diagnostic-table">
          <thead>
            <tr>
              <th>Problem/Diagnosis</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
        </table>
        <div className="">
          <table className="diagnostic-table t-2 scroll-thin">
            {activePatient && <BottomTable activePatient={activePatient} />}
          </table>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
