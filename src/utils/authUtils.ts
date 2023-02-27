import { BASE_URL } from "./constants";
import axios from "axios";
import { getCookie } from "./cookieUtils";
import {
  TAuthRequest,
  TChangeUserDataRequest,
  TGetUserInfo,
  TLogoutRequest,
} from "./types";

export const userRegisterRequest = (
  name: string,
  email: string,
  password: string
) => {
  return axios.post<TAuthRequest>(`${BASE_URL}/auth/register`, {
    name: name,
    email: email,
    password: password,
  });
};

export const userLoginRequest = (email: string, password: string) => {
  return axios.post<TAuthRequest>(`${BASE_URL}/auth/login`, {
    email: email,
    password: password,
  });
};

export const userLogoutRequest = (refreshToken: string) => {
  return axios.post<TLogoutRequest>(`${BASE_URL}/auth/logout`, {
    token: refreshToken,
  });
};

export const changeUserDataRequest = (
  accessToken: string,
  email: string,
  name: string,
  password: string
) => {
  return axios.patch<TChangeUserDataRequest>(
    `${BASE_URL}/auth/user`,
    {
      email,
      name,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken,
      },
    }
  );
};

export const accessTokenRequest = (refreshToken: string) => {
  return axios.post<TAuthRequest>(`${BASE_URL}/auth/token`, {
    token: refreshToken,
  });
};

export const checkAuthRequest = (accessToken: string) => {
  return axios.get<TGetUserInfo>(`${BASE_URL}/auth/user`, {
    headers: {
      "Content-type": "application/json",
      Authorization: accessToken,
    },
  });
};

export const tokenExists = (tokenName: string): boolean => {
  return getCookie(tokenName) ? true : false;
};
