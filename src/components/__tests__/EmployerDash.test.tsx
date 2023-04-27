import { render, screen, fireEvent } from "@testing-library/react";
import EmployerDash from "../EmployerDash";

const mockApi1 = {
  getInitialData: jest.fn(),
  saveEmployees: jest.fn(),
};

jest.mock("../../api", () => ({
  __esModule: true, // this property makes it work
  default: "api",
  namedExport: mockApi1,
}));

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

  describe("when submitting the add employee form", () => {
    const mockEmployee = { name: "John Doe", hours: [160] };
    beforeEach(() => {
      const nameInput = screen.getByTestId("name-employee-input");
      const hoursInput = screen.getByTestId("monthly-hours");
      const submitButton = screen.getByTestId("add-employee");
      const mockEvent = { preventDefault: jest.fn() };
      // The target property is used to specify which input field is being changed by the fireEvent.change function
      fireEvent.change(nameInput, { target: { value: mockEmployee.name } });
      fireEvent.change(hoursInput, {
        target: { value: mockEmployee.hours[0] },
      });
      fireEvent.click(submitButton, mockEvent);
    });

    it("should add a new employee to the list", () => {
      const updatedEmployees = JSON.parse(localStorage.getItem("employees")!);
      expect(updatedEmployees.length).toBe(1);
      expect(updatedEmployees[0].name).toBe(mockEmployee.name);
      expect(updatedEmployees[0].hours).toEqual(mockEmployee.hours);
    });
  });
});
