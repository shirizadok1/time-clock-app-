import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Report {
  id: number;
  name: string;
  hours: Array<{
    date: Date;
    start?: Date;
    end?: Date;
  }>;
}

const EmployeeDash = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [stopTime, setStopTime] = useState<Date | null>(null);
  const [monthlyReport, setMonthlyReport] = useState<Report[]>([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const monthlyReportFromStorage = localStorage.getItem('monthlyReport');
    if (monthlyReportFromStorage) {
      setMonthlyReport(JSON.parse(monthlyReportFromStorage));
    } else {
      axios
        .get<Report[]>('/api/data.json')
        .then((res) => setMonthlyReport(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  const handleStartEdit = (reportIndex: number, dayIndex: number) => {
    const updatedMonthlyReport = [...monthlyReport];
    updatedMonthlyReport[reportIndex].hours[dayIndex].start = new Date();
    localStorage.setItem('monthlyReport', JSON.stringify(updatedMonthlyReport));
    setMonthlyReport(updatedMonthlyReport);
  };

  const handleStopEdit = (reportIndex: number, dayIndex: number) => {
    const updatedMonthlyReport = [...monthlyReport];
    updatedMonthlyReport[reportIndex].hours[dayIndex].end = new Date();
    localStorage.setItem('monthlyReport', JSON.stringify(updatedMonthlyReport));
    setMonthlyReport(updatedMonthlyReport);
  };

  const isStopDisabled = !startTime;

  return (
    <div className="employee-dash">
      <h1>Employee Dashboard</h1>
      {startTime ? (
        <div>
          <p>Start Time: {startTime.toLocaleString()}</p>
        </div>
      ) : (
        <button onClick={() => setStartTime(new Date())}>Start Clock</button>
      )}
      {stopTime ? (
        <div>
          <p>Stop Time: {stopTime.toLocaleString()}</p>
        </div>
      ) : (
        <button onClick={() => setStopTime(new Date())} disabled={isStopDisabled}>
          Stop Clock
        </button>
      )}

      <button onClick={() => setShowReport(!showReport)}>View Monthly Report</button>

      {showReport && (
        <div>
          <h2>Monthly Report</h2>
          <ul>
            {monthlyReport.map((report, reportIndex) => (
              <li key={report.id}>
                <h3>{report.name}</h3>
                <ul>
                  {report.hours.map((day, dayIndex) => (
                    <li key={day.date.getTime()}>
                      {day.date.toLocaleString()}:{' '}
                      {day.start ? day.start.toLocaleString() : '-'} -{' '}
                      {day.end ? day.end.toLocaleString() : '-'}{' '}
                      {day.start && (
                        <button onClick={() => handleStartEdit(reportIndex, dayIndex)}>
                          Edit Start
                        </button>
                      )}
                      {day.end && (
                        <button onClick={() => handleStopEdit(reportIndex, dayIndex)}>
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
  );
};

export default EmployeeDash;
