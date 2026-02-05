import axios from "axios";

export const api = axios.create({
  baseURL: "https://eventtracker-api.onrender.com/api",
  withCredentials: true
});
