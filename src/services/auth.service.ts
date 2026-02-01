import { api } from "./api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });
  return res.data.data;
};

export const register = ( email: string, password: string, fullName: string
) => {
  return api.post("/auth/register", {
    email,
    password,
    fullName,
  });
};

export const forgotPassword = (email: string) => {
  return api.post("/auth/forgot-password", { email })
}