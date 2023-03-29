import axios from "axios";
import { Employee } from "./types";

const api = {
  getInitalData: async () => {
    const response = await axios.get<{ data: Employee[] }>("api/data.json");
    return response.data.data;
  },

  saveEmployees:(employees:Employee[]) =>{
    localStorage.setItem("employees", JSON.stringify(employees));
  }
};

export default api;
