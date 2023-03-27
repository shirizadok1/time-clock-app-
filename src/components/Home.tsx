import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 text-center">
          <h1 className="mb-4">Hello!</h1>
          <p className="lead mb-5">Please choose an option below:</p>
          <div className="d-grid gap-3">
            <Link to="/employer-dash" className="btn btn-primary">
            I'm an employer
            </Link>
            <Link to="/employee-dash" className="btn btn-secondary">
              I'm an employee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
