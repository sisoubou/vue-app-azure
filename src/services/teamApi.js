import axios from "axios";

export const teamApi = axios.create({
    baseURL: 'http://localhost:3001/'
})