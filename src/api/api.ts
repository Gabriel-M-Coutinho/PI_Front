
import axios from "axios";
import type { UserDTO } from "../types/types";

const apiUrl = import.meta.env.BACKEND_URL;

const api = axios.create({
    baseURL:apiUrl,
    headers:{
        "Content-Type":"application/json"
    }
});

export const createUser = (payload:UserDTO) => api.post("/create",payload)