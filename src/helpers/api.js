import axios from "axios";
import { getDomain } from "helpers/getDomain";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "authtoken"
)}`;

export const api = axios.create({
  baseURL: getDomain(),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const handleError = (error) => {
  const response = error.response;
  return response.data.message;
};
