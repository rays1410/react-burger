import { BASE_URL } from "./constants";
import axios from "axios";
import { TRequestAnswer } from "./types";

export const forgotPasswordRequest = (email: string) => {
  return axios.post<TRequestAnswer>(`${BASE_URL}/password-reset`, {
    email: email,
  });
};

export const resetPasswordRequest = (
  newPassword: string,
  refreshToken: string
) => {
  return axios.post<TRequestAnswer>(`${BASE_URL}/password-reset/reset`, {
    password: newPassword,
    token: refreshToken,
  });
};
