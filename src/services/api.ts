import axios from "axios";

export const api = axios.create({
  baseURL: "https://dutu-pulmo-be.onrender.com/",
});
