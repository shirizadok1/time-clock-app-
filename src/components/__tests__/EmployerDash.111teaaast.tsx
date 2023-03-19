import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployerDash from "../EmployerDash";

describe("EmployerDash component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EmployerDash />);
  });

  it("renders the component without errors", () => {
    const component = screen.getByTestId("employer-dash");
    expect(component).toBeInTheDocument();
  });

  it("renders the monthly report table", () => {
    const table = screen.getByRole("table");
    const th = screen.getAllByRole("columnheader");
    const td = screen.queryAllByRole("cell");
    expect(table).toBeInTheDocument();
    expect(th.length).toBe(3);
    expect(td.length).toBe(0);
  });

  it("renders the add employee form", () => {
    const form = screen.getByTestId("add-employee-form");
    const labels = screen.getAllByTestId("name-employee-form");
    const inputs = screen.getAllByLabelText(/monthly hours/i);
    const button = screen.getByRole("button", { name: /add employee/i });
    expect(form).toBeInTheDocument();
    expect(labels.length).toBe(2);
    expect(inputs.length).toBe(2);
    expect(button).toBeInTheDocument();
  });
  
  describe("when submitting the add employee form", () => {
    const mockEmployee = { name: "John Doe", hours: [160] };
    beforeEach(() => {
      const nameInput = screen.getByLabelText(/employee name/i);
      const hoursInput = screen.getByLabelText(/monthly hours/i);
      const submitButton = screen.getByRole("button", { name: /add employee/i });
      const mockEvent = { preventDefault: jest.fn() };
      fireEvent.change(nameInput, { target: { value: mockEmployee.name } });
      fireEvent.change(hoursInput, { target: { value: mockEmployee.hours[0] } });
      fireEvent.click(submitButton, mockEvent);
    });

    it("should prevent the default form submission behavior", () => {
      const mockEvent = { preventDefault: jest.fn() };
      fireEvent.submit(screen.getByRole("form"), mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it("should add a new employee to the list", () => {
      const updatedEmployees = JSON.parse(localStorage.getItem("employees")!);
      expect(updatedEmployees.length).toBe(1);
      expect(updatedEmployees[0].name).toBe(mockEmployee.name);
      expect(updatedEmployees[0].hours).toEqual(mockEmployee.hours);
    });
  });
});
