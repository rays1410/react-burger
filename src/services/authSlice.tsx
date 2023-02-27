import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  ERR_ACCESS_TOKEN_ISNT_UPDATED,
  ERR_ACCESS_TOKEN_UNDEFINED,
  ERR_SERVER,
  ERR_USER_DATA_ISNT_UPDATED,
  ERR_USER_LOGIN,
  ERR_USER_LOGOUT,
  ERR_USER_REGISTRATION,
  SUCC_LOGIN,
  SUCC_REGISTRATION,
  SUCC_USER_DATA_UPDATE,
  SUCC_USER_LOGOUT,
} from "../utils/statusConstants";
import { getCookie, setCookie, deleteCookie } from "../utils/cookieUtils";
import {
  accessTokenRequest,
  changeUserDataRequest,
  checkAuthRequest,
  tokenExists,
  userLoginRequest,
  userLogoutRequest,
  userRegisterRequest,
} from "../utils/authUtils";
import {
  ACCESS_TOKEN_NAME,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_NAME,
} from "../utils/constants";
import { IAuthState, IUserBaseData } from "../utils/interfaces";
import {
  TAuthRequest,
  TGetUserInfo,
  TUserLogin,
  TUserOpenData,
} from "../utils/types";

export const userRegister = createAsyncThunk<TAuthRequest, IUserBaseData>(
  "auth/register",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const { data } = await userRegisterRequest(name, email, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_REGISTRATION);
    }
  }
);

export const userLogin = createAsyncThunk<TAuthRequest, TUserLogin>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await userLoginRequest(email, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_LOGIN);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    const refreshToken = getCookie(REFRESH_TOKEN_NAME);
    try {
      const { data } = await userLogoutRequest(refreshToken as any);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_LOGOUT);
    }
  },
  { condition: () => tokenExists(REFRESH_TOKEN_NAME) }
);

export const changeUserData = createAsyncThunk<TGetUserInfo, IUserBaseData>(
  "auth/changeUserData",
  async ({ email, name, password }, thunkAPI) => {
    try {
      const accessToken = getCookie(ACCESS_TOKEN_NAME);
      const { data } = await changeUserDataRequest(
        accessToken as any,
        email,
        name,
        password
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_DATA_ISNT_UPDATED);
    }
  },
  {
    condition: () => tokenExists(ACCESS_TOKEN_NAME),
  }
);

export const getNewAccessToken = createAsyncThunk(
  "auth/getNewAccessToken",
  async (_, thunkAPI) => {
    const refreshToken = getCookie(REFRESH_TOKEN_NAME);
    try {
      const { data } = await accessTokenRequest(refreshToken as any);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_ACCESS_TOKEN_ISNT_UPDATED);
    }
  },
  {
    condition: () => tokenExists(REFRESH_TOKEN_NAME),
  }
);

export const checkUserAuth = createAsyncThunk(
  "auth/checkUserAuth",
  async (_, thunkAPI) => {
    const accessToken = getCookie(ACCESS_TOKEN_NAME);
    if (accessToken) {
      try {
        const { data } = await checkAuthRequest(accessToken);
        return data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    } else {
      return thunkAPI.rejectWithValue(ERR_ACCESS_TOKEN_UNDEFINED);
    }
  }
);

const initialState = {
  isAuthChecked: false,
  isUserLogged: false,
  isUserData: false,
  loading: false,
  userInfo: {} as TUserOpenData,
  userMessage: null,
  devError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserMessage: (state: IAuthState) => {
      state.userMessage = null;
    },
    clearUser: (state: IAuthState) => {
      state.isAuthChecked = false;
      state.isUserLogged = false;
      state.isUserData = false;
      state.loading = false;
      state.userInfo = {} as TUserOpenData;
      state.userMessage = null;
      state.devError = null;
    },
  },

  extraReducers: {
    // Обработка регистрации
    [userRegister.pending.type]: (state: IAuthState) => {
      state.loading = true;
    },
    [userRegister.fulfilled.type]: (state: IAuthState, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = SUCC_REGISTRATION;
      state.devError = null;
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken, ACCESS_TOKEN_TTL);
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [userRegister.rejected.type]: (state: IAuthState, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.userMessage = ERR_USER_REGISTRATION;
      state.devError = payload;
    },

    // Обработка логина
    [userLogin.pending.type]: (state: IAuthState) => {
      state.loading = true;
    },
    [userLogin.fulfilled.type]: (state: IAuthState, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = SUCC_LOGIN;
      state.devError = null;
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken, ACCESS_TOKEN_TTL);
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [userLogin.rejected.type]: (state: IAuthState, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.userMessage = ERR_USER_LOGIN;
      state.devError = payload;
    },

    // Изменение данных юзера
    [changeUserData.pending.type]: (state: IAuthState) => {
      state.loading = true;
    },
    [changeUserData.fulfilled.type]: (state: IAuthState, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.loading = false;
      state.userMessage = SUCC_USER_DATA_UPDATE;
      state.devError = null;
    },
    [changeUserData.rejected.type]: (state: IAuthState, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.devError = payload;
      state.userMessage = ERR_USER_DATA_ISNT_UPDATED;
    },

    // Логаут
    [userLogout.pending.type]: (state: IAuthState) => {
      state.loading = true;
    },
    [userLogout.fulfilled.type]: (state: IAuthState) => {
      state.userInfo = null;
      state.isUserData = false;
      state.isAuthChecked = true; // #
      state.isUserLogged = false;
      state.loading = false;
      state.userMessage = SUCC_USER_LOGOUT;
      state.devError = null;
      deleteCookie(ACCESS_TOKEN_NAME);
      deleteCookie(REFRESH_TOKEN_NAME);
    },
    [userLogout.rejected.type]: (state: IAuthState, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.devError = payload;
      state.userMessage = ERR_USER_LOGOUT;
    },

    // Новые токены
    [getNewAccessToken.pending.type]: (state: IAuthState) => {
      state.loading = true;
    },
    [getNewAccessToken.fulfilled.type]: (state: IAuthState, { payload }) => {
      state.loading = false;
      state.userMessage = null;
      state.devError = null;
      deleteCookie(ACCESS_TOKEN_NAME);
      deleteCookie(REFRESH_TOKEN_NAME);
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken, ACCESS_TOKEN_TTL);
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [getNewAccessToken.rejected.type]: (state: IAuthState) => {
      state.loading = false;
      state.devError = ERR_SERVER;
      state.userMessage = ERR_SERVER;
    },

    // Проверка auth
    [checkUserAuth.pending.type]: (state) => {
      state.loading = true;
    },
    [checkUserAuth.fulfilled.type]: (state, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = null;
      state.devError = null;
    },
    [checkUserAuth.rejected.type]: (state: IAuthState, { payload }) => {
      state.isAuthChecked = true;
      state.isUserData = false;
      state.loading = false;
      state.devError = payload;
      state.userMessage = null;
      state.devError = ERR_ACCESS_TOKEN_UNDEFINED;
    },
  },
});

export const { clearUserMessage, clearUser } = authSlice.actions;

export default authSlice.reducer;
