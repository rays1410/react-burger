import { BASE_URL } from "./constants";
import axios from "axios";
import { TForgotResetRequest } from "./types";

export const forgotPasswordRequest = (email: string) => {
  return axios.post<TForgotResetRequest>(`${BASE_URL}/password-reset`, {
    email: email,
  });
};

export const resetPasswordRequest = (
  newPassword: string,
  refreshToken: string
) => {
  return axios.post<TForgotResetRequest>(`${BASE_URL}/password-reset/reset`, {
    password: newPassword,
    token: refreshToken,
  });
};
