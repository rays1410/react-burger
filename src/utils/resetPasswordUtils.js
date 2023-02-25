import { BASE_URL } from "./constants";
import axios from "axios";

export const forgotPasswordRequest = (email) => {
  return axios.post(`${BASE_URL}/password-reset`, {
    email: email,
  });
};

export const resetPasswordRequest = (newPassword, refreshToken) => {
  return axios.post(`${BASE_URL}/password-reset/reset`, {
    password: newPassword,
    token: refreshToken,
  });
};
