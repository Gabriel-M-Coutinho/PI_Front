import axios from "axios";
import type { UserDTO, ResponseDTO, LeadFilters,LoginDTO, Estabelecimento } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:5047",
  headers: {
    "Content-Type": "application/json"
  }
});

export const createUser = (payload:UserDTO) => api.post("/api/User", payload)
export const login = (payload:LoginDTO) => api.post("/api/Auth/login", payload)
export const graphLeads = (payload:any) => api.get("/api/Lead/LeadsGraph", payload)


export const getLeads = (filters: LeadFilters) => {
  return api.get<ResponseDTO>("/api/Lead", {
    params: filters
  });
};


export const searchLeads = (filters:any) => {
  return api.get<any>("/api/Lead", {
    params: filters
  });
};

export async function getLeadByCnpj(cnpj: string):Promise<Estabelecimento> {
  try {
    const response = await api.get(`/api/lead/${cnpj}`);
    return response.data.data;      
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Lead não encontrado");
  }
}
