import axios from "axios";

export const api = axios.create({
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Accept: "*/*",
  },
  baseURL: import.meta.env.VITE_DB_URL_LOCAL + "Video",
});
