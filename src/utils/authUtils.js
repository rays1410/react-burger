import { BASE_URL } from "./constants";
import axios from "axios";

export const userRegisterRequest = (name, email, password) => {
  return axios.post(`${BASE_URL}/auth/register`, {
    name: name,
    email: email,
    password: password,
  });
};

export const userLoginRequest = (email, password) => {
  return axios.post(`${BASE_URL}/auth/login`, {
    email: email,
    password: password,
  });
};

export const userLogoutRequest = (refreshToken) => {
  return axios.post(`${BASE_URL}/auth/logout`, {
    token: refreshToken,
  });
};

export const changeUserDataRequest = (accessToken, email, name, password) => {
  return axios.patch(
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

export const accessTokenRequest = (refreshToken) => {
  return axios.post(`${BASE_URL}/auth/token`, {
    token: refreshToken,
  });
};

export const checkAuthRequest = (accessToken) => {
  return axios.get(`${BASE_URL}/auth/user`, {
    headers: {
      "Content-type": "application/json",
      Authorization: accessToken,
    },
  });
};
