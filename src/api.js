import axios from "axios";

const API = axios.create({
  baseURL: "https://jmbackend-production.up.railway.app",
});

export default API;