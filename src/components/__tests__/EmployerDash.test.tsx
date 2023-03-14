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
    const form = screen.getByRole("form");
    const label = screen.getAllByRole("textbox");
    const input = screen.getAllByRole("textbox");
    const button = screen.getByRole("button", { name: /add employee/i });
    expect(form).toBeInTheDocument();
    expect(label.length).toBe(2);
    expect(input.length).toBe(2);
    expect(button).toBeInTheDocument();
  });

  it("adds a new employee to the list when the form is submitted", () => {
    const nameInput = screen.getByLabelText(/employee name/i);
    const hoursInput = screen.getByLabelText(/monthly hours/i);
    const submitButton = screen.getByRole("button", { name: /add employee/i });
    const mockEvent = { preventDefault: jest.fn() };
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(hoursInput, { target: { value: 160 } });
    fireEvent.click(submitButton, mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    const updatedEmployees = JSON.parse(localStorage.getItem("employees")!);
    expect(updatedEmployees.length).toBe(1);
    expect(updatedEmployees[0].name).toBe("John Doe");
    expect(updatedEmployees[0].hours).toEqual([]);
  });
});