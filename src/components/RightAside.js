import React from "react";
import BottomAside from "./BottomAside";
import TopAside from "./TopAside";

const RightAside = ({ activePatient }) => {
  return (
    <aside className="right-aside">
      {activePatient && <TopAside activePatient={activePatient} />}
      {activePatient && <BottomAside activePatient={activePatient} />}
    </aside>
  );
};

export default RightAside;
