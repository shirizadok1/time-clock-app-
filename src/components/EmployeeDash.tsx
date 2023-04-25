import { useEffect, useState } from "react";
import api from "../api";
import { Report } from "../types";

const EmployeeDash = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<Report[]>([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const monthlyReportFromStorage = localStorage.getItem("monthlyReport");
    if (monthlyReportFromStorage) {
      setMonthlyReport(JSON.parse(monthlyReportFromStorage)); //turns to Javascript object
    } else {
      api.getReport().then((res) => res && setMonthlyReport(res));
    }
  }, []);

  const handleStartEdit = (reportIndex: number, dayIndex: number) => {
    const updatedMonthlyReport = [...monthlyReport];
    updatedMonthlyReport[reportIndex].hours[dayIndex].start =
      new Date().toISOString();
    localStorage.setItem("monthlyReport", JSON.stringify(updatedMonthlyReport));
    setMonthlyReport(updatedMonthlyReport);
  };

  const handleStopEdit = (reportIndex: number, dayIndex: number) => {
    const updatedMonthlyReport = [...monthlyReport];
    updatedMonthlyReport[reportIndex].hours[dayIndex].end =
      new Date().toISOString();
    localStorage.setItem("monthlyReport", JSON.stringify(updatedMonthlyReport));
    setMonthlyReport(updatedMonthlyReport);
  };

  const isStopDisabled = !startTime;

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Employee Dashboard</h1>
      <div className="row">
        {startTime ? (
          <div className="col-12 mb-3">
            <p data-testid="start-time-label">
              Start Time: {startTime.toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="col-12 mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setStartTime(new Date())}
            >
              Start work
            </button>
          </div>
        )}
        {stopTime ? (
          <div className="col-12 mb-3" data-testid="stop-time-label">
            <p>Stop Time: {stopTime.toLocaleString()}</p>
          </div>
        ) : (
          <div className="col-12 mb-3">
            <button
              className="btn btn-primary"
              onClick={() => setStopTime(new Date())}
              disabled={isStopDisabled}
            >
              End work
            </button>
          </div>
        )}

        <div className="col-12 mb-3">
          <button
            className="btn btn-secondary"
            onClick={() => setShowReport(!showReport)}
          >
            View Monthly Report
          </button>
        </div>

        {showReport && (
          <div className="col-12">
            <h2 className="mt-4">Monthly Report</h2>
            <ul className="list-unstyled mt-3">
              {monthlyReport.map((report, reportIndex) => (
                <li key={report.id} className="my-3">
                  <h3>{report.name}</h3>
                  <ul className="list-unstyled mt-3">
                    {report.hours.map((day, dayIndex) => (
                      <li
                        key={
                          day.date instanceof Date
                            ? day.date.getTime()
                            : day.date
                        }
                        className="mb-2"
                      >
                        {/* If the start time or end is missing, a dash ("-") is displayed in its place */}
                        {day.date.toLocaleString()}:{" "}
                        {day.start ? day.start.toLocaleString() : "-"} -{" "}
                        {day.end ? day.end.toLocaleString() : "-"}{" "}
                        {day.start && (
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              handleStartEdit(reportIndex, dayIndex)
                            }
                          >
                            Edit Start
                          </button>
                        )}
                        {day.end && (
                          <button
                            className="btn btn-sm btn-primary mx-2"
                            onClick={() =>
                              handleStopEdit(reportIndex, dayIndex)
                            }
                          >
                            Edit End
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDash;
