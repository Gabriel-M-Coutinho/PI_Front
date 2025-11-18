
import axios from "axios";
import type { LoginDTO, UserDTO } from "../types/types";

const apiUrl = "http://localhost:5047/api";

const api = axios.create({
    baseURL:apiUrl,
    headers:{
        "Content-Type":"application/json"
    }
});

export const createUser = (payload:UserDTO) => api.post("/User", payload)
export const login = (payload:LoginDTO) => api.post("/Auth/login", payload)