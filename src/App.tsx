import EmployeeDash from "./components/EmployeeDash";
import EmployerDash from "./components/EmployerDash";
import React from "react";
import { useState } from "react";

const App = () => {
  const [sectionName, setSectionName] = useState<string>();

  return (
    <div className="container">
      <h1 className="mb-3">Report Application</h1>
      <h2 className="text-muted mb-4">Click to show the relevant dashboard</h2>

      <div className="mb-4">
        <button
          className="btn btn-outline-primary me-3"
          onClick={() => setSectionName("EmployerDash")}
        >
          Show EmployerDash Section
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setSectionName("EmployeeDash")}
        >
          Show Employee Section
        </button>
      </div>
      <hr />
      {sectionName === "EmployerDash" && <EmployerDash />}
      {sectionName === "EmployeeDash" && <EmployeeDash />}
    </div>
  );
};

export default App;
