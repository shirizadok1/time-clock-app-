import { Route, Routes } from "react-router-dom";
import EmployerDash from "../components/EmployerDash";
import EmployeeDash from "../components/EmployeeDash";
import Home from "../components/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employer-dash" element={<EmployerDash />} />
      <Route path="/employee-dash" element={<EmployeeDash />} />
    </Routes>
  );
};

export default AppRoutes;
