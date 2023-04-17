import React from "react";
import { render, fireEvent, screen, getByTestId } from "@testing-library/react";

jest.mock("../../api", () => ({
  getReport: () => Promise.resolve([]),
}));
// eslint-disable-next-line import/first
import { api } from "../../api";
// eslint-disable-next-line import/first
import EmployeeDash from "../EmployeeDash";

(api as any).getReport.mockImplementation(() => Promise.resolve([]));

describe("EmployeeDash component", () => {
  let startButton: HTMLElement;
  let stopButton: HTMLElement;
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EmployeeDash />);
    startButton = screen.getByText("Start work");
    stopButton = screen.getByText("End work");
  });

  it("should render a start clock button", () => {
    expect(screen.getByText("Start Clock")).toBeInTheDocument();
  });
  it("should disable the stop button", () => {
    expect(stopButton).toBeDisabled();
  });
  describe.only("when the start button is clicked", () => {
    beforeEach(() => {
      fireEvent.click(startButton);
    });
    it("should start the clock", () => {
      expect(screen.getByTestId("start-time-label")).toBeInTheDocument();
    });
    it("should enable stop button", () => {
      expect(stopButton).toBeEnabled();
    });
    it("should not show stop time", () => {
      expect(screen.queryByText("Stop Time:")).not.toBeInTheDocument();
    });
    describe("and then stop button is clicked", () => {
      beforeEach(() => {
        fireEvent.click(stopButton);
      });
      it("should display stop time", () => {
        const stopTime = screen.getByTestId("stop-time-label");
        expect(stopTime).not.toBeNull();
      });
    });
  });

  it("should not display the stop time until the stop button is clicked", () => {
    const startButton = screen.getByText("Start Clock");
    fireEvent.click(startButton);
    expect(screen.queryByText("Stop Time:")).not.toBeInTheDocument();
  });

  it("should stop the clock when the stop button is clicked", () => {
    const startButton = screen.getByText("Start Clock");
    fireEvent.click(startButton);
    const stopButton = screen.getByText("Stop Clock");
    fireEvent.click(stopButton);
    expect(screen.getByText("Stop Time:")).toBeInTheDocument();
  });

  it("should render a view monthly report button", () => {
    expect(screen.getByText("View Monthly Report")).toBeInTheDocument();
  });

  it("should not display the monthly report by default", () => {
    expect(screen.queryByText("Monthly Report")).not.toBeInTheDocument();
  });

  it("should display the monthly report when the view monthly report button is clicked", () => {
    const viewReportButton = screen.getByText("View Monthly Report");
    fireEvent.click(viewReportButton);
    expect(screen.getByText("Monthly Report")).toBeInTheDocument();
  });

  it("should allow the user to edit the start time of a day when the Edit Start button is clicked", () => {
    const viewReportButton = screen.getByText("View Monthly Report");
    fireEvent.click(viewReportButton);
    const editStartButton = screen.getAllByText("Edit Start")[0];
    fireEvent.click(editStartButton);
    expect(
      JSON.parse(localStorage.getItem("monthlyReport")!)[0].hours[0].start
    ).toBeDefined();
  });

  it("should allow the user to edit the stop time of a day when the Edit End button is clicked", () => {
    const viewReportButton = screen.getByText("View Monthly Report");
    fireEvent.click(viewReportButton);
    const editEndButton = screen.getAllByText("Edit End")[0];
    fireEvent.click(editEndButton);
    expect(
      JSON.parse(localStorage.getItem("monthlyReport")!)[0].hours[0].end
    ).toBeDefined();
  });
});
