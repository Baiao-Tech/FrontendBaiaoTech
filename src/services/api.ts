import axios from "axios";

export const api = axios.create({
    baseURL: "http://147.79.104.80:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
})