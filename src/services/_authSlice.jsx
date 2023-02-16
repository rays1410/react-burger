// import {
//   createSlice,
//   createAsyncThunk,
//   PayloadAction,
//   nanoid,
// } from "@reduxjs/toolkit";
// import { BASE_URL, ERR_UNKNOWN } from "../utils/constants";
// import { registerUser } from "../utils/utils";
// import axios from "axios";
// import { ERR_USER_ALREADY_EXIST } from "../utils/constants";
// import { getCookie, setCookie } from "../utils/cookieUtils";

// const initialState = {
//   isAuthChecked: false,
//   authRequestStatus: "idle",
//   isRefreshToken: false,
//   isAccessTokenNeeded: false,
//   isRefreshTokenNeeded: false,

//   loading: false,
//   userInfo: null,
//   userAccessToken: null,
//   userRefreshToken: null,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setRequestStatus: (state, action) => {
//       state.authRequestStatus = action.payload;
//     },
//     setAuthChecked: (state, action) => {
//       state.isAuthChecked = action.payload;
//     },
//     clearUserData(state) {
//       Object.assign(state, initialState);
//     },
//     checkAuth: (state, action) => {
//       const refreshToken = getCookie("refreshToken");

//       if (!userAccessToken) {
//         state.isAccessTokenNeeded = true;
//       }
//     },
//   },
//   extraReducers(builder) {
//     builder
//       // registration
//       .addCase(registerRequest.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(registerRequest.fulfilled, (state, { payload }) => {
//         state.userAccessToken = payload.accessToken;
//         state.userInfo = payload.user;
//         state.loading = false;
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
//         state.userAccessToken = payload.accessToken;
//         state.userInfo = payload.user;
//         state.loading = false;
//         state.isAuthChecked = true;
//         setCookie("refreshToken", payload.refreshToken);
//       })
//       .addCase(loginRequest.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//       })

//       // get user data
//       .addCase(getUserData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getUserData.fulfilled, (state, { payload }) => {
//         state.userInfo = payload.user;
//         state.loading = false;
//       })
//       .addCase(getUserData.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//       })

//       // change user data
//       .addCase(changeUserData.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(changeUserData.fulfilled, (state, { payload }) => {
//         state.userInfo = payload.user;
//         state.loading = false;
//       })
//       .addCase(changeUserData.rejected, (state, { payload }) => {
//         state.error = payload;
//         state.loading = false;
//       });
//   },
// });

// export const registerRequest = createAsyncThunk(
//   "auth/register",
//   async ({ name, email, password }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${BASE_URL}/auth/register`, {
//         email: email,
//         password: password,
//         name: name,
//       });
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// export const loginRequest = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${BASE_URL}/auth/login`, {
//         email: email,
//         password: password,
//       });
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// // export const checkUserAuth = createAsyncThunk(
// //   "auth/checkUserAuth",
// //   async (_, thunkAPI) => {
// //     const authorization = getCookie("token");
// //     thunkAPI.dispatch(setAuthChecked(true));
// //     if (authorization) {
// //       console.log("Найден токен, делаем запрос...");
// //       try {
// //         const { data } = await axios.get(
// //           `https://norma.nomoreparties.space/api/auth/user`,
// //           {
// //             authorization,
// //           }
// //         );
// //         console.log(data);
// //         return data;
// //       } catch (error) {
// //         if (error.response && error.response.data.message) {
// //           return thunkAPI.rejectWithValue(error.response.data.message);
// //         } else {
// //           return thunkAPI.rejectWithValue(error.message);
// //         }
// //       }
// //     } else {
// //       // thunkAPI.dispatch(clearUserData());
// //     }
// //     // thunkAPI.dispatch(setRequestStatus("idle"));
// //     // thunkAPI.dispatch(setAuthChecked(true));
// //   }
// // );

