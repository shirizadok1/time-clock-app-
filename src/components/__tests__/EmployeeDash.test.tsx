import { render, fireEvent, screen } from "@testing-library/react";
import { Report } from "../../types";

jest.mock("../../api", () => ({
  getReport: () =>
    Promise.resolve<Report[]>([
      {
        hours: [{ date: new Date(), start: "09:00", end: "17:00" }],
        id: 1,
        name: "stuff",
      },
    ]),
}));
// eslint-disable-next-line import/first
import EmployeeDash from "../EmployeeDash";

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
    expect(startButton).toBeInTheDocument();
  });
  it("should disable the stop button", () => {
    expect(stopButton).toBeDisabled();
  });
  describe("when the start button is clicked", () => {
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
    fireEvent.click(startButton);
    expect(screen.queryByText("Stop Time:")).not.toBeInTheDocument();
  });

  it("should stop the clock when the stop button is clicked", () => {
    fireEvent.click(startButton);
    fireEvent.click(stopButton);
    expect(screen.getByTestId("stop-time-label")).toBeInTheDocument();
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
    const editStartButton = screen.getByText("Edit Start");
    fireEvent.click(editStartButton);
    expect(
      JSON.parse(localStorage.getItem("monthlyReport")!)[0].hours[0].start
    ).toBeDefined();
  });

  it("should allow the user to edit the stop time of a day when the Edit End button is clicked", () => {
    const viewReportButton = screen.getByText("View Monthly Report");
    fireEvent.click(viewReportButton);
    const editEndButton = screen.getByText("Edit End");
    fireEvent.click(editEndButton);
    expect(
      JSON.parse(localStorage.getItem("monthlyReport")!)[0].hours[0].end
    ).toBeDefined();
  });
});
