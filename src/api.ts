import axios from "axios";
import { Employee, Report } from "./types";

const api = {
  getInitalData: async () => {
    const response = await axios.get<{ data: Employee[] }>("api/data.json");
    return response.data.data;
  },

  saveEmployees: (employees: Employee[]) => {
    localStorage.setItem("employees", JSON.stringify(employees));
  },

  getReport: async () => {
    return await axios
      .get<Report[]>("/api/data.json")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  },
};

export default api;

