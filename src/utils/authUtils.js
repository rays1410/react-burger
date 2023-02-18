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

// extraReducers(builder) {
//     builder

//       // registration
//       .addCase(registerRequest.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(registerRequest.fulfilled, (state, { payload }) => {
//         state.isAccessTokenValid = true;
//         state.isAuthChecked = true;
//         state.isUserLogged = true;
//         state.loading = false;
//         state.userInfo = payload.user;
//         state.error = null;
//         setCookie("accessToken", payload.accessToken);
//         setCookie("refreshToken", payload.refreshToken);
//       })
//       .addCase(registerRequest.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//       })

//       // login
//       .addCase(loginRequest.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loginRequest.fulfilled, (state, { payload }) => {
//         state.isAccessTokenValid = true;
//         state.isAuthChecked = true;
//         state.isUserLogged = true;
//         state.loading = false;
//         state.userInfo = payload.user;
//         state.error = null;
//         setCookie("accessToken", payload.accessToken);
//         setCookie("refreshToken", payload.refreshToken);
//       })
//       .addCase(loginRequest.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//       })

//       // logout
//       .addCase(logoutRequest.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logoutRequest.fulfilled, (state, { payload }) => {
//         state.isAccessTokenValid = false;
//         state.isAuthChecked = false;
//         state.isUserLogged = false;
//         state.loading = false;
//         state.userInfo = null;
//         state.error = null;
//         console.log("logout suc");
//         deleteCookie("accessToken");
//         deleteCookie("refreshToken");
//       })
//       .addCase(logoutRequest.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//       })

//       // new token
//       .addCase(getNewAccessToken.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getNewAccessToken.fulfilled, (state, { payload }) => {
//         state.isAccessTokenValid = true;
//         state.loading = false;
//         state.error = null;
//         deleteCookie("refreshToken");
//         deleteCookie("accessToken");
//         setCookie("accessToken", payload.accessToken);
//         setCookie("refreshToken", payload.refreshToken);
//       })
//       .addCase(getNewAccessToken.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//       })

//       // check user auth
//       .addCase(checkUserAuth.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(checkUserAuth.fulfilled, (state, { payload }) => {
//         state.userInfo = payload.user;
//         state.isUserLogged = true;
//         state.loading = false;
//         state.isAuthChecked = true;
//         state.isAccessTokenValid = true;
//         state.error = null;
//       })
//       .addCase(checkUserAuth.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//         state.isAuthChecked = true;
//       })

//       // change user data
//       .addCase(changeUserData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(changeUserData.fulfilled, (state, { payload }) => {
//         console.log("norm, novie dannie ", payload.user);
//         state.userInfo = payload.user;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(changeUserData.rejected, (state, { payload }) => {
//         console.log("oshibka ", payload);
//         state.error = payload;
//         state.loading = false;
//       });
//   },
