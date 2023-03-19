import React, { useState, useEffect } from "react";
import axios from "axios";

interface Employee {
  id: string;
  name: string;
  hours: { date: string; start: string; end: string }[];
}

const EmployerDash = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    monthlyHours: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/data.json");
        console.log(response.data);
        setEmployees(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleNewEmployeeSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newEmployee = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: "New Employee",
      hours: [],
    };

    const updatedEmployees = [...employees, newEmployee];

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    console.log(updatedEmployees);
  };

  return (
    <div data-testid="employer-dash" className="my-4">
      <h2 className="mb-4">Monthly Report for Each Employee</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th data-testid="">Name</th>
            <th>Monthly Hours</th>
            <th>Total Monthly Hours</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const totalHours = employee.hours.reduce((acc, day) => {
              const hoursWorked = parseFloat(day.end) - parseFloat(day.start);
              return acc + hoursWorked;
            }, 0);

            return (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>
                  {employee.hours.map((day) => (
                    <div>
                      {day.date}: {day.start} - {day.end}
                    </div>
                  ))}
                </td>
                <td>{totalHours}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 className="mt-4 mb-2">Add New Employee</h2>
      <form data-testid="add-employee-form"onSubmit={handleNewEmployeeSubmit} className="row g-3">
        <div className="col-md-4">
          <label  data-testid="name-employee-form"htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={newEmployee.name}
            onChange={(event) =>
              setNewEmployee({ ...newEmployee, name: event.target.value })
            }
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="monthlyHours" className="form-label">
            Monthly Hours:
          </label>
          <input
            type="number"
            id="monthlyHours"
            className="form-control"
            value={newEmployee.monthlyHours}
            onChange={(event) =>
              setNewEmployee({
                ...newEmployee,
                monthlyHours: Number(event.target.value),
              })
            }
          />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <button type="submit" className="btn btn-primary">
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployerDash;
