import axios from "axios";
import type { UserDTO, ResponseDTO, LeadFilters } from "../types/types";

const apiUrl = "http://localhost:5047";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

export const createUser = (payload: UserDTO) => api.post("/create", payload);

// Usando a interface de filtros tipada
export const getLeads = (filters: LeadFilters) => {
  return api.get<ResponseDTO>("/api/Lead", { // Note: "/api/lead" baseado no [Route("api/[controller]")]
    params: filters
  });
};

// Versão mais específica se quiser
export const searchLeads = (filters:any) => {
  return api.get<any>("/api/Lead", {
    params: filters
  });
};