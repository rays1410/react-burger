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

export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const { data } = await userRegisterRequest(name, email, password);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_REGISTRATION);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
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
      const { data } = await userLogoutRequest(refreshToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERR_USER_LOGOUT);
    }
  },
  { condition: () => tokenExists(REFRESH_TOKEN_NAME) }
);

export const changeUserData = createAsyncThunk(
  "auth/changeUserData",
  async (
    {
      email,
      name,
      password,
    }: { email: string; name: string; password: string },
    thunkAPI
  ) => {
    try {
      const accessToken = getCookie(ACCESS_TOKEN_NAME);
      const { data } = await changeUserDataRequest(
        accessToken,
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
      const { data } = await accessTokenRequest(refreshToken);
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
  userInfo: {} as UserInfoObject,
  userMessage: null,
  devError: null,
};

interface UserInfoObject {
  email: string;
  name: string;
}

interface StateType {
  isAuthChecked: boolean;
  isUserLogged: boolean;
  isUserData: boolean;
  loading: boolean;
  userInfo: null | UserInfoObject;
  userMessage: null | string;
  devError: null | string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserMessage: (state: StateType) => {
      state.userMessage = null;
    },
    clearUser: (state: StateType) => {
      state.isAuthChecked = false;
      state.isUserLogged = false;
      state.isUserData = false;
      state.loading = false;
      state.userInfo = {} as UserInfoObject;
      state.userMessage = null;
      state.devError = null;
    },
  },

  extraReducers: {
    // Обработка регистрации
    [userRegister.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [userRegister.fulfilled.type]: (state: StateType, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = SUCC_REGISTRATION;
      state.devError = null;
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken);
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [userRegister.rejected.type]: (state: StateType, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.userMessage = ERR_USER_REGISTRATION;
      state.devError = payload;
    },

    // Обработка логина
    [userLogin.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [userLogin.fulfilled.type]: (state: StateType, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = SUCC_LOGIN;
      state.devError = null;
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken, {
        expires: ACCESS_TOKEN_TTL,
      });
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [userLogin.rejected.type]: (state: StateType, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.userMessage = ERR_USER_LOGIN;
      state.devError = payload;
    },

    // Изменение данных юзера
    [changeUserData.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [changeUserData.fulfilled.type]: (state: StateType, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.loading = false;
      state.userMessage = SUCC_USER_DATA_UPDATE;
      state.devError = null;
    },
    [changeUserData.rejected.type]: (state: StateType, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.devError = payload;
      state.userMessage = ERR_USER_DATA_ISNT_UPDATED;
    },

    // Логаут
    [userLogout.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [userLogout.fulfilled.type]: (state: StateType) => {
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
    [userLogout.rejected.type]: (state: StateType, { payload }) => {
      state.loading = false;
      state.isUserData = false;
      state.devError = payload;
      state.userMessage = ERR_USER_LOGOUT;
    },

    // Новые токены
    [getNewAccessToken.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [getNewAccessToken.fulfilled.type]: (state: StateType, { payload }) => {
      state.loading = false;
      state.userMessage = null;
      state.devError = null;
      deleteCookie(ACCESS_TOKEN_NAME);
      deleteCookie(REFRESH_TOKEN_NAME);
      setCookie(ACCESS_TOKEN_NAME, payload.accessToken, {
        expires: ACCESS_TOKEN_TTL,
      });
      setCookie(REFRESH_TOKEN_NAME, payload.refreshToken);
    },
    [getNewAccessToken.rejected.type]: (state: StateType) => {
      state.loading = false;
      state.devError = ERR_SERVER;
      state.userMessage = ERR_SERVER;
    },

    // Проверка auth
    [checkUserAuth.pending.type]: (state: StateType) => {
      state.loading = true;
    },
    [checkUserAuth.fulfilled.type]: (state: StateType, { payload }) => {
      state.userInfo = payload.user;
      state.isUserData = true;
      state.isAuthChecked = true;
      state.isUserLogged = true;
      state.loading = false;
      state.userMessage = null;
      state.devError = null;
    },
    [checkUserAuth.rejected.type]: (state: StateType, { payload }) => {
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
