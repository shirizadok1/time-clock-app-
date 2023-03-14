import EmployeeDash from "./components/EmployeeDash";
import EmployerDash from "./components/EmployerDash";
import React from "react";
import { useState } from "react";

const App = () => {
  const [sectionName, setSectionName] = useState<string>();

  return (
      <div className="container">
        <h1>Report Application</h1>
        <h2 className="text-muted">Click to show the relevant dashboard</h2>

        <div>
          <button className='btn btn-outline-primary'
                  onClick={() => setSectionName('EmployerDash')}>Show EmployerDash Section
          </button>
          <button className='btn btn-outline-secondary'
                  onClick={() => setSectionName('EmployeeDash')}>Show Employee
            Section
          </button>
        </div>
        <hr/>
        {sectionName === 'EmployerDash' && <EmployerDash/>}
        {sectionName === 'EmployeeDash' && <EmployeeDash/>}
      </div>
  )
};

export default App;