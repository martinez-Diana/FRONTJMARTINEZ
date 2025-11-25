import axios from "axios";

const API = axios.create({
  baseURL: "https://backjmartinez-production.up.railway.app/",
});

export default API;