// // export const checkUserAuth = createAsyncThunk(
// //   "auth/checkUserAuth",
// //   async (_, thunkAPI) => {
// //     const refreshToken = getCookie("refreshToken");
// //     const { accessToken } = thunkAPI.getState().authSlice

// //     if(accessToken) {
// //       console.log("Найден access, делаем запрос пользователя...");
// //       try {
// //         const { data } = await axios.post(
// //           `${BASE_URL}/auth/user`,
// //           {
// //             token: refreshToken,
// //           }
// //         );
// //         return accessToken;
// //       } catch (error) {
// //         if (error.response && error.response.data.message) {
// //           return thunkAPI.rejectWithValue(error.response.data.message);
// //         } else {
// //           return thunkAPI.rejectWithValue(error.message);
// //         }
// //       }
// //     }

// //     // Если есть рефреш токен
// //     if (refreshToken) {
// //       console.log("Найден refresh, делаем запрос за токеном...");
// //       try {
// //         const { data: {accessToken} } = await axios.post(
// //           `${BASE_URL}/auth/token`,
// //           {
// //             token: refreshToken,
// //           }
// //         );
// //         return accessToken;
// //       } catch (error) {
// //         if (error.response && error.response.data.message) {
// //           return thunkAPI.rejectWithValue(error.response.data.message);
// //         } else {
// //           return thunkAPI.rejectWithValue(error.message);
// //         }
// //       }
// //     } else {
// //       //Если не нашли токен

// //     }
// //   }
// // );

// const requestUserData = async (token, url) => {
//   try {
//     const { data } = await axios.get(url, {
//       authorization: token,
//     });
//     return data;
//   } catch (error) {
//     return error.message;
//   }
// };
// 
// const requestAccessToken = async (refreshToken, url) => {
//   try {
//     const {
//       data: { accessToken },
//     } = await axios.post(url, {
//       token: refreshToken,
//     });
//     return accessToken;
//   } catch (error) {
//     return error.message;
//   }
// };


// export const getAccessToken = createAsyncThunk(
//   "auth/getAccessToken",
//   async ({ refreshToken }, thunkAPI) => {
//     await requestUserData(token, `${BASE_URL}/auth/user`)
//       .then((res) => res)
//       .catch((error) => {
//         if (error.message === "jwt expired") {
//           thunkAPI.isAccessTokenNeeded = true;
//         }
//       });

//     // .then((errMsg) => {
//     //   if (errMsg === "jwt expired") {
//     //     const refreshToken = getCookie("refreshToken");
//     //     const updatedToken = requestAccessToken(
//     //       refreshToken,
//     //       `${BASE_URL}/auth/token`
//     //     );
//     //     thunkAPI.accessToken = updatedToken;
//     //   }
//     // }
//     // );
//   }
// );


// export const getUserData = createAsyncThunk(
//   "auth/getUserData",
//   async ({ token }, thunkAPI) => {
//     await requestUserData(token, `${BASE_URL}/auth/user`)
//       .then((res) => res)
//       .catch((error) => {
//         if (error.message === "jwt expired") {
//           thunkAPI.isAccessTokenNeeded = true;
//         }
//       });

//     // .then((errMsg) => {
//     //   if (errMsg === "jwt expired") {
//     //     const refreshToken = getCookie("refreshToken");
//     //     const updatedToken = requestAccessToken(
//     //       refreshToken,
//     //       `${BASE_URL}/auth/token`
//     //     );
//     //     thunkAPI.accessToken = updatedToken;
//     //   }
//     // }
//     // );
//   }
// );

// export const changeUserData = createAsyncThunk(
//   "auth/changeUserData",
//   async ({ token, email, name, password }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.patch(`${BASE_URL}/auth/user`, {
//         authorization: token,
//         user: {
//           email,
//           name,
//           password,
//         },
//       });
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

// // export const { test, setRequestStatus, setAuthChecked, clearUserData } =
// //   authSlice.actions;

// // export default authSlice.reducer;
