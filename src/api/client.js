import axios from "axios";

const { VITE_API_BASE } = import.meta.env;

const client = axios.create({
  baseURL: VITE_API_BASE,
  timeout: 1000,
  headers: { "Content-Type": "application/json;charset=uft-8" },
});

export { client };
