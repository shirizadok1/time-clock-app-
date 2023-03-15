import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import EmployeeDash from '../EmployeeDash';

describe('EmployeeDash component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<EmployeeDash />);
  });

  it('should render a start clock button', () => {
    expect(screen.getByText('Start Clock')).toBeInTheDocument();
  });

  it('should start the clock when the start button is clicked', () => {
    const startButton = screen.getByText('Start Clock');
    fireEvent.click(startButton);
    expect(screen.getByText('Start Time:')).toBeInTheDocument();
  });

  it('should disable the stop button when the start button has not been clicked', () => {
    const stopButton = screen.getByText('Stop Clock');
    expect(stopButton).toBeDisabled();
  });

  it('should enable the stop button when the start button has been clicked', () => {
    const startButton = screen.getByText('Start Clock');
    fireEvent.click(startButton);
    const stopButton = screen.getByText('Stop Clock');
    expect(stopButton).toBeEnabled();
  });

  it('should not display the stop time until the stop button is clicked', () => {
    const startButton = screen.getByText('Start Clock');
    fireEvent.click(startButton);
    expect(screen.queryByText('Stop Time:')).not.toBeInTheDocument();
  });

  it('should stop the clock when the stop button is clicked', () => {
    const startButton = screen.getByText('Start Clock');
    fireEvent.click(startButton);
    const stopButton = screen.getByText('Stop Clock');
    fireEvent.click(stopButton);
    expect(screen.getByText('Stop Time:')).toBeInTheDocument();
  });

  it('should render a view monthly report button', () => {
    expect(screen.getByText('View Monthly Report')).toBeInTheDocument();
  });

  it('should not display the monthly report by default', () => {
    expect(screen.queryByText('Monthly Report')).not.toBeInTheDocument();
  });

  it('should display the monthly report when the view monthly report button is clicked', () => {
    const viewReportButton = screen.getByText('View Monthly Report');
    fireEvent.click(viewReportButton);
    expect(screen.getByText('Monthly Report')).toBeInTheDocument();
  });

  it('should allow the user to edit the start time of a day when the Edit Start button is clicked', () => {
    const viewReportButton = screen.getByText('View Monthly Report');
    fireEvent.click(viewReportButton);
    const editStartButton = screen.getAllByText('Edit Start')[0];
    fireEvent.click(editStartButton);
    expect(JSON.parse(localStorage.getItem('monthlyReport')!)[0].hours[0].start).toBeDefined();
  });

  it('should allow the user to edit the stop time of a day when the Edit End button is clicked', () => {
    const viewReportButton = screen.getByText('View Monthly Report');
    fireEvent.click(viewReportButton);
    const editEndButton = screen.getAllByText('Edit End')[0];
    fireEvent.click(editEndButton);
    expect(JSON.parse(localStorage.getItem('monthlyReport')!)[0].hours[0].end).toBeDefined();
  });
});