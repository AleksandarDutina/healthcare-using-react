import React from "react";

export default function BottomTable({ activePatient }) {
  return (
    <tbody>
      {activePatient.diagnostic_list.map((diag, idx) => (
        <tr key={idx}>
          <td>{diag.name}</td>
          <td>{diag.description}</td>
          <td>{diag.status}</td>
        </tr>
      ))}
    </tbody>
  );
}
