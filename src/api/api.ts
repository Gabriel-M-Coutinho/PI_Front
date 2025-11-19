import axios from "axios";
import type { UserDTO, ResponseDTO, LeadFilters,LoginDTO } from "../types/types";



const api = axios.create({
  baseURL: "http://localhost:5047",
  headers: {
    "Content-Type": "application/json"
  }
});

export const createUser = (payload:UserDTO) => api.post("/api/User", payload)
export const login = (payload:LoginDTO) => api.post("/api/Auth/login", payload)

// Usando a interface de filtros tipada
export const getLeads = (filters: LeadFilters) => {
  return api.get<ResponseDTO>("/api/Lead", {
    params: filters
  });
};

// Versão mais específica se quiser
export const searchLeads = (filters:any) => {
  return api.get<any>("/api/Lead", {
    params: filters
  });
};