import axios from "axios";

export const http = axios.create({
  baseURL: "/", // same origin (backend serves frontend)
  timeout: 30_000,
});
