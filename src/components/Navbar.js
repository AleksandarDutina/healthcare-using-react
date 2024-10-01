import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "../img/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="./img/TestLogo.png" alt="" className="navbar-logo" />
      </div>
      <ul className="navbar-center">
        <li>
          <Link to="" className="navbar-link">
            <img
              src="./img/home_FILL0_wght300_GRAD0_opsz24.png"
              alt="Overview"
            />
            Overview
          </Link>
        </li>
        <li>
          <Link id="fetch-patient-data" className="navbar-link active">
            <img
              src="./img/group_FILL0_wght300_GRAD0_opsz24.png"
              alt="Patients"
            />
            Patients
          </Link>
        </li>
        <li>
          <Link to="" className="navbar-link">
            <img
              src="./img/calendar_today_FILL0_wght300_GRAD0_opsz24.png"
              alt="Schedule"
            />
            Schedule
          </Link>
        </li>
        <li>
          <Link to="" class="navbar-link">
            <img
              src="./img/chat_bubble_FILL0_wght300_GRAD0_opsz24.png"
              alt="Message"
            />
            Message
          </Link>
        </li>
        <li>
          <Link to="" class="navbar-link">
            <img
              src="./img/credit_card_FILL0_wght300_GRAD0_opsz24.png"
              alt="Transactions"
            />
            Transactions
          </Link>
        </li>
      </ul>
      <div className="navbar-right">
        <img className="profile-pic" src={ProfilePic} alt="Dr. Jose Simmons" />
        <div className="profile-info">
          <span className="name">Dr. Jose Simmons</span>
          <span className="job">General Practitioner</span>
        </div>
        <div className="profile-last">
          <img
            src="./img/settings_FILL0_wght300_GRAD0_opsz24.png"
            alt="Settings"
          />
          <img
            src="./img/more_vert_FILL0_wght300_GRAD0_opsz24.png"
            alt="More"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
