import axios from "axios";
import type { UserDTO, ResponseDTO, LeadFilters,LoginDTO, Estabelecimento, UserProfile, FullLead, ChangePasswordDTO } from "../types/types";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:5047",
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
export const establishmentsGraph = () => api.get("/api/Lead/EstablishmentsGraph")
export const ordersGraph = () => api.get("/api/Lead/OrdersGraph")

export const getInfoFields = ()=> api.get("/api/Lead/infoFields")

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

export async function getLeadByCnpj(cnpj: string):Promise<FullLead> {
  try {
    const response = await api.get(`/api/lead/${cnpj}`);
    //console.log(response.data.data);
    return response.data.data;      
  } catch (err: any) {
    throw new Error(err?.response?.data?.message || "Lead não encontrado");
  }
}

export async function getProfile(): Promise<UserProfile> {
  try {
    const response = await api.get<UserProfile>("/api/User/profile/");
    return response.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.response?.data?.message || "Usuário não encontrado");
  }
}

export async function setProfileApi(user:UserDTO){
  try {
    console.log("to aqui");
    await api.put<UserProfile>(`/api/User/`, user);
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.response?.data?.message || "Usuário não alterado");
  }
}

export const changePassword = async (changePasswordDto:ChangePasswordDTO) => api.post<ChangePasswordDTO>(`/api/Auth/changePassword/`, changePasswordDto)
export const deleteProfile = (password:string) => api.delete<UserProfile>(`/api/User/${password}`);

export const createOrder = async (Plan: number) => {
  const response = await api.post("/api/Payments/create-checkout", { Plan });
  return response.data;
};