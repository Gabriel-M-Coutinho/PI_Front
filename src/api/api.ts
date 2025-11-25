import axios from "axios";
import type { UserDTO, ResponseDTO, LeadFilters,LoginDTO, Estabelecimento, UserProfile } from "../types/types";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(config => {
  const token = Cookies.get("token"); // pega o token do cookie
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
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

export async function getProfile(): Promise<UserProfile> {
  try {
    const response = await api.get<UserProfile>("/api/User/profile");
    return response.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.response?.data?.message || "Usuário não encontrado");
  }
}